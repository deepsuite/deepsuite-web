import { Check, Sparkles } from 'lucide-react'

/**
 * Composed product-concept visual for the hero. Purely illustrative: the
 * figures are sample values and the interface is not connected to any data.
 */
const modules = [
  { label: 'Finance', x: 70, y: 46 },
  { label: 'Inventory', x: 250, y: 30 },
  { label: 'Procurement', x: 430, y: 46 },
  { label: 'Sales', x: 70, y: 186 },
  { label: 'Operations', x: 250, y: 204 },
  { label: 'Analytics', x: 430, y: 186 },
]
const core = { x: 250, y: 117 }

const bars = [38, 52, 44, 61, 57, 70, 64, 79, 72, 86, 81, 92]

export function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-[1120px] select-none" aria-labelledby="hero-visual-caption">
      <figcaption id="hero-visual-caption" className="sr-only">
        Illustrative concept of an enterprise operations console: a natural-language request, sample business metrics,
        connected modules for finance, inventory, procurement, sales, operations and analytics, and an AI-prepared
        action awaiting human approval.
      </figcaption>

      <div aria-hidden="true" className="relative overflow-hidden rounded-xl border border-line-dark bg-slate-deep shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-line-dark px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="font-mono text-[0.66rem] tracking-wider text-white/55 uppercase">Operations console</span>
          </div>
          <span className="rounded border border-line-dark px-1.5 py-0.5 font-mono text-[0.58rem] tracking-wider text-white/45 uppercase">
            Illustrative
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:p-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex min-w-0 flex-col gap-3">
            {/* Command bar */}
            <div className="flex items-center gap-3 rounded-lg border border-line-dark bg-navy/70 px-3.5 py-3">
              <Sparkles className="h-4 w-4 shrink-0 text-teal" strokeWidth={1.6} />
              <p className="truncate text-[0.8rem] text-white/85 sm:text-[0.88rem]">
                Which branches need replenishment before the weekend?
                <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 animate-caret bg-teal" />
              </p>
              <span className="ml-auto hidden shrink-0 rounded border border-line-dark px-1.5 py-0.5 font-mono text-[0.6rem] text-white/40 sm:inline">⏎</span>
            </div>
            {/* Module graph */}
            <div className="relative flex flex-1 items-center rounded-lg border border-line-dark bg-navy/50">
              <svg viewBox="0 0 500 240" className="h-auto w-full">
                <defs>
                  <linearGradient id="hv-line" x1="0" x2="1">
                    <stop offset="0" stopColor="#35c6b1" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#7778e8" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                {modules.map((m, i) => (
                  <g key={m.label}>
                    <line x1={core.x} y1={core.y} x2={m.x} y2={m.y} stroke="#2d3943" strokeWidth="1" />
                    <line
                      x1={core.x}
                      y1={core.y}
                      x2={m.x}
                      y2={m.y}
                      stroke="url(#hv-line)"
                      strokeWidth="1.25"
                      strokeDasharray="4 16"
                      className="animate-flow"
                      style={{ animationDelay: `${i * -0.9}s` }}
                    />
                  </g>
                ))}
                <g>
                  <rect x={core.x - 62} y={core.y - 22} width="124" height="44" rx="8" fill="#101820" stroke="#35c6b1" strokeOpacity="0.55" />
                  <text x={core.x} y={core.y - 3} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">
                    Domain core
                  </text>
                  <text x={core.x} y={core.y + 12} textAnchor="middle" fill="#9aa6b0" fontSize="9" fontFamily="var(--font-geist-mono)">
                    rules · actions · audit
                  </text>
                </g>
                {modules.map((m, i) => (
                  <g key={`n-${m.label}`}>
                    <rect x={m.x - 48} y={m.y - 14} width="96" height="28" rx="6" fill="#17232d" stroke="#2d3943" />
                    <circle cx={m.x - 36} cy={m.y} r="2.5" fill={i % 2 ? '#7778e8' : '#35c6b1'} className="animate-pulse-soft" style={{ animationDelay: `${i * 0.4}s` }} />
                    <text x={m.x - 27} y={m.y + 4} fill="#d6dde2" fontSize="11">
                      {m.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: 'Open orders', v: '1,284', d: '+3.1%', tone: 'text-teal' },
                { k: 'Stock cover', v: '18.4 d', d: '−1.2 d', tone: 'text-amber' },
                { k: 'AR 60d+', v: '6.2%', d: '−0.4 pt', tone: 'text-teal' },
              ].map((m) => (
                <div key={m.k} className="rounded-lg border border-line-dark bg-graphite/40 p-3">
                  <p className="text-[0.56rem] leading-tight tracking-wide text-white/45 uppercase sm:truncate sm:text-[0.62rem]">{m.k}</p>
                  <p className="mt-1.5 text-base font-semibold tracking-tight text-white tabular-nums sm:text-lg">{m.v}</p>
                  <p className={`mt-0.5 font-mono text-[0.62rem] ${m.tone}`}>{m.d}</p>
                </div>
              ))}
            </div>
            {/* Chart */}
            <div className="flex min-h-[150px] flex-1 flex-col rounded-lg border border-line-dark bg-navy/50 p-3">
              <div className="flex items-baseline justify-between">
                <p className="text-[0.62rem] tracking-wide text-white/45 uppercase">Sell-through · 12 wk</p>
                <p className="font-mono text-[0.62rem] text-teal">sample</p>
              </div>
              <div className="mt-3 flex flex-1 items-end gap-[5px]">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-[2px]"
                    style={{
                      height: `${h}%`,
                      minHeight: 8,
                      background: i === bars.length - 1 ? '#35c6b1' : 'rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[0.55rem] text-white/30">
                <span>W1</span>
                <span>W12</span>
              </div>
            </div>
            {/* Activity log */}
            <ul className="space-y-1.5 rounded-lg border border-line-dark bg-navy/40 px-3.5 py-3 font-mono text-[0.62rem] text-white/45">
              <li className="flex justify-between gap-4"><span className="truncate">09:41 · PO-2291 confirmed by supplier</span><span className="text-teal">sync</span></li>
              <li className="flex justify-between gap-4"><span className="truncate">09:38 · Transfer TR-118 received</span><span className="text-teal">sync</span></li>
              <li className="flex justify-between gap-4"><span className="truncate">09:32 · Price list updated · 27 SKUs</span><span className="text-indigo">audit</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Proposed action — AI prepares, a person approves. */}
      <div
        aria-hidden="true"
        className="relative mx-4 -mt-6 rounded-lg border border-line bg-white p-3.5 shadow-[0_20px_40px_-16px_rgba(16,24,32,0.45)] sm:absolute sm:-bottom-8 sm:left-8 sm:mx-0 sm:mt-0 sm:w-[300px] lg:-left-6"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-wider text-indigo-ink uppercase">
            <Sparkles className="h-3 w-3" strokeWidth={1.8} /> Prepared action
          </span>
          <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[0.6rem] font-medium text-[#8a5a12]">Awaiting approval</span>
        </div>
        <p className="mt-2 text-[0.8rem] leading-snug font-medium text-ink">Transfer 24 units · Central → Riverside</p>
        <p className="mt-0.5 text-[0.7rem] text-muted">Based on 14-day sales and current cover</p>
        <div className="mt-3 flex gap-2">
          <span className="inline-flex h-7 items-center gap-1 rounded bg-navy px-2.5 text-[0.68rem] font-medium text-white">
            <Check className="h-3 w-3" /> Review
          </span>
          <span className="inline-flex h-7 items-center rounded border border-line px-2.5 text-[0.68rem] text-ink-soft">Details</span>
        </div>
      </div>
    </figure>
  )
}
