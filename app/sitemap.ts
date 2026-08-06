import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Add a route here when you add a page. Once you have more than a handful,
// generate this from a route list rather than by hand.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
