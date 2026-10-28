'use client'

import { Bot, CircleUser, FileClock, LayoutGrid, RotateCcw, Sparkles } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { demoTabs, sidebarModules, type DemoTab, type DemoView, type Tone } from './demo-data'

const toneText: Record<Tone, string> = {
  good: 'text-teal',
  warn: 'text-amber',
  risk: 'text-rose',
  neutral: 'text-white/45',
}
const toneDot: Record<Tone, string> = {
  good: 'bg-teal',
  warn: 'bg-amber',
  risk: 'bg-rose',
  neutral: 'bg-white/30',
}

export function EnterpriseDemo() {
  const [active, setActive] = useState(demoTabs.length - 1)
  const [run, setRun] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const id = useId()
  const tab = demoTabs[active]!

  const select = (i: number, focus = false) => {
    const next = (i + demoTabs.length) % demoTabs.length
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: demoTabs.length - 1 }
    if (e.key in map) {
      e.preventDefault()
      select(map[e.key]!, true)
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Demonstration views"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 gap-1 sm:flex"
      >
        {demoTabs.map((t, i) => {
          const selected = i === active
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`${id}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                'relative h-11 shrink-0 rounded-md px-4 text-[0.9rem] font-medium transition-colors',
                selected ? 'bg-navy text-white' : 'text-ink-soft hover:bg-white hover:text-ink',
              )}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${tab.id}`}
        className="on-dark mt-5 overflow-hidden rounded-2xl border border-graphite bg-navy text-white shadow-[0_50px_100px_-40px_rgba(16,24,32,0.55)]"
      >
        {/* Window bar */}
        <div className="flex items-center justify-between gap-4 border-b border-line-dark px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <LayoutGrid className="h-4 w-4 shrink-0 text-teal" strokeWidth={1.6} aria-hidden="true" />
            <p className="truncate text-[0.82rem] text-white/80">
              <span className="text-white">Sample Retail Group</span>
              <span className="text-white/35"> · {tab.heading}</span>
            </p>
          </div>
          <span className="shrink-0 rounded border border-line-dark px-2 py-0.5 font-mono text-[0.6rem] tracking-wider text-white/50 uppercase">
            Fictional data
          </span>
        </div>

        <div className="grid lg:grid-cols-[190px_1fr_360px]">
          {/* Sidebar: indicates which modules the current view draws on. */}
          <div className="hidden border-r border-line-dark p-4 lg:block">
            <p className="px-2 font-mono text-[0.6rem] tracking-wider text-white/35 uppercase">Modules in view</p>
            <ul className="mt-3 space-y-0.5">
              {sidebarModules.map((m) => {
                const on = tab.modules.includes(m)
                return (
                  <li
                    key={m}
                    className={cn(
                      'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[0.8rem] transition-colors',
                      on ? 'bg-graphite/60 text-white' : 'text-white/40',
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', on ? 'bg-teal' : 'bg-white/15')} aria-hidden="true" />
                    {m}
                    {on && <span className="sr-only">(used in this view)</span>}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Main view */}
          <div className="min-w-0 border-line-dark p-4 sm:p-6 lg:border-r">
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {tab.kpis.map((k) => (
                <div key={k.label} className="rounded-lg border border-line-dark bg-slate-deep p-3.5">
                  <p className="truncate text-[0.66rem] tracking-wide text-white/45 uppercase">{k.label}</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight tabular-nums">{k.value}</p>
                  <p className={cn('mt-1 truncate font-mono text-[0.66rem]', toneText[k.tone])}>{k.delta}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-line-dark bg-slate-deep p-4">
              <ViewRenderer view={tab.view} />
            </div>
          </div>

          {/* Assistant */}
          <Assistant key={`${tab.id}-${run}`} tab={tab} onReplay={() => setRun((r) => r + 1)} />
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 text-[0.8rem] text-muted">
        <FileClock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        A front-end visualization using fictional data. It is not connected to live company systems and does not execute
        transactions. In delivered systems, AI-prepared actions are reviewed and approved by authorized people.
      </p>
    </div>
  )
}

function ViewRenderer({ view }: { view: DemoView }) {
  if (view.kind === 'table') {
    return (
      <>
        <p className="text-[0.75rem] font-medium text-white/70">{view.title}</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-[0.78rem]">
            <thead>
              <tr className="border-b border-line-dark text-white/40">
                {view.columns.map((c, i) => (
                  <th key={c} scope="col" className={cn('pb-2 font-normal', i > 0 && 'text-right')}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {view.rows.map((r) => (
                <tr key={r.cells[0]} className="border-b border-line-dark/60 last:border-none">
                  {r.cells.map((c, i) => (
                    <td
                      key={i}
                      className={cn(
                        'py-2.5 tabular-nums',
                        i === 0 ? 'text-white' : 'text-right text-white/70',
                        i === r.cells.length - 1 && toneText[r.tone],
                      )}
                    >
                      {i === r.cells.length - 1 ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className={cn('h-1.5 w-1.5 rounded-full', toneDot[r.tone])} aria-hidden="true" />
                          {c}
                        </span>
                      ) : (
                        c
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }

  if (view.kind === 'bars') {
    return (
      <>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[0.75rem] font-medium text-white/70">{view.title}</p>
          <div className="flex gap-4 text-[0.66rem] text-white/45">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-white/25" aria-hidden="true" />
              {view.legend[0]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-teal" aria-hidden="true" />
              {view.legend[1]}
            </span>
          </div>
        </div>
        <ul className="mt-5 flex h-44 items-end gap-3 sm:gap-6">
          {view.series.map((s) => (
            <li key={s.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div className="flex h-full w-full items-end justify-center gap-1">
                <span className="w-1/2 max-w-7 rounded-t-[3px] bg-white/20" style={{ height: `${s.a}%` }} />
                <span
                  className={cn('w-1/2 max-w-7 rounded-t-[3px]', s.b < 28 ? 'bg-amber' : 'bg-teal')}
                  style={{ height: `${s.b * 2.4}%` }}
                />
              </div>
              <span className="truncate text-[0.66rem] text-white/50">{s.label}</span>
              <span className="sr-only">
                revenue index {s.a}, margin {s.b}%
              </span>
            </li>
          ))}
        </ul>
      </>
    )
  }

  const max = Math.max(...view.items.map((i) => Math.max(i.days, i.target))) * 1.1
  return (
    <>
      <p className="text-[0.75rem] font-medium text-white/70">{view.title}</p>
      <ul className="mt-4 space-y-3.5">
        {view.items.map((it) => {
          const below = it.days < it.target
          return (
            <li key={it.label} className="grid grid-cols-[110px_1fr_48px] items-center gap-3 text-[0.75rem] sm:grid-cols-[140px_1fr_56px]">
              <span className="truncate text-white/70">{it.label}</span>
              <span className="relative h-2 rounded-full bg-white/8">
                <span
                  className={cn('absolute inset-y-0 left-0 rounded-full', below ? 'bg-amber' : 'bg-teal')}
                  style={{ width: `${(it.days / max) * 100}%` }}
                />
                <span className="absolute -inset-y-1 w-px bg-white/60" style={{ left: `${(it.target / max) * 100}%` }} aria-hidden="true" />
              </span>
              <span className={cn('text-right tabular-nums', below ? 'text-amber' : 'text-white/70')}>
                {it.days} d<span className="sr-only">, target {it.target} days</span>
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

type Phase = 'idle' | 'typing' | 'thinking' | 'done'

function Assistant({ tab, onReplay }: { tab: DemoTab; onReplay: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [chars, setChars] = useState(0)
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  // Start when the assistant scrolls into view (or immediately under reduced motion).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers: Array<ReturnType<typeof setTimeout>> = []
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))

    const start = () => {
      if (reduced) {
        later(() => {
          setChars(tab.prompt.length)
          setShown(tab.findings.length + 1)
          setPhase('done')
        }, 0)
        return
      }
      const step = Math.max(8, Math.min(22, 1400 / tab.prompt.length))
      later(() => setPhase('typing'), 0)
      for (let i = 1; i <= tab.prompt.length; i++) later(() => setChars(i), 200 + i * step)
      const typed = 200 + tab.prompt.length * step
      later(() => setPhase('thinking'), typed + 150)
      later(() => setPhase('done'), typed + 1050)
      for (let i = 1; i <= tab.findings.length + 1; i++) later(() => setShown(i), typed + 1050 + i * 260)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          io.disconnect()
          start()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [tab])

  const typedText = tab.prompt.slice(0, chars)

  return (
    <div ref={ref} className="flex min-h-[460px] flex-col border-t border-line-dark bg-slate-deep/60 p-4 sm:p-5 lg:border-t-0">
      <div className="flex items-center justify-between">
        <p className="inline-flex items-center gap-2 text-[0.78rem] font-medium">
          <Sparkles className="h-3.5 w-3.5 text-teal" strokeWidth={1.8} aria-hidden="true" />
          Assistant
        </p>
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[0.72rem] text-white/55 hover:bg-white/5 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Replay
        </button>
      </div>

      {/* Full text for assistive technology; the animation is visual only. */}
      <div className="sr-only" aria-live="polite">
        {phase === 'done' && (
          <>
            <p>Request: {tab.prompt}</p>
            <p>Illustrative findings: {tab.findings.join(' ')}</p>
            <p>Prepared actions, requiring approval: {tab.actions.map((a) => `${a.label} (${a.detail})`).join('; ')}</p>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-4" aria-hidden="true">
        <div className="flex gap-2.5">
          <CircleUser className="mt-0.5 h-5 w-5 shrink-0 text-white/40" strokeWidth={1.5} />
          <p className="min-h-[2.6em] rounded-lg rounded-tl-sm bg-graphite px-3 py-2.5 text-[0.8rem] leading-relaxed text-white">
            {typedText}
            {phase === 'typing' && <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 animate-caret bg-teal" />}
          </p>
        </div>

        {phase === 'thinking' && (
          <div className="flex items-center gap-2.5 pl-7 text-[0.72rem] text-white/45">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-teal" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </span>
            Reading inventory, sales and open orders…
          </div>
        )}

        {phase === 'done' && (
          <div className="flex gap-2.5">
            <Bot className="mt-0.5 h-5 w-5 shrink-0 text-teal" strokeWidth={1.5} />
            <div className="min-w-0 flex-1 space-y-3">
              <p className="font-mono text-[0.6rem] tracking-wider text-white/40 uppercase">Illustrative findings</p>
              <ul className="space-y-2">
                {tab.findings.map((f, i) => (
                  <li
                    key={f}
                    className={cn(
                      'flex gap-2 text-[0.78rem] leading-relaxed text-white/80 transition-all duration-300',
                      shown > i ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                    )}
                  >
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-teal" />
                    {f}
                  </li>
                ))}
              </ul>
              <div
                className={cn(
                  'rounded-lg border border-line-dark bg-navy p-3 transition-all duration-300',
                  shown > tab.findings.length ? 'opacity-100' : 'opacity-0',
                )}
              >
                <p className="font-mono text-[0.6rem] tracking-wider text-indigo uppercase">Prepared for approval</p>
                <ul className="mt-2 space-y-2">
                  {tab.actions.map((a) => (
                    <li key={a.label} className="flex items-center justify-between gap-3 rounded-md border border-line-dark px-2.5 py-2">
                      <span className="min-w-0">
                        <span className="block text-[0.76rem] leading-snug text-white">{a.label}</span>
                        <span className="mt-0.5 block text-[0.66rem] leading-snug text-white/45">{a.detail}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-amber/15 px-2 py-0.5 text-[0.6rem] text-amber">Needs approval</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
