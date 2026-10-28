import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/section-heading'
import { VisualAiNative, VisualDeployment, VisualErp, VisualIntegration, VisualLegacy, VisualWorkflow } from './capability-visuals'

const capabilities = [
  { n: '01', title: 'AI-Native Enterprise Systems', body: 'Custom applications designed around business-specific processes, data and workflows.', href: '/solutions/ai-native-enterprise', Visual: VisualAiNative },
  { n: '02', title: 'Industry-Specific ERP', body: 'Integrated finance, operations, inventory, procurement, reporting and administration.', href: '/solutions/custom-erp', Visual: VisualErp },
  { n: '03', title: 'Intelligent Workflow Automation', body: 'AI-assisted workflows, exception handling, decision support and operational automation.', href: '/solutions/workflow-automation', Visual: VisualWorkflow },
  { n: '04', title: 'Legacy Modernization', body: 'Modernize existing systems and integrations through a controlled migration strategy.', href: '/solutions/legacy-modernization', Visual: VisualLegacy },
  { n: '05', title: 'Data and Enterprise Integration', body: 'Connect business systems, APIs, databases and reporting into a coherent architecture.', href: '/solutions/enterprise-integration', Visual: VisualIntegration },
  { n: '06', title: 'Deployment and Engineering Ownership', body: 'Flexible hosting, source-code handover under agreed terms, documentation and ongoing support.', href: '/about/deployment', Visual: VisualDeployment },
]

export function Capabilities() {
  return (
    <section className="bg-white py-24 lg:py-32" aria-labelledby="capabilities-title">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Core capabilities"
            title={<span id="capabilities-title">Engineered for the complexity behind your business.</span>}
          />
          <Link href="/solutions" className="group inline-flex shrink-0 items-center gap-2 text-[0.9rem] font-medium text-ink hover:text-teal-ink">
            All solutions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ n, title, body, href, Visual }) => (
            <li key={n} className="bg-white">
              <Link href={href} data-reveal className="group flex h-full flex-col p-7 transition-colors hover:bg-paper lg:p-8">
                <div className="rounded-lg border border-line bg-paper px-4 py-3 transition-colors group-hover:bg-white">
                  <Visual />
                </div>
                <span className="mt-7 font-mono text-[0.7rem] text-muted">{n}</span>
                <h3 className="mt-2 text-[1.15rem] font-semibold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-muted">{body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink group-hover:text-teal-ink">
                  Learn more
                  <span className="sr-only">about {title}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
