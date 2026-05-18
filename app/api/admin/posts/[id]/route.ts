import { NextRequest, NextResponse } from "next/server"
import { verifyAdmin } from "@/scripts/admin-auth.mjs"
import {
  readRawPosts,
  writeAllPosts,
  getI18nData,
  setI18nData,
  deleteI18nData,
  slugify,
} from "@/scripts/blog-lib.mjs"
import * as fs from "node:fs"
import * as path from "node:path"

/**
 * PUT /api/admin/posts/[id] — update a post
 * Body: { title_en, title_fr, excerpt_en, excerpt_fr, category, tags,
 *         slug, image, paragraphs_en, paragraphs_fr, quote_en, quote_fr }
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyAdmin(req)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    const postId = parseInt(id, 10)
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const body = await req.json()
    const posts = readRawPosts()
    const idx = posts.findIndex((p) => p.id === postId)
    if (idx === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const post = posts[idx]
    const i18n = getI18nData(postId)

    // Update fields
    if (body.title_en !== undefined) i18n.en.title = body.title_en
    if (body.title_fr !== undefined) i18n.fr.title = body.title_fr
    if (body.excerpt_en !== undefined) i18n.en.excerpt = body.excerpt_en
    if (body.excerpt_fr !== undefined) i18n.fr.excerpt = body.excerpt_fr
    if (body.category !== undefined) post.category = body.category
    if (body.tags !== undefined) post.tags = body.tags
    if (body.slug !== undefined) post.slug = slugify(body.slug)
    if (body.image !== undefined) post.image = body.image

    // Paragraphs
    if (body.paragraphs_en !== undefined) {
      i18n.en.paragraphs = body.paragraphs_en
      post.content = body.paragraphs_en.map((_: string, i: number) => `blog_post_${postId}_p_${i + 1}`)
    }
    if (body.paragraphs_fr !== undefined) {
      i18n.fr.paragraphs = body.paragraphs_fr
    }

    // Quote
    if (body.quote_en !== undefined) {
      i18n.en.quote = body.quote_en
      if (body.quote_en) {
        post.quote = { text: `blog_post_${postId}_quote` }
      } else {
        delete post.quote
      }
    }
    if (body.quote_fr !== undefined) {
      i18n.fr.quote = body.quote_fr
    }

    posts[idx] = post
    writeAllPosts(posts)
    setI18nData(postId, i18n.en, i18n.fr)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update post" },
      { status: 500 },
    )
  }
}

/**
 * DELETE /api/admin/posts/[id] — remove a post
 */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyAdmin(req)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    const postId = parseInt(id, 10)
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const posts = readRawPosts()
    const idx = posts.findIndex((p) => p.id === postId)
    if (idx === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const post = posts[idx]

    // Remove image if it's a dedicated one
    if (post.image && !post.image.includes("46.webp") && !post.image.includes("44.webp") && !post.image.includes("45.webp")) {
      const imgPath = path.join(process.cwd(), "public", post.image)
      if (fs.existsSync(imgPath)) {
        try { fs.unlinkSync(imgPath) } catch { /* ignore */ }
      }
    }

    posts.splice(idx, 1)
    writeAllPosts(posts)
    deleteI18nData(postId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete post" },
      { status: 500 },
    )
  }
}
