'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * Sticky table of contents with scroll-spy. Renders as plain anchor links, so
 * it works without JavaScript; the active-state highlight is an enhancement.
 */
export function PageToc({ items, title = 'On this page' }: { items: Array<{ id: string; text: string }>; title?: string }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e))
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -65% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  return (
    <nav aria-label={title} className="hidden lg:block">
      <div className="sticky top-28">
        <p className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">{title}</p>
        <ol className="mt-4 space-y-0.5 border-l border-line">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? 'location' : undefined}
                className={cn(
                  '-ml-px block border-l py-1.5 pl-4 text-[0.82rem] leading-snug transition-colors',
                  active === i.id ? 'border-teal-ink font-medium text-ink' : 'border-transparent text-muted hover:text-ink',
                )}
              >
                {i.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
