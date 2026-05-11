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
    id: 4,
    title: "blog_post_4_title",
    slug: "why-digital-communication-matters-for-your-business-in-2026",
    date: "blog_post_4_date",
    category: "Marketing",
    image: "/assets/img/bg-img/47.webp",
    excerpt: "blog_post_4_excerpt",
    content: [
      "blog_post_4_p_1",
      "blog_post_4_p_2",
      "blog_post_4_p_3",
      "blog_post_4_p_4",
      "blog_post_4_p_5",
      "blog_post_4_p_6",
      "blog_post_4_p_7",
      "blog_post_4_p_8",
      "blog_post_4_p_9",
      "blog_post_4_p_10",
      "blog_post_4_p_11",
      "blog_post_4_p_12",
      "blog_post_4_p_13",
      "blog_post_4_p_14",
      "blog_post_4_p_15",
      "blog_post_4_p_16",
      "blog_post_4_p_17",
      "blog_post_4_p_18",
      "blog_post_4_p_19",
    ],
    tags: ["Digital", "Business", "Creative", "Modern", "Marketing"],
    author: "Dev Agency",
  },

  {
    id: 5,
    title: "blog_post_5_title",
    slug: "digital-transformation-it-s-not-just-software",
    date: "blog_post_5_date",
    category: "UI/UX Design",
    image: "/assets/img/bg-img/48.webp",
    excerpt: "blog_post_5_excerpt",
    content: [
      "blog_post_5_p_1",
      "blog_post_5_p_2",
      "blog_post_5_p_3",
      "blog_post_5_p_4",
      "blog_post_5_p_5",
      "blog_post_5_p_6",
      "blog_post_5_p_7",
      "blog_post_5_p_8",
      "blog_post_5_p_9",
      "blog_post_5_p_10",
      "blog_post_5_p_11",
      "blog_post_5_p_12",
      "blog_post_5_p_13",
      "blog_post_5_p_14",
      "blog_post_5_p_15",
      "blog_post_5_p_16",
      "blog_post_5_p_17",
    ],
    tags: ["Digital", "Business", "Marketing", "Modern", "Design"],
    author: "Dev Agency",
  },
]

export const SIDEBAR_RECENT_POSTS = [BLOG_POSTS[0], BLOG_POSTS[1]]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getBlogPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id)
}
