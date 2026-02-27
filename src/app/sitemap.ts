import type { MetadataRoute } from "next";
import { siteDetails } from "@/data/siteDetails";
import { pageMetadata } from "@/data/pageMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteDetails.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: pageMetadata.about.canonical,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}