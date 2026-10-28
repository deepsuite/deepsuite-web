import { cn } from '@/lib/cn'

/** Typographic wordmark with a simple layered-square symbol. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={cn('h-7 w-7', className)}>
      <rect x="1" y="1" width="26" height="26" rx="6" fill="currentColor" />
      <path d="M8 8.5h7.5a5.5 5.5 0 0 1 0 11H8z" fill="none" stroke="var(--logo-cut, #fff)" strokeWidth="2" />
      <path d="M8 14h12.5" stroke="#35c6b1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Wordmark({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={tone === 'light' ? 'text-white [--logo-cut:#101820]' : 'text-navy'} />
      <span className={cn('text-[1.05rem] font-semibold tracking-[-0.02em]', tone === 'light' ? 'text-white' : 'text-ink')}>
        DeepSuite
      </span>
    </span>
  )
}
