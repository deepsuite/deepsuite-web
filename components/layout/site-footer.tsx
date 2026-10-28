import Link from 'next/link'
import { site } from '@/lib/site'
import { Wordmark } from './logo'

const columns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Company',
    links: [
      { label: 'About DeepSuite', href: '/about' },
      { label: 'Our Approach', href: '/approach' },
      { label: 'Architecture', href: '/about/architecture' },
      { label: 'Deployment and Ownership', href: '/about/deployment' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Custom Enterprise Software', href: '/solutions/ai-native-enterprise' },
      { label: 'AI-Native ERP', href: '/solutions/custom-erp' },
      { label: 'Legacy Modernization', href: '/solutions/legacy-modernization' },
      { label: 'Enterprise Integrations', href: '/solutions/enterprise-integration' },
      { label: 'Managed Engineering', href: '/solutions/managed-engineering' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Retail and Commerce', href: '/industries/retail' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Real Estate', href: '/industries/real-estate' },
      { label: 'Food and Hospitality', href: '/industries/food-hospitality' },
      { label: 'Wholesale and Distribution', href: '/industries/wholesale' },
      { label: 'Travel and Tourism', href: '/industries/travel' },
      { label: 'View All Industries', href: '/industries' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { label: 'Research', href: '/insights/category/industry-research' },
      { label: 'Engineering Perspectives', href: '/insights/category/software-architecture' },
      { label: 'Implementation Guides', href: '/insights/category/engineering-implementation' },
      { label: 'Company Updates', href: '/insights/category/deepsuite-updates' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer id="site-footer" className="on-dark bg-navy text-white">
      <div className="container-site pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-white/60">
              AI-native enterprise engineering. Applications designed, built and maintained around how your organization operates.
            </p>
            <div className="mt-8 space-y-3">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center rounded-md bg-white px-4 text-[0.875rem] font-medium text-navy hover:bg-teal-wash"
              >
                Book a Consultation
              </Link>
              <p className="text-[0.85rem] text-white/60">
                {site.contactEmail ? (
                  <a href={`mailto:${site.contactEmail}`} className="hover:text-white">
                    {site.contactEmail}
                  </a>
                ) : (
                  <Link href="/contact" className="hover:text-white">
                    Contact DeepSuite
                  </Link>
                )}
              </p>
            </div>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-[0.68rem] tracking-[0.14em] text-white/45 uppercase">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.88rem] text-white/75 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-20 flex flex-col gap-4 border-t border-line-dark pt-8 text-[0.8rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DeepSuite. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy notice
            </Link>
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sitemap.xml`} className="hover:text-white">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
