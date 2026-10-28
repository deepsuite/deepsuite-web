import { cn } from '@/lib/cn'
import { SectionHeading } from '../ui/section-heading'

const stages = [
  {
    n: '01',
    title: 'Legacy systems',
    caption: 'Built for the business as it was',
    points: ['Workflows fixed at the time of build', 'Changes slow and expensive to make', 'Integrations added point by point'],
  },
  {
    n: '02',
    title: 'Generic software',
    caption: 'Built for the average business',
    points: ['Standardized processes by design', 'Flexibility within the product’s limits', 'Trade-offs between departments’ needs'],
  },
  {
    n: '03',
    title: 'The DeepSuite approach',
    caption: 'Built for your business, and able to keep changing',
    points: ['Business-specific workflows and rules', 'AI-accelerated, engineer-governed delivery', 'Adaptable, modular architecture', 'Source-code ownership under agreed terms'],
    highlight: true,
  },
]

export function Shift() {
  return (
    <section className="bg-white py-24 lg:py-32" aria-labelledby="shift-title">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <SectionHeading
            eyebrow="The shift in enterprise software"
            title={<span id="shift-title">Your business is not standard. Your software shouldn’t have to be.</span>}
          />
          <p className="text-[1.02rem] leading-relaxed text-muted lg:pb-2" data-reveal>
            Packaged software remains the right choice for many processes, and long-standing systems often carry real value.
            But where an organization’s operations are its advantage, forcing them into a template has a cost. Modern
            architecture and AI-assisted engineering make software that fits more achievable than it used to be.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
          {stages.map((s) => (
            <li
              key={s.n}
              className={cn('relative flex flex-col p-8 lg:p-10', s.highlight ? 'bg-paper' : 'bg-white')}
            >
              <div className="flex items-center gap-3">
                <span className={cn('font-mono text-[0.72rem]', s.highlight ? 'text-teal-ink' : 'text-muted')}>{s.n}</span>
                <span className={cn('h-px flex-1', s.highlight ? 'bg-teal/50' : 'bg-line')} aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-h3 font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.92rem] text-muted">{s.caption}</p>
              <ul className="mt-8 space-y-3 border-t border-line pt-6">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.92rem] text-ink-soft">
                    <span
                      className={cn('mt-[0.6em] h-px w-3 shrink-0', s.highlight ? 'bg-teal-ink' : 'bg-line-strong')}
                      aria-hidden="true"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[0.82rem] text-muted">
          Every organization’s requirements differ. The right mix of packaged, existing and purpose-built systems is decided
          case by case during discovery.
        </p>
      </div>
    </section>
  )
}
