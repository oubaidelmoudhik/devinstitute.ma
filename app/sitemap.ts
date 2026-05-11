import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/data/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devagency.ma'

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          fr: `${baseUrl}/fr`,
        },
      },
    },
    {
      url: `${baseUrl}/service`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/service`,
          fr: `${baseUrl}/fr/service`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          fr: `${baseUrl}/fr/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/blog`,
          fr: `${baseUrl}/fr/blog`,
        },
      },
    },
  ]

  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${baseUrl}/blog/${post.slug}`,
        fr: `${baseUrl}/fr/blog/${post.slug}`,
      },
    },
  }))

  return [...staticPages, ...blogPosts]
}