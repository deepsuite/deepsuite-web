import type { NextConfig } from 'next'

/**
 * Base path the site is served under. In CI it comes from
 * actions/configure-pages: empty when the custom domain (deepsuite.app) is
 * attached, `/deepsuite-web` while only the github.io project URL exists.
 */
const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/\/$/, '')

/**
 * Fully static export for GitHub Pages. `trailingSlash` emits
 * `route/index.html`, which Pages serves without extension or redirect issues.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
}

export default nextConfig
