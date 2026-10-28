'use client'

import Link from 'next/link'
import { Cookie, X } from 'lucide-react'
import { useSyncExternalStore } from 'react'

// The site sets no tracking or advertising cookies, so this is a notice, not a consent prompt.
// If analytics or marketing tags are ever added, replace it with an accept/reject choice that
// blocks those tags until the visitor agrees.
const STORAGE_KEY = 'ds-cookie-notice'
const listeners = new Set<() => void>()
let dismissedThisView = false

function readDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function dismiss() {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Storage blocked: the notice still closes for this page view.
  }
  dismissedThisView = true
  listeners.forEach((l) => l())
}

export function CookieNotice() {
  const dismissed = useSyncExternalStore(
    subscribe,
    () => dismissedThisView || readDismissed(),
    () => true,
  )
  if (dismissed) return null

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-[34rem] rounded-xl border border-line bg-white p-5 text-ink shadow-[0_18px_50px_-12px_rgba(16,24,32,0.28)] sm:right-6 sm:left-auto sm:mx-0"
    >
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-wash text-teal-ink">
          <Cookie className="size-[18px]" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[0.95rem] font-semibold">Cookies on this site</h2>
          <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-soft">
            We don&rsquo;t use advertising or analytics cookies. Your browser only remembers that you&rsquo;ve closed this
            notice.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex h-9 items-center rounded-md bg-navy px-4 text-[0.85rem] font-medium text-white hover:bg-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              Got it
            </button>
            <Link href="/privacy" className="text-[0.85rem] font-medium text-teal-ink hover:underline">
              Read the privacy notice
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close cookie notice"
          className="-mt-1 -mr-1 rounded-md p-1.5 text-muted hover:bg-paper hover:text-ink"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </section>
  )
}
