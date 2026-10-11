import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: `${siteConfig.copyrightYear}-01-01`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
