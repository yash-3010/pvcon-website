import type { MetadataRoute } from "next";
import { siteDetails } from "@/data/common/siteDetails";
import { getAllPosts } from "@/lib/blogs";
import { getAllSubServiceParams } from "@/data/services/config";
import { routing } from "@/i18n/routing";
import { getAlternateUrls } from "@/lib/i18n-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const { locales, defaultLocale } = routing;
  const posts = getAllPosts();

  // Static routes to include in the sitemap
  const staticRoutes = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/services/gxp-audits", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/services/pv-consulting", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/services/training-upskilling", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/services/medical-writing", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/products/psmf-manager", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/gallery", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/team", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/team/moin-don", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/team/rameez-don", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/team/nazrul-khan", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/terms-of-service", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/cookie-policy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/disclaimer", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/impressum", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  // Sub-service routes
  const subServiceRoutes = getAllSubServiceParams().map(({ slug, subSlug }) => ({
    path: `/services/${slug}/${subSlug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog post routes
  const blogRoutes = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: new Date(post.updatedAt || post.publishedAt),
  }));

  const allRoutes = [...staticRoutes, ...subServiceRoutes, ...blogRoutes];

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
