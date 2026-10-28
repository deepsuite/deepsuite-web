import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/insights/article-card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { cn } from '@/lib/cn'
import { getCategory, insightCategories, insightsByCategory, insightSummaries, type InsightCategorySlug } from '@/lib/insights'
import { pageMetadata } from '@/lib/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return insightCategories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata(props: PageProps<'/insights/category/[category]'>): Promise<Metadata> {
  const { category } = await props.params
  const c = getCategory(category)
  if (!c) return {}
  // Categories without published articles render but are not indexed.
  return pageMetadata({
    title: `${c.name} — Insights`,
    description: c.description,
    path: `/insights/category/${c.slug}`,
    index: insightsByCategory(c.slug).length > 0,
  })
}

export default async function CategoryPage(props: PageProps<'/insights/category/[category]'>) {
  const { category } = await props.params
  const c = getCategory(category)
  if (!c) notFound()
  const items = insightSummaries().filter((i) => i.category === (c.slug as InsightCategorySlug))

  return (
    <>
      <header className="border-b border-line bg-paper pt-28 lg:pt-36">
        <div className="container-site pb-12">
          <Breadcrumbs items={[{ name: 'Insights', href: '/insights' }, { name: c.name, href: `/insights/category/${c.slug}` }]} />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow">Insights category</p>
            <h1 className="mt-5 text-h1 font-semibold text-ink">{c.name}</h1>
            <p className="mt-5 text-lead text-muted">{c.description}</p>
          </div>
          <nav aria-label="Insight categories" className="mt-10">
            <ul className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0">
              <li>
                <Link href="/insights" className="inline-flex h-9 items-center rounded-full border border-line-strong bg-white px-3.5 text-[0.82rem] text-ink-soft hover:border-ink/40">
                  All
                </Link>
              </li>
              {insightCategories.map((cat) => (
                <li key={cat.slug} className="shrink-0">
                  <Link
                    href={`/insights/category/${cat.slug}`}
                    aria-current={cat.slug === c.slug ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-9 items-center rounded-full border px-3.5 text-[0.82rem]',
                      cat.slug === c.slug ? 'border-navy bg-navy text-white' : 'border-line-strong bg-white text-ink-soft hover:border-ink/40',
                    )}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <section className="bg-white py-14 lg:py-20">
        <div className="container-site">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line-strong p-12 text-center">
              <p className="text-[1.05rem] font-medium text-ink">Nothing published in this category yet</p>
              <p className="mx-auto mt-2 max-w-md text-[0.92rem] text-muted">
                We publish only when an article is ready. In the meantime, browse{' '}
                <Link href="/insights" className="text-teal-ink underline underline-offset-4">
                  all insights
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <li key={a.slug}>
                  <ArticleCard a={a} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
