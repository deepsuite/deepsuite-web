'use client'

import { Search, X } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import type { InsightSummary } from '@/lib/insights'
import { cn } from '@/lib/cn'
import { ArticleCard } from './article-card'

const PAGE = 9

interface Props {
  items: InsightSummary[]
  categories: Array<{ slug: string; name: string; count: number }>
}

export function InsightsBrowser({ items, categories }: Props) {
  const [category, setCategory] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(PAGE)
  const q = useDeferredValue(query.trim().toLowerCase())

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (category === 'all' || i.category === category) &&
          (!q || i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.categoryName.toLowerCase().includes(q)),
      ),
    [items, category, q],
  )

  const visible = filtered.slice(0, limit)

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0">
          {[{ slug: 'all', name: 'All', count: items.length }, ...categories].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={category === c.slug}
              onClick={() => {
                setCategory(c.slug)
                setLimit(PAGE)
              }}
              className={cn(
                'h-9 shrink-0 rounded-full border px-3.5 text-[0.82rem] transition-colors',
                category === c.slug ? 'border-navy bg-navy text-white' : 'border-line-strong bg-white text-ink-soft hover:border-ink/40',
              )}
            >
              {c.name}
              <span className={cn('ml-1.5 tabular-nums', category === c.slug ? 'text-white/60' : 'text-muted')}>{c.count}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="insight-search" className="sr-only">
            Search insights
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="insight-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setLimit(PAGE)
            }}
            placeholder="Search articles"
            className="h-10 w-full rounded-md border border-line-strong bg-white pr-10 pl-10 text-[0.9rem] text-ink placeholder:text-muted/80 focus:border-ink focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-muted hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <p className="mt-4 text-[0.82rem] text-muted" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-medium text-ink">No articles match</p>
          <p className="mt-1 text-[0.9rem] text-muted">Try another category or search term.</p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <li key={a.slug}>
              <ArticleCard a={a} />
            </li>
          ))}
        </ul>
      )}

      {filtered.length > limit && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="h-10 rounded-md border border-line-strong bg-white px-5 text-[0.875rem] font-medium text-ink hover:border-ink/40"
          >
            Load more articles
          </button>
        </div>
      )}
    </div>
  )
}
