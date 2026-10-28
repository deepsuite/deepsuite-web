import type { MetadataRoute } from 'next'
import { solutions } from '@/content/solutions'
import { industryArticles } from '@/content/industries/articles'
import { industryGroups, industryHref } from '@/lib/industries'
import { insightCategories, insights, insightsByCategory } from '@/lib/insights'
import { absoluteUrl } from '@/lib/site'

/** Only indexable pages are listed; industry briefs and empty categories are excluded. */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/solutions', '/industries', '/insights', '/about', '/approach', '/about/architecture', '/about/deployment', '/contact']
  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), changeFrequency: 'monthly' as const, priority: p === '/' ? 1 : 0.8 })),
    ...solutions.map((s) => ({ url: absoluteUrl(`/solutions/${s.slug}`), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...industryGroups.map((g) => ({ url: absoluteUrl(industryHref(g.slug)), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...industryArticles.map((a) => ({ url: absoluteUrl(industryHref(a.group, a.sub)), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...insights.map((i) => ({
      url: absoluteUrl(`/insights/${i.slug}`),
      ...(i.updatedAt || i.publishedAt ? { lastModified: i.updatedAt ?? i.publishedAt } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...insightCategories
      .filter((c) => insightsByCategory(c.slug).length > 0)
      .map((c) => ({ url: absoluteUrl(`/insights/category/${c.slug}`), changeFrequency: 'weekly' as const, priority: 0.5 })),
  ]
}
