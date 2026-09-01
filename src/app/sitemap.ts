import type { MetadataRoute } from "next";
import { baseUrl, localePath, notes, projects } from "@/content/site";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work", "/gallery", "/notes", "/about", ...projects.map((p) => `/work/${p.slug}`), ...notes.map((n) => `/notes/${n.slug}`)];
  return paths.flatMap((path) => (["en", "zh"] as const).map((locale) => {
    const localized = localePath(locale, path);
    return {
      url: `${baseUrl}${localized === "/" ? "/" : `${localized}/`}`,
      lastModified: new Date("2026-09-02"),
      changeFrequency: path === "/" ? "monthly" as const : "yearly" as const,
      priority: path === "/" ? 1 : 0.7,
    };
  }));
}
