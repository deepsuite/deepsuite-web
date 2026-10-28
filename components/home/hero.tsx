import { ButtonLink } from '../ui/button'
import { HeroVisual } from './hero-visual'

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white" aria-labelledby="hero-title">
      <div className="grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_30%,black_15%,transparent_70%)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-48 right-[-8%] h-[640px] w-[640px] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: 'radial-gradient(circle, #35c6b1 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="container-site relative pt-32 pb-24 lg:pt-44 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">AI-native enterprise engineering</p>
            <h1 id="hero-title" className="mt-6 text-display font-semibold text-balance">
              Enterprise software, engineered around your business.
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="text-lead text-pretty text-white/70">
              DeepSuite combines AI-native engineering, deep industry understanding and proven software architecture to build
              enterprise applications around the way your organization actually operates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="light" size="lg" arrow>
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/solutions" variant="ghost-dark" size="lg">
                Explore Our Capabilities
              </ButtonLink>
            </div>
          </div>
        </div>
        <p className="mt-12 flex items-center gap-3 text-[0.85rem] text-white/50 lg:mt-14">
          <span className="h-px w-8 bg-teal/60" aria-hidden="true" />
          Built for complex workflows. Designed for long-term ownership.
        </p>
        <div className="mt-14 lg:mt-16">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
