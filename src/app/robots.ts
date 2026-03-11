import type { MetadataRoute } from "next";
import { siteDetails } from "@/data/common/siteDetails";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteDetails.siteUrl}/sitemap.xml`,
  };
}