import { solutions } from '@/content/solutions'
import { industryGroups } from './industries'

export interface NavLink {
  label: string
  href: string
  description?: string
}

export const solutionLinks: NavLink[] = solutions.map((s) => ({
  label: s.name,
  href: `/solutions/${s.slug}`,
  description: s.navDescription,
}))

export const insightLinks: NavLink[] = [
  { label: 'Industry Research', href: '/insights/category/industry-research', description: 'How industries operate and what their systems need.' },
  { label: 'Engineering Perspectives', href: '/insights/category/software-architecture', description: 'Architecture and design for maintainable enterprise systems.' },
  { label: 'AI and Enterprise Technology', href: '/insights/category/enterprise-ai', description: 'Governed AI inside business operations.' },
  { label: 'Implementation Guides', href: '/insights/category/engineering-implementation', description: 'From requirements to production, practically.' },
  { label: 'Company Updates', href: '/insights/category/deepsuite-updates', description: 'News about DeepSuite and its work.' },
]

export const aboutLinks: NavLink[] = [
  { label: 'About DeepSuite', href: '/about', description: 'Who we are and what we are building.' },
  { label: 'Our Approach', href: '/approach', description: 'How we take systems from requirements to production.' },
  { label: 'Architecture and Engineering', href: '/about/architecture', description: 'The technical principles behind our work.' },
  { label: 'Deployment and Ownership', href: '/about/deployment', description: 'Hosting options and source-code terms.' },
  { label: 'Contact', href: '/contact', description: 'Start a conversation about your project.' },
]

export const mainNav = [
  { id: 'solutions', label: 'Solutions', href: '/solutions' },
  { id: 'industries', label: 'Industries', href: '/industries' },
  { id: 'insights', label: 'Insights', href: '/insights' },
  { id: 'about', label: 'About', href: '/about' },
] as const

export type MainNavId = (typeof mainNav)[number]['id']

/** Lightweight, serializable taxonomy for client navigation components. */
export const industryNav = industryGroups.map((g) => ({
  slug: g.slug,
  letter: g.letter,
  name: g.name,
  shortName: g.shortName,
  summary: g.summary,
  coverage: g.coverage,
  subs: g.subs.map((s) => ({ slug: s.slug, name: s.name })),
}))

export type IndustryNavGroup = (typeof industryNav)[number]
