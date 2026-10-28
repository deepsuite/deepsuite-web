import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { work, workKindLabels, type WorkItem } from '@/content/work'
import { getSub, industryHref } from '@/lib/industries'
import { cn } from '@/lib/cn'
import { SectionHeading } from '../ui/section-heading'

const toneDot = { good: 'bg-teal', warn: 'bg-amber', risk: 'bg-rose' } as const

function ConceptScreen({ item }: { item: WorkItem }) {
  return (
    <div className="on-dark rounded-lg border border-graphite bg-navy p-4 text-white" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="text-[0.72rem] text-white/80">{item.screen.title}</span>
        <span className="font-mono text-[0.55rem] tracking-wider text-white/40 uppercase">Concept UI</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {item.screen.kpis.map((k) => (
          <div key={k.label} className="rounded-md border border-line-dark bg-slate-deep p-2.5">
            <p className="truncate text-[0.55rem] tracking-wide text-white/40 uppercase">{k.label}</p>
            <p className="mt-1 text-[0.95rem] font-semibold tabular-nums">{k.value}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-1.5">
        {item.screen.rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-3 rounded-md border border-line-dark px-2.5 py-2 text-[0.68rem]">
            <span className="flex min-w-0 items-center gap-2">
              <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', toneDot[r.tone])} />
              <span className="truncate text-white/85">{r.label}</span>
            </span>
            <span className="shrink-0 text-white/45">{r.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Portfolio() {
  return (
    <section className="bg-white py-24 lg:py-32" aria-labelledby="work-title">
      <div className="container-site">
        <SectionHeading
          eyebrow="Selected work"
          title={<span id="work-title">A closer look at enterprise engineering.</span>}
          lead="Concept demonstrations and reference architectures that show how DeepSuite approaches common enterprise problems. Client projects will appear here when they can be shared with permission."
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {work.map((item) => {
            const [g, s] = item.industryRef.split('/') as [string, string]
            const industry = getSub(g, s)
            return (
              <li key={item.slug} className="flex flex-col rounded-xl border border-line bg-paper p-5 sm:p-6" data-reveal>
                <ConceptScreen item={item} />
                <div className="mt-6 flex flex-1 flex-col px-1">
                  <span className="inline-flex w-fit items-center rounded-full border border-indigo/30 bg-indigo-wash px-2.5 py-1 font-mono text-[0.6rem] tracking-wider text-indigo-ink uppercase">
                    {workKindLabels[item.kind]}
                  </span>
                  <h3 className="mt-4 text-[1.2rem] font-semibold tracking-tight text-ink">
                    {item.title}
                    <span className="sr-only"> — {workKindLabels[item.kind]}</span>
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{item.problem}</p>
                  <p className="mt-5 font-mono text-[0.65rem] tracking-wider text-muted uppercase">Proposed solution</p>
                  <ul className="mt-2 flex-1 space-y-1.5">
                    {item.solution.map((sol) => (
                      <li key={sol} className="flex gap-2.5 text-[0.88rem] text-ink-soft">
                        <span className="mt-[0.6em] h-px w-2.5 shrink-0 bg-teal-ink" aria-hidden="true" />
                        {sol}
                      </li>
                    ))}
                  </ul>
                  {industry && (
                    <Link
                      href={industryHref(g, s)}
                      className="group mt-6 inline-flex items-center gap-1.5 border-t border-line pt-4 text-[0.85rem] font-medium text-ink hover:text-teal-ink"
                    >
                      Related analysis: {industry.sub.name}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
