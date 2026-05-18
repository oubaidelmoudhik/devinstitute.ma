import { NextRequest, NextResponse } from "next/server"
import { verifyAdmin } from "@/scripts/admin-auth.mjs"
import {
  readRawPosts,
  getI18nData,
  parseMd,
  slugify,
  detectLanguage,
  formatDateFromIso,
  setI18nData,
  writeAllPosts,
  fetchImage,
  callOpenAI,
  AI_TRANSLATE_SYSTEM,
} from "@/scripts/blog-lib.mjs"

/**
 * GET /api/admin/posts — returns full list with i18n data
 */
export async function GET(request: NextRequest) {
  const user = await verifyAdmin(request)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const posts = readRawPosts()
    const enriched = posts.map((post: Record<string, unknown>) => {
      const i18n = getI18nData(post.id as number)
      return { ...post, i18n }
    })
    return NextResponse.json({ posts: enriched })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read posts" },
      { status: 500 },
    )
  }
}

/**
 * POST /api/admin/posts — add a new article from raw markdown
 * Body: { markdown: string, skipAi?: boolean }
 */
export async function POST(req: NextRequest) {
  const user = await verifyAdmin(req)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { markdown, skipAi: skipAiRaw } = await req.json()
    const skipAi = skipAiRaw !== false // default to true (skip AI)

    if (!markdown || (markdown as string).trim().length < 10) {
      return NextResponse.json({ error: "Markdown content is too short" }, { status: 400 })
    }

    const detected = detectLanguage(markdown as string)
    const isEn = detected === "en"
    const srcLang = isEn ? "en" : "fr"
    const tgtLang = isEn ? "fr" : "en"

    const parsed = parseMd(markdown as string) as {
      title: string
      excerpt: string
      paragraphs: string[]
      quote: string | null
      category: string
      tags: string[]
      readingTimeMinutes: number
      publishDate: string | null
      serviceAlignment: string | null
    }

    const posts = readRawPosts()
    const nextId = posts.length > 0 ? Math.max(...posts.map((p: Record<string, unknown>) => p.id as number)) + 1 : 1
    const slug = slugify(parsed.title)

    const formattedSrcDate = formatDateFromIso(parsed.publishDate, srcLang)
    const formattedTgtDate = formatDateFromIso(parsed.publishDate, tgtLang)

    // Build source-language texts
    const enTexts = {
      title: parsed.title,
      date: formattedSrcDate,
      excerpt: parsed.excerpt,
      paragraphs: parsed.paragraphs,
      quote: parsed.quote || "",
    }

    // Build target-language texts (AI translation or copy)
    let frTexts: typeof enTexts

    if (skipAi) {
      // No AI — copy source texts to target
      frTexts = isEn
        ? {
            title: parsed.title,
            date: formattedTgtDate,
            excerpt: parsed.excerpt,
            paragraphs: parsed.paragraphs,
            quote: parsed.quote || "",
          }
        : { ...enTexts }
    } else {
      // AI translation — send/receive JSON for reliable multi-line handling
      const srcContent = JSON.stringify({
        title: parsed.title,
        excerpt: parsed.excerpt,
        paragraphs: parsed.paragraphs,
        quote: parsed.quote || null,
      })

      const langNames: Record<string, string> = { en: "English", fr: "French" }
      const aiResult = await callOpenAI(
        AI_TRANSLATE_SYSTEM(langNames[srcLang], langNames[tgtLang]),
        srcContent,
      )

      if (aiResult) {
        try {
          // Try to extract JSON from the response (handle possible markdown fences)
          let json = aiResult.trim()
          if (json.startsWith("```")) json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "")
          const translated = JSON.parse(json)

          frTexts = {
            title: translated.title || parsed.title,
            date: formattedTgtDate,
            excerpt: translated.excerpt || parsed.excerpt,
            paragraphs: Array.isArray(translated.paragraphs) && translated.paragraphs.length > 0
              ? translated.paragraphs
              : parsed.paragraphs,
            quote: translated.quote || parsed.quote || "",
          }
        } catch {
          // JSON parse failed — fall back to copy
          frTexts = isEn
            ? {
                title: parsed.title,
                date: formattedTgtDate,
                excerpt: parsed.excerpt,
                paragraphs: parsed.paragraphs,
                quote: parsed.quote || "",
              }
            : { ...enTexts }
        }
      } else {
        // AI call failed — fall back to copy
        frTexts = isEn
          ? {
              title: parsed.title,
              date: formattedTgtDate,
              excerpt: parsed.excerpt,
              paragraphs: parsed.paragraphs,
              quote: parsed.quote || "",
            }
          : { ...enTexts }
      }
    }

    const sortDate = parsed.publishDate || new Date().toISOString().slice(0, 10)

    const imagePath = fetchImage(`${parsed.category} ${parsed.title}`)

    posts.push({
      id: nextId,
      title: `blog_post_${nextId}_title`,
      slug,
      date: `blog_post_${nextId}_date`,
      sortDate,
      category: parsed.category,
      image: imagePath,
      excerpt: `blog_post_${nextId}_excerpt`,
      content: parsed.paragraphs.map((_, i) => `blog_post_${nextId}_p_${i + 1}`),
      quote: parsed.quote ? { text: `blog_post_${nextId}_quote` } : undefined,
      tags: parsed.tags,
      author: "Dev Agency",
      readingTimeMinutes: parsed.readingTimeMinutes,
      serviceAlignment: parsed.serviceAlignment || undefined,
    })

    writeAllPosts(posts)
    setI18nData(nextId, enTexts, frTexts)

    return NextResponse.json({
      success: true,
      post: { id: nextId, slug, title: parsed.title },
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add post" },
      { status: 500 },
    )
  }
}
