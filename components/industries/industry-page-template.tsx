import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { IndustryArticle, IndustryGroup, SubIndustry } from '@/content/industries/types'
import { coverageLabels } from '@/content/industries/types'
import { industryHref, resolveIndustryRefs } from '@/lib/industries'
import { categoryName, getInsight, readingMinutes } from '@/lib/insights'
import { ConsultationCta } from '../home/consultation-cta'
import { Breadcrumbs } from '../ui/breadcrumbs'
import { CoverageBadge } from '../ui/coverage-badge'
import { Faq } from '../ui/faq'
import { IndustryDiagram } from './industry-diagram'
import { PageToc } from '../ui/page-toc'

const sections = [
  { id: 'context', label: 'Operational context' },
  { id: 'challenges', label: 'Common challenges' },
  { id: 'operating-model', label: 'How the industry operates' },
  { id: 'workflows', label: 'Key workflows' },
  { id: 'modules', label: 'Enterprise modules' },
  { id: 'data', label: 'Data and integrations' },
  { id: 'ai', label: 'Where AI assists' },
  { id: 'reporting', label: 'Reporting and analytics' },
  { id: 'security', label: 'Security and audit' },
  { id: 'deployment', label: 'Deployment and customization' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'architecture', label: 'Workflow diagram' },
  { id: 'faq', label: 'Questions' },
] as const

function H2({ id, n, children }: { id: string; n: number; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex scroll-mt-28 items-baseline gap-4 text-[1.6rem] leading-tight font-semibold tracking-tight text-ink sm:text-[1.85rem]">
      <span className="font-mono text-[0.75rem] font-normal text-teal-ink">{String(n).padStart(2, '0')}</span>
      {children}
    </h2>
  )
}

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-12 first:border-none first:pt-0">
      <H2 id={id} n={n}>
        {title}
      </H2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="prose-ds max-w-none">
      {items.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  )
}

function TitledGrid({ items, cols = 2 }: { items: Array<{ title: string; body: string }>; cols?: 2 | 3 }) {
  return (
    <ul className={cols === 3 ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'grid gap-4 sm:grid-cols-2'}>
      {items.map((it) => (
        <li key={it.title} className="rounded-lg border border-line bg-white p-5">
          <h3 className="text-[0.98rem] font-semibold text-ink">{it.title}</h3>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{it.body}</p>
        </li>
      ))}
    </ul>
  )
}

interface Props {
  article: IndustryArticle
  group: IndustryGroup
  sub: SubIndustry
}

export function IndustryPageTemplate({ article, group, sub }: Props) {
  const related = resolveIndustryRefs(article.related)
  const relatedInsights = article.insights.flatMap((s) => {
    const i = getInsight(s)
    return i ? [i] : []
  })

  return (
    <>
      <header className="border-b border-line bg-paper pt-28 lg:pt-36">
        <div className="container-site pb-14 lg:pb-20">
          <Breadcrumbs
            items={[
              { name: 'Industries', href: '/industries' },
              { name: group.shortName, href: industryHref(group.slug) },
              { name: sub.name, href: industryHref(group.slug, sub.slug) },
            ]}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">{article.eyebrow}</p>
              <h1 className="mt-5 text-h1 font-semibold text-balance text-ink">{article.title}</h1>
              <p className="mt-6 max-w-2xl text-lead text-pretty text-muted">{article.intro}</p>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line text-[0.85rem]">
              <div className="bg-white p-4">
                <dt className="font-mono text-[0.62rem] tracking-wider text-muted uppercase">Industry group</dt>
                <dd className="mt-1.5 font-medium text-ink">{group.name}</dd>
              </div>
              <div className="bg-white p-4">
                <dt className="font-mono text-[0.62rem] tracking-wider text-muted uppercase">DeepSuite coverage</dt>
                <dd className="mt-1.5">
                  <CoverageBadge coverage={group.coverage} />
                </dd>
              </div>
              <div className="col-span-2 bg-white p-4">
                <dt className="font-mono text-[0.62rem] tracking-wider text-muted uppercase">About this page</dt>
                <dd className="mt-1.5 leading-relaxed text-muted">
                  An industry analysis describing typical operations and system requirements. {coverageLabels[group.coverage].description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="bg-white">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-[220px_1fr] lg:gap-16 lg:py-20">
          <PageToc items={sections.map((s) => ({ id: s.id, text: s.label }))} />

          <article className="min-w-0 space-y-12">
            <Block id="context" n={1} title="Operational context">
              <Paragraphs items={article.context} />
            </Block>

            <Block id="challenges" n={2} title="Common business challenges">
              <TitledGrid items={article.challenges} />
            </Block>

            <Block id="operating-model" n={3} title="How the industry typically operates">
              <Paragraphs items={article.operatingModel} />
            </Block>

            <Block id="workflows" n={4} title="Key workflows and business processes">
              <ol className="space-y-3">
                {article.workflows.map((w, wi) => (
                  <li key={w.name} className="rounded-lg border border-line p-5">
                    <h3 className="flex items-center gap-3 text-[0.98rem] font-semibold text-ink">
                      <span className="font-mono text-[0.68rem] font-normal text-muted">W{wi + 1}</span>
                      {w.name}
                    </h3>
                    <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                      {w.steps.map((s, i) => (
                        <li key={s} className="relative rounded-md bg-paper px-3 py-2.5 text-[0.85rem] text-ink-soft">
                          <span className="mr-2 font-mono text-[0.65rem] text-teal-ink">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="modules" n={5} title="Relevant enterprise modules">
              <TitledGrid items={article.modules} cols={3} />
            </Block>

            <Block id="data" n={6} title="Data model and integration considerations">
              <div className="rounded-lg border border-line bg-paper p-5">
                <p className="font-mono text-[0.62rem] tracking-wider text-muted uppercase">Core entities</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {article.dataModel.entities.map((e) => (
                    <li key={e} className="rounded border border-line bg-white px-2.5 py-1 font-mono text-[0.75rem] text-ink">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="prose-ds mt-6 max-w-none">
                <ul>
                  {article.dataModel.notes.map((n) => (
                    <li key={n.slice(0, 40)}>{n}</li>
                  ))}
                </ul>
              </div>
              <h3 className="mt-8 text-[1.05rem] font-semibold text-ink">Typical integrations</h3>
              <div className="mt-4">
                <TitledGrid items={article.dataModel.integrations} />
              </div>
            </Block>

            <Block id="ai" n={7} title="How AI can assist">
              <p className="mb-6 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                AI assistance works on governed data with the user’s permissions. It prepares information and proposals; people
                approve consequential actions.
              </p>
              <TitledGrid items={article.ai} />
            </Block>

            <Block id="reporting" n={8} title="Reporting and analytics requirements">
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {article.reporting.map((r) => (
                  <li key={r} className="flex gap-3 border-b border-line py-3 text-[0.92rem] text-ink-soft">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-teal-ink" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="security" n={9} title="Security, permissions and audit">
              <TitledGrid items={article.security} />
            </Block>

            <Block id="deployment" n={10} title="Deployment and customization considerations">
              <Paragraphs items={article.deployment} />
            </Block>

            <Block id="implementation" n={11} title="A practical implementation approach">
              <ol className="relative space-y-6 border-l border-line-strong pl-8">
                {article.implementation.map((s, i) => (
                  <li key={s.title} className="relative">
                    <span className="absolute top-0.5 -left-[42px] flex h-5 w-5 items-center justify-center rounded-full border border-line-strong bg-white font-mono text-[0.6rem] text-ink">
                      {i + 1}
                    </span>
                    <h3 className="text-[0.98rem] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[0.88rem] text-muted">
                Each phase follows DeepSuite’s <Link href="/approach" className="text-teal-ink underline underline-offset-4">engineering approach</Link>: discover, architect, engineer, validate, deploy and evolve.
              </p>
            </Block>

            <Block id="architecture" n={12} title="Illustrative workflow diagram">
              <IndustryDiagram spec={article.diagram} />
            </Block>

            <Block id="faq" n={13} title="Frequently asked questions">
              <Faq items={article.faqs} />
            </Block>
          </article>
        </div>
      </div>

      <section className="border-t border-line bg-paper py-16 lg:py-20" aria-labelledby="related-title">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="related-title" className="text-[1.3rem] font-semibold tracking-tight text-ink">
              Related industries
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="group flex items-center justify-between gap-6 py-4">
                    <span>
                      <span className="block text-[0.95rem] font-medium text-ink group-hover:text-teal-ink">{r.name}</span>
                      <span className="block text-[0.82rem] text-muted">{r.group}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted group-hover:text-teal-ink" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[1.3rem] font-semibold tracking-tight text-ink">Related research</h2>
            <ul className="mt-6 space-y-3">
              {relatedInsights.map((i) => (
                <li key={i.slug}>
                  <Link href={`/insights/${i.slug}`} className="group flex items-start justify-between gap-6 rounded-lg border border-line bg-white p-5 hover:border-line-strong">
                    <span>
                      <span className="font-mono text-[0.62rem] tracking-wider text-teal-ink uppercase">{categoryName(i.category)}</span>
                      <span className="mt-1 block text-[0.95rem] font-medium text-ink">{i.title}</span>
                      <span className="mt-1 block text-[0.8rem] text-muted">{readingMinutes(i)} min read</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted group-hover:text-teal-ink" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ConsultationCta
        title={`Discuss a system for your ${sub.name.toLowerCase()} operation.`}
        body="Tell us how your organization works today and where current systems fall short. We’ll explore the requirements and a practical path forward."
      />
    </>
  )
}
