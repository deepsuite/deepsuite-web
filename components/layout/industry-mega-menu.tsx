'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import type { IndustryNavGroup } from '@/lib/navigation'
import { CoverageBadge } from '../ui/coverage-badge'

interface Props {
  groups: IndustryNavGroup[]
  published: Array<{ href: string; name: string; group: string }>
}

/**
 * Desktop industry navigation. A vertical tab list of industry groups drives
 * the sub-industry panel; it follows the WAI-ARIA tabs pattern so it works
 * with pointer hover, click and the keyboard (arrow keys, Home, End).
 */
export function IndustryMegaMenu({ groups, published }: Props) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const id = useId()
  const group = groups[active]!
  const publishedHrefs = new Set(published.map((p) => p.href))

  const focusTab = (i: number) => {
    const next = (i + groups.length) % groups.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusTab(active + 1),
      ArrowUp: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(groups.length - 1),
    }
    const fn = keys[e.key]
    if (fn) {
      e.preventDefault()
      fn()
    }
  }

  // A short intent delay prevents diagonal pointer travel from flicking groups.
  const onHover = (i: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setActive(i), 70)
  }

  return (
    <div className="container-site grid grid-cols-[290px_1fr_300px] gap-0 py-8">
      <div className="border-r border-line pr-6">
        <p className="eyebrow px-3">Industries</p>
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Industry groups"
          className="mt-4 flex max-h-[calc(100vh-220px)] flex-col overflow-y-auto"
          onKeyDown={onKeyDown}
          onPointerLeave={() => hoverTimer.current && clearTimeout(hoverTimer.current)}
        >
          {groups.map((g, i) => {
            const selected = i === active
            return (
              <button
                key={g.slug}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                type="button"
                id={`${id}-tab-${g.slug}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(i)}
                className={cn(
                  'group relative flex items-center gap-3 rounded-md px-3 py-[7px] text-left text-[0.875rem] transition-colors',
                  selected ? 'bg-paper font-medium text-ink' : 'text-ink-soft hover:bg-paper/70 hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'font-mono text-[0.68rem] tabular-nums',
                    selected ? 'text-teal-ink' : 'text-muted/70',
                  )}
                  aria-hidden="true"
                >
                  {g.letter}
                </span>
                <span className="flex-1">{g.name}</span>
                {selected && <span className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-teal" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${group.slug}`}
        tabIndex={-1}
        className="min-h-[420px] px-10"
      >
        <div className="flex items-start justify-between gap-6 border-b border-line pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-ink">{group.name}</h2>
              <CoverageBadge coverage={group.coverage} />
            </div>
            <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-muted">{group.summary}</p>
          </div>
          <Link
            href={`/industries/${group.slug}`}
            className="group mt-1 inline-flex shrink-0 items-center gap-1.5 text-[0.83rem] font-medium text-ink hover:text-teal-ink"
          >
            Overview
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-x-8">
          {group.subs.map((s) => {
            const href = `/industries/${group.slug}/${s.slug}`
            const isPublished = publishedHrefs.has(href)
            return (
              <li key={s.slug}>
                <Link
                  href={href}
                  className="group flex items-center justify-between gap-3 border-b border-line/70 py-2.5 text-[0.88rem] text-ink-soft transition-colors hover:text-ink"
                >
                  <span className="group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">{s.name}</span>
                  {isPublished && (
                    <span className="shrink-0 font-mono text-[0.62rem] tracking-wider text-teal-ink uppercase">Analysis</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <aside className="rounded-xl border border-line bg-paper p-6" aria-label="Published industry analyses">
        <p className="eyebrow">In-depth analyses</p>
        <ul className="mt-4 space-y-0.5">
          {published.slice(0, 6).map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="group flex items-start justify-between gap-3 rounded-md py-1.5 text-[0.85rem] text-ink-soft hover:text-ink">
                <span>
                  <span className="block font-medium text-ink">{p.name}</span>
                  <span className="block text-[0.75rem] text-muted">{p.group}</span>
                </span>
                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted group-hover:text-teal-ink" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/industries"
          className="mt-5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-navy text-[0.83rem] font-medium text-white hover:bg-graphite"
        >
          Explore all industries
        </Link>
        <p className="mt-4 text-[0.72rem] leading-relaxed text-muted">
          Industries listed are areas DeepSuite serves or is developing expertise in. They are not a list of clients.
        </p>
      </aside>
    </div>
  )
}
