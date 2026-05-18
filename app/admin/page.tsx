"use client"

import { useState, useEffect, useCallback, FormEvent } from "react"
import { useRouter } from "next/navigation"
import HugeRTEEditor from "./components/HugeRTEEditor"

interface I18nEntry {
  title: string
  date: string
  excerpt: string
  paragraphs: string[]
  quote: string
}

interface BlogPost {
  id: number
  title: string
  slug: string
  date: string
  sortDate: string
  category: string
  image: string
  excerpt: string
  content: string[]
  tags: string[]
  author: string
  readingTimeMinutes: number
  serviceAlignment?: string
  quote?: { text: string }
  i18n: { en: I18nEntry; fr: I18nEntry }
}

type ViewMode = "list" | "add" | "edit"

export default function AdminDashboard() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<ViewMode>("list")
  const [editId, setEditId] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [deleting, setDeleting] = useState<number | null>(null)

  // ── Add form state ──────────────────────────────────────────────────────────
  const [markdown, setMarkdown] = useState("")
  const [useAI, setUseAI] = useState(true)
  const [adding, setAdding] = useState(false)

  // ── Edit form state ────────────────────────────────────────────────────────
  const [editForm, setEditForm] = useState({
    title_en: "",
    title_fr: "",
    excerpt_en: "",
    excerpt_fr: "",
    category: "",
    tags: "",
    slug: "",
    image: "",
  })
  const [editParagraphsEn, setEditParagraphsEn] = useState<string[]>([])
  const [editParagraphsFr, setEditParagraphsFr] = useState<string[]>([])

  // ── Load posts ─────────────────────────────────────────────────────────────
  const loadPosts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/posts")
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      if (data.posts) setPosts(data.posts)
    } catch {
      setError("Failed to load posts")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { loadPosts() }, [loadPosts])

  // ── Handle logout ──────────────────────────────────────────────────────────
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  // ── Show success/error temporarily ─────────────────────────────────────────
  function flash(msg: string, isError = false) {
    if (isError) setError(msg)
    else setSuccess(msg)
    setTimeout(() => { setError(""); setSuccess("") }, 4000)
  }

  // ── Add article ────────────────────────────────────────────────────────────
  async function handleAdd(e: FormEvent) {
    e.preventDefault()
    if (markdown.trim().length < 10) {
      flash("Markdown content is too short", true)
      return
    }
    setAdding(true)
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown, skipAi: !useAI }),
      })
      const data = await res.json()
      if (!res.ok) {
        flash(data.error || "Failed to add article", true)
        return
      }
      flash(`Article "${data.post.title}" added!`)
      setMarkdown("")
      setView("list")
      await loadPosts()
    } catch {
      flash("Failed to add article", true)
    } finally {
      setAdding(false)
    }
  }

  // ── Edit article ───────────────────────────────────────────────────────────
  function openEdit(post: BlogPost) {
    setEditId(post.id)
    setEditForm({
      title_en: post.i18n.en.title,
      title_fr: post.i18n.fr.title,
      excerpt_en: post.i18n.en.excerpt,
      excerpt_fr: post.i18n.fr.excerpt,
      category: post.category,
      tags: post.tags.join(", "),
      slug: post.slug,
      image: post.image,
    })
    setEditParagraphsEn([...post.i18n.en.paragraphs])
    setEditParagraphsFr([...post.i18n.fr.paragraphs])
    setView("edit")
  }

  async function handleEditSave(e: FormEvent) {
    e.preventDefault()
    if (editId === null) return

    try {
      const res = await fetch(`/api/admin/posts/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title_en: editForm.title_en,
          title_fr: editForm.title_fr,
          excerpt_en: editForm.excerpt_en,
          excerpt_fr: editForm.excerpt_fr,
          category: editForm.category,
          tags: editForm.tags.split(",").map((s) => s.trim()).filter(Boolean),
          slug: editForm.slug,
          image: editForm.image,
          paragraphs_en: editParagraphsEn,
          paragraphs_fr: editParagraphsFr,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        flash(data.error || "Failed to save", true)
        return
      }
      flash("Article saved!")
      setView("list")
      setEditId(null)
      await loadPosts()
    } catch {
      flash("Failed to save article", true)
    }
  }

  // ── Delete article ─────────────────────────────────────────────────────────
  async function confirmDelete(id: number) {
    setDeleting(id)
  }

  async function executeDelete() {
    if (deleting === null) return
    try {
      const res = await fetch(`/api/admin/posts/${deleting}`, { method: "DELETE" })
      if (!res.ok) {
        flash("Failed to delete", true)
        return
      }
      flash("Article deleted!")
      setDeleting(null)
      await loadPosts()
    } catch {
      flash("Failed to delete article", true)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1f2421",
        fontFamily: "Raleway, sans-serif",
        paddingTop: "100px",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#1a1a1a",
          borderBottom: "1px solid rgba(254, 254, 254, 0.2)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h1
          style={{
            fontFamily: "Unbounded, sans-serif",
            color: "#fefefe",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Blog Admin
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {view === "list" ? (
            <button
              className="btn btn-primary"
              onClick={() => { setView("add"); setMarkdown("") }}
              style={{ height: "48px", minWidth: "160px" }}
            >
              <span>+ Add Article</span>
              <span>+ Add Article</span>
            </button>
          ) : (
            <button
              className="btn btn-dark"
              onClick={() => { setView("list"); setEditId(null) }}
              style={{ height: "48px", minWidth: "120px" }}
            >
              <span>← Back</span>
              <span>← Back</span>
            </button>
          )}
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "1px solid rgba(254,254,254,0.2)",
              borderRadius: "8px",
              color: "#c8c8cd",
              padding: "12px 20px",
              cursor: "pointer",
              fontFamily: "Raleway, sans-serif",
              fontSize: "14px",
              height: "48px",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Flash messages */}
      {(error || success) && (
        <div
          style={{
            padding: "12px 24px",
            background: error ? "#2c1515" : "#152c1a",
            color: error ? "#e74c3c" : "#49a078",
            borderBottom: `1px solid ${error ? "rgba(231,76,60,0.3)" : "rgba(73,160,120,0.3)"}`,
            fontSize: "14px",
          }}
        >
          {error || success}
        </div>
      )}

      <div className="admin-container">
        {/* ── ADD VIEW ─────────────────────────────────────────────────────── */}
        {view === "add" && (
          <div
            style={{
              background: "#1a1a1a",
              borderRadius: "20px",
              border: "1px solid rgba(254, 254, 254, 0.2)",
              padding: "40px 36px",
            }}
          >
            <h2
              style={{
                fontFamily: "Unbounded, sans-serif",
                color: "#fefefe",
                fontWeight: 600,
                fontSize: "24px",
                marginBottom: "24px",
              }}
            >
              Add New Article
            </h2>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    color: "#c8c8cd",
                    fontSize: "14px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Paste full Markdown (with YAML frontmatter):
                </label>
                <textarea
                  className="form-control"
                  rows={20}
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder={`---\ntitle: "My Article"\ndescription: "..."\ntags: ["tag1", "tag2"]\npublishDate: "2026-05-14"\nreadingTime: "10 min read"\nserviceAlignment: "maintenance"\n---\n\n# My Article\n...`}
                  style={{
                    width: "100%",
                    minHeight: "400px",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    resize: "vertical",
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#c8c8cd",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={useAI}
                    onChange={(e) => setUseAI(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#49a078", cursor: "pointer" }}
                  />
                  Use AI translation (EN ↔ FR)
                </label>
                {!useAI && (
                  <span style={{ color: "#9cc5a1", fontSize: "13px", fontFamily: "Raleway, sans-serif" }}>
                    Content will be copied to both languages
                  </span>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={adding}
                  style={{ height: "48px", minWidth: "180px" }}
                >
                  <span>{adding ? "Adding..." : "Add Article"}</span>
                  <span>{adding ? "Adding..." : "Add Article"}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => setView("list")}
                  style={{ height: "48px", minWidth: "120px" }}
                >
                  <span>Cancel</span>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── EDIT VIEW ────────────────────────────────────────────────────── */}
        {view === "edit" && editId !== null && (
          <div
            style={{
              background: "#1a1a1a",
              borderRadius: "20px",
              border: "1px solid rgba(254, 254, 254, 0.2)",
              padding: "40px 36px",
            }}
          >
            <h2
              style={{
                fontFamily: "Unbounded, sans-serif",
                color: "#fefefe",
                fontWeight: 600,
                fontSize: "24px",
                marginBottom: "24px",
              }}
            >
              Edit Article #{editId}
            </h2>
            <form onSubmit={handleEditSave}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ color: "#c8c8cd", fontSize: "14px", display: "block", marginBottom: "8px" }}>Title (EN)</label>
                  <input className="form-control" value={editForm.title_en} onChange={(e) => setEditForm({ ...editForm, title_en: e.target.value })} style={{ height: "64px", borderRadius: "8px" }} />
                </div>
                <div>
                  <label style={{ color: "#c8c8cd", fontSize: "14px", display: "block", marginBottom: "8px" }}>Title (FR)</label>
                  <input className="form-control" value={editForm.title_fr} onChange={(e) => setEditForm({ ...editForm, title_fr: e.target.value })} style={{ height: "64px", borderRadius: "8px" }} />
                </div>
                <div>
                  <label style={{ color: "#c8c8cd", fontSize: "14px", display: "block", marginBottom: "8px" }}>Excerpt (EN)</label>
                  <input className="form-control" value={editForm.excerpt_en} onChange={(e) => setEditForm({ ...editForm, excerpt_en: e.target.value })} style={{ height: "64px", borderRadius: "8px" }} />
                </div>
                <div>
                  <label style={{ color: "#c8c8cd", fontSize: "14px", display: "block", marginBottom: "8px" }}>Excerpt (FR)</label>
                  <input className="form-control" value={editForm.excerpt_fr} onChange={(e) => setEditForm({ ...editForm, excerpt_fr: e.target.value })} style={{ height: "64px", borderRadius: "8px" }} />
                </div>
                <div>
                  <label style={{ color: "#c8c8cd", fontSize: "14px", display: "block", marginBottom: "8px" }}>Category</label>
                  <select
                    className="form-control"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    style={{ height: "64px", borderRadius: "8px", color: "#c8c8cd" }}
                  >
                    <option value="" style={{ background: "#1a1a1a", color: "#c8c8cd" }}>Select category</option>
                    <option value="Agency" style={{ background: "#1a1a1a", color: "#c8c8cd" }}>Agency</option>
                    <option value="Business" style={{ background: "#1a1a1a", color: "#c8c8cd" }}>Business</option>
                    <option value="Development" style={{ background: "#1a1a1a", color: "#c8c8cd" }}>Development</option>
                    <option value="UI/UX Design" style={{ background: "#1a1a1a", color: "#c8c8cd" }}>UI/UX Design</option>
                    <option value="Marketing" style={{ background: "#1a1a1a", color: "#c8c8cd" }}>Marketing</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: "#c8c8cd", fontSize: "14px", display: "block", marginBottom: "8px" }}>Tags (comma-separated)</label>
                  <input className="form-control" value={editForm.tags} onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })} style={{ height: "64px", borderRadius: "8px" }} />
                </div>
                <div>
                  <label style={{ color: "#c8c8cd", fontSize: "14px", display: "block", marginBottom: "8px" }}>Slug</label>
                  <input className="form-control" value={editForm.slug} onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })} style={{ height: "64px", borderRadius: "8px" }} />
                </div>
                <div>
                  <label style={{ color: "#c8c8cd", fontSize: "14px", display: "block", marginBottom: "8px" }}>Image path</label>
                  <input className="form-control" value={editForm.image} onChange={(e) => setEditForm({ ...editForm, image: e.target.value })} style={{ height: "64px", borderRadius: "8px" }} />
                </div>
              </div>

              {/* Content EN — rich text editor */}
              <HugeRTEEditor
                label="Content (EN)"
                value={editParagraphsEn.join("\n\n")}
                onChange={(md) => {
                  const paras = md
                    .split(/\n{2,}/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                  setEditParagraphsEn(paras)
                }}
                height={500}
                placeholder="Write English content…"
              />

              {/* Content FR — rich text editor */}
              <HugeRTEEditor
                label="Content (FR)"
                value={editParagraphsFr.join("\n\n")}
                onChange={(md) => {
                  const paras = md
                    .split(/\n{2,}/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                  setEditParagraphsFr(paras)
                }}
                height={500}
                placeholder="Write French content…"
              />

              <div style={{ display: "flex", gap: "12px" }}>
                <button type="submit" className="btn btn-primary" style={{ height: "48px", minWidth: "180px" }}>
                  <span>Save Changes</span>
                  <span>Save Changes</span>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => { setView("list"); setEditId(null) }} style={{ height: "48px", minWidth: "120px" }}>
                  <span>Cancel</span>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── LIST VIEW ────────────────────────────────────────────────────── */}
        {view === "list" && (
          <>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#c8c8cd" }}>
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div
                style={{
                  background: "#1a1a1a",
                  borderRadius: "20px",
                  border: "1px solid rgba(254, 254, 254, 0.2)",
                  padding: "60px 36px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "#c8c8cd", fontSize: "16px", marginBottom: "20px" }}>
                  No articles yet. Click &ldquo;Add Article&rdquo; to get started.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      background: "#1a1a1a",
                      borderRadius: "20px",
                      border: "1px solid rgba(254, 254, 254, 0.2)",
                      padding: "24px 36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                        <span
                          style={{
                            background: "#49a078",
                            color: "#1f2421",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Unbounded, sans-serif",
                            fontWeight: 600,
                            fontSize: "12px",
                            flexShrink: 0,
                          }}
                        >
                          {post.id}
                        </span>
                        <h3
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            color: "#fefefe",
                            fontWeight: 600,
                            fontSize: "16px",
                            margin: 0,
                            lineHeight: 1.4,
                          }}
                        >
                          {post.i18n.en.title || post.title}
                        </h3>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", paddingLeft: "44px" }}>
                        <span style={{ color: "#9cc5a1", fontSize: "13px" }}>{post.category}</span>
                        <span style={{ color: "rgba(254,254,254,0.3)", fontSize: "10px" }}>•</span>
                        <span style={{ color: "#c8c8cd", fontSize: "13px" }}>
                          {post.i18n.en.date}
                        </span>
                        <span style={{ color: "rgba(254,254,254,0.3)", fontSize: "10px" }}>•</span>
                        <span style={{ color: "#c8c8cd", fontSize: "13px" }}>
                          {post.readingTimeMinutes || 5} min read
                        </span>
                        <span style={{ color: "rgba(254,254,254,0.3)", fontSize: "10px" }}>•</span>
                        <span style={{ color: "#c8c8cd", fontSize: "13px" }}>
                          /blog/{post.slug}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => openEdit(post)}
                        style={{ height: "40px", minWidth: "80px", padding: "8px 20px", fontSize: "13px" }}
                      >
                        <span>Edit</span>
                        <span>Edit</span>
                      </button>
                      <button
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(231, 76, 60, 0.4)",
                          borderRadius: "2rem",
                          color: "#e74c3c",
                          padding: "8px 20px",
                          cursor: "pointer",
                          fontFamily: "Raleway, sans-serif",
                          fontSize: "13px",
                          height: "40px",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => confirmDelete(post.id)}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#e74c3c"; e.currentTarget.style.color = "#fff" }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#e74c3c" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleting !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(31, 36, 33, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setDeleting(null)}
        >
          <div
            style={{
              background: "#1a1a1a",
              borderRadius: "20px",
              border: "1px solid rgba(254, 254, 254, 0.2)",
              padding: "40px 36px",
              maxWidth: "420px",
              width: "100%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: "Unbounded, sans-serif",
                color: "#fefefe",
                fontWeight: 600,
                fontSize: "20px",
                marginBottom: "12px",
              }}
            >
              Delete Article?
            </h3>
            <p style={{ color: "#c8c8cd", fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
              This will permanently remove this article and its translations. 
              The featured image will also be deleted. This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                style={{
                  background: "#e74c3c",
                  border: "none",
                  borderRadius: "2rem",
                  color: "#fff",
                  padding: "14px 32px",
                  cursor: "pointer",
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  height: "48px",
                  minWidth: "120px",
                }}
                onClick={executeDelete}
              >
                Yes, Delete
              </button>
              <button
                className="btn btn-dark"
                onClick={() => setDeleting(null)}
                style={{ height: "48px", minWidth: "120px" }}
              >
                <span>Cancel</span>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
