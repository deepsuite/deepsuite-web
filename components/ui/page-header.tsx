import { Breadcrumbs } from './breadcrumbs'
import type { Crumb } from '@/lib/structured-data'

interface Props {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  lead?: string
  aside?: React.ReactNode
}

/** Light editorial page header shared by interior pages. */
export function PageHeader({ crumbs, eyebrow, title, lead, aside }: Props) {
  return (
    <header className="border-b border-line bg-paper pt-28 lg:pt-36">
      <div className="container-site pb-14 lg:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className={aside ? 'mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end' : 'mt-10 max-w-3xl'}>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-5 text-h1 font-semibold text-balance text-ink">{title}</h1>
            {lead && <p className="mt-6 max-w-2xl text-lead text-pretty text-muted">{lead}</p>}
          </div>
          {aside}
        </div>
      </div>
    </header>
  )
}
