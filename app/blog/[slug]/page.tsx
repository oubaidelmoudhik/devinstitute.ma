import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Breacrumb from "@/components/common/Breacrumb"
import BlogDetailsArea from "@/components/blog-details/BlogDetailsArea"
import Cta2Area from "@/components/home/Cta2Area"
import { BLOG_POSTS, BLOG_CATEGORIES, getBlogPostBySlug } from "@/data/blog-data"
import blogEn from "@/i18n/en/blog.json"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  const title = (blogEn as Record<string, string>)[post.title] || post.title
  const description =
    (blogEn as Record<string, string>)[post.excerpt] || post.excerpt

  return {
    title,
    description,
    alternates: {
      canonical: `https://devagency.ma/blog/${slug}`,
      languages: {
        en: `https://devagency.ma/blog/${slug}`,
        fr: `https://devagency.ma/fr/blog/${slug}`,
        "x-default": `https://devagency.ma/blog/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | Dev Agency`,
      description,
      url: `https://devagency.ma/blog/${slug}`,
    },
  }
}

const BlogPostPage = async ({ params }: Props) => {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Derive i18n key from the post's category label
  const categoryEntry = BLOG_CATEGORIES.find(
    (cat) => cat.label === post.category,
  )
  const blogCategoryKey = categoryEntry?.key

  return (
    <>
      <Breacrumb
        blogTitleKey={post.title}
        blogCategoryKey={blogCategoryKey}
        background={post.image}
        isMainHeading
      />
      <BlogDetailsArea slug={slug} />
      <Cta2Area />
    </>
  )
}

export default BlogPostPage
