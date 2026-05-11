"use client"

import { useContext, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getBlogPostBySlug, BLOG_POSTS, BLOG_CATEGORIES, BLOG_TAGS, SIDEBAR_RECENT_POSTS } from "@/data/blog-data"
import { I18nContext } from "@/i18n"
import blogEn from "@/i18n/en/blog.json"
import blogFr from "@/i18n/fr/blog.json"

interface BlogDetailsAreaProps {
  slug?: string
}

const BlogDetailsArea = ({ slug }: BlogDetailsAreaProps) => {
  const i18nCtx = useContext(I18nContext)
  const locale = i18nCtx?.locale || "en"
  const blogT = (key: string): string => {
    const dict = locale === "fr" ? blogFr : blogEn
    return (dict as Record<string, string>)[key] || key
  }

  const router = useRouter()
  const [searchValue, setSearchValue] = useState("")

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const query = searchValue.trim()
      if (query) {
        router.push(`/blog?search=${encodeURIComponent(query)}`)
      }
    },
    [searchValue, router],
  )

  const post = getBlogPostBySlug(slug || BLOG_POSTS[0]?.slug || "")

  if (!post) {
    return (
      <div className="blog-page-wrap">
        <div className="divider"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <h2>Post Not Found</h2>
              <Link href="/blog" className="btn btn-primary mt-3">
                <span>BACK TO BLOG</span>
                <span>BACK TO BLOG</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    )
  }

  const date = blogT(post.date)
  const content = post.content.map((c) => blogT(c))
  const quoteText = post.quote ? blogT(post.quote.text) : null

  const navigateRandom = useCallback(() => {
    const others = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    const random = others[Math.floor(Math.random() * others.length)]
    router.push(`/blog/${random.slug}`)
  }, [post.slug, router])

  return (
    <>
      <div className="blog-page-wrap">
        <div className="divider"></div>

        <div className="container">
          <div className="row g-4 g-xl-5">
            <div className="col-12 col-md-7 col-lg-8">
              <div className="single-blog">
                <div className="blog-meta d-flex align-items-center">
                  <a href="#">{date}</a>
                  <div className="dot"></div>
                  <a href="#">{post.category}</a>
                </div>
              </div>

              <div className="blog-details-content">
                {content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}

                {post.quote && quoteText && (
                  <div className="blog-quote">
                    <div className="blog-quote-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                      >
                        <path
                          d="M34.5977 30.898H47.481C47.003 36.6266 42.2094 41.1427 36.3885 41.1427C35.8702 41.1427 35.451 41.564 35.451 42.0849V48.1495C35.451 48.6704 35.8702 49.0917 36.3885 49.0917C46.8877 49.0917 55.4297 40.5078 55.4297 29.9558V9.9615C55.4297 9.44064 55.0104 9.01929 54.4922 9.01929H34.5977C34.0794 9.01929 33.6602 9.44064 33.6602 9.9615V29.956C33.6602 30.4766 34.0796 30.898 34.5977 30.898ZM35.5352 10.9037H53.5547V29.956C53.5547 39.1527 46.3567 46.6913 37.326 47.1817V42.9932C44.0625 42.5092 49.3944 36.8467 49.3944 29.9558C49.3944 29.4349 48.9752 29.0136 48.4569 29.0136H35.5352V10.9037Z"
                          fill="#0E0E0E"
                        />
                        <path
                          d="M6.48438 30.8982H19.3696C18.8916 36.6269 14.0999 41.1429 8.27706 41.1429C7.75881 41.1429 7.33956 41.5643 7.33956 42.0851V48.1497C7.33956 48.6706 7.75881 49.092 8.27706 49.092C18.7763 49.092 27.3183 40.508 27.3183 29.956V9.96174C27.3183 9.44089 26.899 9.01953 26.3808 9.01953H6.48438C5.96613 9.01953 5.54688 9.44089 5.54688 9.96174V29.9562C5.54688 30.4769 5.96631 30.8982 6.48438 30.8982ZM7.42188 10.904H25.4431V29.9562C25.4431 39.1529 18.2451 46.6916 9.21438 47.1819V42.9934C15.9509 42.5095 21.2828 36.847 21.2828 29.956C21.2828 29.4352 20.8636 29.0138 20.3453 29.0138H7.42188V10.904Z"
                          fill="#0E0E0E"
                        />
                      </svg>
                    </div>

                    <p>&ldquo;{quoteText}&rdquo;</p>
                  </div>
                )}
              </div>

              <div className="tags-share">
                <ul className="tags-list list-unstyled">
                  <li>{blogT("tags_label")}</li>
                  {post.tags.map((tag, idx) => (
                    <li key={idx}>
                      <Link href={`/blog?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
                    </li>
                  ))}
                </ul>

                <ul className="share-list list-unstyled">
                  <li>{blogT("share_label")}</li>
                  <li>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-facebook"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-twitter-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="blog-pager">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateRandom()
                  }}
                >
                  <span className="material-symbols-outlined">arrow_back</span>{" "}
                  {blogT("prev_post")}
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateRandom()
                  }}
                >
                  {blogT("next_post")} {" "}
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>
              </div>

              {/*
              <div className="divider-sm"></div>

              <div className="blog-comments">
                <h3 className="mb-5">01 {blogT("comments_heading")}</h3>
                <ul className="list-unstyled blog-comments-list">
                  <li>
                    <p className="mb-0">{blogT("comment_text_1")}</p>

                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-4 mt-4">
                      <div>
                        <h4 className="mb-1">{blogT("comment_author_1")}</h4>
                        <p className="mb-0">{blogT("comment_date_1")}</p>
                      </div>
                      <a href="#" className="btn btn-sm btn-primary">
                        <span>{blogT("reply_btn")}</span>
                        <span>{blogT("reply_btn")}</span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="divider-sm"></div>

              <div className="comment-form contact-form m-0 p-0">
                <div className="mb-5">
                  <h3 className="mb-1">{blogT("comment_form_heading")}</h3>
                  <p className="mb-0 fz-14">{blogT("comment_form_subtext")}</p>
                </div>

                <form onClick={(e) => e.preventDefault()}>
                  <div className="row g-4">
                    <div className="col-12 col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={blogT("comment_form_name")}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder={blogT("comment_form_email")}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={blogT("comment_form_phone")}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <select className="form-control">
                        <option value="">{blogT("comment_form_subject")}</option>
                        <option value="">{blogT("comment_form_subject_1")}</option>
                        <option value="">{blogT("comment_form_subject_2")}</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        rows={20}
                        cols={30}
                        placeholder={blogT("comment_form_message")}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill"
                      >
                        <span>{blogT("comment_form_submit")}</span>
                        <span>{blogT("comment_form_submit")}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              */}
            </div>

            <div className="col-12 col-md-7 col-lg-4">
              <div className="d-flex flex-column gap-5">
                <div className="blog-widget">
                  <h4 className="mb-4">{blogT("search_heading")}</h4>

                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="search"
                      placeholder={blogT("search_placeholder")}
                      className="form-control"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
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

                <div className="blog-widget">
                  <h4 className="mb-4">{blogT("categories_heading")}</h4>

                  <ul className="blog-list">
                    {BLOG_CATEGORIES.map((cat, idx) => (
                      <li key={idx}>
                        <Link href={`/blog?category=${cat.key}`}>
                          {blogT(cat.key)}
                          <span>({cat.count.toString().padStart(2, "0")})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="blog-widget">
                  <h4 className="mb-4">{blogT("recent_posts_heading")}</h4>

                  <div className="d-flex flex-column gap-4">
                    {SIDEBAR_RECENT_POSTS.map((rp, idx) => {
                      const rpTitle = blogT(rp.title)
                      const rpDate = blogT(rp.date)
                      return (
                        <div key={idx} className="widget-blog-post">
                          <div className="blog-thumbnail">
                            <Image src={rp.image} alt={rpTitle} width={100} height={100} />
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

                <div className="blog-widget">
                  <h4 className="mb-4">{blogT("tag_cloud_heading")}</h4>

                  <ul className="tag-list list-unstyled">
                    {BLOG_TAGS.map((tag, idx) => (
                      <li key={idx}>
                        <Link href={`/blog?tag=${encodeURIComponent(tag.label)}`}>{tag.label}</Link>
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
  );
};

export default BlogDetailsArea;
