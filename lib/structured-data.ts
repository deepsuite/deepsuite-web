import { absoluteUrl, site } from './site'

export interface Crumb {
  name: string
  href: string
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: absoluteUrl('/icon.svg'),
    description: site.description,
    ...(site.contactEmail ? { email: site.contactEmail } : {}),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  }
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  }
}

export function articleSchema(input: { title: string; description: string; path: string; section: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    articleSection: input.section,
    mainEntityOfPage: absoluteUrl(input.path),
    // Authored by the organization; no individual author is claimed.
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
  }
}

export function serviceSchema(input: { name: string; description: string; path: string; audience?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: 'Enterprise software engineering',
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    ...(input.audience ? { audience: { '@type': 'BusinessAudience', name: input.audience } } : {}),
  }
}

export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
