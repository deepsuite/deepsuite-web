import { solutions } from '@/content/solutions'
import { getGroup, industryHref } from '@/lib/industries'
import { industryArticles } from '@/content/industries/articles'
import { categoryName, insights } from '@/lib/insights'
import { aboutLinks, industryNav, insightLinks } from '@/lib/navigation'
import { HeaderClient, type HeaderData } from './header-client'

export function SiteHeader() {
  const featured = insights[0]!
  const data: HeaderData = {
    solutions: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}`, description: s.navDescription, icon: s.icon })),
    industries: industryNav,
    publishedIndustries: industryArticles.map((a) => {
      const group = getGroup(a.group)!
      const sub = group.subs.find((s) => s.slug === a.sub)!
      return { href: industryHref(a.group, a.sub), name: sub.name, group: group.shortName }
    }),
    insights: insightLinks,
    featuredInsight: { href: `/insights/${featured.slug}`, title: featured.title, category: categoryName(featured.category) },
    about: aboutLinks,
  }
  return <HeaderClient data={data} />
}
