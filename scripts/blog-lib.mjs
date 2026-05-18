#!/usr/bin/env node

/**
 * blog-lib.mjs — Shared pure logic for blog CRUD (CLI + admin API)
 *
 * Exports all data-layer functions so both the CLI (blog-cli.mjs)
 * and the admin API routes can use the same file operations.
 */

import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"

// ── Paths ────────────────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, "..")

export const BLOG_DATA_PATH   = path.join(ROOT, "data", "blog-data.ts")
export const I18N_EN_PATH     = path.join(ROOT, "i18n", "en", "blog.json")
export const I18N_FR_PATH     = path.join(ROOT, "i18n", "fr", "blog.json")
export const BG_IMG_DIR       = path.join(ROOT, "public", "assets", "img", "bg-img")
export const ENV_PATH         = path.join(ROOT, ".env.local")

// ── Load .env.local ─────────────────────────────────────────────────────────
export function loadEnv() {
  if (fs.existsSync(ENV_PATH)) {
    for (const line of fs.readFileSync(ENV_PATH, "utf-8").split("\n")) {
      const t = line.trim()
      if (!t || t.startsWith("#")) continue
      const eq = t.indexOf("=")
      if (eq === -1) continue
      const key = t.slice(0, eq).trim()
      let val = t.slice(eq + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
      if (!process.env[key]) process.env[key] = val
    }
  }
}

// Load env on import
loadEnv()

// ── Language detection ───────────────────────────────────────────────────────
export function detectLanguage(text) {
  const frWords = /\b(le|la|les|des|du|au|aux|ce|ces|pour|dans|sur|avec|est|sont|nous|vous|ils|elles|une|que|qui|pas|plus|très|par|comme|mais|fait|faire|entre|aussi|donc|car|sans|être|avoir|faire|leur|dont|où|d'un|d'une)\b/gi
  let score = 0, m
  while ((m = frWords.exec(text)) !== null) score++
  const accents = (text.match(/[éèêëàâùûüôöîïçœæ]/gi) || []).length
  const words = text.split(/\s+/).length
  return (score / Math.max(words, 1) > 0.035) || accents > words * 0.015 ? "fr" : "en"
}

export function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80)
}

// ── Date formatting ──────────────────────────────────────────────────────────
export function formatDate(locale) {
  const now = new Date()
  if (locale === "fr") {
    const m = ["janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    return `${now.getDate()} ${m[now.getMonth()]} ${String(now.getFullYear()).slice(2)}`
  }
  const m = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  return `${m[now.getMonth()]} ${now.getDate()}, ${String(now.getFullYear()).slice(2)}`
}

export function formatDateFromIso(isoString, locale) {
  if (!isoString) return formatDate(locale)
  const date = new Date(isoString)
  if (isNaN(date.getTime())) return formatDate(locale)
  if (locale === "fr") {
    const m = ["janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    return `${date.getDate()} ${m[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`
  }
  const m = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  return `${m[date.getMonth()]} ${date.getDate()}, ${String(date.getFullYear()).slice(2)}`
}

// ── YAML frontmatter parser ──────────────────────────────────────────────────
export function parseFrontmatter(md) {
  const match = md.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return { fm: null, body: md.trim() }

  const raw = match[1]
  const body = md.slice(match[0].length).trim()
  const fm = {}

  for (const line of raw.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue

    if (trimmed.includes("[") && trimmed.includes("]")) {
      const colonIdx = trimmed.indexOf(":")
      const key = trimmed.slice(0, colonIdx).trim()
      const arrMatch = trimmed.match(/\[([\s\S]*?)\]/)
      if (arrMatch) {
        fm[key] = arrMatch[1].split(",").map(s =>
          s.trim().replace(/^["']|["']$/g, "")
        ).filter(Boolean)
      }
      continue
    }

    const colonIdx = trimmed.indexOf(":")
    if (colonIdx === -1) continue
    const key = trimmed.slice(0, colonIdx).trim()
    let val = trimmed.slice(colonIdx + 1).trim()
    val = val.replace(/^["']|["']$/g, "")
    fm[key] = val
  }

  return { fm, body }
}

export function parseReadingTimeMinutes(val) {
  if (!val) return 5
  const m = String(val).match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 5
}

// ── Markdown parser ──────────────────────────────────────────────────────────
export function parseMd(md) {
  const { fm, body } = parseFrontmatter(md)

  const lines = body.split("\n")
  const titleLine = lines.find(l => /^#{1,3}\s+/.test(l))
  const bodyTitle = titleLine ? titleLine.replace(/^#+\s+/, "").trim() : null
  const cl = lines.filter(l => !/^#{1,3}\s+/.test(l))
  let raw = cl.join("\n").split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

  const merged = []
  for (const p of raw) {
    const isListItem = /^[-*\d]+\.?\s/.test(p)
    if (isListItem && merged.length > 0 && /^[-*\d]+\.?\s/.test(merged[merged.length - 1])) {
      merged[merged.length - 1] += "\n" + p
    } else {
      merged.push(p)
    }
  }
  raw = merged

  const quotes = raw.filter(p => p.startsWith(">"))
  const paras = raw.filter(p => !p.startsWith(">") && p.length > 20)
  const quote = quotes.length > 0 ? quotes[0].replace(/^>\s?/, "").trim() : null

  const title = fm?.title || bodyTitle || "New Blog Post"

  const excerpt = fm?.description
    ? fm.description.replace(/<[^>]*>/g, "").slice(0, 200).replace(/\s+\S*$/, "") + "..."
    : (paras[0] ? paras[0].replace(/<[^>]*>/g, "").slice(0, 180).replace(/\s+\S*$/, "") + "..." : title)

  const lower = (fm?.serviceAlignment || body || title || "").toLowerCase()
  let cat = "Development"
  if (fm?.serviceAlignment) {
    const alignMap = {
      "web-development": "Development",
      "maintenance": "Development",
      "ui-ux-design": "UI/UX Design",
      "marketing": "Marketing",
      "branding": "Agency",
      "mobile-app": "Development",
      "consulting": "Business",
    }
    cat = alignMap[fm.serviceAlignment] || cat
  }
  if (cat === "Development") {
    if (/\b(design|ui|ux|graphic|visual|creative)\b/.test(lower)) cat = "UI/UX Design"
    else if (/\b(marketing|seo|social.?media|content|brand)\b/.test(lower)) cat = "Marketing"
    else if (/\b(business|startup|entrepreneur|growth|strategy)\b/.test(lower)) cat = "Business"
    else if (/\b(agency|client|service|consulting)\b/.test(lower)) cat = "Agency"
  }

  const tags = new Set()
  if (fm?.tags && Array.isArray(fm.tags)) fm.tags.forEach(t => tags.add(t))
  const tagMap = {
    Agency: ["agency", "creative", "brand"], Business: ["business", "growth", "strategy", "startup"],
    Marketing: ["marketing", "seo", "digital", "social"], Modern: ["modern", "trend", "innovation", "future"],
    Design: ["design", "ui", "ux", "graphic", "visual"], Digital: ["digital", "tech", "technology", "web"],
  }
  for (const [tag, kws] of Object.entries(tagMap)) { if (kws.some(kw => lower.includes(kw))) tags.add(tag) }
  if (!tags.has("Modern")) tags.add("Modern")
  tags.add(cat)

  const readingTimeMinutes = parseReadingTimeMinutes(fm?.readingTime)
  const publishDate = fm?.publishDate || null

  return {
    title,
    excerpt,
    paragraphs: paras,
    quote,
    category: cat,
    tags: [...tags].slice(0, 6),
    readingTimeMinutes,
    publishDate,
    serviceAlignment: fm?.serviceAlignment || null,
  }
}

// ── Data layer: read / write blog-data.ts ────────────────────────────────────

export function readRawPosts() {
  const src = fs.readFileSync(BLOG_DATA_PATH, "utf-8")

  const startMarker = "export const BLOG_POSTS: BlogPost[] = ["
  const startIdx = src.indexOf(startMarker)
  if (startIdx === -1) throw new Error("Could not find BLOG_POSTS array")
  const contentStart = startIdx + startMarker.length

  const sidebarIdx = src.indexOf("\nexport const SIDEBAR_RECENT_POSTS")
  if (sidebarIdx === -1) throw new Error("Could not find SIDEBAR_RECENT_POSTS")
  const arrayEnd = src.lastIndexOf("]", sidebarIdx)
  const arrayContent = src.slice(contentStart, arrayEnd)

  const posts = []
  let depth = 0
  let current = ""
  for (const ch of arrayContent) {
    if (ch === "{") { depth++; current += ch }
    else if (ch === "}") { depth--; current += ch; if (depth === 0 && current.trim()) { posts.push(current.trim()); current = "" } }
    else if (depth > 0) { current += ch }
  }

  return posts.map((block) => parsePostBlock(block))
}

export function parsePostBlock(block) {
  const lines = block.split("\n").map(l => l.trim())

  function findValue(key) {
    const line = lines.find(l => l.startsWith(key + ":"))
    if (!line) return undefined
    return line.slice(key.length + 1).trim()
  }

  function findStr(key) {
    const v = findValue(key)
    if (!v) return undefined
    return v.replace(/^"(.*)"(,)?$/, "$1")
  }

  function findArr(key) {
    const idx = lines.findIndex(l => l.startsWith(key + ":"))
    if (idx === -1) return undefined
    let firstLine = lines[idx].slice(key.length + 1).trim()
    if (firstLine.startsWith("[")) {
      const rest = lines.slice(idx).join(" ")
      const match = rest.match(/\[([\s\S]*?)\]/)
      if (!match) return undefined
      return match[1].split(",").map(s => s.trim().replace(/^"(.*)"$/, "$1")).filter(Boolean)
    }
    return firstLine ? [firstLine.replace(/^"(.*)"$/, "$1")] : []
  }

  function findObj(key) {
    const idx = lines.findIndex(l => l.startsWith(key + ":"))
    if (idx === -1) return undefined
    let depth = 0
    let objLines = []
    for (let i = idx; i < lines.length; i++) {
      for (const ch of lines[i]) {
        if (ch === "{") depth++
        if (ch === "}") depth--
      }
      objLines.push(lines[i])
      if (depth === 0) break
    }
    const text = objLines.join(" ")
    const match = text.match(/\{([\s\S]*?)\}/)
    if (!match) return undefined
    const obj = {}
    match[1].split(",").forEach(pair => {
      const parts = pair.split(":").map(s => s.trim().replace(/^"(.*)"$/, "$1"))
      if (parts.length >= 2) obj[parts[0]] = parts.slice(1).join(":").trim()
    })
    return obj
  }

  return {
    id: parseInt(findStr("id")),
    title: findStr("title"),
    slug: findStr("slug"),
    date: findStr("date"),
    sortDate: findStr("sortDate"),
    category: findStr("category"),
    image: findStr("image"),
    excerpt: findStr("excerpt"),
    content: findArr("content") || [],
    quote: findObj("quote"),
    tags: findArr("tags") || [],
    author: findStr("author"),
    readingTimeMinutes: parseInt(findStr("readingTimeMinutes")) || 5,
    serviceAlignment: findStr("serviceAlignment") || null,
  }
}

export function generatePostBlock(post) {
  const tags = post.tags.map(t => `"${t}"`).join(", ")
  const content = post.content.map(k => `      "${k}",`).join("\n")
  const quote = post.quote?.text
    ? `\n    quote: {\n      text: "${post.quote.text}",\n    },`
    : ""
  const serviceLine = post.serviceAlignment
    ? `\n    serviceAlignment: "${post.serviceAlignment}",`
    : ""

  return `  {
    id: ${post.id},
    title: "${post.title}",
    slug: "${post.slug}",
    date: "${post.date}",
    sortDate: "${post.sortDate || post.date}",
    category: "${post.category}",
    image: "${post.image}",
    excerpt: "${post.excerpt}",
    content: [
${content}
    ],${quote}
    tags: [${tags}],
    author: "${post.author || "Dev Agency"}",
    readingTimeMinutes: ${post.readingTimeMinutes || 5},${serviceLine}
  }`
}

export function writeAllPosts(posts) {
  let src = fs.readFileSync(BLOG_DATA_PATH, "utf-8")

  const newArray = posts.map(p => generatePostBlock(p)).join(",\n\n")

  const startMarker = "export const BLOG_POSTS: BlogPost[] = ["
  const startIdx = src.indexOf(startMarker)
  if (startIdx === -1) throw new Error("Could not find BLOG_POSTS")
  const contentStart = startIdx + startMarker.length

  const sidebarIdx = src.indexOf("\nexport const SIDEBAR_RECENT_POSTS")
  if (sidebarIdx === -1) throw new Error("Could not find SIDEBAR")
  const arrayEnd = src.lastIndexOf("]", sidebarIdx)

  src = src.slice(0, contentStart) + "\n" + newArray + ",\n" + src.slice(arrayEnd)

  const sidebarEntries = posts.slice(0, 3).map((_, i) => `BLOG_POSTS[${i}]`).join(", ")
  const sidebarMatch = src.match(/^export const SIDEBAR_RECENT_POSTS = .*/m)
  if (sidebarMatch) {
    src = src.replace(sidebarMatch[0], `export const SIDEBAR_RECENT_POSTS = [${sidebarEntries}]`)
  }

  fs.writeFileSync(BLOG_DATA_PATH, src)
}

// ── i18n layer ───────────────────────────────────────────────────────────────

export function getI18nData(postId) {
  const en = JSON.parse(fs.readFileSync(I18N_EN_PATH, "utf-8"))
  const fr = JSON.parse(fs.readFileSync(I18N_FR_PATH, "utf-8"))
  const prefix = `blog_post_${postId}`

  function extract(langData) {
    const title = langData[`${prefix}_title`] || ""
    const date = langData[`${prefix}_date`] || ""
    const excerpt = langData[`${prefix}_excerpt`] || ""
    const paragraphs = []
    for (let i = 1; langData[`${prefix}_p_${i}`]; i++) {
      paragraphs.push(langData[`${prefix}_p_${i}`])
    }
    const quote = langData[`${prefix}_quote`] || ""
    return { title, date, excerpt, paragraphs, quote }
  }

  return { en: extract(en), fr: extract(fr) }
}

export function setI18nData(postId, enData, frData) {
  const prefix = `blog_post_${postId}`

  function update(langData, data) {
    Object.keys(langData).filter(k => k.startsWith(prefix)).forEach(k => delete langData[k])
    langData[`${prefix}_title`] = data.title
    langData[`${prefix}_date`] = data.date
    langData[`${prefix}_excerpt`] = data.excerpt
    data.paragraphs.forEach((p, i) => { langData[`${prefix}_p_${i + 1}`] = p })
    if (data.quote) langData[`${prefix}_quote`] = data.quote
  }

  const en = JSON.parse(fs.readFileSync(I18N_EN_PATH, "utf-8"))
  update(en, enData)
  fs.writeFileSync(I18N_EN_PATH, JSON.stringify(en, null, 2) + "\n")

  const fr = JSON.parse(fs.readFileSync(I18N_FR_PATH, "utf-8"))
  update(fr, frData)
  fs.writeFileSync(I18N_FR_PATH, JSON.stringify(fr, null, 2) + "\n")
}

export function deleteI18nData(postId) {
  const prefix = `blog_post_${postId}`
  ;[I18N_EN_PATH, I18N_FR_PATH].forEach(filePath => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    Object.keys(data).filter(k => k.startsWith(prefix)).forEach(k => delete data[k])
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n")
  })
}

// ── AI ───────────────────────────────────────────────────────────────────────

export async function callOpenAI(systemPrompt, userMessage) {
  if (!process.env.OPENAI_API_KEY) return null

  const body = {
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userMessage }],
    max_tokens: 16384,
  }

  const tmpFile = path.join(ROOT, ".tmp", `ai-${Date.now()}.json`)
  fs.mkdirSync(path.dirname(tmpFile), { recursive: true })
  fs.writeFileSync(tmpFile, JSON.stringify(body))

  try {
    const cmd = `curl -s https://api.openai.com/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer ${process.env.OPENAI_API_KEY}" -d "@${tmpFile}" --max-time 60`
    const raw = execSync(cmd, { encoding: "utf-8", stdio: "pipe", shell: true, cwd: ROOT })
    const data = JSON.parse(raw)
    if (data.error) return null
    return data.choices?.[0]?.message?.content || null
  } catch (e) {
    return null
  } finally {
    try { fs.unlinkSync(tmpFile) } catch {}
  }
}

export function fetchImage(query) {
  const existing = fs.readdirSync(BG_IMG_DIR).filter(f => /^\d+\.webp$/.test(f)).map(f => parseInt(f)).sort((a, b) => a - b)
  const next = existing.length > 0 ? Math.max(...existing) + 1 : 1
  const dest = path.join(BG_IMG_DIR, `${next}.webp`)

  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY
  if (unsplashKey) {
    try {
      const json = execSync(`curl -s -H "Authorization: Client-ID ${unsplashKey}" "https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape" --max-time 10`, { encoding: "utf-8", stdio: "pipe" })
      const url = JSON.parse(json).results?.[0]?.urls?.raw
      if (url) {
        execSync(`curl -sL "${url}&w=1600&q=80&fit=max" -o "${dest}" --max-time 15`, { stdio: "pipe" })
        if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) return `/assets/img/bg-img/${next}.webp`
      }
    } catch {}
  }
  return "/assets/img/bg-img/46.webp"
}

// ── AI prompt templates ──────────────────────────────────────────────────────

export const AI_TRANSLATE_SYSTEM = (from, to) =>
`You are a professional translator. Translate the following blog post from ${from} to ${to}.
Rules:
- Keep the same meaning and tone
- Translate the title naturally
- Preserve all HTML tags exactly as they appear (do not strip or modify them)
- Translate all content completely — every paragraph, list item, and quote must be translated
- Reply with ONLY valid JSON (no markdown, no code fences, no trailing commas):
{"title": "...", "excerpt": "...", "paragraphs": ["...", "..."], "quote": "..."}`

export const AI_SEO_SYSTEM = (lang) =>
`You are an SEO specialist for a web development agency. Based on this blog content, generate:
1. A compelling meta excerpt (max 160 chars, in ${lang})
2. 3-5 relevant tags (use only from: Agency, Business, Marketing, Modern, Creative, Digital, Design)
Reply with ONLY valid JSON (no markdown): {"excerpt": "...", "tags": ["Tag1", "Tag2", "Tag3"]}`
