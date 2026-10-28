'use client'

import { useSearchParams } from 'next/navigation'

export function ContactIntroView({ isProject }: { isProject: boolean }) {
  return (
    <>
      <p className="eyebrow">{isProject ? 'Discuss your project' : 'Book a consultation'}</p>
      <h1 className="mt-5 text-h1 font-semibold text-balance text-ink">
        {isProject ? 'Tell us about the project you have in mind.' : 'Let’s design the system your business actually needs.'}
      </h1>
    </>
  )
}

/**
 * `?intent=project` (from “Discuss Your Project” links) switches the wording.
 * Read client-side so the page can be statically exported.
 */
export function ContactIntro() {
  const params = useSearchParams()
  return <ContactIntroView isProject={params.get('intent') === 'project'} />
}
