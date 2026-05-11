import { Suspense } from "react"
import type { Metadata } from "next"
import Breacrumb from "@/components/common/Breacrumb"
import BlogArea from "@/components/blog/BlogArea"
import Cta2Area from "@/components/home/Cta2Area"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read our latest blog posts about web development, design, and digital marketing.",
  alternates: {
    canonical: "https://devagency.ma/blog",
    languages: {
      en: "https://devagency.ma/blog",
      fr: "https://devagency.ma/fr/blog",
      "x-default": "https://devagency.ma/blog",
    },
  },
  openGraph: {
    title: "Blog | Dev Agency",
    description:
      "Read our latest blog posts about web development, design, and digital marketing.",
    url: "https://devagency.ma/blog",
  },
}

export const dynamic = "force-dynamic"

function BlogAreaFallback() {
  return (
    <div className="blog-page-wrap">
      <div className="divider"></div>
      <div className="container">
        <div className="row g-4 g-xl-5">
          <div className="col-12 col-md-7 col-lg-8">
            <div className="d-flex flex-column gap-5">
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogPage = () => {
  return (
    <>
      <Breacrumb titleKey="title_5" subtitleKey="title_5" isMainHeading />
      <Suspense fallback={<BlogAreaFallback />}>
        <BlogArea />
      </Suspense>
      <Cta2Area />
    </>
  )
}

export default BlogPage
