import type { Metadata } from 'next'
import Link from 'next/link'
import { ConsultationRedirect } from '@/components/contact/consultation-redirect'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Book a Consultation',
  description: 'The consultation page has moved.',
  path: '/contact',
  index: false,
})

/** Static hosting has no server redirects; forward /consultation to /contact on the client. */
export default function ConsultationPage() {
  return (
    <section className="bg-paper pt-40 pb-32">
      <div className="container-site max-w-xl text-center">
        <ConsultationRedirect />
        <p className="text-lead text-muted">
          Redirecting to{' '}
          <Link href="/contact" className="text-teal-ink underline underline-offset-4">
            Book a Consultation
          </Link>
          …
        </p>
      </div>
    </section>
  )
}
