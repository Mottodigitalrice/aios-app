import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/sign-in", "/sign-up", "/dashboard", "/leads", "/reports", "/report"],
    },
    sitemap: "https://aios.mottodigital.jp/sitemap.xml",
  };
}
