import type { IndustryArticle } from '../types'

export const foodSalons: IndustryArticle = {
  group: 'food-hospitality',
  sub: 'salons',
  eyebrow: 'Personal Services · Salons and Barbershops',
  title: 'Enterprise software for salons and barbershops',
  metaTitle: 'Salon & Barbershop Management Software — Appointments, Stylists, Commissions, Retail Stock',
  metaDescription:
    'How custom software supports salons and barbershops: appointment booking, stylist schedules, service menus, commission rules, retail and back-bar stock, client history and multi-location reporting.',
  intro:
    'Salons sell time in a chair, the skill of the person behind it and the products used along the way. Software for a salon has to coordinate all three. This page describes how salon and barbershop operations typically work.',
  context: [
    'A salon’s capacity is its people. Each stylist or barber has a schedule, a set of services they are qualified to perform, a speed for each service and, often, a following of regular clients. Booking is therefore not just about finding an open slot; it is about matching a client and a service to the right person.',
    'Revenue comes from services, retail products and packages or memberships. Costs include back-bar products consumed during services, which are rarely tracked precisely, and commissions that may differ by service, product, stylist level or target achievement.',
    'Multi-location salon groups add rostering across sites, central purchasing and brand-level reporting, while independent salons need the same discipline in a simpler form.',
  ],
  challenges: [
    { title: 'No-shows and gaps', body: 'Unfilled time cannot be sold later. Missed appointments and poorly sequenced bookings leave expensive gaps in stylists’ days.' },
    { title: 'Complex commission rules', body: 'Different rates for services and retail, tiered targets and deductions for product cost make payroll preparation slow and contentious.' },
    { title: 'Back-bar product leakage', body: 'Colour, treatment and styling products used in services are rarely tracked against the services performed.' },
    { title: 'Client history scattered', body: 'Colour formulas, preferences and patch-test records live in notebooks or individual phones.' },
    { title: 'Retail as an afterthought', body: 'Retail products often have poor stock control, even though they can carry strong margins.' },
  ],
  operatingModel: [
    'Clients book by phone, messaging apps, walk-in or online. Reception confirms the appointment against the stylist’s schedule and the service duration, sometimes including processing time when a client can be left while colour develops.',
    'During the appointment, the stylist performs services, recommends products and may record a colour formula. At checkout, services, retail items and tips are settled, and the next appointment is often booked immediately.',
    'Managers review utilization, rebooking rates, retail attachment and commission positions. Products are reordered from distributors, often with brand-specific promotions.',
  ],
  workflows: [
    { name: 'Booking', steps: ['Select service and preferred stylist', 'Check duration and processing time', 'Confirm slot and deposit if required', 'Send confirmation and reminder'] },
    { name: 'Service and checkout', steps: ['Check in client', 'Record services and formula', 'Add retail products', 'Settle payment and rebook'] },
    { name: 'Commission calculation', steps: ['Collect service and retail sales per stylist', 'Apply rate tables and targets', 'Deduct agreed product costs', 'Export to payroll'] },
    { name: 'Product replenishment', steps: ['Track retail and back-bar usage', 'Compare to par levels', 'Raise distributor orders', 'Receive and price'] },
  ],
  modules: [
    { title: 'Appointments and scheduling', body: 'Stylist calendars, service durations, processing time, resource constraints such as chairs or rooms, and online booking.' },
    { title: 'Client records', body: 'Visit history, preferences, colour formulas, consent and patch-test records with appropriate access controls.' },
    { title: 'Point of sale', body: 'Services, retail, gift cards, packages, tips and split payments.' },
    { title: 'Commission and payroll inputs', body: 'Configurable commission rules by service, product and stylist level, with transparent statements for staff.' },
    { title: 'Retail and back-bar inventory', body: 'Stock for resale and stock for professional use, tracked separately, with usage linked to services where practical.' },
    { title: 'Memberships and packages', body: 'Prepaid service bundles, memberships and redemption tracking.' },
  ],
  dataModel: {
    entities: ['Client', 'Stylist', 'Service', 'Service variant', 'Appointment', 'Resource', 'Formula record', 'Product', 'Package', 'Commission rule', 'Sale'],
    notes: [
      'Service duration can depend on the stylist and the client’s hair length or type, so it is modelled as variants rather than a single fixed time.',
      'Commission rules are stored as data with effective dates, so changes do not rewrite historical payouts.',
      'Formula and consent records are sensitive client data and should be separated in access terms from general booking information.',
    ],
    integrations: [
      { title: 'Messaging and reminders', body: 'SMS or messaging-app reminders and confirmations through approved providers.' },
      { title: 'Online booking', body: 'Booking widgets on the salon’s website or social profiles, writing directly to the schedule.' },
      { title: 'Payments', body: 'Card terminals and online deposits.' },
      { title: 'Payroll and accounting', body: 'Commission and sales data exported to existing payroll and finance tools.' },
    ],
  },
  ai: [
    { title: 'Schedule optimization suggestions', body: 'Highlighting gaps and suggesting which waitlisted or overdue clients to contact for them.' },
    { title: 'Rebooking prompts', body: 'Identifying clients who are past their usual visit interval for staff to follow up.' },
    { title: 'Commission explanations', body: 'Explaining in plain language how a stylist’s commission for a period was calculated.' },
    { title: 'Product reorder suggestions', body: 'Suggesting reorder quantities based on recent retail sales and service volumes.' },
  ],
  reporting: [
    'Stylist utilization and revenue per hour',
    'Rebooking and client retention rates',
    'Retail attachment rate and retail margin',
    'No-show and late-cancellation rates',
    'Commission statements per stylist',
    'Back-bar usage versus services performed',
  ],
  security: [
    { title: 'Client privacy', body: 'Restricted access to formulas, health notes and consent records.' },
    { title: 'Payment controls', body: 'Discount and refund permissions by role.' },
    { title: 'Commission transparency', body: 'Stylists see their own statements; managers see the team.' },
  ],
  deployment: [
    'Most salons are well served by cloud hosting with tablet and phone access for stylists.',
    'Salon groups may need central configuration of services and pricing with local flexibility per location.',
    'Customization typically involves commission schemes, booking rules and membership structures.',
  ],
  implementation: [
    { title: 'Service menu and staff setup', body: 'Define services, durations by stylist level and commission rules with the salon’s owners.' },
    { title: 'Client data migration', body: 'Import client histories from existing tools where they are available and consented.' },
    { title: 'Booking and checkout go-live', body: 'Launch appointments and payments first.' },
    { title: 'Inventory and analytics', body: 'Add retail and back-bar tracking, then performance reporting.' },
  ],
  diagram: {
    caption: 'Illustrative client journey through a salon system.',
    stages: [
      { label: 'Book', detail: 'Service and stylist' },
      { label: 'Remind', detail: 'Confirm or reschedule' },
      { label: 'Serve', detail: 'Services and formula' },
      { label: 'Checkout', detail: 'Retail and rebook' },
      { label: 'Pay out', detail: 'Commission' },
    ],
    systems: ['Schedules', 'Client records', 'Point of sale', 'Inventory', 'Commission engine'],
  },
  faqs: [
    { q: 'Can clients book online with a specific stylist?', a: 'Yes. Online booking can show only the services and stylists the salon chooses to publish, with real-time availability.' },
    { q: 'Can commission rules differ by stylist level?', a: 'Yes. Rules can vary by level, service category, product category and target thresholds, with effective dates.' },
    { q: 'How is sensitive client information protected?', a: 'Formula, consent and health notes are restricted by role and recorded with an audit trail.' },
  ],
  related: ['food-hospitality/beauty-wellness', 'food-hospitality/spas', 'retail/beauty', 'food-hospitality/restaurants'],
  insights: ['why-enterprise-software-must-adapt'],
}
