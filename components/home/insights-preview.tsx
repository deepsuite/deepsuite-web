import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { categoryName, insights, readingMinutes } from '@/lib/insights'
import { ArchitectureLayers } from '../insights/architecture-layers'
import { ButtonLink } from '../ui/button'
import { SectionHeading } from '../ui/section-heading'

export function InsightsPreview() {
  const [featured, ...rest] = insights.filter((i) => i.category !== 'deepsuite-updates')
  if (!featured) return null
  return (
    <section className="bg-paper py-24 lg:py-32" aria-labelledby="insights-title">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Insights and research"
            title={<span id="insights-title">Ideas for the next generation of enterprise software.</span>}
          />
          <ButtonLink href="/insights" variant="secondary" arrow className="shrink-0">
            Explore All Insights
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Link
            href={`/insights/${featured.slug}`}
            className="on-dark group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-xl bg-navy p-8 text-white sm:p-10"
            data-reveal
          >
            <div className="grid-texture pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow">
                {categoryName(featured.category)} · {featured.format}
              </p>
              <h3 className="mt-6 max-w-lg text-[1.9rem] leading-[1.15] font-semibold tracking-tight text-balance">{featured.title}</h3>
              <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-white/65">{featured.description}</p>
            </div>
            <ArchitectureLayers className="relative mx-auto my-8 w-full max-w-[380px]" />
            <div className="relative flex items-center justify-between text-[0.85rem] text-white/60">
              <span>{readingMinutes(featured)} min read</span>
              <span className="inline-flex items-center gap-2 text-white group-hover:text-teal">
                Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </Link>

          <ul className="divide-y divide-line rounded-xl border border-line bg-white">
            {rest.slice(0, 5).map((a) => (
              <li key={a.slug}>
                <Link href={`/insights/${a.slug}`} className="group flex items-start justify-between gap-6 p-5 transition-colors hover:bg-paper/60 sm:p-6">
                  <span>
                    <span className="font-mono text-[0.62rem] tracking-wider text-teal-ink uppercase">{categoryName(a.category)}</span>
                    <span className="mt-1.5 block text-[1rem] leading-snug font-medium text-ink">{a.title}</span>
                    <span className="mt-1 block text-[0.8rem] text-muted">
                      {a.format} · {readingMinutes(a)} min read
                    </span>
                  </span>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted group-hover:text-teal-ink" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
