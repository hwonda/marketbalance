import type { NextConfig } from "next";

/**
 * Sub-path deployment (Next.js multi-zones). The redesign is served at marketbalance.vercel.app/v2
 * by setting NEXT_PUBLIC_BASE_PATH=/v2 on its Vercel project; the main site rewrites /v2/* to it.
 * Leave it unset to build for the domain root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

/**
 * Hosts allowed to call Server Actions (the inquiry form) besides this app's own host.
 * Behind the main site's rewrite the browser's Origin is the main domain, so list it here,
 * comma-separated, e.g. SERVER_ACTIONS_ALLOWED_ORIGINS=marketbalance.vercel.app
 */
const allowedOrigins = (process.env.SERVER_ACTIONS_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  basePath,
  // Lets a second dev server run beside the main one (e.g. NEXT_DIST_DIR=.next-agent next dev -p 3200).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  cacheComponents: true,
  partialPrefetching: true,
  ...(allowedOrigins.length > 0 ? { experimental: { serverActions: { allowedOrigins } } } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
