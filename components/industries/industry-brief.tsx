import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import type { IndustryGroup, SubIndustry } from '@/content/industries/types'
import { coverageLabels } from '@/content/industries/types'
import { hasArticle, industryHref } from '@/lib/industries'
import { ConsultationCta } from '../home/consultation-cta'
import { Breadcrumbs } from '../ui/breadcrumbs'
import { CoverageBadge } from '../ui/coverage-badge'

/**
 * Brief page for a sub-industry whose in-depth analysis is not yet written.
 * It is useful for navigation and enquiries but is excluded from indexing.
 */
export function IndustryBrief({ group, sub }: { group: IndustryGroup; sub: SubIndustry }) {
  const siblings = group.subs.filter((s) => s.slug !== sub.slug)
  const published = siblings.filter((s) => hasArticle(group.slug, s.slug))
  const ordered = [...published, ...siblings.filter((s) => !published.includes(s))].slice(0, 6)

  return (
    <>
      <header className="border-b border-line bg-paper pt-28 lg:pt-36">
        <div className="container-site pb-14 lg:pb-16">
          <Breadcrumbs
            items={[
              { name: 'Industries', href: '/industries' },
              { name: group.shortName, href: industryHref(group.slug) },
              { name: sub.name, href: industryHref(group.slug, sub.slug) },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow">{group.shortName} · Industry brief</p>
            <h1 className="mt-5 text-h1 font-semibold text-balance text-ink">{sub.name}</h1>
            <p className="mt-6 text-lead text-muted">{sub.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CoverageBadge coverage={group.coverage} />
              <span className="text-[0.85rem] text-muted">{coverageLabels[group.coverage].description}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr] lg:py-20">
          <div className="space-y-12">
            <section aria-labelledby="focus-title">
              <h2 id="focus-title" className="text-[1.5rem] font-semibold tracking-tight text-ink">
                Operational focus areas
              </h2>
              <p className="mt-3 text-[0.95rem] text-muted">
                Concerns that typically shape enterprise systems for {sub.name.toLowerCase()}.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {sub.focus.map((f, i) => (
                  <li key={f} className="flex items-center gap-4 rounded-lg border border-line p-4">
                    <span className="font-mono text-[0.68rem] text-teal-ink">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[0.95rem] font-medium text-ink">{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="context-title">
              <h2 id="context-title" className="text-[1.5rem] font-semibold tracking-tight text-ink">
                Industry context
              </h2>
              <div className="prose-ds mt-4 max-w-none">
                {group.overview.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="modules-title" className="grid gap-8 sm:grid-cols-2">
              <div>
                <h2 id="modules-title" className="text-[1.15rem] font-semibold text-ink">
                  Typical modules
                </h2>
                <ul className="mt-4 space-y-2">
                  {group.commonModules.map((m) => (
                    <li key={m} className="flex gap-3 text-[0.92rem] text-ink-soft">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-teal-ink" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-[1.15rem] font-semibold text-ink">Shared workflows</h2>
                <ul className="mt-4 space-y-2">
                  {group.sharedWorkflows.map((m) => (
                    <li key={m} className="flex gap-3 text-[0.92rem] text-ink-soft">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-indigo-ink" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-line bg-paper p-6">
              <FileText className="h-5 w-5 text-teal-ink" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-4 text-[1rem] font-semibold text-ink">In-depth analysis in preparation</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                A full analysis of {sub.name.toLowerCase()} operations — workflows, data model, AI use cases and implementation
                approach — has not been published yet. If this is your industry, a consultation starts with exactly that
                discovery.
              </p>
              <Link href="/contact" className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-navy px-4 text-[0.85rem] font-medium text-white hover:bg-graphite">
                Book a Consultation
              </Link>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">More in {group.shortName}</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {ordered.map((s) => (
                  <li key={s.slug}>
                    <Link href={industryHref(group.slug, s.slug)} className="group flex items-center justify-between gap-4 py-3 text-[0.9rem] text-ink-soft hover:text-ink">
                      <span>{s.name}</span>
                      {hasArticle(group.slug, s.slug) ? (
                        <span className="font-mono text-[0.6rem] tracking-wider text-teal-ink uppercase">Analysis</span>
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <ConsultationCta />
    </>
  )
}
