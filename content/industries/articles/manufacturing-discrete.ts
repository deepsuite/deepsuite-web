import type { IndustryArticle } from '../types'

export const manufacturingDiscrete: IndustryArticle = {
  group: 'manufacturing',
  sub: 'discrete-manufacturing',
  eyebrow: 'Manufacturing · Discrete Manufacturing',
  title: 'Enterprise software for discrete manufacturing',
  metaTitle: 'Discrete Manufacturing Software — BOMs, Routings, Production Planning, Shop Floor, Quality',
  metaDescription:
    'How custom enterprise software supports discrete manufacturers: multi-level bills of materials, routings, capacity-aware planning, shop-floor execution, quality, traceability and product costing.',
  intro:
    'Discrete manufacturers build identifiable products from components through defined operations. Their systems must connect what customers order, what the factory can produce and what it actually did. This page describes that operating model and the software it requires.',
  context: [
    'Discrete manufacturing covers a wide range — from make-to-stock consumer products to configure-to-order equipment. The common thread is structure: products are defined by bills of materials, built through routings of operations at work centres, and tracked as units, lots or serial numbers.',
    'The planning problem is to decide what to make, when and where, given demand, material availability and capacity. The execution problem is to capture what actually happened: materials issued, time spent, quantities produced, scrap and rework. The financial problem is to cost it all accurately.',
    'Many factories run planning in spreadsheets and execution on paper travellers, with an accounting system that sees only purchases and sales. The result is a factory that works through experience and effort, but where cost, capacity and lead-time questions are hard to answer with confidence.',
  ],
  challenges: [
    { title: 'Plans that ignore capacity', body: 'Material requirements planning without capacity awareness produces schedules the floor cannot meet, so expediting becomes the real planning system.' },
    { title: 'Inaccurate BOMs and routings', body: 'When engineering data does not reflect how products are actually built, material shortages and cost errors follow.' },
    { title: 'Limited shop-floor visibility', body: 'Without timely work-order status, supervisors and planners cannot tell which orders are late until they are.' },
    { title: 'Quality issues detached from production records', body: 'Non-conformances recorded separately make it difficult to trace causes to materials, machines or operators.' },
    { title: 'Product costs based on assumptions', body: 'Standard costs drift from reality when actual material usage, labour and overhead are not captured.' },
  ],
  operatingModel: [
    'Sales orders and forecasts create demand. Planners translate that demand into production orders and purchase requirements, considering stock, open orders and lead times.',
    'Work orders are released to the floor with materials picked and issued. Operators record progress at each operation; quality checks happen at defined points. Finished goods are received into stock and shipped.',
    'Engineering maintains BOMs and routings and manages changes. Finance reviews variances between standard and actual cost and the value of work in progress.',
  ],
  workflows: [
    { name: 'Demand to plan', steps: ['Collect orders and forecast', 'Net against stock and supply', 'Check material and capacity', 'Release work and purchase orders'] },
    { name: 'Work-order execution', steps: ['Pick and issue materials', 'Record operation start and finish', 'Capture output, scrap and rework', 'Receive finished goods'] },
    { name: 'Quality control', steps: ['Inspect at defined points', 'Record non-conformance', 'Disposition: rework, scrap or concession', 'Corrective action'] },
    { name: 'Engineering change', steps: ['Propose BOM or routing change', 'Review impact on stock and orders', 'Approve with effective date', 'Communicate to floor'] },
    { name: 'Costing', steps: ['Roll up standard cost', 'Capture actual usage and time', 'Calculate variances', 'Post to finance'] },
  ],
  modules: [
    { title: 'Engineering data', body: 'Multi-level BOMs, routings, work centres, alternates and revision control.' },
    { title: 'Production planning', body: 'Material requirements, capacity loading and schedule visibility with planner overrides.' },
    { title: 'Shop-floor execution', body: 'Work-order release, material issue, operation reporting by terminal or tablet, and labour capture.' },
    { title: 'Inventory and warehouse', body: 'Raw material, work-in-progress and finished-goods stock with lot and serial tracking.' },
    { title: 'Quality management', body: 'Inspection plans, non-conformance records, corrective actions and certificates.' },
    { title: 'Purchasing and subcontracting', body: 'Purchase orders, supplier lead times and outside-processing operations.' },
    { title: 'Product costing', body: 'Standard and actual costing, variances and work-in-progress valuation.' },
  ],
  dataModel: {
    entities: ['Item', 'BOM', 'BOM line', 'Routing', 'Operation', 'Work centre', 'Production order', 'Operation report', 'Lot', 'Serial', 'Inspection', 'Non-conformance', 'Cost roll-up'],
    notes: [
      'BOMs and routings are versioned with effective dates, so in-flight orders retain the definition they were released with.',
      'Lot and serial genealogy links finished products to the component lots consumed, which supports recalls and root-cause analysis.',
      'Capacity is modelled per work centre with calendars, shifts and efficiency, allowing realistic loading.',
    ],
    integrations: [
      { title: 'Machines and sensors', body: 'Where equipment exposes data, counts and states can be captured automatically rather than keyed.' },
      { title: 'CAD and PLM', body: 'Engineering BOM import from design tools to reduce re-keying.' },
      { title: 'Suppliers and logistics', body: 'Purchase confirmations, advance shipping notices and carrier bookings.' },
      { title: 'Finance', body: 'Inventory valuation and variance postings to the general ledger.' },
    ],
  },
  ai: [
    { title: 'Schedule risk detection', body: 'Highlighting orders likely to be late based on material shortages, capacity loading and historical operation times.' },
    { title: 'Shortage summaries', body: 'Explaining which components are constraining which orders, and what alternatives or supply exist.' },
    { title: 'Quality pattern detection', body: 'Surfacing recurring non-conformances by part, supplier, machine or shift for engineers to investigate.' },
    { title: 'Plain-language production queries', body: 'Answering questions such as “which orders for customer X are blocked by material?” against live planning data.' },
  ],
  reporting: [
    'On-time delivery and schedule adherence',
    'Work-centre load and utilization',
    'Material shortages and expected availability',
    'First-pass yield, scrap and rework',
    'Standard versus actual cost variances',
    'Work-in-progress value and ageing',
  ],
  security: [
    { title: 'Engineering change control', body: 'Only authorized engineers can release BOM and routing changes, with approvals and history.' },
    { title: 'Traceability records', body: 'Production and quality records are immutable once confirmed, with corrections recorded as new entries.' },
    { title: 'Shop-floor access', body: 'Operators access only their tasks; terminals can use badge or PIN sign-in.' },
    { title: 'Commercial confidentiality', body: 'Costing and pricing restricted to authorized roles.' },
  ],
  deployment: [
    'Factories often have local network constraints and equipment that cannot depend on internet availability. Hybrid deployment — local execution services with central planning and reporting — is a common pattern.',
    'Customization typically involves planning rules, shop-floor screens, quality procedures and customer-specific documentation.',
  ],
  implementation: [
    { title: 'Engineering data validation', body: 'Verify BOMs and routings against how products are actually built before planning is trusted.' },
    { title: 'Inventory accuracy', body: 'Establish reliable stock records and locations.' },
    { title: 'Execution before optimization', body: 'Capture shop-floor reality first; introduce capacity-aware planning once data is reliable.' },
    { title: 'Costing and analytics', body: 'Move to actual costing and variance analysis once production records are complete.' },
  ],
  diagram: {
    caption: 'Illustrative flow from demand to costed output in a discrete factory.',
    stages: [
      { label: 'Demand', detail: 'Orders and forecast' },
      { label: 'Plan', detail: 'Material and capacity' },
      { label: 'Execute', detail: 'Operations reported' },
      { label: 'Inspect', detail: 'Quality gates' },
      { label: 'Cost', detail: 'Actual vs standard' },
    ],
    systems: ['BOMs and routings', 'Inventory and lots', 'Work centres', 'Quality records', 'Finance'],
  },
  faqs: [
    { q: 'Can the system support both make-to-stock and make-to-order?', a: 'Yes. Planning policies can be set per item, and order-specific production links work orders to the customer order.' },
    { q: 'Do operators need computers at every work centre?', a: 'Not necessarily. Shared terminals, tablets or barcode scanning can be used, depending on the environment.' },
    { q: 'Can we connect machines directly?', a: 'Where machines provide accessible data interfaces, integration is possible. This is assessed equipment by equipment during discovery.' },
  ],
  related: ['manufacturing/production-planning', 'manufacturing/quality-management', 'manufacturing/process-manufacturing', 'manufacturing/factory-operations'],
  insights: ['architecture-of-an-ai-native-erp', 'modernizing-legacy-systems-without-disruption'],
}
