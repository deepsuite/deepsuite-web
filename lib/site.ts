/**
 * Site-wide configuration. Values that identify real-world contact channels
 * come from environment variables so nothing is invented in source.
 */
export const site = {
  name: 'DeepSuite',
  legalName: 'DeepSuite',
  tagline: 'Enterprise software, engineered around your business.',
  description:
    'DeepSuite designs, builds, deploys and maintains AI-native enterprise applications tailored to how your organization operates — with flexible deployment and source-code ownership under agreed terms.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deepsuite.app').replace(/\/$/, ''),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL || null,
  /** External endpoint that receives consultation enquiries as JSON (the site is static). */
  consultationEndpoint: process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT || null,
  locale: 'en_US',
  ogImage: { url: '/og-image.png', width: 1200, height: 630, alt: 'DeepSuite — Enterprise software, engineered around your business.' },
} as const

/**
 * Absolute URL for a site path. Page paths get a trailing slash to match the
 * static export (`trailingSlash: true`); file paths such as /sitemap.xml do not.
 */
export function absoluteUrl(path = '/'): string {
  let p = path.startsWith('/') ? path : `/${path}`
  const isFile = /\.[a-z0-9]+$/i.test(p)
  if (!isFile && !p.endsWith('/')) p = `${p}/`
  return `${site.url}${p}`
}
