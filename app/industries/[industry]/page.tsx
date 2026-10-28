import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CoverageBadge } from '@/components/ui/coverage-badge'
import { coverageLabels } from '@/content/industries/types'
import { getGroup, hasArticle, industryGroups, industryHref } from '@/lib/industries'
import { pageMetadata } from '@/lib/metadata'
import { cn } from '@/lib/cn'

export const dynamicParams = false

export function generateStaticParams() {
  return industryGroups.map((g) => ({ industry: g.slug }))
}

export async function generateMetadata(props: PageProps<'/industries/[industry]'>): Promise<Metadata> {
  const { industry } = await props.params
  const group = getGroup(industry)
  if (!group) return {}
  return pageMetadata({
    title: `${group.name} — Enterprise Software`,
    description: `${group.summary} How DeepSuite designs enterprise applications for ${group.name.toLowerCase()}.`,
    path: industryHref(group.slug),
  })
}

export default async function IndustryGroupPage(props: PageProps<'/industries/[industry]'>) {
  const { industry } = await props.params
  const group = getGroup(industry)
  if (!group) notFound()

  const subs = [...group.subs].sort((a, b) => Number(hasArticle(group.slug, b.slug)) - Number(hasArticle(group.slug, a.slug)))
  const others = industryGroups.filter((g) => g.slug !== group.slug)

  return (
    <>
      <header className="border-b border-line bg-paper pt-28 lg:pt-36">
        <div className="container-site pb-14 lg:pb-20">
          <Breadcrumbs items={[{ name: 'Industries', href: '/industries' }, { name: group.shortName, href: industryHref(group.slug) }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">Industry group {group.letter}</p>
              <h1 className="mt-5 text-h1 font-semibold text-balance text-ink">{group.name}</h1>
              <p className="mt-6 max-w-2xl text-lead text-muted">{group.summary}</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <CoverageBadge coverage={group.coverage} />
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{coverageLabels[group.coverage].description}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="prose-ds max-w-none">
            <h2 className="!mt-0">Operational landscape</h2>
            {group.overview.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h2 className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">Common modules</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.commonModules.map((m) => (
                  <li key={m} className="rounded-md border border-line bg-paper px-3 py-1.5 text-[0.85rem] text-ink">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">Shared workflows</h2>
              <ul className="mt-4 space-y-2">
                {group.sharedWorkflows.map((w) => (
                  <li key={w} className="flex gap-3 text-[0.92rem] text-ink-soft">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-teal-ink" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 lg:py-20" aria-labelledby="subs-title">
        <div className="container-site">
          <h2 id="subs-title" className="text-h3 font-semibold text-ink">
            {group.shortName} sectors
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subs.map((s) => {
              const published = hasArticle(group.slug, s.slug)
              return (
                <li key={s.slug}>
                  <Link
                    href={industryHref(group.slug, s.slug)}
                    className={cn(
                      'group flex h-full flex-col rounded-xl border bg-white p-6 transition-colors hover:border-line-strong',
                      published ? 'border-teal/40' : 'border-line',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[1.02rem] font-semibold tracking-tight text-ink">{s.name}</h3>
                      <span className={cn('shrink-0 font-mono text-[0.6rem] tracking-wider uppercase', published ? 'text-teal-ink' : 'text-muted')}>
                        {published ? 'Analysis' : 'Brief'}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{s.summary}</p>
                    <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                      {s.focus.map((f) => (
                        <li key={f} className="rounded bg-paper px-2 py-1 text-[0.72rem] text-ink-soft">
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink group-hover:text-teal-ink">
                      {published ? 'Read the analysis' : 'View brief'}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="other-groups">
        <div className="container-site">
          <h2 id="other-groups" className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
            Other industry groups
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((g) => (
              <li key={g.slug}>
                <Link href={industryHref(g.slug)} className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[0.85rem] text-ink-soft hover:border-ink/40 hover:text-ink">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ConsultationCta />
    </>
  )
}
