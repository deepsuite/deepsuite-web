export type SolutionIcon = 'sparkles' | 'layers' | 'refresh' | 'workflow' | 'brain' | 'network' | 'server' | 'users'

export interface Solution {
  slug: string
  name: string
  navDescription: string
  icon: SolutionIcon
  headline: string
  intro: string
  problem: string[]
  capabilities: Array<{ title: string; body: string }>
  approach: Array<{ title: string; body: string }>
  deliverables: string[]
  considerations: string[]
  industries: string[]
  insights: string[]
  faqs: Array<{ q: string; a: string }>
}

export const solutions: Solution[] = [
  {
    slug: 'ai-native-enterprise',
    name: 'AI-Native Enterprise Applications',
    navDescription: 'Business-specific applications with AI designed into data, actions and permissions.',
    icon: 'sparkles',
    headline: 'Enterprise applications with intelligence designed in, not bolted on.',
    intro:
      'We design and build applications around your organization’s processes, data and decisions — with AI assistance built into how information is retrieved, how work is prepared and how actions are proposed for people to approve.',
    problem: [
      'Most organizations meet AI as an add-on: a chat window beside a system that was never designed for it. The assistant cannot see the right data, cannot respect the right permissions and cannot act safely, so it ends up summarizing rather than helping.',
      'An AI-native application starts from a precise domain model and explicit, permission-checked business actions. AI then works through the same governed interfaces as people do, which makes it useful and keeps it accountable.',
    ],
    capabilities: [
      { title: 'Domain-specific applications', body: 'Operational systems modelled on your entities, workflows and rules rather than a generic template.' },
      { title: 'Conversational operations', body: 'Natural-language questions answered from governed data, with the sources visible.' },
      { title: 'Prepared actions', body: 'AI drafts transfers, orders, documents and follow-ups; accountable people approve them.' },
      { title: 'Exception monitoring', body: 'Agents that watch for shortages, overruns, delays and anomalies and bring them to the right person.' },
      { title: 'Audit and observability', body: 'Every AI interaction recorded: what was asked, what data was used, what was proposed and approved.' },
      { title: 'Model flexibility', body: 'Model providers treated as configurable components, evaluated against your tasks and cost constraints.' },
    ],
    approach: [
      { title: 'Map decisions, not only processes', body: 'Identify where people spend time assembling information or preparing routine actions — the places AI can help.' },
      { title: 'Design the domain and actions', body: 'Define entities, states and permission-checked actions that people, integrations and AI share.' },
      { title: 'Build with evaluation', body: 'Test AI features against real scenarios and acceptance criteria before release.' },
      { title: 'Release with oversight', body: 'Introduce AI features progressively with confirmation steps and monitoring.' },
    ],
    deliverables: ['Domain model and architecture documentation', 'Production application with AI features', 'Evaluation suites for AI behaviour', 'Audit and monitoring dashboards', 'Source code under agreed terms'],
    considerations: [
      'AI features are designed to assist people. Consequential actions require human confirmation unless explicitly agreed otherwise.',
      'Model choice, data-processing terms and hosting location are agreed during architecture.',
    ],
    industries: ['retail/electronics', 'wholesale/fmcg-distribution', 'manufacturing/discrete-manufacturing'],
    insights: ['architecture-of-an-ai-native-erp', 'data-ownership-deployment-flexibility-enterprise-ai'],
    faqs: [
      { q: 'Can AI make changes in the system on its own?', a: 'By default, AI proposes and a person approves. Low-risk automations can run unattended where explicitly agreed, monitored and reversible.' },
      { q: 'Which AI models do you use?', a: 'We select models per task based on evaluation, cost and data-processing requirements. The architecture allows models to be changed without rewriting the application.' },
    ],
  },
  {
    slug: 'custom-erp',
    name: 'Custom ERP Development',
    navDescription: 'Integrated finance, operations, inventory and procurement shaped to your organization.',
    icon: 'layers',
    headline: 'An ERP that reflects how your organization actually runs.',
    intro:
      'We build integrated business systems — finance, inventory, operations, procurement, sales and reporting — on reusable architecture, shaped to your industry and processes rather than forcing your processes to fit a package.',
    problem: [
      'Packaged ERP works well for organizations whose processes match its assumptions. Where they do not, organizations face a choice between expensive customization of a product they do not control and quiet compromise that pushes work into spreadsheets.',
      'A custom ERP built on proven modules and industry blueprints offers a third path: standard where standard works, specific where the business needs it, and owned by the organization under agreed terms.',
    ],
    capabilities: [
      { title: 'Finance and accounting', body: 'General ledger, receivables, payables and reporting — or integration with an existing ledger.' },
      { title: 'Inventory and warehousing', body: 'Multi-location stock, lots, serials, transfers and valuation.' },
      { title: 'Procurement', body: 'Requisitions, purchase orders, supplier management and matching.' },
      { title: 'Sales and order management', body: 'Quotes, orders, pricing rules, credit control and fulfilment.' },
      { title: 'Operations', body: 'Industry-specific modules: production, service, projects, bookings or leases.' },
      { title: 'Reporting and analytics', body: 'Operational dashboards and management reporting from a consistent data model.' },
    ],
    approach: [
      { title: 'Process discovery', body: 'Map how each department works today and where the current systems fall short.' },
      { title: 'Blueprint selection', body: 'Start from the closest reusable modules and industry blueprint.' },
      { title: 'Specific design', body: 'Design the parts that must reflect your organization — rules, workflows, structures.' },
      { title: 'Phased delivery', body: 'Deliver in modules, migrating data and users progressively.' },
    ],
    deliverables: ['Integrated ERP application', 'Data migration and reconciliation', 'User and administrator documentation', 'Training for key users', 'Source code under agreed terms'],
    considerations: [
      'Statutory processes such as payroll and tax filing are often better served by specialist products integrated with the ERP.',
      'The scope is phased so value arrives early rather than at a single large cutover.',
    ],
    industries: ['retail/fashion', 'food-hospitality/restaurants', 'manufacturing/discrete-manufacturing'],
    insights: ['why-enterprise-software-must-adapt', 'architecture-of-an-ai-native-erp'],
    faqs: [
      { q: 'Is a custom ERP more expensive than a packaged one?', a: 'It depends on scope and how much the package would need to change. We assess this honestly during discovery, and sometimes recommend a packaged product for part of the scope.' },
      { q: 'Can we start with one module?', a: 'Yes. Many engagements start with the area causing the most friction and expand from there.' },
    ],
  },
  {
    slug: 'legacy-modernization',
    name: 'Legacy System Modernization',
    navDescription: 'Renew business-critical systems incrementally, without stopping operations.',
    icon: 'refresh',
    headline: 'Modernize critical systems without putting the business on hold.',
    intro:
      'We help organizations renew or replace systems that have become hard to change — understanding what they really do, then migrating capability by capability while operations continue.',
    problem: [
      'Legacy systems often hold undocumented business rules, fragile integrations and data that only makes sense with context. Large replacement projects concentrate risk at a single cutover and frequently overrun.',
      'An incremental approach moves one capability at a time, with old and new running together where needed, and with behaviour verified against the original before each switch.',
    ],
    capabilities: [
      { title: 'System and rule discovery', body: 'Code analysis, data profiling and user interviews to surface undocumented behaviour.' },
      { title: 'Modernization strategy', body: 'Retain, encapsulate, replace or retire — decided per capability.' },
      { title: 'API enablement', body: 'Modern interfaces around legacy capabilities that must remain for now.' },
      { title: 'Incremental replacement', body: 'New components that take over responsibilities slice by slice.' },
      { title: 'Data migration', body: 'Profiling, cleansing, repeatable scripts and rehearsal migrations.' },
      { title: 'Equivalence testing', body: 'Comparing outputs between old and new systems before cutover.' },
    ],
    approach: [
      { title: 'Understand', body: 'Inventory interfaces, jobs, reports and rules — including the undocumented ones.' },
      { title: 'Plan the sequence', body: 'Order capabilities by value and risk, with clear authority rules during transition.' },
      { title: 'Migrate in slices', body: 'Deliver and cut over one coherent slice at a time.' },
      { title: 'Retire', body: 'Decommission legacy components once their responsibilities have moved.' },
    ],
    deliverables: ['Discovery report and modernization roadmap', 'Modern application components and APIs', 'Migration scripts and reconciliation reports', 'Updated documentation', 'Decommissioning plan'],
    considerations: [
      'Some legacy components are stable and best left in place behind an API.',
      'AI-assisted analysis speeds up code reading and documentation, with every finding reviewed by engineers.',
    ],
    industries: ['manufacturing/discrete-manufacturing', 'real-estate/property-management', 'healthcare/healthcare-administration'],
    insights: ['modernizing-legacy-systems-without-disruption', 'ai-assisted-engineering-prototype-to-production'],
    faqs: [
      { q: 'Our legacy system has no documentation. Can you still work with it?', a: 'Yes. Discovery combines code analysis, data profiling and interviews to reconstruct how it behaves.' },
      { q: 'Do we have to replace everything?', a: 'No. We recommend the treatment for each capability; some are best retained or wrapped.' },
    ],
  },
  {
    slug: 'workflow-automation',
    name: 'Enterprise Workflow Automation',
    navDescription: 'Approvals, exceptions and routine operations automated with clear human checkpoints.',
    icon: 'workflow',
    headline: 'Automate the routine. Escalate the exceptions.',
    intro:
      'We design workflows that move work between people and systems reliably — approvals, hand-offs, exception handling and AI-assisted preparation — so teams spend their time on decisions rather than coordination.',
    problem: [
      'Much operational effort goes into coordinating work: chasing approvals, copying data between systems, checking for exceptions and reminding people of deadlines. It is invisible in process diagrams and obvious in calendars.',
      'Well-designed automation removes the coordination load while keeping accountability clear: who approved what, when and on what information.',
    ],
    capabilities: [
      { title: 'Approval workflows', body: 'Rule-based routing by value, type, department and delegation.' },
      { title: 'Exception handling', body: 'Detecting deviations and routing them to the right person with context.' },
      { title: 'Document processing', body: 'Extracting data from invoices, contracts and forms for verification.' },
      { title: 'Scheduled operations', body: 'Recurring tasks, reminders and deadline tracking.' },
      { title: 'Cross-system automation', body: 'Moving data reliably between applications with error handling.' },
      { title: 'Workflow analytics', body: 'Cycle times, bottlenecks and approval patterns.' },
    ],
    approach: [
      { title: 'Observe the real process', body: 'Including the informal steps and workarounds.' },
      { title: 'Define rules and checkpoints', body: 'Decide what is automated, what is assisted and what stays human.' },
      { title: 'Build and instrument', body: 'Implement workflows with monitoring from the start.' },
      { title: 'Refine', body: 'Adjust rules using actual cycle-time and exception data.' },
    ],
    deliverables: ['Workflow designs and rule definitions', 'Automated workflows in production', 'Monitoring and analytics', 'Operating documentation'],
    considerations: ['Automation is introduced progressively, with manual fallbacks during transition.'],
    industries: ['professional-services/consulting', 'wholesale/fmcg-distribution', 'healthcare/healthcare-administration'],
    insights: ['architecture-of-an-ai-native-erp', 'why-enterprise-software-must-adapt'],
    faqs: [{ q: 'Can workflows span several existing systems?', a: 'Yes, through integrations agreed during design, with error handling and monitoring for each connection.' }],
  },
  {
    slug: 'ai-integration',
    name: 'AI Integration and Intelligent Operations',
    navDescription: 'Bring governed AI assistance into the systems you already run.',
    icon: 'brain',
    headline: 'AI that works inside your operations — governed, observable and useful.',
    intro:
      'For organizations that want to keep their existing systems, we add AI capabilities through governed integration: assistants that answer operational questions, prepare routine work and monitor for exceptions, respecting existing permissions.',
    problem: [
      'Many organizations have invested heavily in their current systems and are not looking to replace them. They want AI to help with the work around those systems without creating new risks.',
      'The challenge is integration: giving AI access to the right data, with the right permissions, and a safe way to prepare actions for people to complete.',
    ],
    capabilities: [
      { title: 'Operational assistants', body: 'Answering questions across connected systems with sources shown.' },
      { title: 'Document intelligence', body: 'Classifying, extracting and summarizing business documents.' },
      { title: 'Forecasting support', body: 'Demand, capacity and cash-flow estimates presented for review.' },
      { title: 'Monitoring agents', body: 'Watching for exceptions and notifying the right people.' },
      { title: 'Evaluation and guardrails', body: 'Testing AI behaviour against your scenarios and policies.' },
      { title: 'Usage and cost controls', body: 'Visibility of AI usage and spend by team and feature.' },
    ],
    approach: [
      { title: 'Identify use cases', body: 'Prioritize by value, data readiness and risk.' },
      { title: 'Establish data access', body: 'Governed, permission-aware connections to source systems.' },
      { title: 'Build and evaluate', body: 'Develop against realistic scenarios with measured quality.' },
      { title: 'Operate', body: 'Monitor quality, cost and usage after release.' },
    ],
    deliverables: ['Use-case assessment', 'Integrated AI services', 'Evaluation suites', 'Usage and audit reporting'],
    considerations: ['Data-processing terms with model providers are reviewed before any business data is sent.'],
    industries: ['retail/electronics', 'real-estate/property-management', 'travel/tour-operators'],
    insights: ['data-ownership-deployment-flexibility-enterprise-ai', 'architecture-of-an-ai-native-erp'],
    faqs: [{ q: 'Will our data be used to train AI models?', a: 'We select providers and terms that do not use customer data for model training, and document the data flows for your review.' }],
  },
  {
    slug: 'enterprise-integration',
    name: 'System Integration and Data Platforms',
    navDescription: 'Connect applications, APIs and data into a coherent architecture.',
    icon: 'network',
    headline: 'One coherent architecture from many systems.',
    intro:
      'We connect business applications, external services and data sources so information flows reliably, reporting is consistent and new capabilities can be added without fragile point-to-point links.',
    problem: [
      'Most organizations run many systems — finance, sales, e-commerce, logistics, HR — each with its own data. Integrations built one at a time become brittle, undocumented and hard to change.',
      'A deliberate integration architecture defines which system owns which data, how changes propagate and how failures are handled.',
    ],
    capabilities: [
      { title: 'API design and development', body: 'Well-documented APIs for internal and partner use.' },
      { title: 'Integration services', body: 'Event-driven and scheduled integrations with retries and monitoring.' },
      { title: 'Master data', body: 'Clear ownership of customers, products, suppliers and locations.' },
      { title: 'Data platforms', body: 'Consolidated reporting stores and governed analytics models.' },
      { title: 'Channel connectivity', body: 'E-commerce, marketplaces, payment providers and logistics partners.' },
      { title: 'Integration monitoring', body: 'Visibility of message flows, failures and data freshness.' },
    ],
    approach: [
      { title: 'Map systems and data ownership', body: 'Establish the source of truth for each entity.' },
      { title: 'Design integration patterns', body: 'Choose events, APIs or batch per flow.' },
      { title: 'Implement with observability', body: 'Every flow monitored and alerting on failure.' },
      { title: 'Consolidate reporting', body: 'Build consistent analytics on integrated data.' },
    ],
    deliverables: ['Integration architecture', 'APIs and integration services', 'Data models and reporting store', 'Monitoring and runbooks'],
    considerations: ['Integration feasibility depends on the APIs and terms of third-party systems, assessed during discovery.'],
    industries: ['wholesale/fmcg-distribution', 'retail/omnichannel', 'healthcare/healthcare-administration'],
    insights: ['modernizing-legacy-systems-without-disruption', 'why-enterprise-software-must-adapt'],
    faqs: [{ q: 'Can you integrate with systems that have no API?', a: 'Often, through database access, file exchange or other agreed methods, assessed case by case for reliability and supportability.' }],
  },
  {
    slug: 'private-deployment',
    name: 'Private Cloud and On-Premises Deployment',
    navDescription: 'Run your applications in your cloud account, a private cloud or your data centre.',
    icon: 'server',
    headline: 'Your system, running where your organization needs it to.',
    intro:
      'We design applications to run in managed cloud, your own cloud account, a private cloud or on-premises — with the same codebase and the operational tooling each environment needs.',
    problem: [
      'Data-residency rules, security policies, existing infrastructure and connectivity constraints all affect where a system can run. Software designed for one environment is often difficult to move to another.',
      'Designing for deployment flexibility from the start keeps those options open and avoids costly re-platforming later.',
    ],
    capabilities: [
      { title: 'Portable architecture', body: 'Containerized services and externalized configuration.' },
      { title: 'Infrastructure as code', body: 'Repeatable environments defined in version-controlled code.' },
      { title: 'Hybrid patterns', body: 'Local services at sites with central coordination where needed.' },
      { title: 'Private AI options', body: 'Self-hosted or private model endpoints where required.' },
      { title: 'Backup and recovery', body: 'Defined recovery objectives, tested regularly.' },
      { title: 'Operational handover', body: 'Runbooks and training for your infrastructure team.' },
    ],
    approach: [
      { title: 'Assess requirements', body: 'Regulation, policy, infrastructure and team capability.' },
      { title: 'Design the topology', body: 'Environments, networks, identity and observability.' },
      { title: 'Automate', body: 'Provisioning and deployment pipelines.' },
      { title: 'Hand over or operate', body: 'Your team, ours, or shared responsibility.' },
    ],
    deliverables: ['Deployment architecture', 'Infrastructure code and pipelines', 'Runbooks and recovery procedures', 'Operational training'],
    considerations: ['On-premises deployments shift some operational responsibility to the customer; this is agreed explicitly.'],
    industries: ['healthcare/healthcare-administration', 'manufacturing/discrete-manufacturing', 'real-estate/property-management'],
    insights: ['data-ownership-deployment-flexibility-enterprise-ai'],
    faqs: [{ q: 'Can we move from managed cloud to our own environment later?', a: 'Yes. Applications are designed to be portable, and a move is planned as a controlled migration.' }],
  },
  {
    slug: 'managed-engineering',
    name: 'Managed Engineering and Team Augmentation',
    navDescription: 'Ongoing engineering, support and specialist capacity after initial delivery.',
    icon: 'users',
    headline: 'Engineering partnership that continues after go-live.',
    intro:
      'Enterprise systems need to keep changing with the business. We provide ongoing engineering — enhancements, maintenance, support and specialist capacity — either as a managed service or alongside your own team.',
    problem: [
      'Many systems decline after delivery because nobody is responsible for evolving them. Changes accumulate as workarounds, dependencies age and knowledge leaves with the original team.',
      'A continuing engineering relationship keeps the system aligned with the business, secure and maintainable.',
    ],
    capabilities: [
      { title: 'Managed enhancement', body: 'A prioritized roadmap delivered in regular releases.' },
      { title: 'Maintenance and security updates', body: 'Dependency updates, patches and periodic reviews.' },
      { title: 'Support', body: 'Defined channels and response commitments agreed in contract.' },
      { title: 'Team augmentation', body: 'Engineers working within your team and processes.' },
      { title: 'Knowledge transfer', body: 'Documentation and pairing to build your internal capability.' },
      { title: 'Performance and cost reviews', body: 'Periodic reviews of reliability, performance and infrastructure cost.' },
    ],
    approach: [
      { title: 'Agree the model', body: 'Managed service, augmentation or a mix.' },
      { title: 'Set governance', body: 'Roadmap, priorities, reporting and responsibilities.' },
      { title: 'Deliver continuously', body: 'Regular releases with automated testing.' },
      { title: 'Review', body: 'Periodic reviews of outcomes and priorities.' },
    ],
    deliverables: ['Release roadmap and reporting', 'Ongoing releases', 'Maintained documentation', 'Support according to agreed terms'],
    considerations: ['Support levels and response times are defined contractually for each engagement.'],
    industries: ['professional-services/consulting', 'retail/electronics', 'food-hospitality/restaurants'],
    insights: ['ai-assisted-engineering-prototype-to-production'],
    faqs: [{ q: 'Can you support a system you did not build?', a: 'Often, yes, following an assessment of the codebase, documentation and test coverage.' }],
  },
]

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}
