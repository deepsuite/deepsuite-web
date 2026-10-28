import { SectionHeading } from '../ui/section-heading'
import { EnterpriseDemo } from './enterprise-demo'

export function DemoSection() {
  return (
    <section className="bg-paper py-24 lg:py-32" aria-labelledby="demo-title">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeading
            eyebrow="What DeepSuite builds"
            title={<span id="demo-title">One intelligent foundation. Applications shaped around your operations.</span>}
          />
          <p className="text-[1.02rem] leading-relaxed text-muted lg:pb-2" data-reveal>
            A conversational interface is only useful when it is connected to structured operations. Explore how a request in
            plain language draws on inventory, sales and finance data — and returns findings and prepared actions for people
            to approve.
          </p>
        </div>
        <div className="mt-12">
          <EnterpriseDemo />
        </div>
      </div>
    </section>
  )
}
