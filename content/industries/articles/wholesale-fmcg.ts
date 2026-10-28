import type { IndustryArticle } from '../types'

export const wholesaleFmcg: IndustryArticle = {
  group: 'wholesale',
  sub: 'fmcg-distribution',
  eyebrow: 'Wholesale · FMCG Distribution',
  title: 'Enterprise software for FMCG distribution',
  metaTitle: 'FMCG Distribution Software — Route Sales, Van Stock, Trade Schemes, Credit, Principal Claims',
  metaDescription:
    'How custom enterprise software supports FMCG distributors: route and beat planning, order-taking, van sales, trade schemes, credit control, warehouse dispatch, collections and principal reporting.',
  intro:
    'FMCG distributors move high volumes of low-margin goods to thousands of retail outlets on fixed routes. Their profitability depends on route discipline, scheme accuracy and credit control. This page describes the operating model and the software it calls for.',
  context: [
    'A typical distributor represents one or more principals — manufacturers or importers — in a territory. Sales representatives visit outlets on planned beats, take orders or sell directly from vans, and collect payments. Deliveries follow the next day or on the same visit.',
    'Principals run trade schemes — volume discounts, free goods, display incentives — that the distributor applies to outlets and later claims back. Errors in applying or claiming schemes directly reduce margin.',
    'Outlets are numerous and small, often trading on short credit. Collections are made by representatives or drivers in cash or mobile money, which makes reconciliation a daily discipline.',
  ],
  challenges: [
    { title: 'Scheme complexity', body: 'Overlapping schemes with different eligibility rules are hard to apply correctly by hand and harder to claim back.' },
    { title: 'Route productivity', body: 'Without visit and order data by outlet, unproductive routes and missed outlets go unnoticed.' },
    { title: 'Van stock reconciliation', body: 'Stock loaded, sold, returned and damaged on each van must be reconciled every day.' },
    { title: 'Credit risk across many small accounts', body: 'Small overdue balances across hundreds of outlets add up to significant exposure.' },
    { title: 'Principal reporting', body: 'Principals expect secondary-sales data by outlet and SKU, often in their own formats.' },
  ],
  operatingModel: [
    'The distributor purchases from principals against targets, receives into a warehouse and plans routes for representatives and vehicles. Each morning, orders are picked for delivery and vans are loaded for direct selling.',
    'Representatives follow beats, record visits, take orders, apply schemes and collect payments. In the evening, vans are reconciled, cash is deposited and next-day orders are processed.',
    'At month end, scheme claims are compiled for principals, targets are reviewed and receivables are followed up.',
  ],
  workflows: [
    { name: 'Beat visit', steps: ['Open outlet on route', 'Check credit and history', 'Take order with schemes applied', 'Collect payment and record visit'] },
    { name: 'Order to delivery', steps: ['Consolidate orders by route', 'Pick and load', 'Deliver with proof', 'Record returns and collections'] },
    { name: 'Van sales reconciliation', steps: ['Load van stock', 'Sell and collect on route', 'Return and count stock', 'Reconcile cash and variance'] },
    { name: 'Scheme claim', steps: ['Aggregate scheme usage by principal', 'Validate eligibility', 'Prepare claim with evidence', 'Track settlement'] },
    { name: 'Credit control', steps: ['Set limits by outlet', 'Block orders over limit or overdue', 'Prioritize collections', 'Escalate exceptions'] },
  ],
  modules: [
    { title: 'Outlet and route management', body: 'Outlet master data, classifications, beats, visit plans and geo-location.' },
    { title: 'Field sales application', body: 'Mobile ordering, van sales, scheme application, collections and offline operation.' },
    { title: 'Scheme engine', body: 'Configurable discounts, free goods and incentives with eligibility rules and claim tracking.' },
    { title: 'Warehouse and dispatch', body: 'Receiving, picking by route, loading, delivery confirmation and returns.' },
    { title: 'Credit and collections', body: 'Limits, ageing, collection records and cash reconciliation.' },
    { title: 'Purchasing from principals', body: 'Orders against targets, receipts and principal account reconciliation.' },
    { title: 'Principal and secondary-sales reporting', body: 'Outlet-level sales by SKU in the formats principals require.' },
  ],
  dataModel: {
    entities: ['Principal', 'Product', 'Outlet', 'Outlet class', 'Route', 'Beat plan', 'Visit', 'Sales order', 'Van load', 'Scheme', 'Scheme application', 'Collection', 'Claim'],
    notes: [
      'Schemes are rules evaluated at order time, and every application is stored so claims can be generated from facts rather than reconstructed.',
      'Van stock is a location in its own right, which makes daily reconciliation a standard stock check.',
      'Visits are recorded even when no order is placed, which is essential for route productivity analysis.',
    ],
    integrations: [
      { title: 'Principal systems', body: 'Secondary-sales and claim submissions via principal portals, files or APIs.' },
      { title: 'Mobile money and banking', body: 'Collection confirmations from mobile-money providers and banks where available.' },
      { title: 'Mapping', body: 'Outlet geo-location and route visualization.' },
      { title: 'Accounting', body: 'Posting sales, collections and claims to the ledger.' },
    ],
  },
  ai: [
    { title: 'Suggested orders', body: 'Proposing order quantities per outlet from purchase history and seasonality, which representatives can adjust.' },
    { title: 'Route insight', body: 'Identifying outlets with declining orders or missed visits for supervisors to review.' },
    { title: 'Claim preparation', body: 'Compiling scheme claims and highlighting entries that may not meet eligibility rules.' },
    { title: 'Collections prioritization', body: 'Ordering collection follow-ups by exposure and payment behaviour.' },
  ],
  reporting: [
    'Sales by route, representative, outlet and SKU',
    'Visit compliance and strike rate',
    'Scheme cost and claim recovery',
    'Van stock variances',
    'Receivables ageing by route',
    'Target achievement by principal',
  ],
  security: [
    { title: 'Field device controls', body: 'Device registration, user sign-in and remote revocation for lost devices.' },
    { title: 'Price and scheme governance', body: 'Representatives cannot alter prices or schemes outside defined limits.' },
    { title: 'Cash accountability', body: 'Collections tied to user, outlet and time, with daily reconciliation.' },
  ],
  deployment: [
    'Field applications must work offline in areas with poor coverage and synchronize reliably.',
    'Central systems are typically cloud-hosted; distributors serving several principals may need clearly separated data per principal.',
    'Customization usually centres on scheme rules, route structures and principal reporting formats.',
  ],
  implementation: [
    { title: 'Outlet and route data', body: 'Clean outlet master data and map current beats.' },
    { title: 'Scheme modelling', body: 'Translate active schemes into rules and test them against past orders.' },
    { title: 'Pilot routes', body: 'Run a few routes on the field application before full rollout.' },
    { title: 'Principal reporting', body: 'Automate secondary-sales and claim reporting once data flows reliably.' },
  ],
  diagram: {
    caption: 'Illustrative daily cycle of an FMCG distributor.',
    stages: [
      { label: 'Plan', detail: 'Routes and loads' },
      { label: 'Visit', detail: 'Order or van sale' },
      { label: 'Deliver', detail: 'Proof and returns' },
      { label: 'Collect', detail: 'Cash and credit' },
      { label: 'Claim', detail: 'Schemes to principal' },
    ],
    systems: ['Outlets and routes', 'Field app', 'Scheme engine', 'Warehouse', 'Principal reports'],
  },
  faqs: [
    { q: 'Does the field application work without mobile data?', a: 'Yes. It is designed to work offline and synchronize orders, visits and collections when a connection is available.' },
    { q: 'Can we serve several principals with separate reporting?', a: 'Yes. Products, schemes and reports can be separated by principal while operations remain shared.' },
    { q: 'How are scheme claims prepared?', a: 'Every scheme application is stored at order time, so claims are generated from recorded facts with supporting detail.' },
  ],
  related: ['wholesale/pharmaceutical-distribution', 'wholesale/warehousing', 'retail/wholesale-distribution', 'retail/electronics'],
  insights: ['enterprise-software-for-multi-branch-retail', 'architecture-of-an-ai-native-erp'],
}
