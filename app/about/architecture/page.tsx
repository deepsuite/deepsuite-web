import { ConsultationCta } from '@/components/home/consultation-cta'
import { ContentSection, PointList } from '@/components/ui/content-section'
import { PageHeader } from '@/components/ui/page-header'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Architecture and Engineering',
  description:
    'The technical principles behind DeepSuite applications: precise domain models, explicit permission-checked actions, governed AI, observability, testing and portable deployment.',
  path: '/about/architecture',
})

const layers = [
  { name: 'Experience', detail: 'Web, mobile and conversational interfaces' },
  { name: 'Actions', detail: 'Validated, permission-checked operations' },
  { name: 'Domain core', detail: 'Entities, states, rules and events' },
  { name: 'Data', detail: 'Transactional stores, read models and search' },
  { name: 'Integration', detail: 'APIs, events and connectors' },
]

const principles = [
  { title: 'Precise domain models', body: 'Entities, relationships, states and units are explicit. A serial unit, a recipe component or a lease clause is a first-class record, not free text.' },
  { title: 'Explicit actions', body: 'Business operations are defined once with typed inputs, validation and permissions, and shared by the interface, integrations and AI services.' },
  { title: 'Permission-aware everything', body: 'Row- and field-level access applies equally to screens, reports, exports, search and AI retrieval.' },
  { title: 'Governed AI', body: 'AI acts on behalf of a user through the same actions and permissions. Consequential changes are proposed and approved, and every interaction is logged.' },
  { title: 'Configuration as data', body: 'Rules that change — pricing, approvals, commission schemes, payer rules — are configurable with effective dates rather than hard-coded.' },
  { title: 'Observability', body: 'Structured logging, metrics and tracing from the first release, with audit trails for business events.' },
  { title: 'Automated testing', body: 'Unit, integration and end-to-end tests that make continued change safe.' },
  { title: 'Portable deployment', body: 'Containerized services, infrastructure as code and externalized configuration so the same system runs in different environments.' },
]

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: 'About', href: '/about' },
          { name: 'Architecture and Engineering', href: '/about/architecture' },
        ]}
        eyebrow="Architecture and engineering"
        title="Built to be understood, changed and trusted."
        lead="The technical principles DeepSuite applies to every application, whatever the industry."
      />
      <section className="bg-white py-16 lg:py-24" aria-labelledby="layers-title">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="eyebrow">Reference shape</p>
            <h2 id="layers-title" className="mt-4 text-h2 font-semibold text-ink">
              A layered application architecture.
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-muted">
              Each layer has one responsibility. AI orchestration sits alongside the experience layer and uses the same actions as
              every other client — it gains no privileged path to data.
            </p>
          </div>
          <figure className="on-dark rounded-2xl bg-navy p-6 text-white sm:p-8">
            <ol className="space-y-2">
              {layers.map((l, i) => (
                <li
                  key={l.name}
                  className="flex items-center justify-between gap-4 rounded-lg border border-line-dark bg-slate-deep px-4 py-3.5"
                  style={{ marginLeft: `${i * 4}%`, marginRight: `${(layers.length - 1 - i) * 4}%` }}
                >
                  <span className="text-[0.92rem] font-medium">{l.name}</span>
                  <span className="text-right text-[0.75rem] text-white/55">{l.detail}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-teal/40 bg-teal/10 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
              <span className="text-[0.82rem]">AI orchestration · acts through the action layer with the user’s permissions</span>
            </div>
            <figcaption className="mt-4 text-[0.75rem] text-white/45">Conceptual diagram of a DeepSuite application.</figcaption>
          </figure>
        </div>
      </section>
      <ContentSection id="principles" eyebrow="Principles" title="Engineering principles." tone="paper">
        <PointList items={principles} />
      </ContentSection>
      <ConsultationCta />
    </>
  )
}
