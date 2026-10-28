import { coverageLabels, type Coverage } from '@/content/industries/types'
import { cn } from '@/lib/cn'

const styles: Record<Coverage, string> = {
  focus: 'border-teal/40 bg-teal-wash text-teal-ink',
  expertise: 'border-indigo/30 bg-indigo-wash text-indigo-ink',
  emerging: 'border-line-strong bg-white text-muted',
}

export function CoverageBadge({ coverage, className }: { coverage: Coverage; className?: string }) {
  return (
    <span
      title={coverageLabels[coverage].description}
      className={cn(
        'inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 font-mono text-[0.62rem] font-medium tracking-wider uppercase',
        styles[coverage],
        className,
      )}
    >
      {coverageLabels[coverage].label}
    </span>
  )
}
