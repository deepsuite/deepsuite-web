import { cn } from '@/lib/cn'

interface Props {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2'
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, lead, align = 'left', className, as: Tag = 'h2', tone = 'light' }: Props) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        className={cn(
          'font-semibold text-balance',
          Tag === 'h1' ? 'text-h1' : 'text-h2',
          eyebrow && 'mt-4',
          tone === 'dark' ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p className={cn('mt-5 text-lead text-pretty', tone === 'dark' ? 'text-white/65' : 'text-muted', align === 'center' && 'mx-auto max-w-2xl')}>
          {lead}
        </p>
      )}
    </div>
  )
}
