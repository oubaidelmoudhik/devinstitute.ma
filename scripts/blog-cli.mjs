#!/usr/bin/env node

/**
 * blog-cli.mjs — Full CRUD CLI for devagency.ma blog posts
 *
 * Usage:
 *   node scripts/blog-cli.mjs
 *   npm run blog
 *
 * Menu:
 *   1. List all articles
 *   2. View article details
 *   3. Add new article
 *   4. Edit article
 *   5. Delete article
 *   6. Publish to GitHub
 *   7. Exit
 *
 * Requires (in .env.local):
 *   OPENAI_API_KEY      — for AI translation & SEO
 *   UNSPLASH_ACCESS_KEY — optional, for auto feature images
 */

import * as readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"

// ── Paths ────────────────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const BLOG_DATA_PATH   = path.join(ROOT, "data", "blog-data.ts")
const I18N_EN_PATH     = path.join(ROOT, "i18n", "en", "blog.json")
const I18N_FR_PATH     = path.join(ROOT, "i18n", "fr", "blog.json")
const BG_IMG_DIR       = path.join(ROOT, "public", "assets", "img", "bg-img")
const ENV_PATH         = path.join(ROOT, ".env.local")

// ── Load .env.local ──────────────────────────────────────────────────────────
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

// ── Terminal helpers ─────────────────────────────────────────────────────────
let rl = readline.createInterface({ input, output })

function print(str = "") { console.log(str) }

async function ask(question, fallback = "") {
  const answer = await rl.question(`${question} `)
  return answer.trim() || fallback
}

async function readMultiline(instruction) {
  print(`\n${instruction}`)
  print("(Paste your content, then type END on a new line and press Enter.)\n")
  const lines = []
  for await (const line of rl) {
    if (line.trim() === "END") break
    lines.push(line)
  }
  rl.close()
  rl = readline.createInterface({ input, output })
  return lines.join("\n")
}

function sh(cmd, opts = {}) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf-8", stdio: "pipe", ...opts }).trim()
}

// ── Colours ──────────────────────────────────────────────────────────────────
const C = {
  reset:  "\x1b[0m", green: "\x1b[32m", cyan: "\x1b[36m",
  yellow: "\x1b[33m", red: "\x1b[31m", dim: "\x1b[2m", bold: "\x1b[1m",
}

// ── Language detection ───────────────────────────────────────────────────────
function detectLanguage(text) {
  const frWords = /\b(le|la|les|des|du|au|aux|ce|ces|pour|dans|sur|avec|est|sont|nous|vous|ils|elles|une|que|qui|pas|plus|très|par|comme|mais|fait|faire|entre|aussi|donc|car|sans|être|avoir|faire|leur|dont|où|d'un|d'une)\b/gi
  let score = 0, m
  while ((m = frWords.exec(text)) !== null) score++
  const accents = (text.match(/[éèêëàâùûüôöîïçœæ]/gi) || []).length
  const words = text.split(/\s+/).length
  return (score / Math.max(words, 1) > 0.035) || accents > words * 0.015 ? "fr" : "en"
}

function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80)
}

// ── Date formatting ──────────────────────────────────────────────────────────
function formatDate(locale) {
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

// ── Format from ISO date string ───────────────────────────────────────────────
function formatDateFromIso(isoString, locale) {
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

// ═══════════════════════════════════════════════════════════════════════════════
//  DATA LAYER — Read & write blog-data.ts and i18n files
// ═══════════════════════════════════════════════════════════════════════════════

function readRawPosts() {
  const src = fs.readFileSync(BLOG_DATA_PATH, "utf-8")

  // Find the BLOG_POSTS array boundaries
  const startMarker = "export const BLOG_POSTS: BlogPost[] = ["
  const startIdx = src.indexOf(startMarker)
  if (startIdx === -1) throw new Error("Could not find BLOG_POSTS array")
  const contentStart = startIdx + startMarker.length

  // Find the closing ] that's right before SIDEBAR_RECENT_POSTS
  const sidebarIdx = src.indexOf("\nexport const SIDEBAR_RECENT_POSTS")
  if (sidebarIdx === -1) throw new Error("Could not find SIDEBAR_RECENT_POSTS")
  const arrayEnd = src.lastIndexOf("]", sidebarIdx)
  const arrayContent = src.slice(contentStart, arrayEnd)

  // Split into individual post blocks by matching top-level braces
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

function parsePostBlock(block) {
  // Split into lines for simple line-by-line parsing
  const lines = block.split("\n").map(l => l.trim())

  // Find values for known keys
  function findValue(key) {
    const line = lines.find(l => l.startsWith(key + ":"))
    if (!line) return undefined
    return line.slice(key.length + 1).trim()
  }

  // String value (quoted, with optional trailing comma)
  function findStr(key) {
    const v = findValue(key)
    if (!v) return undefined
    return v.replace(/^"(.*)"(,)?$/, "$1")
  }

  // Array value: ["a", "b", ...]
  function findArr(key) {
    const idx = lines.findIndex(l => l.startsWith(key + ":"))
    if (idx === -1) return undefined

    // Check if array starts on same line
    let firstLine = lines[idx].slice(key.length + 1).trim()
    if (firstLine.startsWith("[")) {
      // Might be inline ["a", "b"] or multi-line
      const rest = lines.slice(idx).join(" ")
      const match = rest.match(/\[([\s\S]*?)\]/)
      if (!match) return undefined
      return match[1].split(",").map(s => s.trim().replace(/^"(.*)"$/, "$1")).filter(Boolean)
    }
    // Single value
    return firstLine ? [firstLine.replace(/^"(.*)"$/, "$1")] : []
  }

  // Object value: { key: "val", ... }
  function findObj(key) {
    const idx = lines.findIndex(l => l.startsWith(key + ":"))
    if (idx === -1) return undefined

    // Collect all lines until we hit the closing }
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

function generatePostBlock(post) {
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

function writeAllPosts(posts) {
  let src = fs.readFileSync(BLOG_DATA_PATH, "utf-8")

  // Generate new array content
  const newArray = posts.map(p => generatePostBlock(p)).join(",\n\n")

  // Replace BLOG_POSTS array content (between [ and ] before SIDEBAR_RECENT_POSTS)
  const startMarker = "export const BLOG_POSTS: BlogPost[] = ["
  const startIdx = src.indexOf(startMarker)
  if (startIdx === -1) throw new Error("Could not find BLOG_POSTS")
  const contentStart = startIdx + startMarker.length

  const sidebarIdx = src.indexOf("\nexport const SIDEBAR_RECENT_POSTS")
  if (sidebarIdx === -1) throw new Error("Could not find SIDEBAR")
  const arrayEnd = src.lastIndexOf("]", sidebarIdx)

  src = src.slice(0, contentStart) + "\n" + newArray + ",\n" + src.slice(arrayEnd)

  // Update sidebar (match up to the end of line which is the closing bracket)
  const sidebarEntries = posts.slice(0, 3).map((_, i) => `BLOG_POSTS[${i}]`).join(", ")
  const sidebarMatch = src.match(/^export const SIDEBAR_RECENT_POSTS = .*/m)
  if (sidebarMatch) {
    src = src.replace(sidebarMatch[0], `export const SIDEBAR_RECENT_POSTS = [${sidebarEntries}]`)
  }

  fs.writeFileSync(BLOG_DATA_PATH, src)
}

function getI18nData(postId) {
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

function setI18nData(postId, enData, frData) {
  const prefix = `blog_post_${postId}`

  function update(langData, data, langFile) {
    // Remove existing entries
    Object.keys(langData).filter(k => k.startsWith(prefix)).forEach(k => delete langData[k])

    // Set new entries
    langData[`${prefix}_title`] = data.title
    langData[`${prefix}_date`] = data.date
    langData[`${prefix}_excerpt`] = data.excerpt
    data.paragraphs.forEach((p, i) => { langData[`${prefix}_p_${i + 1}`] = p })
    if (data.quote) langData[`${prefix}_quote`] = data.quote
  }

  const en = JSON.parse(fs.readFileSync(I18N_EN_PATH, "utf-8"))
  update(en, enData, I18N_EN_PATH)
  fs.writeFileSync(I18N_EN_PATH, JSON.stringify(en, null, 2) + "\n")

  const fr = JSON.parse(fs.readFileSync(I18N_FR_PATH, "utf-8"))
  update(fr, frData, I18N_FR_PATH)
  fs.writeFileSync(I18N_FR_PATH, JSON.stringify(fr, null, 2) + "\n")
}

function deleteI18nData(postId) {
  const prefix = `blog_post_${postId}`

  ;[I18N_EN_PATH, I18N_FR_PATH].forEach(filePath => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    Object.keys(data).filter(k => k.startsWith(prefix)).forEach(k => delete data[k])
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n")
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
//  AI — OpenAI translation & SEO
// ═══════════════════════════════════════════════════════════════════════════════

async function callOpenAI(systemPrompt, userMessage) {
  if (!process.env.OPENAI_API_KEY) return null

  const body = {
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userMessage }],
    max_tokens: 8192,
  }

  const tmpFile = path.join(ROOT, ".tmp", `ai-${Date.now()}.json`)
  fs.mkdirSync(path.dirname(tmpFile), { recursive: true })
  fs.writeFileSync(tmpFile, JSON.stringify(body))

  try {
    const cmd = `curl -s https://api.openai.com/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer ${process.env.OPENAI_API_KEY}" -d "@${tmpFile}" --max-time 60`
    const raw = execSync(cmd, { encoding: "utf-8", stdio: "pipe", shell: true, cwd: ROOT })
    const data = JSON.parse(raw)
    if (data.error) { print(`  ${C.red}OpenAI error: ${data.error.message}${C.reset}`); return null }
    return data.choices?.[0]?.message?.content || null
  } catch (e) {
    return null
  } finally {
    try { fs.unlinkSync(tmpFile) } catch {}
  }
}

const AI_TRANSLATE_SYSTEM = (from, to) =>
`You are a professional translator. Translate the following blog post from ${from} to ${to}.
Rules:
- Keep the same meaning and tone
- Translate the title naturally
- Reply with ONLY the translated text in this format:
Title: <translated title>
Excerpt: <translated excerpt>
[P1] <paragraph 1>
[P2] <paragraph 2>
...
[QUOTE] <translated quote if present>`

const AI_SEO_SYSTEM = (lang) =>
`You are an SEO specialist for a web development agency. Based on this blog content, generate:
1. A compelling meta excerpt (max 160 chars, in ${lang})
2. 3-5 relevant tags (use only from: Agency, Business, Marketing, Modern, Creative, Digital, Design)
Reply with ONLY valid JSON (no markdown): {"excerpt": "...", "tags": ["Tag1", "Tag2", "Tag3"]}`

// ═══════════════════════════════════════════════════════════════════════════════
//  CRUD OPERATIONS
// ═══════════════════════════════════════════════════════════════════════════════

// ── LIST ─────────────────────────────────────────────────────────────────────

function cmdList() {
  const posts = readRawPosts()
  if (posts.length === 0) {
    print(`\n  ${C.yellow}No blog posts found.${C.reset}`)
    return
  }

  print(`\n${C.bold}${C.cyan}  ID  │ Title (EN)                                          │ Category        │ Date            │ Tags${C.reset}`)
  print(`  ${C.dim}─────┼──────────────────────────────────────────────────────┼─────────────────┼─────────────────┼${C.reset}`)

  posts.forEach(p => {
    const i18n = getI18nData(p.id)
    const enTitle = (i18n.en.title || p.title).slice(0, 50).padEnd(50)
    const cat = (p.category || "").padEnd(15)
    const date = (i18n.en.date || "").padEnd(15)
    const tags = (p.tags || []).slice(0, 3).join(", ")
    const id = String(p.id).padStart(3)
    print(`  ${C.green}${id}${C.reset} │ ${enTitle} │ ${cat} │ ${date} │ ${tags}`)
  })
  print(`  ${C.dim}─── ${posts.length} article(s) ───${C.reset}\n`)
  return posts
}

// ── VIEW ─────────────────────────────────────────────────────────────────────

async function cmdView() {
  const posts = readRawPosts()
  if (posts.length === 0) { print(`\n  ${C.yellow}No posts to view.${C.reset}`); return }

  const idStr = await ask(`\n  ${C.cyan}?${C.reset} Enter article ID or slug:`)
  if (!idStr) return

  const post = posts.find(p => p.id === parseInt(idStr) || p.slug === idStr)
  if (!post) { print(`  ${C.red}✗ Article not found${C.reset}`); return }

  const i18n = getI18nData(post.id)

  print(`\n${C.bold}${C.cyan}═══════════════════════════════════════════════════════════${C.reset}`)
  print(`  ${C.bold}ID:${C.reset}       ${post.id}`)
  print(`  ${C.bold}Slug:${C.reset}     ${post.slug}`)
  print(`  ${C.bold}Category:${C.reset} ${post.category}`)
  print(`  ${C.bold}Image:${C.reset}    ${post.image}`)
  print(`  ${C.bold}Tags:${C.reset}     ${(post.tags || []).join(", ")}`)
  print(`  ${C.bold}Author:${C.reset}   ${post.author}`)
  print(`${C.cyan}─────────────────────────────────────────────────────────────${C.reset}`)
  print(`  ${C.bold}EN Title:${C.reset}    ${i18n.en.title}`)
  print(`  ${C.bold}EN Date:${C.reset}     ${i18n.en.date}`)
  print(`  ${C.bold}EN Excerpt:${C.reset}  ${i18n.en.excerpt}`)
  i18n.en.paragraphs.forEach((p, i) => print(`  ${C.dim}EN P${i + 1}:${C.reset} ${p}`))
  if (i18n.en.quote) print(`  ${C.bold}EN Quote:${C.reset}   ${i18n.en.quote}`)
  print(`${C.cyan}─────────────────────────────────────────────────────────────${C.reset}`)
  print(`  ${C.bold}FR Title:${C.reset}    ${i18n.fr.title}`)
  print(`  ${C.bold}FR Date:${C.reset}     ${i18n.fr.date}`)
  print(`  ${C.bold}FR Excerpt:${C.reset}  ${i18n.fr.excerpt}`)
  i18n.fr.paragraphs.forEach((p, i) => print(`  ${C.dim}FR P${i + 1}:${C.reset} ${p}`))
  if (i18n.fr.quote) print(`  ${C.bold}FR Quote:${C.reset}   ${i18n.fr.quote}`)
  print(`${C.cyan}═══════════════════════════════════════════════════════════${C.reset}\n`)
}

// ── ADD ──────────────────────────────────────────────────────────────────────

async function cmdAdd() {
  print(`\n${C.bold}${C.cyan}─── Add New Article ───${C.reset}`)

  // 1. Read markdown
  const rawMd = await readMultiline(`Paste your Markdown blog post (English or French)`)
  if (!rawMd || rawMd.trim().length < 10) { print(`\n${C.red}✗ No content${C.reset}`); return }

  // 2. Parse
  const detected = detectLanguage(rawMd)
  const isEn = detected === "en"
  print(`\n  ${C.dim}Language:${C.reset} ${C.bold}${isEn ? "English" : "French"}${C.reset}`)

  const md = parseMd(rawMd)
  const posts = readRawPosts()
  const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1
  md.slug = slugify(md.title)
  md.id = nextId

  print(`  Title: ${C.bold}${md.title}${C.reset}`)
  print(`  Paragraphs: ${md.paragraphs.length}`)
  if (md.quote) print(`  Quote: ${C.dim}yes${C.reset}`)
  if (md.publishDate) print(`  Publish date: ${C.dim}${md.publishDate}${C.reset}`)
  if (md.readingTimeMinutes) print(`  Reading time: ${C.dim}${md.readingTimeMinutes} min${C.reset}`)
  if (md.serviceAlignment) print(`  Service: ${C.dim}${md.serviceAlignment}${C.reset}`)

  // 3. Translate + SEO via OpenAI
  const srcLang = isEn ? "en" : "fr"
  const tgtLang = isEn ? "fr" : "en"

  const formattedSrcDate = formatDateFromIso(md.publishDate, srcLang)
  const formattedTgtDate = formatDateFromIso(md.publishDate, tgtLang)

  const srcTexts = {
    title: md.title, date: formattedSrcDate, excerpt: md.excerpt,
    paragraphs: md.paragraphs, quote: md.quote || "",
  }

  let tgtTexts = null

  if (process.env.OPENAI_API_KEY) {
    print(`\n  ${C.dim}Translating via OpenAI...${C.reset}`)
    const toTranslate =
      `Title: ${md.title}\nExcerpt: ${md.excerpt}\n` +
      md.paragraphs.map((p, i) => `[P${i + 1}] ${p}`).join("\n") +
      (md.quote ? `\n[QUOTE] ${md.quote}` : "")

    const result = await callOpenAI(
      AI_TRANSLATE_SYSTEM(srcLang === "en" ? "English" : "French", tgtLang === "en" ? "English" : "French"),
      toTranslate
    )

    if (result) {
      const lines = result.split("\n")
      let tTitle = "", tExcerpt = "", tQuote = ""
      const tParas = []
      for (const l of lines) {
        if (l.startsWith("Title: ")) tTitle = l.slice(7)
        else if (l.startsWith("Excerpt: ")) tExcerpt = l.slice(9)
        else if (l.startsWith("[QUOTE] ")) tQuote = l.slice(8)
        else if (l.startsWith("[P") && l.includes("] ")) tParas.push(l.replace(/\[P\d+\]\s*/, ""))
      }
      if (tTitle) {
        if (tParas.length !== md.paragraphs.length) {
          print(`  ${C.yellow}⚠ Paragraph count mismatch (AI: ${tParas.length}, expected: ${md.paragraphs.length}), adjusting...${C.reset}`)
        }
        tgtTexts = { title: tTitle, date: formattedTgtDate, excerpt: tExcerpt || md.excerpt, paragraphs: tParas, quote: tQuote || "" }
        md.paragraphs = tParas
        print(`  ${C.green}✓ Translated${C.reset}`)
      } else {
        print(`  ${C.yellow}⚠ AI response unexpected, enter manually${C.reset}`)
      }
    } else {
      print(`  ${C.yellow}⚠ AI failed, enter manually${C.reset}`)
    }
  }

  // Manual fallback
  if (!tgtTexts) {
    const label = tgtLang === "en" ? "English" : "French"
    print("")
    const tTitle = await ask(`  ${C.cyan}?${C.reset} Title (${label}):`)
    if (!tTitle) { print(`  ${C.red}✗ Required${C.reset}`); return }
    const tExcerpt = await ask(`  ${C.cyan}?${C.reset} Excerpt (${label}):`, md.excerpt)
    const tParas = []
    for (let i = 0; i < md.paragraphs.length; i++)
      tParas.push(await ask(`  ${C.cyan}?${C.reset} Paragraph ${i + 1} (${label}):`, md.paragraphs[i]))
    let tQuote = ""
    if (md.quote) tQuote = await ask(`  ${C.cyan}?${C.reset} Quote (${label}):`, md.quote)
    tgtTexts = { title: tTitle, date: formattedTgtDate, excerpt: tExcerpt, paragraphs: tParas, quote: tQuote }
  }

  // AI SEO
  if (process.env.OPENAI_API_KEY) {
    print(`\n  ${C.dim}Generating SEO metadata...${C.reset}`)
    const fullContent = `${md.title}\n\n${md.paragraphs.join("\n\n")}`
    const seoResult = await callOpenAI(AI_SEO_SYSTEM(srcLang === "en" ? "English" : "French"), fullContent)
    if (seoResult) {
      try {
        const seo = JSON.parse(seoResult.replace(/```json?\s*/g, "").replace(/```\s*/g, "").trim())
        if (seo.excerpt) srcTexts.excerpt = seo.excerpt
        if (seo.tags) md.tags = [...new Set([...seo.tags, ...md.tags])].slice(0, 5)
        print(`  ${C.green}✓ SEO generated${C.reset}`)
      } catch {}
    }
  }

  // 4. Fetch image
  print(`\n  ${C.dim}Fetching feature image...${C.reset}`)
  const imagePath = await fetchImage(`${md.category} ${md.title}`)

  // 5. Write data files
  const enTexts = isEn ? srcTexts : tgtTexts
  const frTexts = isEn ? tgtTexts : srcTexts

  // Determine sortDate from YAML publishDate or today
  const sortDate = md.publishDate || new Date().toISOString().slice(0, 10)

  // Add to blog-data.ts
  posts.push({
    id: md.id, title: `blog_post_${md.id}_title`, slug: md.slug,
    date: `blog_post_${md.id}_date`, sortDate,
    category: md.category,
    image: imagePath, excerpt: `blog_post_${md.id}_excerpt`,
    content: md.paragraphs.map((_, i) => `blog_post_${md.id}_p_${i + 1}`),
    quote: md.quote ? { text: `blog_post_${md.id}_quote` } : undefined,
    tags: md.tags, author: "Dev Agency",
    readingTimeMinutes: md.readingTimeMinutes,
    serviceAlignment: md.serviceAlignment || undefined,
  })
  writeAllPosts(posts)

  // Write i18n
  setI18nData(md.id, enTexts, frTexts)

  print(`\n  ${C.green}✓ Article added: ${C.bold}${md.title}${C.reset}`)
  print(`  ${C.dim}  ID: ${md.id} | Slug: ${md.slug}${C.reset}`)

  // 6. Git
  const doCommit = await ask(`\n  ${C.cyan}?${C.reset} Commit & push this article? (y/N):`, "n")
  if (doCommit.toLowerCase() === "y") {
    await gitStageCommitPush(`feat(blog): add "${md.title}"`,
      [imagePath].filter(p => p && !p.includes("46.webp")))
  }
}

/**
 * Simple YAML frontmatter parser for the limited subset we use.
 * Returns { fm: { key: value, tags: [...] }, body: string }
 */
function parseFrontmatter(md) {
  const match = md.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return { fm: null, body: md.trim() }

  const raw = match[1]
  const body = md.slice(match[0].length).trim()
  const fm = {}

  for (const line of raw.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue

    // Array value: tags: ["a", "b"]
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

    // String value: key: "value" or key: value
    const colonIdx = trimmed.indexOf(":")
    if (colonIdx === -1) continue
    const key = trimmed.slice(0, colonIdx).trim()
    let val = trimmed.slice(colonIdx + 1).trim()
    // Strip surrounding quotes
    val = val.replace(/^["']|["']$/g, "")
    fm[key] = val
  }

  return { fm, body }
}

/**
 * Extract reading time minutes from strings like "10 min read" or "5 min"
 */
function parseReadingTimeMinutes(val) {
  if (!val) return 5
  const m = String(val).match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 5
}

function parseMd(md) {
  // 1. Parse YAML frontmatter
  const { fm, body } = parseFrontmatter(md)

  // 2. Parse body (headings + paragraphs)
  const lines = body.split("\n")
  const titleLine = lines.find(l => /^#{1,3}\s+/.test(l))
  const bodyTitle = titleLine ? titleLine.replace(/^#+\s+/, "").trim() : null
  const cl = lines.filter(l => !/^#{1,3}\s+/.test(l))
  let raw = cl.join("\n").split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

  // Merge consecutive list items into single paragraphs
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

  // 3. Resolve final values: YAML overrides heuristics
  const title = fm?.title || bodyTitle || "New Blog Post"

  const excerpt = fm?.description
    ? fm.description.replace(/<[^>]*>/g, "").slice(0, 200).replace(/\s+\S*$/, "") + "..."
    : (paras[0] ? paras[0].replace(/<[^>]*>/g, "").slice(0, 180).replace(/\s+\S*$/, "") + "..." : title)

  // Category: use serviceAlignment if present, else keyword detect
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

  // Tags: YAML tags take priority, merged with detected
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

  // Reading time & publish date from YAML
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

async function fetchImage(query) {
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
  const manual = await ask(`  ${C.cyan}?${C.reset} Paste image URL (or empty for placeholder):`)
  if (manual) {
    try {
      execSync(`curl -sL "${manual}" -o "${dest}" --max-time 15`, { stdio: "pipe" })
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) return `/assets/img/bg-img/${next}.webp`
    } catch { print(`  ${C.red}✗ Download failed${C.reset}`) }
  }
  return "/assets/img/bg-img/46.webp"
}

// ── EDIT ─────────────────────────────────────────────────────────────────────

async function cmdEdit() {
  const posts = readRawPosts()
  if (posts.length === 0) { print(`\n  ${C.yellow}No articles to edit.${C.reset}`); return }

  cmdList()

  const idStr = await ask(`\n  ${C.cyan}?${C.reset} Enter article ID to edit:`)
  const idx = posts.findIndex(p => p.id === parseInt(idStr))
  if (idx === -1) { print(`  ${C.red}✗ Not found${C.reset}`); return }

  const post = posts[idx]
  const i18n = getI18nData(post.id)

  print(`\n  ${C.bold}Editing:${C.reset} ${i18n.en.title} / ${i18n.fr.title}\n`)

  const fields = [
    { key: "title_en", label: "Title (EN)" },
    { key: "title_fr", label: "Title (FR)" },
    { key: "excerpt_en", label: "Excerpt (EN)" },
    { key: "excerpt_fr", label: "Excerpt (FR)" },
    { key: "category", label: "Category" },
    { key: "tags", label: "Tags (comma-separated)" },
    { key: "slug", label: "Slug" },
    { key: "image", label: "Image path" },
  ]

  // Paragraph editing
  const maxParas = Math.max(i18n.en.paragraphs.length, i18n.fr.paragraphs.length)

  // Edit metadata fields
  for (const f of fields) {
    const current = f.key === "title_en" ? i18n.en.title
      : f.key === "title_fr" ? i18n.fr.title
      : f.key === "excerpt_en" ? i18n.en.excerpt
      : f.key === "excerpt_fr" ? i18n.fr.excerpt
      : f.key === "category" ? post.category
      : f.key === "tags" ? (post.tags || []).join(", ")
      : f.key === "slug" ? post.slug
      : post.image

    const val = await ask(`  ${C.cyan}?${C.reset} ${f.label} [${C.dim}${current}${C.reset}]:`, current)

    // Apply
    if (f.key === "title_en") i18n.en.title = val
    else if (f.key === "title_fr") i18n.fr.title = val
    else if (f.key === "excerpt_en") i18n.en.excerpt = val
    else if (f.key === "excerpt_fr") i18n.fr.excerpt = val
    else if (f.key === "category") post.category = val
    else if (f.key === "tags") post.tags = val.split(",").map(s => s.trim()).filter(Boolean)
    else if (f.key === "slug") post.slug = slugify(val)
    else if (f.key === "image") post.image = val
  }

  // Paragraph editing
  print(`\n  ${C.dim}Paragraphs (EN):${C.reset}`)
  const enParas = []
  for (let i = 0; i < maxParas; i++) {
    const current = i18n.en.paragraphs[i] || ""
    const val = await ask(`  ${C.cyan}?${C.reset} EN P${i + 1} [${C.dim}${current.slice(0, 40)}...${C.reset}]:`, current)
    if (val) enParas.push(val)
  }

  print(`\n  ${C.dim}Paragraphs (FR):${C.reset}`)
  const frParas = []
  for (let i = 0; i < maxParas; i++) {
    const current = i18n.fr.paragraphs[i] || ""
    const val = await ask(`  ${C.cyan}?${C.reset} FR P${i + 1} [${C.dim}${current.slice(0, 40)}...${C.reset}]:`, current)
    if (val) frParas.push(val)
  }

  // Quote editing
  if (post.quote || await ask(`  ${C.cyan}?${C.reset} Add a quote? (y/N):`, "n") === "y") {
    const enQuote = await ask(`  ${C.cyan}?${C.reset} Quote (EN) [${C.dim}${i18n.en.quote || ""}${C.reset}]:`, i18n.en.quote || "")
    const frQuote = await ask(`  ${C.cyan}?${C.reset} Quote (FR) [${C.dim}${i18n.fr.quote || ""}${C.reset}]:`, i18n.fr.quote || "")
    if (enQuote) { post.quote = { text: `blog_post_${post.id}_quote` }; i18n.en.quote = enQuote; i18n.fr.quote = frQuote }
  }

  // Update content array length
  post.content = enParas.map((_, i) => `blog_post_${post.id}_p_${i + 1}`)

  // Write changes
  posts[idx] = post
  writeAllPosts(posts)
  setI18nData(post.id, i18n.en, i18n.fr)

  print(`\n  ${C.green}✓ Article updated: ${C.bold}${i18n.en.title}${C.reset}`)
}

// ── DELETE ───────────────────────────────────────────────────────────────────

async function cmdDelete() {
  const posts = readRawPosts()
  if (posts.length === 0) { print(`\n  ${C.yellow}No articles to delete.${C.reset}`); return }

  cmdList()

  const idStr = await ask(`\n  ${C.cyan}?${C.reset} Enter article ID to delete:`)
  const idx = posts.findIndex(p => p.id === parseInt(idStr))
  if (idx === -1) { print(`  ${C.red}✗ Not found${C.reset}`); return }

  const post = posts[idx]
  const i18n = getI18nData(post.id)

  print(`\n  ${C.red}${C.bold}DELETE:${C.reset} ${i18n.en.title} / ${i18n.fr.title}`)
  const confirm = await ask(`  ${C.red}?${C.reset} Are you sure? Type ${C.bold}DELETE${C.reset} to confirm:`)
  if (confirm !== "DELETE") { print(`  ${C.dim}Cancelled${C.reset}`); return }

  // Remove post data
  posts.splice(idx, 1)
  writeAllPosts(posts)

  // Remove i18n entries
  deleteI18nData(post.id)

  // Remove image if it's a dedicated one (not the shared placeholder)
  if (post.image && !post.image.includes("46.webp") && !post.image.includes("44.webp") && !post.image.includes("45.webp")) {
    const imgPath = path.join(ROOT, "public", post.image)
    if (fs.existsSync(imgPath)) {
      try { fs.unlinkSync(imgPath); print(`  ${C.dim}Removed image: ${post.image}${C.reset}`) } catch {}
    }
  }

  print(`  ${C.green}✓ Article deleted${C.reset}`)
}

// ── PUBLISH ──────────────────────────────────────────────────────────────────

async function gitStageCommitPush(message, extraImages = []) {
  try { sh("git rev-parse --git-dir", { stdio: "pipe" }) } catch { print(`  ${C.yellow}⚠ Not a git repo${C.reset}`); return }

  sh(`git add "data/blog-data.ts" "i18n/en/blog.json" "i18n/fr/blog.json"`)
  for (const img of extraImages) {
    const full = path.join(ROOT, "public", img)
    if (fs.existsSync(full)) sh(`git add "public${img}"`)
  }

  const staged = sh("git diff --cached --name-only", { stdio: "pipe" })
  if (!staged) { print(`  ${C.yellow}⚠ No changes staged${C.reset}`); return }

  sh(`git commit -m "${message.replace(/"/g, '\\"')}"`)
  print(`  ${C.green}✓ Committed: ${message}${C.reset}`)

  const branch = sh("git rev-parse --abbrev-ref HEAD", { stdio: "pipe" })
  const answer = await ask(`\n  ${C.cyan}?${C.reset} Push to GitHub (${branch})? (Y/n):`, "y")
  if (answer.toLowerCase() === "y" || answer === "") {
    try { sh(`git push origin ${branch}`); print(`  ${C.green}✓ Pushed! Site is live.${C.reset}`) }
    catch (e) { print(`  ${C.red}✗ Push failed: ${e.message}${C.reset}`) }
  } else {
    print(`  ${C.dim}Run 'git push origin ${branch}' to deploy.${C.reset}`)
  }
}

async function cmdPublish() {
  const staged = sh("git status --short", { stdio: "pipe" })
  if (!staged) { print(`\n  ${C.yellow}No changes to publish${C.reset}`); return }

  print(`\n${C.dim}Staged changes:${C.reset}\n${staged.split("\n").map(l => `  ${l}`).join("\n")}`)

  const msg = await ask(`\n  ${C.cyan}?${C.reset} Commit message:`, "feat(blog): update articles")
  await gitStageCommitPush(msg)
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MENU
// ═══════════════════════════════════════════════════════════════════════════════

function showMenu() {
  const hasAI = process.env.OPENAI_API_KEY ? `${C.green}●${C.reset}` : `${C.red}○${C.reset}`
  const hasImg = process.env.UNSPLASH_ACCESS_KEY ? `${C.green}●${C.reset}` : `${C.yellow}○${C.reset}`

  print(`\n${C.cyan}${C.bold}╔══════════════════════════════════════════════╗${C.reset}`)
  print(`${C.cyan}${C.bold}║       📝 Blog CLI — devagency.ma             ║${C.reset}`)
  print(`${C.cyan}${C.bold}╚══════════════════════════════════════════════╝${C.reset}`)
  print(`  ${C.dim}OpenAI${C.reset} ${hasAI}  ${C.dim}Unsplash${C.reset} ${hasImg}`)
  print("")
  print(`  ${C.bold}1.${C.reset} ${C.cyan}📋${C.reset} List all articles`)
  print(`  ${C.bold}2.${C.reset} ${C.cyan}👁${C.reset}  View article details`)
  print(`  ${C.bold}3.${C.reset} ${C.cyan}➕${C.reset} Add new article`)
  print(`  ${C.bold}4.${C.reset} ${C.cyan}✏️${C.reset}  Edit article`)
  print(`  ${C.bold}5.${C.reset} ${C.cyan}🗑${C.reset}  Delete article`)
  print(`  ${C.bold}6.${C.reset} ${C.cyan}🚀${C.reset} Publish to GitHub`)
  print(`  ${C.bold}7.${C.reset} ${C.red}✕${C.reset}  Exit`)
  print("")
}

async function main() {
  while (true) {
    showMenu()
    const choice = await ask(`  ${C.cyan}?${C.reset} Choose [1-7]:`)

    switch (choice) {
      case "1": cmdList(); break
      case "2": await cmdView(); break
      case "3": await cmdAdd(); break
      case "4": await cmdEdit(); break
      case "5": await cmdDelete(); break
      case "6": await cmdPublish(); break
      case "7": print(`\n  ${C.green}Goodbye!${C.reset}\n`); rl.close(); return
      default: print(`  ${C.yellow}Invalid choice${C.reset}`)
    }

    if (choice !== "7") {
      await ask(`  ${C.dim}Press Enter to continue...${C.reset}`)
    }
  }
}

main().catch(err => { console.error(`\n${C.red}✗ Error:${C.reset} ${err.message}`); process.exit(1) })
