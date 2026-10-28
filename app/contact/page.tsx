import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ConsultationForm } from '@/components/contact/consultation-form'
import { ContactIntro, ContactIntroView } from '@/components/contact/contact-intro'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { industryOptions } from '@/lib/industry-options'
import { pageMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Book a Consultation',
  description:
    'Tell DeepSuite how your organization operates, where your systems fall short and what you want to achieve. We’ll explore the requirements and a practical path forward.',
  path: '/contact',
})

const steps = [
  { title: 'We review your enquiry', body: 'A member of the team reads what you shared and may ask a few clarifying questions by email.' },
  { title: 'An initial conversation', body: 'Typically a video call to understand your operations, current systems, constraints and goals.' },
  { title: 'A practical recommendation', body: 'Whether that is a discovery engagement, a focused piece of work or — where it fits better — a packaged product.' },
]

export default function ContactPage() {
  return (
    <div className="bg-paper pt-28 lg:pt-36">
      <div className="container-site">
        <Breadcrumbs items={[{ name: 'Book a Consultation', href: '/contact' }]} />
      </div>
      <div className="container-site grid gap-12 pt-10 pb-24 lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:pb-32">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Suspense fallback={<ContactIntroView isProject={false} />}>
            <ContactIntro />
          </Suspense>
          <p className="mt-6 text-lead text-muted">
            Tell us how your organization operates, where your existing systems fall short and what you want to achieve. We’ll
            explore the requirements and identify a practical path forward.
          </p>
          <ol className="mt-10 space-y-6 border-t border-line pt-8">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white font-mono text-[0.62rem] text-ink">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-[0.98rem] font-semibold text-ink">{s.title}</h2>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          {site.contactEmail && (
            <p className="mt-10 text-[0.9rem] text-muted">
              Prefer email?{' '}
              <a href={`mailto:${site.contactEmail}`} className="text-teal-ink underline underline-offset-4">
                {site.contactEmail}
              </a>
            </p>
          )}
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(16,24,32,0.25)] sm:p-10">
          <ConsultationForm
            industries={industryOptions}
            contactEmail={site.contactEmail}
            schedulingUrl={site.schedulingUrl}
            endpoint={site.consultationEndpoint}
          />
        </div>
      </div>
    </div>
  )
}
