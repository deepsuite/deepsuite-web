import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SectionHeading } from '../ui/section-heading'
import { ButtonLink } from '../ui/button'

export const methodologyStages = [
  { title: 'Discover', body: 'Map business processes, stakeholders, constraints and objectives.' },
  { title: 'Architect', body: 'Define domain models, workflows, integrations, security and deployment.' },
  { title: 'Engineer', body: 'AI-assisted implementation with human engineering oversight.' },
  { title: 'Validate', body: 'Test functionality, security, reliability and business acceptance criteria.' },
  { title: 'Deploy and evolve', body: 'Documentation, source code under agreed terms and ongoing support.' },
]

export function Methodology({ tone = 'paper', showLink = true }: { tone?: 'paper' | 'white'; showLink?: boolean }) {
  return (
    <section className={cn('py-24 lg:py-32', tone === 'paper' ? 'bg-paper' : 'bg-white')} aria-labelledby="method-title">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Engineering approach"
            title={<span id="method-title">From business requirements to production-ready systems.</span>}
          />
          {showLink && (
            <ButtonLink href="/approach" variant="text" arrow className="shrink-0">
              Our approach in detail
            </ButtonLink>
          )}
        </div>

        <ol className="relative mt-16 grid gap-0 lg:grid-cols-5 lg:gap-6">
          <span className="absolute top-[11px] right-[10%] left-[10%] hidden h-px bg-line-strong lg:block" aria-hidden="true" />
          {methodologyStages.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              {/* Mobile vertical rail */}
              {i < methodologyStages.length - 1 && (
                <span className="absolute top-6 bottom-0 left-[11px] w-px bg-line-strong lg:hidden" aria-hidden="true" />
              )}
              <span
                className={cn(
                  'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[0.62rem] lg:mx-auto',
                  i === 2 ? 'border-teal bg-teal text-navy' : 'border-line-strong bg-white text-ink',
                )}
              >
                {i + 1}
              </span>
              <div className="lg:mt-6 lg:text-center">
                <h3 className="text-[1.1rem] font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted lg:mx-auto lg:max-w-[14rem]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-5 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-start sm:p-8" data-reveal>
          <ShieldCheck className="h-6 w-6 shrink-0 text-teal-ink" strokeWidth={1.5} aria-hidden="true" />
          <p className="max-w-3xl text-[0.98rem] leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">AI accelerates implementation; it does not replace engineering.</strong>{' '}
            Architecture decisions, code review, automated testing, security review and customer acceptance remain the
            responsibility of accountable engineers and the people who will use the system.
          </p>
        </div>
      </div>
    </section>
  )
}
