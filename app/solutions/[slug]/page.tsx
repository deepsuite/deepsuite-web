import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { Faq } from '@/components/ui/faq'
import { JsonLd } from '@/components/ui/json-ld'
import { PageHeader } from '@/components/ui/page-header'
import { SolutionIcon } from '@/components/ui/solution-icon'
import { getSolution, solutions } from '@/content/solutions'
import { resolveIndustryRefs } from '@/lib/industries'
import { categoryName, getInsight, readingMinutes } from '@/lib/insights'
import { pageMetadata } from '@/lib/metadata'
import { serviceSchema } from '@/lib/structured-data'

export const dynamicParams = false

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<'/solutions/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const s = getSolution(slug)
  if (!s) return {}
  return pageMetadata({ title: s.name, description: s.intro, path: `/solutions/${s.slug}` })
}

export default async function SolutionPage(props: PageProps<'/solutions/[slug]'>) {
  const { slug } = await props.params
  const s = getSolution(slug)
  if (!s) notFound()
  const industries = resolveIndustryRefs(s.industries)
  const insights = s.insights.flatMap((x) => {
    const i = getInsight(x)
    return i ? [i] : []
  })
  const others = solutions.filter((o) => o.slug !== s.slug)

  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Solutions', href: '/solutions' }, { name: s.name, href: `/solutions/${s.slug}` }]}
        eyebrow={s.name}
        title={s.headline}
        lead={s.intro}
        aside={
          <div className="flex h-24 w-24 items-center justify-center justify-self-start rounded-2xl border border-line bg-white text-teal-ink lg:justify-self-end">
            <SolutionIcon name={s.icon} className="h-10 w-10" />
          </div>
        }
      />

      <section className="bg-white py-16 lg:py-24" aria-labelledby="why-title">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="why-title" className="text-h2 font-semibold text-ink">
            Why it matters
          </h2>
          <div className="prose-ds max-w-none">
            {s.problem.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 lg:py-24" aria-labelledby="cap-title">
        <div className="container-site">
          <h2 id="cap-title" className="text-h2 font-semibold text-ink">
            What we build
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c) => (
              <li key={c.title} className="rounded-xl border border-line bg-white p-6">
                <h3 className="text-[1.02rem] font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24" aria-labelledby="approach-title">
        <div className="container-site grid gap-14 lg:grid-cols-2">
          <div>
            <h2 id="approach-title" className="text-h2 font-semibold text-ink">
              How we approach it
            </h2>
            <ol className="mt-8 space-y-6">
              {s.approach.map((a, i) => (
                <li key={a.title} className="flex gap-5 border-t border-line pt-6">
                  <span className="font-mono text-[0.72rem] text-teal-ink">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[1.02rem] font-semibold text-ink">{a.title}</h3>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{a.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-line bg-paper p-7">
              <h2 className="text-[1.1rem] font-semibold text-ink">Typical deliverables</h2>
              <ul className="mt-5 space-y-3">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-[0.92rem] text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-ink" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line p-7">
              <h2 className="text-[1.1rem] font-semibold text-ink">Considerations</h2>
              <ul className="mt-4 space-y-3">
                {s.considerations.map((c) => (
                  <li key={c} className="text-[0.9rem] leading-relaxed text-muted">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[1.3rem] font-semibold tracking-tight text-ink">Relevant industries</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {industries.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="group flex items-center justify-between gap-6 py-4">
                    <span>
                      <span className="block text-[0.95rem] font-medium text-ink group-hover:text-teal-ink">{i.name}</span>
                      <span className="block text-[0.8rem] text-muted">{i.group}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[1.3rem] font-semibold tracking-tight text-ink">Further reading</h2>
            <ul className="mt-6 space-y-3">
              {insights.map((i) => (
                <li key={i.slug}>
                  <Link href={`/insights/${i.slug}`} className="block rounded-lg border border-line bg-white p-5 hover:border-line-strong">
                    <span className="font-mono text-[0.62rem] tracking-wider text-teal-ink uppercase">{categoryName(i.category)}</span>
                    <span className="mt-1 block text-[0.95rem] font-medium text-ink">{i.title}</span>
                    <span className="mt-1 block text-[0.8rem] text-muted">{readingMinutes(i)} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20" aria-labelledby="faq-title">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 id="faq-title" className="text-h3 font-semibold text-ink">
            Questions
          </h2>
          <Faq items={s.faqs} />
        </div>
      </section>

      <section className="border-t border-line bg-white py-12">
        <div className="container-site">
          <p className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">Other solutions</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/solutions/${o.slug}`} className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[0.85rem] text-ink-soft hover:border-ink/40 hover:text-ink">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ConsultationCta />
      <JsonLd data={serviceSchema({ name: s.name, description: s.intro, path: `/solutions/${s.slug}` })} />
    </>
  )
}
