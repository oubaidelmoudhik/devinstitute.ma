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
 * Logic functions imported from blog-lib.mjs (shared with admin API).
 */

import * as readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"
import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"

import {
  ROOT, BLOG_DATA_PATH, I18N_EN_PATH, I18N_FR_PATH, BG_IMG_DIR,
  detectLanguage, slugify, formatDate, formatDateFromIso,
  parseMd, readRawPosts, getI18nData, setI18nData, deleteI18nData,
  callOpenAI, fetchImage,
  AI_TRANSLATE_SYSTEM, AI_SEO_SYSTEM,
} from "./blog-lib.mjs"

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
  print(`  ${C.bold}Reading:${C.reset}  ${post.readingTimeMinutes || 5} min`)
  if (post.serviceAlignment) print(`  ${C.bold}Service:${C.reset}  ${post.serviceAlignment}`)
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

  const rawMd = await readMultiline(`Paste your Markdown blog post (English or French)`)
  if (!rawMd || rawMd.trim().length < 10) { print(`\n${C.red}✗ No content${C.reset}`); return }

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

  print(`\n  ${C.dim}Fetching feature image...${C.reset}`)
  const imagePath = await fetchImage(`${md.category} ${md.title}`)

  const enTexts = isEn ? srcTexts : tgtTexts
  const frTexts = isEn ? tgtTexts : srcTexts

  const sortDate = md.publishDate || new Date().toISOString().slice(0, 10)

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

  setI18nData(md.id, enTexts, frTexts)

  print(`\n  ${C.green}✓ Article added: ${C.bold}${md.title}${C.reset}`)
  print(`  ${C.dim}  ID: ${md.id} | Slug: ${md.slug}${C.reset}`)

  const doCommit = await ask(`\n  ${C.cyan}?${C.reset} Commit & push this article? (y/N):`, "n")
  if (doCommit.toLowerCase() === "y") {
    await gitStageCommitPush(`feat(blog): add "${md.title}"`,
      [imagePath].filter(p => p && !p.includes("46.webp")))
  }
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

  const maxParas = Math.max(i18n.en.paragraphs.length, i18n.fr.paragraphs.length)

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

    if (f.key === "title_en") i18n.en.title = val
    else if (f.key === "title_fr") i18n.fr.title = val
    else if (f.key === "excerpt_en") i18n.en.excerpt = val
    else if (f.key === "excerpt_fr") i18n.fr.excerpt = val
    else if (f.key === "category") post.category = val
    else if (f.key === "tags") post.tags = val.split(",").map(s => s.trim()).filter(Boolean)
    else if (f.key === "slug") post.slug = slugify(val)
    else if (f.key === "image") post.image = val
  }

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

  if (post.quote || await ask(`  ${C.cyan}?${C.reset} Add a quote? (y/N):`, "n") === "y") {
    const enQuote = await ask(`  ${C.cyan}?${C.reset} Quote (EN) [${C.dim}${i18n.en.quote || ""}${C.reset}]:`, i18n.en.quote || "")
    const frQuote = await ask(`  ${C.cyan}?${C.reset} Quote (FR) [${C.dim}${i18n.fr.quote || ""}${C.reset}]:`, i18n.fr.quote || "")
    if (enQuote) { post.quote = { text: `blog_post_${post.id}_quote` }; i18n.en.quote = enQuote; i18n.fr.quote = frQuote }
  }

  post.content = enParas.map((_, i) => `blog_post_${post.id}_p_${i + 1}`)

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

  posts.splice(idx, 1)
  writeAllPosts(posts)
  deleteI18nData(post.id)

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
  print(`  ${C.bold}4.${C.reset} ${C.cyan}✏${C.reset}  Edit article`)
  print(`  ${C.bold}5.${C.reset} ${C.cyan}🗑${C.reset} Delete article`)
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
