import type { Metadata } from 'next'
import { Capabilities } from '@/components/home/capabilities'
import { ConsultationCta } from '@/components/home/consultation-cta'
import { DemoSection } from '@/components/home/demo-section'
import { Hero } from '@/components/home/hero'
import { IndustryGrid } from '@/components/home/industry-grid'
import { InsightsPreview } from '@/components/home/insights-preview'
import { Methodology } from '@/components/home/methodology'
import { Portfolio } from '@/components/home/portfolio'
import { Shift } from '@/components/home/shift'
import { WhyDeepSuite } from '@/components/home/why-deepsuite'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Enterprise software, engineered around your business` },
  description: site.description,
  alternates: { canonical: `${site.url}/` },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Shift />
      <DemoSection />
      <Capabilities />
      <IndustryGrid />
      <WhyDeepSuite />
      <Methodology />
      <Portfolio />
      <InsightsPreview />
      <ConsultationCta />
    </>
  )
}
