import { industryArticles } from '@/content/industries/articles'
import { industryGroups } from '@/content/industries/taxonomy'
import type { IndustryArticle, IndustryGroup, SubIndustry } from '@/content/industries/types'

export { industryGroups }

export function industryHref(group: string, sub?: string): string {
  return sub ? `/industries/${group}/${sub}` : `/industries/${group}`
}

export function getGroup(slug: string): IndustryGroup | undefined {
  return industryGroups.find((g) => g.slug === slug)
}

export function getSub(groupSlug: string, subSlug: string): { group: IndustryGroup; sub: SubIndustry } | undefined {
  const group = getGroup(groupSlug)
  const sub = group?.subs.find((s) => s.slug === subSlug)
  return group && sub ? { group, sub } : undefined
}

export function getArticle(groupSlug: string, subSlug: string): IndustryArticle | undefined {
  return industryArticles.find((a) => a.group === groupSlug && a.sub === subSlug)
}

export function hasArticle(groupSlug: string, subSlug: string): boolean {
  return Boolean(getArticle(groupSlug, subSlug))
}

/** Resolve a "group/sub" reference into display data; ignores unknown refs. */
export function resolveIndustryRefs(refs: string[]) {
  return refs.flatMap((ref) => {
    const [g, s] = ref.split('/')
    const found = g && s ? getSub(g, s) : undefined
    return found
      ? [{ href: industryHref(found.group.slug, found.sub.slug), name: found.sub.name, summary: found.sub.summary, group: found.group.shortName, published: hasArticle(g!, s!) }]
      : []
  })
}

export function allSubRoutes() {
  return industryGroups.flatMap((g) => g.subs.map((s) => ({ industry: g.slug, subindustry: s.slug })))
}

export const publishedIndustryCount = industryArticles.length
export const totalSubIndustryCount = industryGroups.reduce((n, g) => n + g.subs.length, 0)

/**
 * Homepage feature list. Each entry points at a published analysis.
 */
export const featuredIndustries = [
  { ref: 'retail/electronics', name: 'Electronics and Wholesale Distribution', visual: 'electronics', body: 'Serial-tracked devices, warranty claims, trade credit and stock moving between branches every day.' },
  { ref: 'retail/fashion', name: 'Fashion and Apparel', visual: 'fashion', body: 'Size and colour matrices, seasonal buying, broken size runs and markdown timing.' },
  { ref: 'food-hospitality/restaurants', name: 'Restaurants and Hospitality', visual: 'restaurant', body: 'Recipes, ingredient-level stock, kitchen routing and orders arriving from every channel.' },
  { ref: 'real-estate/property-management', name: 'Real Estate and Property Management', visual: 'property', body: 'Lease terms, rent and service charges, maintenance accountability and owner reporting.' },
  { ref: 'manufacturing/discrete-manufacturing', name: 'Manufacturing', visual: 'manufacturing', body: 'Bills of materials, capacity-aware plans, shop-floor reality and costs that reflect it.' },
  { ref: 'travel/tour-operators', name: 'Travel and Tour Operations', visual: 'travel', body: 'Supplier contracts, allocations, late changes and the true margin of each departure.' },
  { ref: 'healthcare/healthcare-administration', name: 'Healthcare Administration', visual: 'healthcare', body: 'Multi-site scheduling, claims that are right first time, rostering and controlled supplies.' },
  { ref: 'professional-services/consulting', name: 'Professional Services', visual: 'services', body: 'Staffing conflicts, mixed billing models, timesheets and engagement margin.' },
] as const

export type IndustryVisualKind = (typeof featuredIndustries)[number]['visual']
