import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { ArchitectureLayers } from '@/components/insights/architecture-layers'
import { InsightsBrowser } from '@/components/insights/insights-browser'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { categoryName, insightCategories, insights, insightsByCategory, insightSummaries, readingMinutes } from '@/lib/insights'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Insights — Enterprise AI, ERP and Industry Research',
  description:
    'Research and perspectives from DeepSuite on AI-native enterprise software, ERP architecture, legacy modernization, industry operations and engineering practice.',
  path: '/insights',
})

export default function InsightsPage() {
  const featured = insights[0]!
  const categories = insightCategories.map((c) => ({ slug: c.slug, name: c.name, count: insightsByCategory(c.slug).length })).filter((c) => c.count > 0)

  return (
    <>
      <header className="border-b border-line bg-paper pt-28 lg:pt-36">
        <div className="container-site pb-14 lg:pb-16">
          <Breadcrumbs items={[{ name: 'Insights', href: '/insights' }]} />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow">Insights</p>
            <h1 className="mt-5 text-h1 font-semibold text-balance text-ink">Ideas for the next generation of enterprise software.</h1>
            <p className="mt-6 text-lead text-muted">
              Research, engineering perspectives and implementation guides from the DeepSuite team.
            </p>
          </div>
        </div>
      </header>

      <section className="bg-white pt-14" aria-labelledby="featured-title">
        <div className="container-site">
          <Link href={`/insights/${featured.slug}`} className="on-dark group relative grid overflow-hidden rounded-2xl bg-navy text-white lg:grid-cols-[1.3fr_1fr]">
            <div className="relative p-8 sm:p-12">
              <p className="eyebrow">Featured · {categoryName(featured.category)}</p>
              <h2 id="featured-title" className="mt-6 max-w-xl text-[2rem] leading-[1.12] font-semibold tracking-tight text-balance">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/65">{featured.description}</p>
              <p className="mt-10 inline-flex items-center gap-2 text-[0.9rem] text-white group-hover:text-teal">
                Read the article · {readingMinutes(featured)} min <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </p>
            </div>
            <div className="grid-texture relative hidden border-l border-line-dark lg:block" aria-hidden="true">
              <ArchitectureLayers className="absolute inset-0 m-auto h-[80%] w-[85%]" />
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20" aria-label="All articles">
        <div className="container-site">
          <InsightsBrowser items={insightSummaries()} categories={categories} />
        </div>
      </section>
      <ConsultationCta />
    </>
  )
}
