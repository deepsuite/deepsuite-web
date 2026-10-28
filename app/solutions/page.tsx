import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { Methodology } from '@/components/home/methodology'
import { PageHeader } from '@/components/ui/page-header'
import { SolutionIcon } from '@/components/ui/solution-icon'
import { solutions } from '@/content/solutions'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Solutions — Custom Enterprise Software Engineering',
  description:
    'AI-native enterprise applications, custom ERP, legacy modernization, workflow automation, AI integration, system integration, private deployment and managed engineering from DeepSuite.',
  path: '/solutions',
})

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Solutions', href: '/solutions' }]}
        eyebrow="Solutions"
        title="Engineering services for operations that do not fit a template."
        lead="DeepSuite designs, builds, deploys and maintains enterprise applications. Engagements range from a single modernized capability to an integrated, industry-specific operating platform."
      />
      <section className="bg-white py-16 lg:py-24">
        <div className="container-site">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {solutions.map((s, i) => (
              <li key={s.slug} className="bg-white">
                <Link href={`/solutions/${s.slug}`} className="group flex h-full gap-6 p-7 transition-colors hover:bg-paper lg:p-9">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-paper text-teal-ink group-hover:bg-white">
                    <SolutionIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="font-mono text-[0.68rem] text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mt-1 text-[1.2rem] font-semibold tracking-tight text-ink">{s.name}</span>
                    <span className="mt-2 text-[0.92rem] leading-relaxed text-muted">{s.intro}</span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink group-hover:text-teal-ink">
                      Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Methodology />
      <ConsultationCta />
    </>
  )
}
