import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { IndustryExplorer, type ExplorerGroup } from '@/components/industries/industry-explorer'
import { IndustryVisual } from '@/components/industries/industry-visual'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CoverageBadge } from '@/components/ui/coverage-badge'
import { coverageLabels, type Coverage } from '@/content/industries/types'
import {
  featuredIndustries,
  getSub,
  hasArticle,
  industryGroups,
  industryHref,
  publishedIndustryCount,
  totalSubIndustryCount,
} from '@/lib/industries'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Industries — Enterprise Software by Sector',
  description:
    'How DeepSuite approaches enterprise software across retail, hospitality, manufacturing, real estate, distribution, travel, healthcare administration, professional services and more.',
  path: '/industries',
})

export default function IndustriesPage() {
  const groups: ExplorerGroup[] = industryGroups.map((g) => ({
    slug: g.slug,
    letter: g.letter,
    name: g.name,
    summary: g.summary,
    coverage: g.coverage,
    subs: g.subs.map((s) => ({ slug: s.slug, name: s.name, summary: s.summary, published: hasArticle(g.slug, s.slug) })),
  }))

  return (
    <>
      <header className="border-b border-line bg-paper pt-28 lg:pt-36">
        <div className="container-site pb-14 lg:pb-20">
          <Breadcrumbs items={[{ name: 'Industries', href: '/industries' }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">Industries</p>
              <h1 className="mt-5 text-h1 font-semibold text-balance text-ink">Enterprise software that reflects how each industry works.</h1>
              <p className="mt-6 max-w-2xl text-lead text-muted">
                Our industry library describes the operations, workflows and system requirements of the sectors DeepSuite
                serves or is building expertise in. {publishedIndustryCount} in-depth analyses are published across{' '}
                {totalSubIndustryCount} sectors, with more in preparation.
              </p>
            </div>
            <dl className="space-y-3 rounded-xl border border-line bg-white p-5">
              {(Object.keys(coverageLabels) as Coverage[]).map((c) => (
                <div key={c} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-4">
                  <dt className="sm:w-40 sm:shrink-0">
                    <CoverageBadge coverage={c} />
                  </dt>
                  <dd className="text-[0.82rem] leading-relaxed text-muted">{coverageLabels[c].description}</dd>
                </div>
              ))}
              <p className="border-t border-line pt-3 text-[0.75rem] text-muted">
                Coverage reflects the depth of DeepSuite’s domain work, not a list of clients or completed deployments.
              </p>
            </dl>
          </div>
        </div>
      </header>

      <section className="bg-white py-16 lg:py-20" aria-labelledby="featured-analyses">
        <div className="container-site">
          <h2 id="featured-analyses" className="text-h3 font-semibold text-ink">
            In-depth industry analyses
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredIndustries.map((f) => {
              const [g, s] = f.ref.split('/') as [string, string]
              const found = getSub(g, s)
              if (!found) return null
              return (
                <li key={f.ref}>
                  <Link href={industryHref(g, s)} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line hover:border-line-strong">
                    <IndustryVisual kind={f.visual} className="aspect-[300/170] border-b border-line" />
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[0.98rem] font-semibold text-ink">{found.sub.name}</h3>
                      <p className="mt-1.5 flex-1 text-[0.85rem] leading-relaxed text-muted">{f.body}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-ink group-hover:text-teal-ink">
                        Explore Industry <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 lg:py-20" aria-labelledby="library-title">
        <div className="container-site">
          <h2 id="library-title" className="mb-8 text-h3 font-semibold text-ink">
            The industry library
          </h2>
          <IndustryExplorer groups={groups} />
        </div>
      </section>
      <ConsultationCta />
    </>
  )
}
