import { Plus } from 'lucide-react'
import { JsonLd } from './json-ld'
import { faqSchema } from '@/lib/structured-data'

/** Native disclosure-based FAQ with FAQPage structured data. */
export function Faq({ items, schema = true }: { items: Array<{ q: string; a: string }>; schema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="max-w-3xl pb-6 text-[0.95rem] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqSchema(items)} />}
    </>
  )
}
