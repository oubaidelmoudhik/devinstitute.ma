#!/usr/bin/env node

/**
 * add-blog-post.mjs — Interactive blog post publisher for devagency.ma
 *
 * Usage:
 *   node scripts/add-blog-post.mjs
 *   npm run add-post
 *
 * Requires (in .env.local):
 *   OPENAI_API_KEY      — for AI translation & SEO
 *   UNSPLASH_ACCESS_KEY — for auto feature image (optional, falls back to manual)
 *
 * Flow:
 *   1. Prompts you to paste a Markdown blog post (EN or FR)
 *   2. Detects language, parses title & paragraphs
 *   3. Uses OpenAI to translate to the other language
 *   4. Generates SEO metadata (excerpt, tags)
 *   5. Fetches a relevant feature image (Unsplash / manual URL)
 *   6. Writes data/blog-data.ts + i18n/en/blog.json + i18n/fr/blog.json
 *   7. Stages changes, commits, prompts to push to GitHub
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
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

// ── Terminal helpers ─────────────────────────────────────────────────────────

let rl = readline.createInterface({ input, output })

function print(str = "") {
  console.log(str)
}

async function readMultiline(instruction) {
  print(`\n${instruction}`)
  print("(Paste your blog post below, then type END on a new line and press Enter.)\n")

  const lines = []
  for await (const line of rl) {
    if (line.trim() === "END") break
    lines.push(line)
  }
  rl.close()
  rl = readline.createInterface({ input, output })
  return lines.join("\n")
}

async function ask(question, fallback = "") {
  const answer = await rl.question(`${question} `)
  return answer.trim() || fallback
}

function sh(cmd, opts = {}) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf-8", stdio: "pipe", ...opts }).trim()
}

// ── Colours ──────────────────────────────────────────────────────────────────

const C = {
  reset:  "\x1b[0m",
  green:  "\x1b[32m",
  cyan:   "\x1b[36m",
  yellow: "\x1b[33m",
  red:    "\x1b[31m",
  dim:    "\x1b[2m",
  bold:   "\x1b[1m",
}

// ── Language detection ───────────────────────────────────────────────────────

function detectLanguage(text) {
  const frWords = /\b(le|la|les|des|du|au|aux|ce|ces|pour|dans|sur|avec|est|sont|nous|vous|ils|elles|une|que|qui|pas|plus|très|par|comme|mais|fait|faire|entre|aussi|donc|car|sans|être|avoir|faire|leur|dont|où|d'un|d'une)\b/gi
  let score = 0
  let m
  while ((m = frWords.exec(text)) !== null) score++
  const accents = (text.match(/[éèêëàâùûüôöîïçœæ]/gi) || []).length
  const words = text.split(/\s+/).length
  return (score / Math.max(words, 1) > 0.035) || accents > words * 0.015 ? "fr" : "en"
}

// ── Markdown parser ──────────────────────────────────────────────────────────

function parseMarkdown(md) {
  // Strip YAML frontmatter (---\n...\n---) before parsing
  const clean = md.replace(/^---[\s\S]*?^---\n*/m, '').trim()
  const lines = clean.split("\n")

  const titleLine = lines.find((l) => /^#{1,3}\s+/.test(l))
  const title = titleLine ? titleLine.replace(/^#+\s+/, "").trim() : "New Blog Post"

  const contentLines = lines.filter((l) => !/^#{1,3}\s+/.test(l))
  let rawParas = contentLines.join("\n").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

  // Merge consecutive list items into single paragraphs
  const merged = []
  for (const p of rawParas) {
    const isListItem = /^[-*\d]+\.?\s/.test(p)
    if (isListItem && merged.length > 0 && /^[-*\d]+\.?\s/.test(merged[merged.length - 1])) {
      merged[merged.length - 1] += "\n" + p
    } else {
      merged.push(p)
    }
  }
  rawParas = merged

  const quotes = rawParas.filter((p) => p.startsWith(">"))
  const paras = rawParas.filter((p) => !p.startsWith(">") && p.length > 20)
  const quote = quotes.length > 0 ? quotes[0].replace(/^>\s?/, "").trim() : null

  const excerpt = paras[0]
    ? paras[0].replace(/<[^>]*>/g, "").slice(0, 180).replace(/\s+\S*$/, "") + "..."
    : title

  const lower = md.toLowerCase()
  let category = "Development"
  if (/\b(design|ui|ux|graphic|visual|creative)\b/.test(lower)) category = "UI/UX Design"
  else if (/\b(marketing|seo|social.?media|content|brand)\b/.test(lower)) category = "Marketing"
  else if (/\b(business|startup|entrepreneur|growth|strategy)\b/.test(lower)) category = "Business"
  else if (/\b(agency|client|service|consulting)\b/.test(lower)) category = "Agency"

  const tagMap = {
    Agency: ["agency", "creative", "brand"],
    Business: ["business", "growth", "strategy", "startup"],
    Marketing: ["marketing", "seo", "digital", "social"],
    Modern: ["modern", "trend", "innovation", "future"],
    Design: ["design", "ui", "ux", "graphic", "visual"],
    Digital: ["digital", "tech", "technology", "web"],
  }
  const tags = new Set(["Modern"])
  for (const [tag, kws] of Object.entries(tagMap)) {
    if (kws.some((kw) => lower.includes(kw))) tags.add(tag)
  }
  tags.add(category)

  return { title, excerpt, paragraphs: paras, quote, category, tags: [...tags].slice(0, 5) }
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

function formatDate(locale) {
  const now = new Date()
  if (locale === "fr") {
    const m = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    return `${now.getDate()} ${m[now.getMonth()]} ${String(now.getFullYear()).slice(2)}`
  }
  const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return `${m[now.getMonth()]} ${now.getDate()}, ${String(now.getFullYear()).slice(2)}`
}

// ── OpenAI ───────────────────────────────────────────────────────────────────

function openaiAvailable() {
  return process.env.OPENAI_API_KEY ? true : false
}

async function callOpenAI(systemPrompt, userMessage) {
  if (!process.env.OPENAI_API_KEY) return null

  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 8192,
  }

  const tmpFile = path.join(ROOT, ".tmp", `ai-${Date.now()}.json`)
  fs.mkdirSync(path.dirname(tmpFile), { recursive: true })
  fs.writeFileSync(tmpFile, JSON.stringify(body))

  try {
    const headerFlags = [
      `-H "Content-Type: application/json"`,
      `-H "Authorization: Bearer ${process.env.OPENAI_API_KEY}"`,
    ].join(" ")

    // Important: quote the @file arg because the path may contain spaces
    const cmd = `curl -s https://api.openai.com/v1/chat/completions ${headerFlags} -d "@${tmpFile}" --max-time 60`

    const raw = execSync(cmd, { encoding: "utf-8", stdio: "pipe", shell: true, cwd: ROOT })
    const data = JSON.parse(raw)

    if (data.error) {
      print(`  ${C.red}OpenAI error: ${data.error.message}${C.reset}`)
      return null
    }
    return data.choices?.[0]?.message?.content || null
  } catch (e) {
    return null
  } finally {
    try { fs.unlinkSync(tmpFile) } catch {}
  }
}

async function translateText(text, fromLang, toLang) {
  const from = fromLang === "en" ? "English" : "French"
  const to   = toLang === "en" ? "English" : "French"

  const system =
`You are a professional translator. Translate the following blog post from ${from} to ${to}.

Rules:
- Keep the same meaning and tone
- Preserve any HTML or markdown formatting
- Translate the title naturally, do NOT leave it in the original language
- For English dates use "Month Day, YY" (e.g. "May 11, 26")
- For French dates use "Day Month YY" (e.g. "11 mai 26")
- Reply with ONLY the translated text in this exact format:

Title: <translated title>
Excerpt: <translated excerpt>
[P1] <paragraph 1>
[P2] <paragraph 2>
...
[QUOTE] <translated quote if present>`

  return await callOpenAI(system, text)
}

async function generateSeo(content, lang) {
  const langName = lang === "en" ? "English" : "French"
  const system =
`You are an SEO specialist for a web development agency. Based on this blog content, generate:

1. A compelling meta excerpt (max 160 chars, in ${langName})
2. 3-5 relevant tags (use only from: Agency, Business, Marketing, Modern, Creative, Digital, Design)

Reply with ONLY valid JSON (no markdown, no backticks):
{"excerpt": "...", "tags": ["Tag1", "Tag2", "Tag3"]}`

  const result = await callOpenAI(system, content)
  if (!result) return null

  try {
    return JSON.parse(result.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim())
  } catch {
    return null
  }
}

// ── Image ────────────────────────────────────────────────────────────────────

async function searchAndDownloadImage(query) {
  print(`\n${C.dim}→ Searching for image related to: "${query}"${C.reset}`)

  const existing = fs.readdirSync(BG_IMG_DIR)
    .filter((f) => /^\d+\.webp$/.test(f))
    .map((f) => parseInt(f))
    .sort((a, b) => a - b)

  const nextNum = existing.length > 0 ? Math.max(...existing) + 1 : 1
  const filename = `${nextNum}.webp`
  const destPath = path.join(BG_IMG_DIR, filename)

  // Unsplash
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY
  if (unsplashKey) {
    try {
      const sq = encodeURIComponent(query)
      const json = execSync(
        `curl -s -H "Authorization: Client-ID ${unsplashKey}" "https://api.unsplash.com/search/photos?query=${sq}&per_page=1&orientation=landscape" --max-time 10`,
        { encoding: "utf-8", stdio: "pipe" }
      )
      const data = JSON.parse(json)
      const imgUrl = data.results?.[0]?.urls?.raw
      if (imgUrl) {
        execSync(`curl -sL "${imgUrl}&w=1600&q=80&fit=max" -o "${destPath}" --max-time 15`, { stdio: "pipe" })
        if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1024) {
          print(`  ${C.green}✓ Image saved: /assets/img/bg-img/${filename}${C.reset}`)
          return `/assets/img/bg-img/${filename}`
        }
      }
    } catch {
      print(`  ${C.yellow}⚠ Unsplash search failed${C.reset}`)
    }
  }

  // Manual fallback
  print(`  ${C.yellow}⚠ Could not auto-fetch image.${C.reset}`)
  const manualUrl = await ask(`  ${C.cyan}?${C.reset} Paste an image URL (or leave empty):`)

  if (manualUrl) {
    try {
      execSync(`curl -sL "${manualUrl}" -o "${destPath}" --max-time 15`, { stdio: "pipe" })
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1024) {
        print(`  ${C.green}✓ Image saved: /assets/img/bg-img/${filename}${C.reset}`)
        return `/assets/img/bg-img/${filename}`
      }
    } catch {
      print(`  ${C.red}✗ Failed to download${C.reset}`)
    }
  }

  print(`  ${C.yellow}⚠ Using placeholder image${C.reset}`)
  return "/assets/img/bg-img/46.webp"
}

// ── File editing ─────────────────────────────────────────────────────────────

function getNextPostId() {
  const content = fs.readFileSync(BLOG_DATA_PATH, "utf-8")
  const matches = content.matchAll(/id:\s*(\d+)/g)
  let maxId = 0
  for (const m of matches) maxId = Math.max(maxId, parseInt(m[1]))
  return maxId + 1
}

function updateBlogData(post, imagePath) {
  let content = fs.readFileSync(BLOG_DATA_PATH, "utf-8")

  const tagsStr = post.tags.map((t) => `"${t}"`).join(", ")
  const contentKeys = post.paragraphs.map((_, i) => `"blog_post_${post.id}_p_${i + 1}"`)
  const contentStr = contentKeys.map((k) => `      ${k},`).join("\n")

  const quoteStr = post.quote
    ? `\n    quote: {\n      text: "blog_post_${post.id}_quote",\n    },`
    : ""

  const newEntry = `  {
    id: ${post.id},
    title: "blog_post_${post.id}_title",
    slug: "${post.slug}",
    date: "blog_post_${post.id}_date",
    category: "${post.category}",
    image: "${imagePath}",
    excerpt: "blog_post_${post.id}_excerpt",
    content: [
${contentStr}
    ],${quoteStr}
    tags: [${tagsStr}],
    author: "Dev Agency",
  },`

  // Insert at the BLOG_POSTS closing bracket (the ] on its own line)
  const match = content.match(/\n]\n\nexport const SIDEBAR_RECENT_POSTS/)
  if (!match) throw new Error("Could not find BLOG_POSTS closing bracket")
  const insertAt = match.index + 1 // point to the "]" character

  content = content.slice(0, insertAt) + "\n" + newEntry + "\n" + content.slice(insertAt)

  // Also update the sidebar to include this post
  const sidebarMatch = content.match(/^export const SIDEBAR_RECENT_POSTS = .*/m)
  if (sidebarMatch) {
    const updated = sidebarMatch[0].replace(/\]$/, `, BLOG_POSTS[${post.id - 1}]]`)
    content = content.replace(sidebarMatch[0], updated)
  }

  fs.writeFileSync(BLOG_DATA_PATH, content)
  print(`  ${C.green}✓ Updated: data/blog-data.ts${C.reset}`)
}

function updateI18nFiles(post, enTexts, frTexts) {
  const en = JSON.parse(fs.readFileSync(I18N_EN_PATH, "utf-8"))
  en[`blog_post_${post.id}_title`]   = enTexts.title
  en[`blog_post_${post.id}_date`]    = enTexts.date
  en[`blog_post_${post.id}_excerpt`] = enTexts.excerpt
  post.paragraphs.forEach((_, i) => { en[`blog_post_${post.id}_p_${i + 1}`] = enTexts.paragraphs[i] })
  if (post.quote) en[`blog_post_${post.id}_quote`] = enTexts.quote
  fs.writeFileSync(I18N_EN_PATH, JSON.stringify(en, null, 2) + "\n")
  print(`  ${C.green}✓ Updated: i18n/en/blog.json${C.reset}`)

  const fr = JSON.parse(fs.readFileSync(I18N_FR_PATH, "utf-8"))
  fr[`blog_post_${post.id}_title`]   = frTexts.title
  fr[`blog_post_${post.id}_date`]    = frTexts.date
  fr[`blog_post_${post.id}_excerpt`] = frTexts.excerpt
  post.paragraphs.forEach((_, i) => { fr[`blog_post_${post.id}_p_${i + 1}`] = frTexts.paragraphs[i] })
  if (post.quote) fr[`blog_post_${post.id}_quote`] = frTexts.quote
  fs.writeFileSync(I18N_FR_PATH, JSON.stringify(fr, null, 2) + "\n")
  print(`  ${C.green}✓ Updated: i18n/fr/blog.json${C.reset}`)
}

// ── Translation & SEO flow ───────────────────────────────────────────────────

async function getTranslations(post, detectedLang) {
  const isEn = detectedLang === "en"
  const srcLang = isEn ? "en" : "fr"
  const tgtLang = isEn ? "fr" : "en"

  const sourceTexts = {
    title: post.title,
    date: formatDate(srcLang),
    excerpt: post.excerpt,
    paragraphs: post.paragraphs,
    quote: post.quote || "",
  }

  let targetTexts = null
  let seoData = null

  // ── AI translation ──
  if (openaiAvailable()) {
    print(`\n  ${C.dim}Translating via OpenAI (gpt-4o-mini)...${C.reset}`)

    const toTranslate =
      `Title: ${post.title}\nExcerpt: ${post.excerpt}\n` +
      post.paragraphs.map((p, i) => `[P${i + 1}] ${p}`).join("\n") +
      (post.quote ? `\n[QUOTE] ${post.quote}` : "")

    const result = await translateText(toTranslate, srcLang, tgtLang)
    if (result) {
      const lines = result.split("\n")
      let tTitle = "", tExcerpt = "", tQuote = ""
      const tParas = []

      for (const line of lines) {
        if (line.startsWith("Title: "))        tTitle = line.slice(7)
        else if (line.startsWith("Excerpt: ")) tExcerpt = line.slice(9)
        else if (line.startsWith("[QUOTE] "))  tQuote = line.slice(8)
        else if (line.startsWith("[P") && line.includes("] ")) {
          tParas.push(line.replace(/\[P\d+\]\s*/, ""))
        }
      }

      if (tTitle && tParas.length > 0) {
        if (tParas.length !== post.paragraphs.length) {
          print(`  ${C.yellow}⚠ Paragraph count mismatch (AI: ${tParas.length}, expected: ${post.paragraphs.length}), adjusting...${C.reset}`)
        }
        targetTexts = {
          title: tTitle,
          date: formatDate(tgtLang),
          excerpt: tExcerpt || post.excerpt,
          paragraphs: tParas,
          quote: tQuote || "",
        }
        post.paragraphs = tParas
        print(`  ${C.green}✓ Translation complete${C.reset}`)
      } else {
        print(`  ${C.yellow}⚠ AI response format unexpected, falling back to manual...${C.reset}`)
        if (tTitle) print(`  ${C.dim}Got title="${tTitle}" paragraphs=${tParas.length}/${post.paragraphs.length}${C.reset}`)
      }
    } else {
      print(`  ${C.yellow}⚠ AI translation failed, falling back to manual...${C.reset}`)
    }
  }

  // ── Manual fallback ──
  if (!targetTexts) {
    const label = tgtLang === "en" ? "English" : "French"
    print(`\n  ${C.cyan}?${C.reset} Enter the ${label} translation manually:\n`)

    const tTitle = await ask(`  ${C.cyan}?${C.reset} Title (${label}):`)
    if (!tTitle) { print(`  ${C.red}✗ Title required${C.reset}`); process.exit(1) }

    const tExcerpt = await ask(`  ${C.cyan}?${C.reset} Excerpt (${label}):`, post.excerpt)
    const tParas = []
    for (let i = 0; i < post.paragraphs.length; i++) {
      tParas.push(await ask(`  ${C.cyan}?${C.reset} Paragraph ${i + 1} (${label}):`, post.paragraphs[i]))
    }
    let tQuote = ""
    if (post.quote) tQuote = await ask(`  ${C.cyan}?${C.reset} Quote (${label}):`, post.quote)

    targetTexts = { title: tTitle, date: formatDate(tgtLang), excerpt: tExcerpt, paragraphs: tParas, quote: tQuote }
  }

  // ── AI SEO ──
  if (openaiAvailable()) {
    print(`\n  ${C.dim}Generating SEO metadata...${C.reset}`)
    const fullContent = `${post.title}\n\n${post.paragraphs.join("\n\n")}`
    seoData = await generateSeo(fullContent, srcLang)
    if (seoData) {
      print(`  ${C.green}✓ SEO data generated${C.reset}`)
      if (seoData.excerpt) sourceTexts.excerpt = seoData.excerpt
      if (seoData.tags) post.tags = [...new Set([...seoData.tags, ...post.tags])].slice(0, 5)
    }
  }

  return { sourceTexts, targetTexts, sourceLang: srcLang, targetLang: tgtLang }
}

// ── Git ──────────────────────────────────────────────────────────────────────

async function gitCommit(post) {
  try { sh("git rev-parse --git-dir", { stdio: "pipe" }) } catch {
    print(`  ${C.yellow}⚠ Not a git repo, skipping commit${C.reset}`)
    return
  }

  sh(`git add "data/blog-data.ts" "i18n/en/blog.json" "i18n/fr/blog.json"`)

  if (post.imagePath && !post.imagePath.includes("46.webp")) {
    const imgFile = path.join(ROOT, "public", post.imagePath)
    if (fs.existsSync(imgFile)) sh(`git add "public${post.imagePath}"`)
  }

  const staged = sh("git diff --cached --name-only", { stdio: "pipe" })
  if (!staged) { print(`  ${C.yellow}⚠ No changes staged${C.reset}`); return }

  const msg = `feat(blog): add "${post.title}"`
  sh(`git commit -m "${msg.replace(/"/g, '\\"')}"`)
  print(`  ${C.green}✓ Commit created: ${msg}${C.reset}`)

  const branch = sh("git rev-parse --abbrev-ref HEAD", { stdio: "pipe" })
  const answer = await ask(`\n  ${C.cyan}?${C.reset} Push to GitHub (${branch})? (Y/n):`, "y")
  if (answer.toLowerCase() === "y" || answer === "") {
    try {
      sh(`git push origin ${branch}`)
      print(`  ${C.green}✓ Pushed! The site will be live shortly.${C.reset}`)
    } catch (e) {
      print(`  ${C.red}✗ Push failed: ${e.message}${C.reset}`)
    }
  } else {
    print(`  ${C.dim}Run 'git push origin ${branch}' to deploy.${C.reset}`)
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

function printSummary(post, imagePath, enTexts, frTexts) {
  print(`\n${C.green}${C.bold}═════════════════════════════════════════════${C.reset}`)
  print(`${C.green}${C.bold}   ✅ Blog post added successfully!            ${C.reset}`)
  print(`${C.green}${C.bold}═════════════════════════════════════════════${C.reset}`)
  print(`  ${C.bold}Title:${C.reset}     ${post.title}`)
  print(`  ${C.bold}Slug:${C.reset}      ${post.slug}`)
  print(`  ${C.bold}Category:${C.reset}  ${post.category}`)
  print(`  ${C.bold}Tags:${C.reset}      ${post.tags.join(", ")}`)
  print(`  ${C.bold}Image:${C.reset}     ${imagePath}`)
  print(`  ${C.bold}EN date:${C.reset}   ${enTexts.date}`)
  print(`  ${C.bold}FR date:${C.reset}   ${frTexts.date}`)
  print(`  ${C.bold}Paragraphs:${C.reset} ${post.paragraphs.length}`)
  print(`\n  ${C.dim}Modified files:${C.reset}`)
  print(`  ${C.dim}  • data/blog-data.ts${C.reset}`)
  print(`  ${C.dim}  • i18n/en/blog.json${C.reset}`)
  print(`  ${C.dim}  • i18n/fr/blog.json${C.reset}`)
  if (imagePath && !imagePath.includes("46.webp")) print(`  ${C.dim}  • public${imagePath}${C.reset}`)
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  print(`\n${C.cyan}${C.bold}╔══════════════════════════════════════════════════╗${C.reset}`)
  print(`${C.cyan}${C.bold}║     📝 Blog Post Publisher — devagency.ma       ║${C.reset}`)
  print(`${C.cyan}${C.bold}╚══════════════════════════════════════════════════╝${C.reset}`)

  if (!process.env.OPENAI_API_KEY) {
    print(`\n  ${C.yellow}⚠ OPENAI_API_KEY not found in .env.local${C.reset}`)
    print(`  ${C.dim}AI translation & SEO will be skipped (you'll enter translations manually)${C.reset}`)
  }

  // ── 1. Read post ──
  const rawMd = await readMultiline(`${C.bold}Step 1/6${C.reset}: Paste your Markdown blog post`)
  if (!rawMd || rawMd.trim().length < 10) {
    print(`\n${C.red}✗ No content provided${C.reset}`)
    process.exit(1)
  }

  // ── 2. Parse ──
  print(`\n${C.cyan}─── Step 2/6: Parsing content ───${C.reset}`)
  const detectedLang = detectLanguage(rawMd)
  print(`  ${C.dim}Language:${C.reset} ${C.bold}${detectedLang === "en" ? "English" : "French"}${C.reset}`)

  const post = parseMarkdown(rawMd)
  post.slug = slugify(post.title)
  post.id = getNextPostId()

  print(`  Title:      ${C.bold}${post.title}${C.reset}`)
  print(`  Slug:       ${post.slug}`)
  print(`  Category:   ${post.category}`)
  print(`  Paragraphs: ${post.paragraphs.length}`)
  if (post.quote) print(`  Quote:      ${C.dim}yes${C.reset}`)

  // ── 3. Translate + SEO ──
  print(`\n${C.cyan}─── Step 3/6: Translation & SEO ───${C.reset}`)
  const { sourceTexts, targetTexts, sourceLang, targetLang } = await getTranslations(post, detectedLang)
  print(`  ${sourceLang.toUpperCase()}: ${sourceTexts.title}`)
  print(`  ${targetLang.toUpperCase()}: ${targetTexts.title}`)

  // ── 4. Image ──
  print(`\n${C.cyan}─── Step 4/6: Feature image ───${C.reset}`)
  const imagePath = await searchAndDownloadImage(`${post.category} ${post.title}`)
  post.imagePath = imagePath

  // ── 5. Write files ──
  print(`\n${C.cyan}─── Step 5/6: Writing files ───${C.reset}`)
  updateBlogData(post, imagePath)

  const enTexts = sourceLang === "en" ? sourceTexts : targetTexts
  const frTexts = sourceLang === "fr" ? sourceTexts : targetTexts
  updateI18nFiles(post, enTexts, frTexts)

  // ── 6. Git ──
  print(`\n${C.cyan}─── Step 6/6: Git commit ───${C.reset}`)
  await gitCommit(post)

  printSummary(post, imagePath, enTexts, frTexts)
}

main().catch((err) => {
  console.error(`\n${C.red}✗ Error:${C.reset} ${err.message}`)
  process.exit(1)
})
