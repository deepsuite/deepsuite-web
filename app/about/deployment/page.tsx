import { Check } from 'lucide-react'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { ContentSection, PointList } from '@/components/ui/content-section'
import { PageHeader } from '@/components/ui/page-header'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Deployment and Ownership',
  description:
    'Hosting options for DeepSuite applications — managed cloud, your cloud account, private cloud or on-premises — and how source-code ownership, documentation and handover work.',
  path: '/about/deployment',
})

const options = [
  { name: 'Managed cloud', body: 'Operated by DeepSuite or an agreed hosting provider. Fastest to establish and simplest to run.', fit: ['No specific residency constraints', 'Prefer a fully managed service'] },
  { name: 'Your cloud account', body: 'Deployed into your own cloud account, with DeepSuite operating the application under agreed access.', fit: ['Existing cloud governance', 'Direct control of infrastructure and data'] },
  { name: 'Private cloud or on-premises', body: 'Runs in your data centre or a dedicated private environment.', fit: ['Strict residency or isolation requirements', 'Sites with limited connectivity'] },
]

const ownership = [
  { title: 'Source code under agreed terms', body: 'Ownership or licence terms — assignment, licence to use and modify, escrow, or shared reusable components with exclusive rights to customer-specific code — are agreed before work begins.' },
  { title: 'Maintainable by others', body: 'Code is documented, tested and structured so a competent engineering team other than ours could maintain it.' },
  { title: 'Documentation', body: 'Architecture, operations runbooks and user documentation are delivered and kept current.' },
  { title: 'Data access and export', body: 'Your data remains accessible and exportable in usable formats.' },
  { title: 'AI data handling', body: 'Model providers, data-processing terms and processing locations are documented, with private or self-hosted models available where required.' },
  { title: 'Planned exit', body: 'Handover steps for code, data and operations are documented, so ownership is practical as well as contractual.' },
]

export default function DeploymentPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: 'About', href: '/about' },
          { name: 'Deployment and Ownership', href: '/about/deployment' },
        ]}
        eyebrow="Deployment and ownership"
        title="Your system, running where you need it, under terms you control."
        lead="Applications are designed to run in different environments without rewrites, and source code is delivered under terms agreed for each engagement."
      />
      <section className="bg-white py-16 lg:py-24" aria-labelledby="options-title">
        <div className="container-site">
          <h2 id="options-title" className="text-h2 font-semibold text-ink">
            Deployment options
          </h2>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {options.map((o, i) => (
              <li key={o.name} className={i === 1 ? 'rounded-xl border border-teal/40 bg-teal-wash/40 p-7' : 'rounded-xl border border-line p-7'}>
                <h3 className="text-[1.15rem] font-semibold text-ink">{o.name}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{o.body}</p>
                <p className="mt-6 font-mono text-[0.62rem] tracking-wider text-muted uppercase">Often suits</p>
                <ul className="mt-2 space-y-2">
                  {o.fit.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[0.88rem] text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-ink" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.88rem] text-muted">Operational responsibilities for each option are defined in the engagement agreement.</p>
        </div>
      </section>
      <ContentSection id="ownership" eyebrow="Ownership" title="What ownership means in practice." tone="paper">
        <PointList items={ownership} />
      </ContentSection>
      <ConsultationCta />
    </>
  )
}
