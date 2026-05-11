export interface BlogPost {
  id: number
  title: string
  slug: string
  date: string
  category: string
  image: string
  excerpt: string
  content: string[]
  quote?: {
    text: string
    author?: string
  }
  tags: string[]
  author: string
}

export interface BlogCategory {
  key: string
  label: string
  count: number
}

export interface BlogTag {
  label: string
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { key: "category_agency", label: "Agency", count: 3 },
  { key: "category_business", label: "Business", count: 1 },
  { key: "category_development", label: "Development", count: 5 },
  { key: "category_ui_ux", label: "UI/UX Design", count: 2 },
  { key: "category_marketing", label: "Marketing", count: 4 },
]

export const BLOG_TAGS: BlogTag[] = [
  { label: "Agency" },
  { label: "Business" },
  { label: "Marketing" },
  { label: "Modern" },
  { label: "Creative" },
  { label: "Digital" },
  { label: "Design" },
  { label: "Awards" },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "blog_post_1_title",
    slug: "graphic-design-agency-your-brand-needs",
    date: "blog_post_1_date",
    category: "Agency",
    image: "/assets/img/bg-img/44.webp",
    excerpt: "blog_post_1_excerpt",
    content: [
      "blog_post_1_p_1",
      "blog_post_1_p_2",
      "blog_post_1_p_3",
    ],
    tags: ["Marketing", "Brand", "Business"],
    author: "Dev Agency",
  },
  {
    id: 2,
    title: "blog_post_2_title",
    slug: "providing-brilliant-ideas-for-your-business",
    date: "blog_post_2_date",
    category: "Business",
    image: "/assets/img/bg-img/45.webp",
    excerpt: "blog_post_2_excerpt",
    content: [],
    tags: ["Marketing", "Business"],
    author: "Dev Agency",
  },
  {
    id: 3,
    title: "blog_post_3_title",
    slug: "latest-trends-with-digital-marketing",
    date: "blog_post_3_date",
    category: "Marketing",
    image: "/assets/img/bg-img/46.webp",
    excerpt: "blog_post_3_excerpt",
    content: [
      "blog_post_3_p_1",
      "blog_post_3_p_2",
      "blog_post_3_p_3",
    ],
    quote: {
      text: "blog_post_3_quote",
    },
    tags: ["Marketing", "Brand", "Business"],
    author: "Dev Agency",
  },

  {
    id: 4,
    title: "blog_post_4_title",
    slug: "new-blog-post",
    date: "blog_post_4_date",
    category: "Agency",
    image: "/assets/img/bg-img/47.webp",
    excerpt: "blog_post_4_excerpt",
    content: [
      "blog_post_4_p_1",
    ],
    tags: ["Digital", "Creative", "Modern", "Agency"],
    author: "Dev Agency",
  },
]

export const SIDEBAR_RECENT_POSTS = [BLOG_POSTS[0], BLOG_POSTS[1], BLOG_POSTS[2], BLOG_POSTS[3]]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getBlogPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id)
}
