import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * GitHub Pages serves project pages under `/<repo>/`. The deploy workflow
 * exports `NEXT_PUBLIC_BASE_PATH=/furniture_storytelling`. Locally the env
 * is unset → no prefix → http://localhost:3000/ works as usual.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  // Static HTML export so GitHub Pages can serve it.
  output: "export",
  // Required by Pages — the default optimizer needs a Node server.
  images: { unoptimized: true },
  // Project-pages prefix; empty in dev.
  basePath,
  assetPrefix: basePath || undefined,
  // Pages-friendly URLs: /about/ → /about/index.html
  trailingSlash: true,
};

export default nextConfig;
