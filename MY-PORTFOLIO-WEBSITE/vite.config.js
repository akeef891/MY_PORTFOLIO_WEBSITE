import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { DEFAULT_SITE_URL } from "./site.config.js";

function seoBuildPlugin(siteUrl) {
  const base = siteUrl.replace(/\/$/, "") || DEFAULT_SITE_URL;

  return {
    name: "portfolio-seo",
    transformIndexHtml(html) {
      return html.replaceAll("__SITE_URL__", base);
    },
    closeBundle() {
      const outDir = resolve(process.cwd(), "dist");
      const lastmod = new Date().toISOString().slice(0, 10);

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

      const robots = `User-agent: *
Allow: /

Disallow: /.netlify/

Sitemap: ${base}/sitemap.xml
`;

      writeFileSync(resolve(outDir, "sitemap.xml"), sitemap, "utf8");
      writeFileSync(resolve(outDir, "robots.txt"), robots, "utf8");
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL || DEFAULT_SITE_URL;

  return {
    plugins: [react(), tailwindcss(), seoBuildPlugin(siteUrl)],
    build: {
      target: "es2020",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("firebase")) return "firebase";
          },
        },
      },
    },
  };
});
