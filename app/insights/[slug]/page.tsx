import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { ArticleBody } from '@/components/insights/article-body'
import { ArticleCard } from '@/components/insights/article-card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { PageToc } from '@/components/ui/page-toc'
import { resolveIndustryRefs } from '@/lib/industries'
import {
  categoryName,
  formatDate,
  getInsight,
  insights,
  insightSummaries,
  readingMinutes,
  relatedInsights,
  tableOfContents,
} from '@/lib/insights'
import { pageMetadata } from '@/lib/metadata'
import { articleSchema } from '@/lib/structured-data'

export const dynamicParams = false

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata(props: PageProps<'/insights/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const a = getInsight(slug)
  if (!a) return {}
  return pageMetadata({ title: a.title, description: a.description, path: `/insights/${a.slug}`, type: 'article' })
}

export default async function InsightPage(props: PageProps<'/insights/[slug]'>) {
  const { slug } = await props.params
  const a = getInsight(slug)
  if (!a) notFound()

  const toc = tableOfContents(a)
  const industries = resolveIndustryRefs(a.industries)
  const related = relatedInsights(a)
  const summaries = insightSummaries()
  const path = `/insights/${a.slug}`

  return (
    <>
      <header className="border-b border-line bg-paper pt-28 lg:pt-36">
        <div className="container-site pb-14">
          <Breadcrumbs
            items={[
              { name: 'Insights', href: '/insights' },
              { name: categoryName(a.category), href: `/insights/category/${a.category}` },
              { name: a.title, href: path },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow">
              <Link href={`/insights/category/${a.category}`} className="hover:underline">
                {categoryName(a.category)}
              </Link>{' '}
              · {a.format}
            </p>
            <h1 className="mt-5 text-h1 font-semibold text-balance text-ink">{a.title}</h1>
            <p className="mt-6 text-lead text-muted">{a.description}</p>
            <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-muted">
              <span>DeepSuite</span>
              <span aria-hidden="true">·</span>
              <span>{readingMinutes(a)} min read</span>
              {a.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
                </>
              )}
              {a.updatedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time>
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </header>

      <div className="bg-white">
        <div className="container-site grid gap-12 py-14 lg:grid-cols-[220px_minmax(0,44rem)_1fr] lg:gap-14 lg:py-20">
          {toc.length > 2 ? <PageToc items={toc} title="Contents" /> : <div className="hidden lg:block" />}
          <article className="min-w-0">
            {toc.length > 2 && (
              <details className="mb-10 rounded-lg border border-line bg-paper p-4 lg:hidden">
                <summary className="cursor-pointer text-[0.9rem] font-medium text-ink">Contents</summary>
                <ol className="mt-3 space-y-1.5 text-[0.88rem]">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="text-muted hover:text-ink">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <ArticleBody blocks={a.body} />
          </article>
          <aside className="lg:pt-1">
            {industries.length > 0 && (
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">Related industries</p>
                <ul className="mt-4 space-y-1">
                  {industries.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} className="group flex items-start justify-between gap-3 rounded-md py-2 text-[0.88rem] text-ink-soft hover:text-ink">
                        <span>
                          <span className="block font-medium text-ink">{i.name}</span>
                          <span className="block text-[0.75rem] text-muted">{i.group}</span>
                        </span>
                        <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted group-hover:text-teal-ink" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>

      <section className="border-t border-line bg-paper py-16" aria-labelledby="related-articles">
        <div className="container-site">
          <h2 id="related-articles" className="text-h3 font-semibold text-ink">
            Related articles
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => {
              const s = summaries.find((x) => x.slug === r.slug)!
              return (
                <li key={r.slug}>
                  <ArticleCard a={s} />
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <ConsultationCta />
      <JsonLd data={articleSchema({ title: a.title, description: a.description, path, section: categoryName(a.category) })} />
    </>
  )
}
