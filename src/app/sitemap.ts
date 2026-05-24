import type { MetadataRoute } from "next"
import { STATES } from "@/lib/states-data"
import { BLOG_POSTS } from "@/lib/blog-posts"
import { SEO_PAGES } from "@/lib/seo-pages-data"

const BASE_URL = "https://www.lienfile.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/file`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/deadline-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/states`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // State pages
  const statePages: MetadataRoute.Sitemap = Object.keys(STATES).map(
    (slug) => ({
      url: `${BASE_URL}/states/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  )

  // Blog index + posts
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]

  // SEO landing pages
  const seoPages: MetadataRoute.Sitemap = SEO_PAGES.map((page) => ({
    url: `${BASE_URL}/lien/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [...staticPages, ...statePages, ...blogPages, ...seoPages]
}
