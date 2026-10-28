import { aiNativeErpArchitecture, legacyModernization, whySoftwareMustAdapt } from '@/content/insights/articles-a'
import { aiAssistedEngineering, dataOwnership, multiBranchRetail } from '@/content/insights/articles-b'
import { introducingDeepSuite } from '@/content/insights/articles-c'
import { insightCategories, type Block, type Insight, type InsightCategorySlug } from '@/content/insights/types'

export { insightCategories }
export type { Insight, InsightCategorySlug }

/** Editorial order: the first entry is featured on the index page. */
export const insights: Insight[] = [
  aiNativeErpArchitecture,
  whySoftwareMustAdapt,
  multiBranchRetail,
  legacyModernization,
  aiAssistedEngineering,
  dataOwnership,
  introducingDeepSuite,
]

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug)
}

export function getCategory(slug: string) {
  return insightCategories.find((c) => c.slug === slug)
}

export function categoryName(slug: InsightCategorySlug): string {
  return getCategory(slug)?.name ?? slug
}

function blockText(b: Block): string {
  return b.type === 'ul' || b.type === 'ol' ? b.items.join(' ') : b.text
}

export function readingMinutes(insight: Insight): number {
  const words = insight.body.map(blockText).join(' ').split(/\s+/).length
  return Math.max(1, Math.round(words / 225))
}

export function tableOfContents(insight: Insight) {
  return insight.body.flatMap((b) => (b.type === 'h2' ? [{ id: b.id, text: b.text }] : []))
}

export function relatedInsights(insight: Insight, limit = 3): Insight[] {
  const sameCategory = insights.filter((i) => i.slug !== insight.slug && i.category === insight.category)
  const sharedIndustry = insights.filter(
    (i) => i.slug !== insight.slug && !sameCategory.includes(i) && i.industries.some((r) => insight.industries.includes(r)),
  )
  const rest = insights.filter((i) => i.slug !== insight.slug && !sameCategory.includes(i) && !sharedIndustry.includes(i))
  return [...sameCategory, ...sharedIndustry, ...rest].slice(0, limit)
}

export function insightsByCategory(slug: InsightCategorySlug): Insight[] {
  return insights.filter((i) => i.category === slug)
}

/** Serializable summary used by client-side filtering. */
export function insightSummaries() {
  return insights.map((i) => ({
    slug: i.slug,
    title: i.title,
    description: i.description,
    category: i.category,
    categoryName: categoryName(i.category),
    format: i.format,
    minutes: readingMinutes(i),
    publishedAt: i.publishedAt ?? null,
  }))
}

export type InsightSummary = ReturnType<typeof insightSummaries>[number]

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}
