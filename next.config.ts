import type { NextConfig } from 'next'

/**
 * Fully static export for GitHub Pages. `trailingSlash` emits
 * `route/index.html`, which Pages serves without extension or redirect issues.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
}

export default nextConfig
