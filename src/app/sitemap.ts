// src/app/sitemap.ts
// ✅ Génère /sitemap.xml : liste les routes publiques à indexer.
// NOTE: plus tard, si tu as des projets dynamiques, on itèrera ici.

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // 🔗 Routes statiques actuelles
  const routes = ["", "services", "realisations", "contact", "merci"];

  const now = new Date();

  return routes.map((path) => ({
    url: new URL(`/${path}`, siteUrl).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));
}
