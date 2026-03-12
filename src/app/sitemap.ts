import type { MetadataRoute } from "next";
import { siteDetails } from "@/data/common/siteDetails";
import { getAllPosts } from "@/lib/blogs";
import { routing } from "@/i18n/routing";
import { getAlternateUrls } from "@/lib/i18n-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const { locales, defaultLocale } = routing;
  const posts = getAllPosts();

  // Static routes to include in the sitemap
  const staticRoutes = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // Blog post routes
  const blogRoutes = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: new Date(post.updatedAt || post.publishedAt),
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes];

  // Generate one entry per locale per route (Google recommendation)
  const entries: MetadataRoute.Sitemap = allRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url:
        locale === defaultLocale
          ? `${siteDetails.siteUrl}${route.path}`
          : `${siteDetails.siteUrl}/${locale}${route.path}`,
      lastModified: ("lastModified" in route ? route.lastModified : new Date()) as Date,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: getAlternateUrls(route.path),
      },
    }))
  );

  return entries;
}
