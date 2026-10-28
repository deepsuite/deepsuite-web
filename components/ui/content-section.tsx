import { cn } from '@/lib/cn'

/** Two-column editorial section: heading on the left, content on the right. */
export function ContentSection({
  id,
  eyebrow,
  title,
  children,
  tone = 'white',
}: {
  id: string
  eyebrow?: string
  title: string
  children: React.ReactNode
  tone?: 'white' | 'paper'
}) {
  return (
    <section aria-labelledby={id} className={cn('py-16 lg:py-24', tone === 'paper' ? 'border-y border-line bg-paper' : 'bg-white')}>
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={id} className={cn('text-h2 font-semibold text-balance text-ink', eyebrow && 'mt-4')}>
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

export function PointList({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <li key={it.title} className="grid gap-2 py-6 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
          <h3 className="text-[1.02rem] font-semibold text-ink">{it.title}</h3>
          <p className="text-[0.95rem] leading-relaxed text-muted">{it.body}</p>
        </li>
      ))}
    </ul>
  )
}
