import type { MetadataRoute } from "next";
import { ARTICLES, articleHref } from "@/app/data/insights";
import { SITE_URL as BASE_URL } from "@/app/data/site";

const STATIC_PATHS = [
  "",
  "/trade",
  "/investment",
  "/branding",
  "/policy-and-access",
  "/insights",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.map((path) => ({ url: `${BASE_URL}${path}` })),
    ...ARTICLES.map((article) => ({
      url: `${BASE_URL}${articleHref(article)}`,
      lastModified: article.published,
    })),
  ];
}
