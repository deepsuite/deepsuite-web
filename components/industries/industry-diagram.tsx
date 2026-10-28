import type { DiagramSpec } from '@/content/industries/types'
import { cn } from '@/lib/cn'

/**
 * Workflow diagram: a left-to-right flow of business stages above the shared
 * systems they read from and write to. Horizontal on desktop, vertical on
 * small screens.
 */
export function IndustryDiagram({ spec }: { spec: DiagramSpec }) {
  return (
    <figure className="on-dark overflow-hidden rounded-xl border border-graphite bg-navy text-white">
      <div className="grid-texture p-5 sm:p-8">
        <p className="font-mono text-[0.62rem] tracking-wider text-white/45 uppercase">Business flow</p>
        <ol className="mt-4 flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
          {spec.stages.map((s, i) => (
            <li key={s.label} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-center">
              <div
                className={cn(
                  'flex-1 rounded-lg border px-4 py-3',
                  i === 0 ? 'border-teal/60 bg-teal/10' : 'border-line-dark bg-slate-deep',
                )}
              >
                <span className="font-mono text-[0.6rem] text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-1 text-[0.92rem] font-medium">{s.label}</p>
                <p className="mt-0.5 text-[0.75rem] text-white/55">{s.detail}</p>
              </div>
              {i < spec.stages.length - 1 && (
                <span aria-hidden="true" className="flex h-5 items-center justify-center md:h-auto md:w-6">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-90 text-teal md:rotate-0">
                    <path d="M4 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="relative mt-6 border-t border-dashed border-line-dark pt-6">
          <p className="font-mono text-[0.62rem] tracking-wider text-white/45 uppercase">Shared systems and data</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {spec.systems.map((s, i) => (
              <li
                key={s}
                className={cn(
                  'flex items-center gap-2 rounded-md border border-line-dark px-3 py-2.5 text-[0.78rem] text-white/80',
                  i % 2 ? 'bg-indigo/5' : 'bg-teal/5',
                )}
              >
                <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', i % 2 ? 'bg-indigo' : 'bg-teal')} aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="border-t border-line-dark px-5 py-3 text-[0.78rem] text-white/50 sm:px-8">{spec.caption}</figcaption>
    </figure>
  )
}
