import { ButtonLink } from '../ui/button'

export function ConsultationCta({
  title = 'Let’s design the system your business actually needs.',
  body = 'Tell us how your organization operates, where your existing systems fall short and what you want to achieve. We’ll explore the requirements and identify a practical path forward.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="bg-white py-20 lg:py-24" aria-labelledby="cta-title">
      <div className="container-site">
        <div className="on-dark relative overflow-hidden rounded-2xl bg-navy px-6 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
          <div className="grid-texture pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-24 -bottom-40 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #35c6b1, transparent 65%)' }}
            aria-hidden="true"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">Consultation</p>
              <h2 id="cta-title" className="mt-5 max-w-2xl text-h2 font-semibold text-balance">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/65">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/contact" variant="light" size="lg" arrow>
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/contact?intent=project" variant="ghost-dark" size="lg">
                Discuss Your Project
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
