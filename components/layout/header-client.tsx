'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { cn } from '@/lib/cn'
import type { IndustryNavGroup, MainNavId, NavLink } from '@/lib/navigation'
import { Wordmark } from './logo'
import { IndustryMegaMenu } from './industry-mega-menu'
import { MobileNavigation } from './mobile-navigation'
import { SolutionIcon } from '../ui/solution-icon'
import type { SolutionIcon as SolutionIconName } from '@/content/solutions'

export interface HeaderData {
  solutions: Array<NavLink & { icon: SolutionIconName }>
  industries: IndustryNavGroup[]
  publishedIndustries: Array<{ href: string; name: string; group: string }>
  insights: NavLink[]
  featuredInsight: { href: string; title: string; category: string }
  about: NavLink[]
}

const OPEN_DELAY = 110
const CLOSE_DELAY = 200

function subscribeScroll(cb: () => void) {
  window.addEventListener('scroll', cb, { passive: true })
  return () => window.removeEventListener('scroll', cb)
}

export function HeaderClient({ data }: { data: HeaderData }) {
  const pathname = usePathname()
  const [open, setOpen] = useState<MainNavId | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  )
  const headerRef = useRef<HTMLElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoverOpenedAt = useRef(0)
  const baseId = useId()

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }

  const close = useCallback(() => {
    clearTimer()
    setOpen(null)
  }, [])

  // Outside interaction and Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const trigger = document.getElementById(`${baseId}-${open}-trigger`)
        close()
        trigger?.focus()
      }
    }
    // Close once the page itself scrolls meaningfully; the panel should not follow the reader.
    const startY = window.scrollY
    const onScroll = () => Math.abs(window.scrollY - startY) > 120 && close()
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open, close, baseId])

  useEffect(() => clearTimer, [])

  const onTriggerEnter = (id: MainNavId, e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    clearTimer()
    if (open === id) return
    timer.current = setTimeout(
      () => {
        hoverOpenedAt.current = performance.now()
        setOpen(id)
      },
      open ? 40 : OPEN_DELAY,
    )
  }

  const onHeaderLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    clearTimer()
    timer.current = setTimeout(() => setOpen(null), CLOSE_DELAY)
  }

  const onTriggerClick = (id: MainNavId, e: React.MouseEvent) => {
    clearTimer()
    // A click that lands right after hover-open should not immediately close.
    if (open === id && e.timeStamp - hoverOpenedAt.current < 400) return
    setOpen((cur) => (cur === id ? null : id))
  }

  const onTriggerKeyDown = (id: MainNavId, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(id)
      requestAnimationFrame(() => {
        const panel = document.getElementById(`${baseId}-${id}-panel`)
        panel?.querySelector<HTMLElement>('a, button')?.focus()
      })
    }
  }

  const onHeaderBlur = (e: React.FocusEvent) => {
    if (!headerRef.current?.contains(e.relatedTarget as Node | null)) setOpen(null)
  }

  const onPanelClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) close()
  }

  const isHome = pathname === '/'
  const solid = !isHome || scrolled || open !== null || mobileOpen
  const dark = !solid

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      ref={headerRef}
      onPointerLeave={onHeaderLeave}
      onPointerEnter={clearTimer}
      onBlur={onHeaderBlur}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        dark
          ? 'on-dark border-b border-transparent bg-transparent'
          : mobileOpen || open
            ? 'border-b border-line bg-white'
            : 'border-b border-line bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85',
        open && 'shadow-[0_24px_48px_-24px_rgba(16,24,32,0.18)]',
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link href="/" aria-label="DeepSuite home" className="shrink-0 rounded-md" onClick={() => setMobileOpen(false)}>
          <Wordmark tone={dark ? 'light' : 'dark'} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {(['solutions', 'industries', 'insights', 'about'] as const).map((id) => {
              const label = id[0]!.toUpperCase() + id.slice(1)
              const href = `/${id}`
              const expanded = open === id
              return (
                <li key={id}>
                  <button
                    id={`${baseId}-${id}-trigger`}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${baseId}-${id}-panel`}
                    onPointerEnter={(e) => onTriggerEnter(id, e)}
                    onClick={(e) => onTriggerClick(id, e)}
                    onKeyDown={(e) => onTriggerKeyDown(id, e)}
                    className={cn(
                      'group inline-flex h-10 items-center gap-1.5 rounded-md px-3.5 text-[0.9rem] font-medium transition-colors',
                      dark ? 'text-white/80 hover:text-white' : 'text-ink-soft hover:text-ink',
                      expanded && (dark ? 'text-white' : 'bg-paper text-ink'),
                      isActive(href) && !expanded && (dark ? 'text-white' : 'text-ink'),
                    )}
                  >
                    {label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn('h-3.5 w-3.5 opacity-60 transition-transform duration-200', expanded && 'rotate-180 opacity-100')}
                    />
                    {isActive(href) && <span className="sr-only">(current section)</span>}
                  </button>
                  <div
                    id={`${baseId}-${id}-panel`}
                    hidden={!expanded}
                    onClick={onPanelClick}
                    className="absolute inset-x-0 top-full border-t border-line bg-white text-ink"
                  >
                    <div className="animate-fade-up">
                      {id === 'solutions' && <SolutionsPanel links={data.solutions} />}
                      {id === 'industries' && (
                        <IndustryMegaMenu groups={data.industries} published={data.publishedIndustries} />
                      )}
                      {id === 'insights' && <InsightsPanel links={data.insights} featured={data.featuredInsight} />}
                      {id === 'about' && <AboutPanel links={data.about} />}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              'hidden h-10 items-center gap-2 rounded-md px-4 text-[0.875rem] font-medium transition-colors sm:inline-flex',
              dark ? 'bg-white text-navy hover:bg-teal-wash' : 'bg-navy text-white hover:bg-graphite',
            )}
          >
            Book a Consultation
          </Link>
          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden',
              dark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-paper',
            )}
            aria-expanded={mobileOpen}
            aria-controls={`${baseId}-mobile`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileNavigation id={`${baseId}-mobile`} open={mobileOpen} onClose={() => setMobileOpen(false)} data={data} />
    </header>
  )
}

function PanelIntro({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <div className="flex flex-col justify-between border-r border-line pr-10">
      <div>
        <p className="eyebrow">{title}</p>
        <p className="mt-4 max-w-[17rem] text-[0.95rem] leading-relaxed text-muted">{body}</p>
      </div>
      <Link href={href} className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-teal-ink">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  )
}

function SolutionsPanel({ links }: { links: HeaderData['solutions'] }) {
  return (
    <div className="container-site grid grid-cols-[260px_1fr] gap-10 py-10">
      <PanelIntro
        title="Solutions"
        body="Engineering services for organizations whose operations do not fit a standard template."
        href="/solutions"
        cta="All solutions"
      />
      <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex gap-4 rounded-lg p-3 transition-colors hover:bg-paper">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-white text-teal-ink group-hover:border-teal/40">
                <SolutionIcon name={l.icon} className="h-[18px] w-[18px]" />
              </span>
              <span>
                <span className="block text-[0.92rem] font-medium text-ink">{l.label}</span>
                <span className="mt-0.5 block text-[0.83rem] leading-snug text-muted">{l.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function InsightsPanel({ links, featured }: { links: NavLink[]; featured: HeaderData['featuredInsight'] }) {
  return (
    <div className="container-site grid grid-cols-[260px_1fr_340px] gap-10 py-10">
      <PanelIntro title="Insights" body="Research and perspectives on the next generation of enterprise software." href="/insights" cta="All insights" />
      <ul className="grid grid-cols-1 gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="flex items-baseline justify-between gap-6 rounded-lg px-3 py-2.5 transition-colors hover:bg-paper">
              <span className="text-[0.92rem] font-medium text-ink">{l.label}</span>
              <span className="text-right text-[0.83rem] text-muted">{l.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={featured.href} className="group flex flex-col justify-between rounded-xl bg-navy p-6 text-white on-dark">
        <span className="eyebrow">Featured · {featured.category}</span>
        <span className="mt-6 text-lg leading-snug font-medium tracking-tight">{featured.title}</span>
        <span className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white">
          Read the article <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </Link>
    </div>
  )
}

function AboutPanel({ links }: { links: NavLink[] }) {
  return (
    <div className="container-site grid grid-cols-[260px_1fr_340px] gap-10 py-10">
      <PanelIntro title="About" body="An enterprise engineering partner building intelligent, adaptable business systems." href="/about" cta="About DeepSuite" />
      <ul className="grid grid-cols-2 gap-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-paper">
              <span className="block text-[0.92rem] font-medium text-ink">{l.label}</span>
              <span className="mt-0.5 block text-[0.83rem] text-muted">{l.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="rounded-xl border border-line bg-paper p-6">
        <p className="text-[0.95rem] font-medium text-ink">Discuss a system your business needs</p>
        <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">Tell us how your organization operates and where current systems fall short.</p>
        <Link href="/contact" className="mt-5 inline-flex h-9 items-center gap-2 rounded-md bg-navy px-3.5 text-[0.83rem] font-medium text-white hover:bg-graphite">
          Book a Consultation
        </Link>
      </div>
    </div>
  )
}
