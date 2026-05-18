export interface BlogPost {
  id: number
  title: string
  slug: string
  date: string
  sortDate: string
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
  readingTimeMinutes: number
  serviceAlignment?: string
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
    sortDate: "2026-05-11",
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
    readingTimeMinutes: 12,
  },

  {
    id: 6,
    title: "blog_post_6_title",
    slug: "why-most-small-businesses-in-morocco-need-a-website-in-2026",
    date: "blog_post_6_date",
    sortDate: "2026-05-13",
    category: "UI/UX Design",
    image: "/assets/img/bg-img/49.webp",
    excerpt: "blog_post_6_excerpt",
    content: [
      "blog_post_6_p_1",
      "blog_post_6_p_2",
      "blog_post_6_p_3",
      "blog_post_6_p_4",
      "blog_post_6_p_5",
      "blog_post_6_p_6",
      "blog_post_6_p_7",
      "blog_post_6_p_8",
      "blog_post_6_p_9",
      "blog_post_6_p_10",
      "blog_post_6_p_11",
      "blog_post_6_p_12",
      "blog_post_6_p_13",
      "blog_post_6_p_14",
      "blog_post_6_p_15",
      "blog_post_6_p_16",
      "blog_post_6_p_17",
      "blog_post_6_p_18",
      "blog_post_6_p_19",
      "blog_post_6_p_20",
      "blog_post_6_p_21",
      "blog_post_6_p_22",
      "blog_post_6_p_23",
      "blog_post_6_p_24",
      "blog_post_6_p_25",
      "blog_post_6_p_26",
      "blog_post_6_p_27",
      "blog_post_6_p_28",
      "blog_post_6_p_29",
      "blog_post_6_p_30",
      "blog_post_6_p_31",
      "blog_post_6_p_32",
      "blog_post_6_p_33",
      "blog_post_6_p_34",
      "blog_post_6_p_35",
      "blog_post_6_p_36",
      "blog_post_6_p_37",
      "blog_post_6_p_38",
      "blog_post_6_p_39",
      "blog_post_6_p_40",
      "blog_post_6_p_41",
    ],
    tags: ["Digital", "Modern", "Business", "Creative", "Agency"],
    author: "Dev Agency",
    readingTimeMinutes: 22,
  },

  {
    id: 7,
    title: "blog_post_7_title",
    slug: "why-your-communication-plan-matters-and-how-to-create-one-that-works",
    date: "blog_post_7_date",
    sortDate: "2025-12-11",
    category: "Marketing",
    image: "/assets/img/bg-img/50.webp",
    excerpt: "blog_post_7_excerpt",
    content: [
      "blog_post_7_p_1",
      "blog_post_7_p_2",
      "blog_post_7_p_3",
      "blog_post_7_p_4",
      "blog_post_7_p_5",
      "blog_post_7_p_6",
      "blog_post_7_p_7",
      "blog_post_7_p_8",
      "blog_post_7_p_9",
      "blog_post_7_p_10",
      "blog_post_7_p_11",
      "blog_post_7_p_12",
      "blog_post_7_p_13",
      "blog_post_7_p_14",
      "blog_post_7_p_15",
      "blog_post_7_p_16",
      "blog_post_7_p_17",
      "blog_post_7_p_18",
      "blog_post_7_p_19",
      "blog_post_7_p_20",
      "blog_post_7_p_21",
      "blog_post_7_p_22",
      "blog_post_7_p_23",
      "blog_post_7_p_24",
      "blog_post_7_p_25",
      "blog_post_7_p_26",
      "blog_post_7_p_27",
      "blog_post_7_p_28",
      "blog_post_7_p_29",
      "blog_post_7_p_30",
      "blog_post_7_p_31",
      "blog_post_7_p_32",
      "blog_post_7_p_33",
    ],
    tags: ["communication", "project management", "business strategy", "team collaboration", "Agency", "Marketing"],
    author: "Dev Agency",
    readingTimeMinutes: 8,
  },

  {
    id: 8,
    title: "blog_post_8_title",
    slug: "why-your-website-isn-t-converting-and-the-3-step-strategy-design-dev-fix-that-ac",
    date: "blog_post_8_date",
    sortDate: "2026-05-18",
    category: "UI/UX Design",
    image: "/assets/img/bg-img/51.webp",
    excerpt: "blog_post_8_excerpt",
    content: [
      "blog_post_8_p_1",
      "blog_post_8_p_2",
      "blog_post_8_p_3",
      "blog_post_8_p_4",
      "blog_post_8_p_5",
      "blog_post_8_p_6",
      "blog_post_8_p_7",
      "blog_post_8_p_8",
      "blog_post_8_p_9",
      "blog_post_8_p_10",
      "blog_post_8_p_11",
      "blog_post_8_p_12",
      "blog_post_8_p_13",
      "blog_post_8_p_14",
      "blog_post_8_p_15",
      "blog_post_8_p_16",
      "blog_post_8_p_17",
      "blog_post_8_p_18",
      "blog_post_8_p_19",
      "blog_post_8_p_20",
      "blog_post_8_p_21",
      "blog_post_8_p_22",
      "blog_post_8_p_23",
      "blog_post_8_p_24",
      "blog_post_8_p_25",
      "blog_post_8_p_26",
      "blog_post_8_p_27",
      "blog_post_8_p_28",
      "blog_post_8_p_29",
      "blog_post_8_p_30",
      "blog_post_8_p_31",
      "blog_post_8_p_32",
      "blog_post_8_p_33",
      "blog_post_8_p_34",
      "blog_post_8_p_35",
      "blog_post_8_p_36",
      "blog_post_8_p_37",
      "blog_post_8_p_38",
      "blog_post_8_p_39",
      "blog_post_8_p_40",
      "blog_post_8_p_41",
      "blog_post_8_p_42",
      "blog_post_8_p_43",
      "blog_post_8_p_44",
    ],
    quote: {
      text: "blog_post_8_quote",
    },
    tags: ["conversion-rate-optimization", "web-design", "web-development", "digital-strategy", "ux-design", "website-performance"],
    author: "Dev Agency",
    readingTimeMinutes: 10,
    serviceAlignment: "web-design",
  },
]

export const SIDEBAR_RECENT_POSTS = [BLOG_POSTS[0], BLOG_POSTS[1], BLOG_POSTS[2]]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getBlogPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id)
}
