import type { IndustryArticle } from '../types'

export const retailElectronics: IndustryArticle = {
  group: 'retail',
  sub: 'electronics',
  eyebrow: 'Retail · Electronics and Mobile Accessories',
  title: 'Enterprise software for electronics retail and distribution',
  metaTitle: 'Electronics Retail & Distribution Software — Serial Tracking, Warranties, Multi-Branch',
  metaDescription:
    'How custom enterprise software supports electronics and mobile-accessory businesses: serial and IMEI tracking, warranties, supplier credit, branch transfers, trade sales and AI-assisted replenishment.',
  intro:
    'Electronics and mobile-accessory businesses combine high-value, serial-tracked devices with thousands of low-value accessories, often across retail branches and a wholesale desk. This page describes how their operations typically work and what a system designed around them needs to handle.',
  context: [
    'An electronics business usually runs two very different inventories under one roof. Handsets, laptops and appliances are individually identifiable by serial number or IMEI, carry manufacturer warranties and lose value quickly as new models launch. Accessories — cases, cables, chargers, screen protectors — move in high volume, have short life cycles and are sold in many variants for many device models.',
    'Many operators sell through several channels simultaneously: walk-in branches, a trade counter for smaller retailers and repair shops, an online storefront, and sometimes marketplace listings. Stock is frequently shared between those channels and moved between branches daily to follow demand.',
    'Supplier relationships are also distinctive. Distributors may offer price protection when a model is repriced, credit terms tied to purchase volume, and warranty processes that require the retailer to log the serial number of every failed unit. Getting these details wrong is not an inconvenience; it is lost margin.',
  ],
  challenges: [
    { title: 'Serial numbers that do not follow the unit', body: 'When serials are only captured at sale — or not at all — the business cannot prove which unit came from which supplier batch, which makes warranty claims, returns and theft investigations slow and error-prone.' },
    { title: 'Fast depreciation and model churn', body: 'A device that sits in the wrong branch for six weeks can lose a meaningful share of its value. Without visibility into ageing stock by location, transfers and markdowns happen too late.' },
    { title: 'Accessory compatibility at scale', body: 'Thousands of accessory SKUs map to hundreds of device models. Staff need to find the right case or charger quickly, and buyers need to know which compatible items to stock when a new device launches.' },
    { title: 'Mixed retail and trade selling', body: 'The same item may be sold at retail price over the counter and at a trade price on credit to a repair shop. Pricing, credit limits and statements need to work for both without separate systems.' },
    { title: 'Warranty, repair and return loops', body: 'Customer returns, manufacturer warranty claims and in-house repairs each follow different rules and timelines. Tracking them in spreadsheets makes it hard to see what is owed by whom.' },
  ],
  operatingModel: [
    'Purchasing is typically centralized. Buyers order devices from national distributors or importers, often against allocation, and accessories from a broader set of suppliers including direct imports. Goods are received at a main warehouse or flagship branch, where serial numbers are scanned into stock.',
    'Branches request or receive stock through transfers. Each branch sells to walk-in customers, handles exchanges and logs repair or warranty intake. A trade desk — sometimes at the warehouse — sells to smaller retailers on account, with representatives visiting customers and taking orders.',
    'At day end, each branch reconciles cash, card and mobile-wallet takings. Management reviews sales by branch and brand, ageing stock, outstanding trade receivables and open warranty claims.',
  ],
  workflows: [
    { name: 'Serialized receiving', steps: ['Match delivery to purchase order', 'Scan serial or IMEI per unit', 'Flag duplicates and mismatches', 'Post stock to location with cost'] },
    { name: 'Counter sale with warranty', steps: ['Scan device serial', 'Attach compatible accessories', 'Apply price rules and payment', 'Issue receipt with warranty terms'] },
    { name: 'Inter-branch transfer', steps: ['Request or suggest transfer', 'Pick and scan serials out', 'In-transit tracking', 'Scan-in and confirm at destination'] },
    { name: 'Warranty claim', steps: ['Look up original sale by serial', 'Record fault and intake', 'Submit claim to supplier', 'Track replacement or credit note'] },
    { name: 'Trade sale on credit', steps: ['Check customer credit limit', 'Apply trade price list', 'Dispatch with serial capture', 'Post to customer statement'] },
  ],
  modules: [
    { title: 'Serialized inventory', body: 'Unit-level tracking from purchase to sale, transfer, return or claim, with a complete movement history per serial number.' },
    { title: 'Product catalogue and compatibility', body: 'Brands, models, variants and an accessory-to-device compatibility map that drives search at the counter and range planning in buying.' },
    { title: 'Point of sale', body: 'Fast counter sales with serial capture, bundles, trade-ins, split payments and receipt-level warranty terms.' },
    { title: 'Purchasing and supplier management', body: 'Purchase orders, allocations, price-protection claims, supplier credit terms and landed costs for imports.' },
    { title: 'Warranty and repair', body: 'Intake, diagnosis, supplier claims, repair job cards and customer notifications in one service record.' },
    { title: 'Trade sales and credit control', body: 'Customer-specific price lists, credit limits, statements and collections for wholesale accounts.' },
    { title: 'Branch operations', body: 'Transfers, cycle counts, cash-up, branch targets and staff commissions.' },
  ],
  dataModel: {
    entities: ['Product', 'Model', 'Variant', 'Serial unit', 'Compatibility link', 'Location', 'Transfer', 'Purchase order', 'Supplier claim', 'Sale', 'Warranty case', 'Trade customer', 'Price list'],
    notes: [
      'The serial unit is a first-class record, not an attribute of a sale line. It carries its supplier, cost, current location and status, so any event — sale, return, transfer, claim — updates one authoritative record.',
      'Compatibility is modelled as a relationship between accessory products and device models rather than as free-text tags, which makes it searchable and reportable.',
      'Costing generally needs to handle both average cost for accessories and specific identification for serialized devices.',
    ],
    integrations: [
      { title: 'Payments', body: 'Card terminals, mobile wallets and bank transfers, reconciled per branch and per shift.' },
      { title: 'E-commerce and marketplaces', body: 'Stock and price synchronization with an online store and marketplace listings, with orders flowing back into the same inventory.' },
      { title: 'Distributor portals', body: 'Where distributors offer APIs or file exports, purchase confirmations and claim statuses can be imported rather than re-keyed.' },
      { title: 'Accounting', body: 'Posting to an existing general ledger, or a built-in finance module where the organization prefers one system.' },
    ],
  },
  ai: [
    { title: 'Replenishment suggestions', body: 'Proposing transfers and purchase quantities by branch, based on recent sell-through, ageing and supplier lead times, for a buyer to review and approve.' },
    { title: 'Ageing stock alerts', body: 'Highlighting serialized units that are slowing down relative to their model’s typical sales pace, before value erodes further.' },
    { title: 'Natural-language operations queries', body: 'Letting managers ask questions such as “which branches have more than 30 days of stock on last year’s flagship models?” against governed reporting data.' },
    { title: 'Compatibility assistance', body: 'Helping staff and buyers map new accessory SKUs to device models from supplier descriptions, with human confirmation before the mapping is saved.' },
    { title: 'Claim preparation', body: 'Drafting warranty claim submissions from the service record so staff review rather than retype.' },
  ],
  reporting: [
    'Sales, margin and units by branch, brand, model and staff member',
    'Stock ageing by serialized model and location',
    'Accessory attachment rate per device sale',
    'Open warranty claims by supplier and age',
    'Trade receivables ageing and credit-limit utilization',
    'Transfer volumes and in-transit stock',
    'Price-protection claims raised versus received',
  ],
  security: [
    { title: 'Role-based permissions', body: 'Separate rights for counter staff, branch managers, buyers, trade sales and finance, with price overrides and refunds above a threshold requiring approval.' },
    { title: 'Serial-level audit trail', body: 'Every status change of a serialized unit is recorded with user, time and location, supporting loss investigations.' },
    { title: 'Cash controls', body: 'Shift-based cash-up with variance reporting and supervisor sign-off.' },
    { title: 'Customer data', body: 'Minimal collection of customer personal data, purpose-limited to warranty and service, with access restricted by role.' },
  ],
  deployment: [
    'Branches need to keep selling when connectivity is poor. Counter applications should be designed to queue transactions locally and synchronize, with conflict rules for serialized stock agreed during architecture.',
    'Cloud hosting suits most multi-branch operators; organizations with data-residency requirements or existing infrastructure may prefer a private cloud or on-premises deployment. The application architecture should not need to change between them.',
    'Customization usually concentrates on pricing rules, commission schemes, claim workflows and reporting — areas where each business has its own practice.',
  ],
  implementation: [
    { title: 'Discovery across counter, warehouse and trade desk', body: 'Observe how serials, transfers, claims and trade credit are actually handled, including the workarounds.' },
    { title: 'Data preparation', body: 'Clean the product and model catalogue, establish compatibility mappings, and plan opening stock with serial capture by location.' },
    { title: 'Pilot branch', body: 'Run one branch and the warehouse on the new system first, with the remaining branches following once transfers and cash-up are proven.' },
    { title: 'Trade and integrations', body: 'Bring trade accounts, statements and channel integrations online once core inventory is stable.' },
  ],
  diagram: {
    caption: 'Illustrative flow of a serialized unit through an electronics operation.',
    stages: [
      { label: 'Purchase', detail: 'PO and allocation' },
      { label: 'Receive', detail: 'Serial scan-in' },
      { label: 'Transfer', detail: 'Branch stock' },
      { label: 'Sell', detail: 'Retail or trade' },
      { label: 'Service', detail: 'Warranty or return' },
    ],
    systems: ['Serialized inventory', 'Pricing and credit', 'Payments', 'Supplier claims', 'Reporting'],
  },
  faqs: [
    { q: 'Can the system track IMEI numbers as well as manufacturer serial numbers?', a: 'Yes. A serial unit can hold multiple identifiers — for example a serial number and one or two IMEIs — and any of them can be used to look the unit up.' },
    { q: 'How are accessories without serial numbers handled?', a: 'They are tracked as quantity-based stock with average costing, alongside serialized devices in the same locations and documents.' },
    { q: 'Can retail branches and a wholesale desk share one inventory?', a: 'Yes. Both channels draw from the same location-level stock, with separate price lists, credit rules and documents for trade customers.' },
    { q: 'Does AI make purchasing decisions automatically?', a: 'No. AI suggestions such as replenishment quantities are presented for review. Purchase orders and transfers are created only after a person approves them.' },
    { q: 'Can we keep our existing accounting software?', a: 'Often, yes. The system can post summarized or detailed transactions to an existing ledger through an integration agreed during architecture.' },
  ],
  related: ['retail/fashion', 'wholesale/fmcg-distribution', 'retail/omnichannel', 'retail/wholesale-distribution'],
  insights: ['enterprise-software-for-multi-branch-retail', 'architecture-of-an-ai-native-erp'],
}
