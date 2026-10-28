import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { JsonLd } from '@/components/ui/json-ld'
import { RevealObserver } from '@/components/ui/reveal-observer'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'
import { site } from '@/lib/site'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Enterprise software, engineered around your business`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: `${site.url}/`,
    title: `${site.name} — Enterprise software, engineered around your business`,
    description: site.description,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage.url] },
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-md bg-navy px-4 py-2 text-sm text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  )
}
