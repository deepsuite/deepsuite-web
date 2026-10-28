import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredIndustries, getSub, industryHref } from '@/lib/industries'
import { IndustryVisual } from '../industries/industry-visual'
import { ButtonLink } from '../ui/button'
import { SectionHeading } from '../ui/section-heading'

export function IndustryGrid() {
  return (
    <section className="bg-paper py-24 lg:py-32" aria-labelledby="industries-title">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeading
            eyebrow="Industry expertise"
            title={<span id="industries-title">Deep understanding of the industries we serve.</span>}
          />
          <p className="text-[1.02rem] leading-relaxed text-muted lg:pb-2" data-reveal>
            Enterprise software works best when it reflects the real workflows, constraints and decisions of an industry.
            Each analysis below describes how an industry operates and what its systems need to handle.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredIndustries.map((f) => {
            const [g, s] = f.ref.split('/') as [string, string]
            const found = getSub(g, s)
            if (!found) return null
            return (
              <li key={f.ref} data-reveal>
                <Link
                  href={industryHref(g, s)}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-[0_20px_40px_-24px_rgba(16,24,32,0.25)]"
                >
                  <IndustryVisual kind={f.visual} className="aspect-[300/190] border-b border-line" />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">{found.group.shortName}</p>
                    <h3 className="mt-2 text-[1.05rem] leading-snug font-semibold tracking-tight text-ink">{f.name}</h3>
                    <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-muted">{f.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink group-hover:text-teal-ink">
                      Explore Industry
                      <span className="sr-only">: {f.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[0.85rem] text-muted">
            These are industries DeepSuite serves or is developing expertise in — not a list of clients or completed deployments.
          </p>
          <ButtonLink href="/industries" variant="secondary" arrow>
            Explore All Industries
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
