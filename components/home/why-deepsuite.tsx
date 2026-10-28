import { SectionHeading } from '../ui/section-heading'

const columns = ['Packaged software', 'Conventional bespoke development', 'DeepSuite approach'] as const

const rows: Array<{ dimension: string; values: [string, string, string] }> = [
  {
    dimension: 'Business-process alignment',
    values: [
      'Strong where processes match the product’s model; otherwise configured or adapted around it.',
      'Designed to the organization’s requirements.',
      'Designed to requirements, starting from industry blueprints.',
    ],
  },
  {
    dimension: 'Ability to customize',
    values: [
      'Within the configuration and extension options the vendor provides.',
      'Broad, with every change carrying full development cost.',
      'Specific where it matters, on a modular architecture built for change.',
    ],
  },
  {
    dimension: 'Engineering speed',
    values: [
      'Fast to deploy standard functionality.',
      'Typically longer, as most components are built from scratch.',
      'AI-assisted implementation on reusable components, with engineering review.',
    ],
  },
  {
    dimension: 'Source-code ownership options',
    values: [
      'Usually licensed; source code remains with the vendor.',
      'Varies by contract.',
      'Delivered under terms agreed for each engagement.',
    ],
  },
  {
    dimension: 'Deployment flexibility',
    values: [
      'Depends on the vendor’s cloud and on-premises offerings.',
      'Depends on how the system was designed.',
      'Designed to run in managed cloud, your cloud account or on-premises.',
    ],
  },
  {
    dimension: 'Long-term maintainability',
    values: [
      'Maintained by the vendor on its own roadmap.',
      'Varies with the team, documentation and test coverage.',
      'Documented, tested code built on consistent patterns.',
    ],
  },
  {
    dimension: 'Ongoing engineering partnership',
    values: [
      'Vendor support and implementation partners.',
      'Often ends at delivery unless separately arranged.',
      'Continuing engineering, support and team augmentation options.',
    ],
  },
]

const principles = [
  { title: 'Designed around your business.', body: 'Discovery with the people who do the work, and systems modelled on how operations actually run.' },
  { title: 'Accelerated by AI, governed by engineering.', body: 'AI speeds up implementation. Engineers own architecture, review every change and answer for the result.' },
  { title: 'Built for controlled deployment and ownership.', body: 'Hosting that fits your obligations, and source code delivered under terms agreed up front.' },
  { title: 'Supported beyond initial delivery.', body: 'Documentation, handover and continuing engineering so systems keep pace with the business.' },
]

export function WhyDeepSuite() {
  return (
    <section className="bg-white py-24 lg:py-32" aria-labelledby="why-title">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why DeepSuite"
          title={<span id="why-title">The flexibility of custom software. The discipline of enterprise engineering.</span>}
          lead="Each approach has strengths. Packaged products are often the right choice for standard processes. The comparison below describes typical characteristics, not every product or provider."
        />

        {/* Desktop table */}
        <div className="mt-14 hidden overflow-hidden rounded-xl border border-line lg:block" data-reveal>
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Comparison of packaged software, conventional bespoke development and the DeepSuite approach</caption>
            <colgroup>
              <col className="w-[22%]" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="bg-white p-5 align-bottom font-mono text-[0.68rem] font-normal tracking-wider text-muted uppercase">
                  Dimension
                </th>
                {columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={i === 2 ? 'bg-navy p-5 text-[0.95rem] font-semibold text-white' : 'bg-white p-5 text-[0.95rem] font-semibold text-ink'}
                  >
                    {i === 2 && <span className="mb-1.5 block font-mono text-[0.6rem] font-normal tracking-wider text-teal uppercase">Our approach</span>}
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.dimension} className="border-b border-line last:border-none">
                  <th scope="row" className="p-5 align-top text-[0.9rem] font-medium text-ink">
                    {r.dimension}
                  </th>
                  {r.values.map((v, i) => (
                    <td
                      key={i}
                      className={i === 2 ? 'bg-teal-wash/60 p-5 align-top text-[0.88rem] leading-relaxed text-ink' : 'p-5 align-top text-[0.88rem] leading-relaxed text-muted'}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked comparison */}
        <ul className="mt-12 space-y-4 lg:hidden">
          {rows.map((r) => (
            <li key={r.dimension} className="rounded-xl border border-line p-5">
              <h3 className="text-[1rem] font-semibold text-ink">{r.dimension}</h3>
              <dl className="mt-4 space-y-3">
                {r.values.map((v, i) => (
                  <div key={i} className={i === 2 ? '-mx-2 rounded-md bg-teal-wash/70 px-2 py-2' : ''}>
                    <dt className={i === 2 ? 'font-mono text-[0.65rem] tracking-wider text-teal-ink uppercase' : 'font-mono text-[0.65rem] tracking-wider text-muted uppercase'}>
                      {columns[i]}
                    </dt>
                    <dd className={i === 2 ? 'mt-1 text-[0.9rem] text-ink' : 'mt-1 text-[0.9rem] text-muted'}>{v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <ul className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {principles.map((p, i) => (
            <li key={p.title} className="border-t border-ink pt-6" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-mono text-[0.7rem] text-teal-ink">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-[1.1rem] leading-snug font-semibold tracking-tight text-ink">{p.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
