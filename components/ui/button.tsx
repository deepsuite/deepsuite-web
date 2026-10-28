import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'light' | 'ghost-dark' | 'text'

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-graphite',
  secondary: 'border border-line-strong bg-white text-ink hover:border-ink/40',
  light: 'bg-white text-navy hover:bg-teal-wash',
  'ghost-dark': 'border border-white/20 text-white hover:border-white/50 hover:bg-white/5',
  text: 'text-ink hover:text-teal-ink px-0 h-auto',
}

interface Props {
  href: string
  children: React.ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
  size?: 'md' | 'lg'
}

export function ButtonLink({ href, children, variant = 'primary', arrow, className, size = 'md' }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
        variant !== 'text' && (size === 'lg' ? 'h-12 px-6 text-[0.95rem]' : 'h-10 px-4 text-[0.875rem]'),
        variant === 'text' && 'text-[0.9rem]',
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </Link>
  )
}
