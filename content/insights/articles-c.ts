import { h2, p, ul, type Insight } from './types'

export const introducingDeepSuite: Insight = {
  slug: 'introducing-deepsuite-enterprise-engineering',
  title: 'Introducing DeepSuite’s approach to enterprise engineering',
  description:
    'What DeepSuite is building, how we work, and the principles behind our engineering approach to business-specific enterprise applications.',
  category: 'deepsuite-updates',
  format: 'Perspective',
  industries: ['retail/electronics', 'food-hospitality/restaurants'],
  body: [
    p('DeepSuite exists to make enterprise software that fits the business economically achievable for more organizations. We design, build, deploy and maintain applications around how each organization operates, combining AI-assisted engineering with reusable industry blueprints and accountable human engineering.'),
    h2('what-we-build', 'What we build'),
    p('Our work centres on operational systems: finance, inventory, operations, procurement, sales and the workflows that connect them. We build new applications, modernize existing ones and integrate them with the systems an organization already depends on.'),
    h2('how-we-work', 'How we work'),
    ul(
      'Discovery before design: we map processes, stakeholders and constraints with the people who do the work.',
      'Architecture before code: domain models, integrations, security and deployment are decided deliberately.',
      'AI-assisted implementation with engineering oversight: every change is reviewed and tested.',
      'Validation with the customer: acceptance is agreed against business criteria, not just technical ones.',
      'Delivery for the long term: documentation, source code under agreed terms and ongoing support.',
    ),
    h2('what-we-publish', 'What we will publish here'),
    p('This Insights section will carry our industry research, engineering perspectives and implementation guides. We will only describe client work here with the client’s permission, and we will label concept and reference work clearly as such.'),
  ],
}
