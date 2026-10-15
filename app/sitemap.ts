import type { MetadataRoute } from "next";
import { POSTS, postPath } from "@/lib/posts";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/about-us/", priority: 0.9 },
    { path: "/become-volunteer/", priority: 0.8 },
    { path: "/contact-us/", priority: 0.7 },
    { path: "/blog/", priority: 0.8 },
    { path: "/photo-gallery/", priority: 0.6 },
  ];
  return [
    ...pages.map(({ path, priority }) => ({ url: `${SITE.url}${path}`, priority })),
    ...POSTS.map((p) => ({
      url: `${SITE.url}${postPath(p)}`,
      lastModified: p.date,
      priority: 0.6,
    })),
  ];
}
