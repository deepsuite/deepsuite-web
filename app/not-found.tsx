import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="bg-paper pt-40 pb-32">
      <div className="container-site max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 text-h1 font-semibold text-ink">This page could not be found.</h1>
        <p className="mt-5 text-lead text-muted">The address may have changed, or the page may not exist yet.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Go to the homepage
          </ButtonLink>
          <ButtonLink href="/industries" variant="secondary">
            Browse industries
          </ButtonLink>
        </div>
        <p className="mt-10 text-[0.9rem] text-muted">
          Looking for something specific? <Link href="/contact" className="text-teal-ink underline underline-offset-4">Contact us</Link>.
        </p>
      </div>
    </section>
  )
}
