import type { Metadata } from 'next'
import { absoluteUrl, site } from './site'

interface PageMetaInput {
  title: string
  description: string
  path: string
  /** Set false for pages that should render but stay out of search indexes. */
  index?: boolean
  type?: 'website' | 'article'
}

export function pageMetadata({ title, description, path, index = true, type = 'website' }: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type,
      url,
      title: `${title} · ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [site.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${site.name}`,
      description,
      images: [site.ogImage.url],
    },
  }
}
