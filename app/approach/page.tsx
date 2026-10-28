import { ConsultationCta } from '@/components/home/consultation-cta'
import { Methodology } from '@/components/home/methodology'
import { ContentSection, PointList } from '@/components/ui/content-section'
import { PageHeader } from '@/components/ui/page-header'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Our Approach — From Requirements to Production',
  description:
    'How DeepSuite delivers enterprise software: collaborative discovery, structured requirements, reusable blueprints, AI-assisted engineering with human accountability, automated testing, security review and long-term support.',
  path: '/approach',
})

const stages = [
  {
    title: '1 · Discover',
    body: 'Workshops and observation with the people who do the work. We map processes, roles, decisions, exceptions and the systems involved — including spreadsheets and workarounds — and agree objectives and constraints.',
  },
  {
    title: '2 · Architect',
    body: 'Requirements are captured in structured form: entities, states, rules, permissions and acceptance criteria. Engineers define the domain model, module boundaries, integrations, security model and deployment topology, starting from the closest reusable blueprint.',
  },
  {
    title: '3 · Engineer',
    body: 'Implementation uses AI-assisted tooling within the agreed architecture and established patterns. Every change is reviewed by an engineer, covered by automated tests and integrated continuously.',
  },
  {
    title: '4 · Validate',
    body: 'Functional, integration and end-to-end testing; security review and testing proportionate to the system’s risk; performance checks; and customer acceptance against the agreed business criteria. Data migrations are rehearsed before cutover.',
  },
  {
    title: '5 · Deploy and evolve',
    body: 'Phased go-live with support during transition, documentation for users and administrators, source code delivered under agreed terms, and options for continuing engineering and support.',
  },
]

const practices = [
  { title: 'Structured requirements', body: 'Processes and rules are written in a form both people and engineering tools can work from, and reviewed with the customer.' },
  { title: 'Reusable architecture and blueprints', body: 'Common capabilities — inventory, purchasing, billing, approvals — start from tested components, so effort concentrates on what is specific.' },
  { title: 'AI-assisted engineering', body: 'AI accelerates conventional implementation, tests and documentation. It works inside the architecture, not instead of it.' },
  { title: 'Human engineering accountability', body: 'Named engineers own design decisions and review every change that reaches production.' },
  { title: 'Automated testing and security review', body: 'Test suites grow with the system; security review is part of each release, not a final gate.' },
  { title: 'Documentation and handover', body: 'Architecture, operations and user documentation are deliverables, maintained as the system changes.' },
  { title: 'Customer-controlled deployment', body: 'Managed cloud, your cloud account, private cloud or on-premises, decided by your requirements.' },
  { title: 'Ongoing maintenance and augmentation', body: 'Continuing engineering after go-live, as a managed service or alongside your team.' },
]

export default function ApproachPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Our Approach', href: '/approach' }]}
        eyebrow="Our approach"
        title="A disciplined path from business requirements to production systems."
        lead="Our methodology combines collaborative discovery, deliberate architecture and AI-assisted implementation — with engineers accountable for every stage."
      />
      <Methodology tone="white" showLink={false} />
      <ContentSection id="stages" eyebrow="Stage by stage" title="What happens at each stage." tone="paper">
        <PointList items={stages} />
      </ContentSection>
      <ContentSection id="practices" eyebrow="Practices" title="The practices that make it work.">
        <PointList items={practices} />
      </ContentSection>
      <ContentSection id="no-guarantees" title="What we will not promise." tone="paper">
        <div className="prose-ds max-w-none">
          <p>
            We do not quote delivery times or costs before understanding the work. Estimates follow discovery and are refined as
            the architecture takes shape. We will tell you when a packaged product is a better fit for part of your scope, and we
            will label concept and reference work clearly as such.
          </p>
        </div>
      </ContentSection>
      <ConsultationCta />
    </>
  )
}
