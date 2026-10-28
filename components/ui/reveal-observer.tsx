'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Progressive scroll reveal for elements marked with [data-reveal]. Content is
 * fully visible without JavaScript or when reduced motion is preferred; the
 * hidden state is only applied to elements still below the fold.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'))
    const viewport = window.innerHeight
    const pending = els.filter((el) => el.getBoundingClientRect().top > viewport * 0.92)
    pending.forEach((el) => el.classList.add('reveal-ready'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    pending.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
