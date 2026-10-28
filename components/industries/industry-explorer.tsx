'use client'

import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import type { Coverage } from '@/content/industries/types'
import { coverageLabels } from '@/content/industries/types'
import { cn } from '@/lib/cn'
import { CoverageBadge } from '../ui/coverage-badge'

export interface ExplorerGroup {
  slug: string
  letter: string
  name: string
  summary: string
  coverage: Coverage
  subs: Array<{ slug: string; name: string; summary: string; published: boolean }>
}

const filters: Array<{ id: 'all' | 'published' | Coverage; label: string }> = [
  { id: 'all', label: 'All industries' },
  { id: 'published', label: 'In-depth analyses' },
  { id: 'focus', label: coverageLabels.focus.label },
  { id: 'expertise', label: coverageLabels.expertise.label },
  { id: 'emerging', label: coverageLabels.emerging.label },
]

export function IndustryExplorer({ groups }: { groups: ExplorerGroup[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const q = useDeferredValue(query.trim().toLowerCase())

  const results = useMemo(() => {
    return groups
      .filter((g) => filter === 'all' || filter === 'published' || g.coverage === filter)
      .map((g) => {
        const groupMatch = q && g.name.toLowerCase().includes(q)
        const subs = g.subs.filter(
          (s) =>
            (filter !== 'published' || s.published) &&
            (!q || groupMatch || s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)),
        )
        return { ...g, subs }
      })
      .filter((g) => g.subs.length > 0)
  }, [groups, filter, q])

  const count = results.reduce((n, g) => n + g.subs.length, 0)

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="industry-search" className="sr-only">
            Search industries
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="industry-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search industries, e.g. pharmacy"
            className="h-11 w-full rounded-md border border-line-strong bg-white pr-10 pl-10 text-[0.92rem] text-ink placeholder:text-muted/80 focus:border-ink focus:outline-none"
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
        <div role="group" aria-label="Filter industries" className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'h-9 shrink-0 rounded-full border px-3.5 text-[0.82rem] transition-colors',
                filter === f.id ? 'border-navy bg-navy text-white' : 'border-line-strong bg-white text-ink-soft hover:border-ink/40',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[0.82rem] text-muted" role="status" aria-live="polite">
        {count} {count === 1 ? 'industry' : 'industries'} shown
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-line-strong p-10 text-center">
          <p className="text-[1rem] font-medium text-ink">No matching industries</p>
          <p className="mt-2 text-[0.9rem] text-muted">
            Your industry may not be listed yet.{' '}
            <Link href="/contact" className="text-teal-ink underline underline-offset-4">
              Tell us about it
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {results.map((g) => (
            <section key={g.slug} aria-labelledby={`grp-${g.slug}`} className="grid gap-6 rounded-xl border border-line bg-white p-6 lg:grid-cols-[320px_1fr] lg:p-8">
              <div>
                <span className="font-mono text-[0.7rem] text-muted">{g.letter}</span>
                <h2 id={`grp-${g.slug}`} className="mt-1 text-[1.25rem] font-semibold tracking-tight text-ink">
                  <Link href={`/industries/${g.slug}`} className="hover:text-teal-ink">
                    {g.name}
                  </Link>
                </h2>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{g.summary}</p>
                <CoverageBadge coverage={g.coverage} className="mt-4" />
              </div>
              <ul className="grid content-start gap-x-8 sm:grid-cols-2">
                {g.subs.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/industries/${g.slug}/${s.slug}`}
                      className="group flex items-center justify-between gap-3 border-b border-line/80 py-3 text-[0.9rem] text-ink-soft hover:text-ink"
                    >
                      <span className="group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">{s.name}</span>
                      {s.published && <span className="shrink-0 font-mono text-[0.6rem] tracking-wider text-teal-ink uppercase">Analysis</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
