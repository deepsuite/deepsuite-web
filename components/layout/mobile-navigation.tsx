'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'
import type { HeaderData } from './header-client'

interface Props {
  id: string
  open: boolean
  onClose: () => void
  data: HeaderData
}

/**
 * Full-height mobile navigation. Sections and industry groups use native
 * <details> disclosure elements, so they are keyboard and screen-reader
 * accessible without extra scripting. Page content behind the panel is made
 * inert while it is open.
 */
export function MobileNavigation({ id, open, onClose, data }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const main = document.getElementById('main-content')
    const footer = document.getElementById('site-footer')
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    main?.setAttribute('inert', '')
    footer?.setAttribute('inert', '')
    panelRef.current?.querySelector<HTMLElement>('summary, a')?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onResize = () => window.innerWidth >= 1024 && onClose()
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prevOverflow
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open, onClose])

  const onClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) onClose()
  }

  return (
    <div
      id={id}
      ref={panelRef}
      hidden={!open}
      onClick={onClick}
      className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-white text-ink lg:hidden"
    >
      <nav aria-label="Mobile" className="container-site animate-fade-up pt-2 pb-28">
        <Section title="Solutions">
          <ul className="space-y-1 pb-3">
            {data.solutions.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-md px-3 py-2.5 hover:bg-paper">
                  <span className="block text-[0.95rem] font-medium">{l.label}</span>
                  <span className="block text-[0.82rem] text-muted">{l.description}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/solutions" className="block px-3 py-2.5 text-[0.9rem] font-medium text-teal-ink">
                All solutions
              </Link>
            </li>
          </ul>
        </Section>

        <Section title="Industries">
          <div className="pb-3">
            {data.industries.map((g) => (
              <details key={g.slug} className="group/sub border-b border-line/70 last:border-none">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-[0.92rem] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[0.68rem] text-muted" aria-hidden="true">
                      {g.letter}
                    </span>
                    {g.name}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open/sub:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="mb-3 ml-9 border-l border-line pl-3">
                  <li>
                    <Link href={`/industries/${g.slug}`} className="block py-2 text-[0.88rem] font-medium text-teal-ink">
                      {g.shortName} overview
                    </Link>
                  </li>
                  {g.subs.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/industries/${g.slug}/${s.slug}`} className="block py-2 text-[0.88rem] text-ink-soft">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <Link href="/industries" className="block px-3 py-3 text-[0.9rem] font-medium text-teal-ink">
              All industries
            </Link>
          </div>
        </Section>

        <Section title="Insights">
          <ul className="pb-3">
            {[{ label: 'All insights', href: '/insights' }, ...data.insights].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-md px-3 py-2.5 text-[0.95rem] hover:bg-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="About">
          <ul className="pb-3">
            {data.about.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-md px-3 py-2.5 text-[0.95rem] hover:bg-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-8">
          <Link
            href="/contact"
            className="flex h-12 w-full items-center justify-center rounded-md bg-navy text-[0.95rem] font-medium text-white"
          >
            Book a Consultation
          </Link>
        </div>
      </nav>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-line">
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between py-4 text-[1.05rem] font-medium tracking-tight [&::-webkit-details-marker]:hidden',
        )}
      >
        {title}
        <ChevronDown className="h-5 w-5 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      {children}
    </details>
  )
}
