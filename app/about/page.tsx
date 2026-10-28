import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { ContentSection, PointList } from '@/components/ui/content-section'
import { PageHeader } from '@/components/ui/page-header'
import { aboutLinks } from '@/lib/navigation'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'About DeepSuite',
  description:
    'DeepSuite is an AI-native enterprise software engineering and implementation company building applications designed around how each organization operates.',
  path: '/about',
})

const beliefs = [
  { title: 'Operations are specific', body: 'Organizations compete on how they work. Systems should represent that accurately rather than flatten it into a template.' },
  { title: 'Fit should be economical', body: 'Reusable architecture, industry blueprints and AI-assisted engineering can make business-specific software achievable for more organizations.' },
  { title: 'Engineering stays accountable', body: 'AI changes how quickly software is written, not who is responsible for it. Engineers own the architecture, reviews and quality of what ships.' },
  { title: 'Customers keep control', body: 'Flexible deployment, documented code and source-code ownership under agreed terms keep long-term choices with the organization.' },
]

const engagement = [
  { title: 'Discovery engagement', body: 'A structured, time-boxed exploration of processes, systems and goals that produces requirements, an architecture outline and a delivery plan.' },
  { title: 'Delivery engagement', body: 'Design, build, test and deploy a defined scope, typically in phases that each deliver working software.' },
  { title: 'Continuing partnership', body: 'Ongoing engineering, support and enhancement after go-live, as a managed service or alongside your team.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'About', href: '/about' }]}
        eyebrow="About DeepSuite"
        title="An engineering partner for business-specific enterprise systems."
        lead="DeepSuite designs, builds, deploys and maintains enterprise applications tailored to how each organization operates — combining AI-assisted engineering, reusable industry blueprints, enterprise architecture and human engineering expertise."
      />

      <ContentSection id="vision" eyebrow="Vision" title="The next generation of intelligent enterprise systems.">
        <div className="prose-ds max-w-none">
          <p>
            For decades, organizations have chosen between software that is affordable but generic and software that fits but is
            expensive to build and difficult to maintain. We believe that trade-off is changing.
          </p>
          <p>
            Our long-term aim is to build intelligent enterprise systems designed around each organization’s operations: applications
            with AI assistance built into how data, actions and permissions work; deployable where the organization needs them; and
            maintainable for years by teams the organization trusts.
          </p>
          <p>
            We are an ambitious company with a deliberate engineering methodology. We will describe our work accurately — including
            what is concept, what is in development and what has been delivered.
          </p>
        </div>
      </ContentSection>

      <ContentSection id="beliefs" eyebrow="What we believe" title="Principles behind our work." tone="paper">
        <PointList items={beliefs} />
      </ContentSection>

      <ContentSection id="engagement" eyebrow="Engagement model" title="How organizations work with us.">
        <PointList items={engagement} />
        <p className="mt-6 text-[0.9rem] text-muted">
          Commercial terms, including source-code ownership and support levels, are agreed in writing for each engagement.
        </p>
      </ContentSection>

      <section className="border-t border-line bg-paper py-16" aria-labelledby="more-about">
        <div className="container-site">
          <h2 id="more-about" className="text-h3 font-semibold text-ink">
            Learn more
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutLinks
              .filter((l) => l.href !== '/about')
              .map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 hover:border-line-strong">
                    <span className="text-[1rem] font-semibold text-ink">{l.label}</span>
                    <span className="mt-2 flex-1 text-[0.88rem] text-muted">{l.description}</span>
                    <ArrowRight className="mt-5 h-4 w-4 text-muted group-hover:text-teal-ink" aria-hidden="true" />
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
