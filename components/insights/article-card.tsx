import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { InsightSummary } from '@/lib/insights'

export function ArticleCard({ a }: { a: InsightSummary }) {
  return (
    <Link
      href={`/insights/${a.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-[0_16px_32px_-20px_rgba(16,24,32,0.25)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[0.62rem] tracking-wider text-teal-ink uppercase">{a.categoryName}</span>
        <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-teal-ink" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-[1.12rem] leading-snug font-semibold tracking-tight text-ink">{a.title}</h3>
      <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-muted">{a.description}</p>
      <p className="mt-6 border-t border-line pt-4 text-[0.78rem] text-muted">
        {a.format} · {a.minutes} min read
        {a.publishedAt && <> · {a.publishedAt}</>}
      </p>
    </Link>
  )
}
