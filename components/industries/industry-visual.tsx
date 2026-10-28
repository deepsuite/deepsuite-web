import type { IndustryVisualKind } from '@/lib/industries'
import { cn } from '@/lib/cn'

/**
 * Original line illustrations representing each industry's operational
 * structure. Used in place of stock photography.
 */
const L = '#cfd7db'
const T = '#35c6b1'
const I = '#7778e8'
const N = '#101820'
const W = '#ffffff'

function Electronics() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${36 + i * 78}, ${40 + (i % 2) * 14})`}>
          <rect width="56" height="96" rx="9" fill={W} stroke={i === 1 ? N : L} strokeWidth={i === 1 ? 1.5 : 1} />
          <rect x="6" y="10" width="44" height="64" rx="3" fill={i === 1 ? '#e8f7f4' : '#f7f8f6'} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => (
            <rect key={b} x={10 + b * 4.6} y="80" width={b % 3 ? 1.6 : 2.6} height="9" fill={i === 1 ? N : L} />
          ))}
        </g>
      ))}
      <text x="114" y="80" fontSize="7" fill="#0d7c6d" fontFamily="var(--font-geist-mono)">IMEI</text>
      <text x="114" y="90" fontSize="7" fill={N} fontFamily="var(--font-geist-mono)">35-209…</text>
      <path d="M92 150 H228" stroke={T} strokeDasharray="3 5" className="animate-flow" />
      <circle cx="92" cy="150" r="3" fill={T} />
      <circle cx="228" cy="150" r="3" fill={I} />
    </g>
  )
}

function Fashion() {
  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const colors = ['#101820', '#35c6b1', '#7778e8', '#d99a3c']
  const fill = [[1, 2, 3, 2, 0], [2, 3, 0, 1, 1], [1, 3, 3, 2, 1], [0, 1, 2, 1, 0]]
  return (
    <g fontFamily="var(--font-geist-mono)">
      {sizes.map((s, i) => (
        <text key={s} x={92 + i * 34} y="40" fontSize="8" fill="#5f6c78" textAnchor="middle">{s}</text>
      ))}
      {colors.map((c, r) => (
        <g key={c}>
          <circle cx="56" cy={62 + r * 28} r="7" fill={c} />
          {sizes.map((_, i) => {
            const v = fill[r]![i]!
            return (
              <rect key={i} x={78 + i * 34} y={50 + r * 28} width="28" height="22" rx="3"
                fill={v === 0 ? '#fdf0ee' : v === 3 ? '#e8f7f4' : W} stroke={v === 0 ? '#d9645a' : v === 3 ? T : L} />
            )
          })}
        </g>
      ))}
    </g>
  )
}

function Restaurant() {
  return (
    <g fontFamily="var(--font-geist-mono)" fontSize="8">
      <rect x="110" y="26" width="80" height="28" rx="5" fill={N} />
      <text x="150" y="44" textAnchor="middle" fill={W}>dish</text>
      {[[50, 'patty'], [150, 'sauce'], [250, 'bun']].map(([x, t]) => (
        <g key={t as string}>
          <path d={`M150 54 V70 H${x} V84`} fill="none" stroke={L} />
          <rect x={(x as number) - 34} y="84" width="68" height="24" rx="5" fill={W} stroke={L} />
          <text x={x as number} y="100" textAnchor="middle" fill={N}>{t}</text>
        </g>
      ))}
      {[[26, 'mince'], [74, 'spice']].map(([x, t]) => (
        <g key={t as string}>
          <path d={`M50 108 V122 H${x} V132`} fill="none" stroke={L} />
          <rect x={(x as number) - 22} y="132" width="44" height="20" rx="4" fill="#e8f7f4" stroke={T} />
          <text x={x as number} y="145" textAnchor="middle" fill="#0d7c6d">{t}</text>
        </g>
      ))}
      <text x="190" y="146" fill="#5f6c78">cost / portion</text>
      <rect x="190" y="152" width="70" height="4" rx="2" fill="#e3e8ea" />
      <rect x="190" y="152" width="44" height="4" rx="2" fill={T} />
    </g>
  )
}

function Property() {
  return (
    <g>
      <rect x="60" y="30" width="180" height="130" fill={W} stroke={N} strokeWidth="1.5" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => {
          const k = r * 3 + c
          const vacant = k === 4 || k === 9
          const due = k === 7
          return (
            <rect key={k} x={72 + c * 56} y={42 + r * 29} width="44" height="20" rx="2"
              fill={vacant ? '#f7f8f6' : due ? '#fff4e3' : '#e8f7f4'} stroke={vacant ? L : due ? '#d99a3c' : T}
              strokeDasharray={vacant ? '3 2' : undefined} />
          )
        }),
      )}
      <path d="M40 160 H260" stroke={L} />
    </g>
  )
}

function Manufacturing() {
  const ops = [[30, 70, 'cut'], [100, 50, 'weld'], [150, 80, 'paint'], [230, 40, 'QA']] as const
  return (
    <g fontFamily="var(--font-geist-mono)" fontSize="8">
      {['WC-1', 'WC-2', 'WC-3', 'WC-4'].map((w, i) => (
        <g key={w}>
          <text x="20" y={56 + i * 30} fill="#5f6c78">{w}</text>
          <line x1="52" y1={52 + i * 30} x2="280" y2={52 + i * 30} stroke="#e3e8ea" />
        </g>
      ))}
      {ops.map(([x, w, t], i) => (
        <g key={t}>
          <rect x={x + 30} y={42 + i * 30} width={w} height="18" rx="3" fill={i === 2 ? '#efeffc' : i === 3 ? N : '#e8f7f4'} stroke={i === 2 ? I : i === 3 ? N : T} />
          <text x={x + 36} y={54 + i * 30} fill={i === 3 ? W : N}>{t}</text>
        </g>
      ))}
      <line x1="170" y1="30" x2="170" y2="160" stroke="#d9645a" strokeDasharray="2 3" />
      <text x="174" y="36" fill="#d9645a">today</text>
    </g>
  )
}

function Travel() {
  return (
    <g fontFamily="var(--font-geist-mono)" fontSize="8">
      <path d="M40 140 C 90 60, 140 150, 180 80 S 250 40, 262 52" fill="none" stroke={N} strokeWidth="1.5" />
      <path d="M40 140 C 90 60, 140 150, 180 80 S 250 40, 262 52" fill="none" stroke={T} strokeWidth="1.5" strokeDasharray="4 8" className="animate-flow" />
      {[[40, 140, 'D1'], [108, 104, 'D3'], [180, 80, 'D5'], [262, 52, 'D8']].map(([x, y, t]) => (
        <g key={t as string}>
          <circle cx={x as number} cy={y as number} r="6" fill={W} stroke={N} strokeWidth="1.5" />
          <text x={(x as number) - 6} y={(y as number) + 20} fill="#5f6c78">{t}</text>
        </g>
      ))}
      <rect x="40" y="26" width="92" height="40" rx="5" fill={W} stroke={L} />
      <text x="50" y="42" fill="#5f6c78">margin / pax</text>
      <rect x="50" y="50" width="72" height="5" rx="2.5" fill="#e3e8ea" />
      <rect x="50" y="50" width="48" height="5" rx="2.5" fill={T} />
    </g>
  )
}

function Healthcare() {
  return (
    <g fontFamily="var(--font-geist-mono)" fontSize="8">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
        <text key={d} x={70 + i * 44} y="34" fill="#5f6c78" textAnchor="middle">{d}</text>
      ))}
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => {
          const k = (r * 5 + c) % 7
          return (
            <rect key={`${r}${c}`} x={52 + c * 44} y={44 + r * 28} width="36" height="20" rx="3"
              fill={k === 2 ? '#efeffc' : k === 5 ? '#f7f8f6' : '#e8f7f4'} stroke={k === 2 ? I : k === 5 ? L : T} />
          )
        }),
      )}
      <path d="M20 44 V156" stroke={L} />
      <rect x="14" y="88" width="12" height="12" rx="2" fill={N} />
      <path d="M17 94 H23 M20 91 V97" stroke={W} />
    </g>
  )
}

function Services() {
  const rows = [[60, 120, T], [90, 150, I], [40, 90, T], [120, 140, '#d99a3c']] as const
  return (
    <g fontFamily="var(--font-geist-mono)" fontSize="8">
      {rows.map(([x, w, c], i) => (
        <g key={i}>
          <circle cx="36" cy={52 + i * 30} r="9" fill={W} stroke={L} />
          <circle cx="36" cy={49 + i * 30} r="3" fill={L} />
          <rect x={x} y={44 + i * 30} width={w} height="16" rx="3" fill={W} stroke={c} />
          <rect x={x} y={44 + i * 30} width={w * 0.65} height="16" rx="3" fill={c} opacity="0.18" />
        </g>
      ))}
      <text x="230" y="170" fill="#5f6c78">util. 78%</text>
    </g>
  )
}

const drawings: Record<IndustryVisualKind, () => React.JSX.Element> = {
  electronics: Electronics,
  fashion: Fashion,
  restaurant: Restaurant,
  property: Property,
  manufacturing: Manufacturing,
  travel: Travel,
  healthcare: Healthcare,
  services: Services,
}

export function IndustryVisual({ kind, className }: { kind: IndustryVisualKind; className?: string }) {
  const Drawing = drawings[kind]
  return (
    <div className={cn('grid-texture-light relative overflow-hidden bg-paper', className)} aria-hidden="true">
      <svg viewBox="0 0 300 190" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        <Drawing />
      </svg>
    </div>
  )
}
