import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from './json-ld'
import { breadcrumbSchema, type Crumb } from '@/lib/structured-data'
import { cn } from '@/lib/cn'

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: 'Home', href: '/' }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn('text-[0.8rem] text-muted', className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-ink-soft">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-ink">
                      {c.name}
                    </Link>
                    <ChevronRight className="h-3 w-3 text-line-strong" aria-hidden="true" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  )
}
