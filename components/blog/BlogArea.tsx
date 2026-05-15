"use client"

import { useState, useEffect, useMemo, useCallback, useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_TAGS, SIDEBAR_RECENT_POSTS } from "@/data/blog-data"
import { I18nContext } from "@/i18n"
import blogEn from "@/i18n/en/blog.json"
import blogFr from "@/i18n/fr/blog.json"

function createBlogTranslator(locale: string) {
  const dict = locale === "fr" ? blogFr : blogEn
  return (key: string): string =>
    (dict as Record<string, string>)[key] || key
}

function filterPosts(
  posts: typeof BLOG_POSTS,
  searchQuery: string,
  activeCategory: string,
  activeTag: string,
  blogT: ReturnType<typeof createBlogTranslator>,
) {
  const activeCatLabel = activeCategory
    ? BLOG_CATEGORIES.find((c) => c.key === activeCategory)?.label
    : null
  const query = searchQuery.toLowerCase()

  return posts.filter((post) => {
    if (searchQuery) {
      const title = blogT(post.title).toLowerCase()
      const excerpt = blogT(post.excerpt).toLowerCase()
      if (!title.includes(query) && !excerpt.includes(query)) {
        return false
      }
    }

    if (activeCatLabel && post.category !== activeCatLabel) {
      return false
    }

    if (activeTag && !post.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())) {
      return false
    }

    return true
  })
}

const BlogArea = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const i18nCtx = useContext(I18nContext)
  const locale = i18nCtx?.locale || "en"
  const blogT = useMemo(() => createBlogTranslator(locale), [locale])

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "")
  const [activeTag, setActiveTag] = useState(searchParams.get("tag") || "")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "")
    setActiveCategory(searchParams.get("category") || "")
    setActiveTag(searchParams.get("tag") || "")
  }, [searchParams])

  const syncUrl = useCallback(
    (search: string, category: string, tag: string, sort: string) => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (category) params.set("category", category)
      if (tag) params.set("tag", tag)
      if (sort && sort !== "newest") params.set("sort", sort)
      const qs = params.toString()
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false })
    },
    [pathname, router],
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchQuery(value)
      syncUrl(value, activeCategory, activeTag, sortOrder)
    },
    [activeCategory, activeTag, sortOrder, syncUrl],
  )

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
    },
    [],
  )

  const handleCategoryClick = useCallback(
    (catKey: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      const newCategory = catKey === activeCategory ? "" : catKey
      setActiveCategory(newCategory)
      setActiveTag("")
      syncUrl(searchQuery, newCategory, "", sortOrder)
    },
    [activeCategory, searchQuery, sortOrder, syncUrl],
  )

  const handleTagClick = useCallback(
    (tagLabel: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      const newTag = tagLabel === activeTag ? "" : tagLabel
      setActiveTag(newTag)
      setActiveCategory("")
      syncUrl(searchQuery, "", newTag, sortOrder)
    },
    [activeTag, searchQuery, sortOrder, syncUrl],
  )

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setActiveCategory("")
    setActiveTag("")
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  const handleSortToggle = useCallback(() => {
    setSortOrder((prev) => {
      const next = prev === "newest" ? "oldest" : "newest"
      syncUrl(searchQuery, activeCategory, activeTag, next)
      return next
    })
  }, [searchQuery, activeCategory, activeTag, syncUrl])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    BLOG_POSTS.forEach((post) => {
      const catLabel = post.category
      counts[catLabel] = (counts[catLabel] || 0) + 1
    })
    return counts
  }, [])

  const filteredPosts = useMemo(() => {
    const filtered = filterPosts(BLOG_POSTS, searchQuery, activeCategory, activeTag, blogT)
    const sorted = [...filtered].sort((a, b) => {
      const cmp = a.sortDate.localeCompare(b.sortDate)
      return sortOrder === "newest" ? -cmp : cmp
    })
    return sorted
  }, [searchQuery, activeCategory, activeTag, blogT, sortOrder])

  const hasActiveFilter = !!(searchQuery || activeCategory || activeTag)

  return (
    <>
      <div className="blog-page-wrap">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4 g-xl-5">
            <div className="col-12 col-md-7 col-lg-8">
              <div className="d-flex flex-column gap-5">
                {hasActiveFilter && (
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <p className="mb-0 fz-14">
                      {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"} found
                      {searchQuery && <> for &ldquo;{searchQuery}&rdquo;</>}
                      {activeCategory && (
                        <> in category &ldquo;{blogT(activeCategory)}&rdquo;</>
                      )}
                      {activeTag && <> tagged &ldquo;{activeTag}&rdquo;</>}
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary rounded-pill"
                        onClick={handleSortToggle}
                      >
                        {sortOrder === "newest" ? "Oldest First" : "Newest First"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary rounded-pill"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}

                {!hasActiveFilter && (
                  <div className="d-flex align-items-center justify-content-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary rounded-pill"
                      onClick={handleSortToggle}
                    >
                      {sortOrder === "newest" ? "Oldest First" : "Newest First"}
                    </button>
                  </div>
                )}

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-5">
                    <h4>No posts found</h4>
                    <p className="mb-4">Try adjusting your search or filter criteria.</p>
                    <button
                      type="button"
                      className="btn btn-primary rounded-pill"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  filteredPosts.map((post) => {
                    const title = blogT(post.title)
                    const date = blogT(post.date)
                    const excerpt = blogT(post.excerpt)

                    return (
                      <div key={post.id} className="single-blog">
                        <Image
                          src={post.image}
                          alt={title}
                          width={800}
                          height={450}
                        />
                        <div className="blog-meta d-flex align-items-center">
                          <a href="#">{date}</a>
                          <div className="dot"></div>
                          <a
                            href="#"
                            onClick={handleCategoryClick(
                              BLOG_CATEGORIES.find((c) => c.label === post.category)?.key || "",
                            )}
                          >
                            {post.category}
                          </a>
                          {post.readingTimeMinutes > 0 && (
                            <>
                              <div className="dot"></div>
                              <span className="reading-time">{post.readingTimeMinutes} {blogT("reading_time")}</span>
                            </>
                          )}
                        </div>
                        <Link className="post-title mb-2" href={`/blog/${post.slug}`}>
                          {title}
                        </Link>
                        <p className="mb-4">{excerpt}</p>
                        <Link href={`/blog/${post.slug}`} className="btn btn-primary">
                          <span>{blogT("read_more")}</span>
                          <span>{blogT("read_more")}</span>
                        </Link>
                      </div>
                    )
                  })
                )}

                {filteredPosts.length > 0 && (
                  <ul className="blog-pagination list-unstyled">
                    <li className="active">
                      <a href="#">1</a>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="col-12 col-md-5 col-lg-4">
              <div className="d-flex flex-column gap-5">
                {/* Search Widget */}
                <div className="blog-widget">
                  <h4 className="mb-4">{blogT("search_heading")}</h4>
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="search"
                      placeholder={blogT("search_placeholder")}
                      className="form-control"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5.81127 5.43613C8.9183 2.44107 13.5422 2.56045 16.4179 5.43613C19.1677 8.186 19.3359 12.54 16.9222 15.486L21.1908 19.755L20.1302 20.8157L15.8611 16.5471C12.9151 18.9607 8.56114 18.7926 5.81127 16.0427C2.93559 13.1671 2.80038 8.33851 5.81127 5.43613ZM15.3572 6.49679C13.0141 4.15364 9.21508 4.15364 6.87193 6.49679C4.52879 8.83993 4.52879 12.6389 6.87193 14.9821C9.21508 17.3252 13.0141 17.3252 15.3572 14.9821C17.7004 12.6389 17.7004 8.83993 15.3572 6.49679Z"
                          fill="#0E0E0E"
                        />
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Categories Widget */}
                <div className="blog-widget">
                  <h4 className="mb-4">{blogT("categories_heading")}</h4>
                  <ul className="blog-list">
                    {BLOG_CATEGORIES.filter((cat) => (categoryCounts[cat.label] || 0) > 0).map((cat, idx) => (
                      <li key={idx}>
                        <a
                          href={`?category=${cat.key}`}
                          onClick={handleCategoryClick(cat.key)}
                          className={activeCategory === cat.key ? "active" : ""}
                        >
                          {blogT(cat.key)}
                          <span>({categoryCounts[cat.label].toString().padStart(2, "0")})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts Widget */}
                <div className="blog-widget">
                  <h4 className="mb-4">{blogT("recent_posts_heading")}</h4>
                  <div className="d-flex flex-column gap-4">
                    {SIDEBAR_RECENT_POSTS.map((rp, idx) => {
                      const rpTitle = blogT(rp.title)
                      const rpDate = blogT(rp.date)
                      return (
                        <div key={idx} className="widget-blog-post">
                          <div className="blog-thumbnail">
                            <Image
                              src={rp.image || "/assets/img/bg-img/41.webp"}
                              alt={rpTitle}
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="blog-content">
                            <h6>
                              <Link href={`/blog/${rp.slug}`}>{rpTitle}</Link>
                            </h6>
                            <p className="mb-0">{rpDate}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Tag Cloud Widget */}
                <div className="blog-widget">
                  <h4 className="mb-4">{blogT("tag_cloud_heading")}</h4>
                  <ul className="tag-list list-unstyled">
                    {BLOG_TAGS.map((tag, idx) => (
                      <li key={idx}>
                        <a
                          href={`?tag=${tag.label}`}
                          onClick={handleTagClick(tag.label)}
                          className={activeTag === tag.label ? "active" : ""}
                        >
                          {tag.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  )
}

export default BlogArea
