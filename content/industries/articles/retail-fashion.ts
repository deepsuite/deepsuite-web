import type { IndustryArticle } from '../types'

export const retailFashion: IndustryArticle = {
  group: 'retail',
  sub: 'fashion',
  eyebrow: 'Retail · Fashion and Apparel',
  title: 'Enterprise software for fashion and apparel retail',
  metaTitle: 'Fashion & Apparel Retail Software — Size/Colour Matrices, Seasonal Buying, Markdowns',
  metaDescription:
    'How custom enterprise software supports fashion and apparel retailers: style-colour-size matrices, seasonal buying, allocation, stock transfers, markdowns, returns and omnichannel inventory.',
  intro:
    'Fashion retail is a business of variants and timing. A single style becomes dozens of sellable SKUs, each season has a short window to sell through, and returns are a normal part of trade. This page outlines the operating model and the systems it calls for.',
  context: [
    'Fashion products are planned and bought as styles but stocked and sold as individual style-colour-size combinations. A jacket offered in four colours and seven sizes is twenty-eight SKUs, each with its own stock position in every store. Systems that treat each SKU as an unrelated product make buying, allocation and analysis much harder than it needs to be.',
    'Buying happens months ahead of selling. Merchandisers commit budget to a seasonal range, receive goods in drops, and then have a limited period to sell at full price before markdowns. Decisions made during the season — which stores get which sizes, when to transfer, when to reduce prices — have a large effect on margin.',
    'Customers increasingly move between channels: browsing online, trying on in store, returning to a different branch. Inventory and customer history need to be visible across all of them.',
  ],
  challenges: [
    { title: 'Broken size runs', body: 'Stores run out of core sizes while holding surplus in the extremes. Without size-level visibility, a style looks well stocked in total when it is not saleable in practice.' },
    { title: 'Seasonal open-to-buy discipline', body: 'Buyers need to see committed, received and remaining budget by department and season, including the effect of returns-to-vendor and cancelled orders.' },
    { title: 'Markdown timing', body: 'Reduce too early and margin is given away; too late and stock becomes harder to clear. Sell-through by style and store is the signal most teams lack in time.' },
    { title: 'High return and exchange volume', body: 'Exchanges for a different size, returns to another branch and online returns need to restore stock correctly and keep customer credit accurate.' },
    { title: 'Supplier and production lead times', body: 'For brands that manufacture, purchase orders depend on production capacity and fabric availability, which ties retail planning back to the supply side.' },
  ],
  operatingModel: [
    'A merchandising team plans each season by department and category, building a range of styles with target quantities and price points. Purchase orders are placed with suppliers or production units, often split into delivery drops.',
    'On receipt, stock is allocated to stores according to store grades, size profiles and space. During the season, the team reviews sell-through weekly, rebalances stock between stores, and reorders proven styles where lead times allow.',
    'Stores focus on selling, exchanges and visual merchandising. End-of-season, remaining stock is marked down, consolidated, sent to outlets or returned to suppliers under agreed terms.',
  ],
  workflows: [
    { name: 'Range planning to purchase', steps: ['Plan styles per category', 'Set size curves and quantities', 'Commit against open-to-buy', 'Issue purchase orders by drop'] },
    { name: 'Allocation', steps: ['Receive drop at warehouse', 'Apply store grades and size profiles', 'Generate store allocations', 'Dispatch and confirm receipt'] },
    { name: 'In-season rebalancing', steps: ['Review sell-through by size', 'Identify broken size runs', 'Suggest transfers', 'Approve and move stock'] },
    { name: 'Exchange and return', steps: ['Locate original sale', 'Validate return policy', 'Restock or quarantine item', 'Issue refund, credit or exchange'] },
    { name: 'Markdown', steps: ['Analyze sell-through and weeks of cover', 'Propose markdown levels', 'Approve by category', 'Publish prices to all channels'] },
  ],
  modules: [
    { title: 'Style and variant management', body: 'Styles, colourways and size scales with a matrix view for buying, stock and sales, while still treating each SKU accurately in transactions.' },
    { title: 'Merchandise planning and open-to-buy', body: 'Seasonal budgets by department, committed versus received value and remaining buying capacity.' },
    { title: 'Allocation and replenishment', body: 'Store grading, size profiles, initial allocation and in-season replenishment and transfers.' },
    { title: 'Point of sale and clienteling', body: 'Fast sales and exchanges, customer history across channels and store-to-store stock lookup.' },
    { title: 'Pricing and markdowns', body: 'Price lists by channel and region, promotional pricing and markdown workflows with approval.' },
    { title: 'Omnichannel orders', body: 'Ship-from-store, click-and-collect and cross-channel returns against one inventory.' },
    { title: 'Supplier and production tracking', body: 'Purchase order status, delivery drops and, for vertically integrated brands, links to production orders.' },
  ],
  dataModel: {
    entities: ['Style', 'Colourway', 'Size scale', 'SKU', 'Season', 'Department', 'Store grade', 'Allocation', 'Purchase order', 'Delivery drop', 'Transfer', 'Markdown event', 'Customer'],
    notes: [
      'Styles own shared attributes (description, season, category, supplier, cost) while SKUs own size- and colour-specific data (barcode, stock, sales). Reporting rolls up naturally from SKU to style to category.',
      'Size curves and store grades are data, not code, so merchandisers can adjust them each season.',
      'Season is a dimension on products, orders and budgets, which allows like-for-like comparison with previous seasons.',
    ],
    integrations: [
      { title: 'E-commerce platform', body: 'Product, image, stock and price synchronization, with orders and returns flowing back to central inventory.' },
      { title: 'Barcode and label printing', body: 'Ticket printing with prices and barcodes at the warehouse and in stores, including markdown re-ticketing.' },
      { title: 'Supplier or production systems', body: 'Purchase confirmations and shipment notices where suppliers can provide them.' },
      { title: 'Payments and accounting', body: 'Store payment reconciliation and posting to the general ledger.' },
    ],
  },
  ai: [
    { title: 'Size-level replenishment and transfer suggestions', body: 'Identifying broken size runs and proposing transfers from stores with surplus, for a merchandiser to approve.' },
    { title: 'Markdown support', body: 'Highlighting styles whose sell-through is behind plan, with the stock and margin context needed to decide on a price change.' },
    { title: 'Product content drafting', body: 'Drafting product descriptions and attribute tags from supplier data and images, reviewed before publication.' },
    { title: 'Natural-language merchandising questions', body: 'Answering questions such as “which knitwear styles are below 40% sell-through after six weeks?” from governed data.' },
  ],
  reporting: [
    'Sell-through by style, colour, size, store and week',
    'Weeks of cover and stock-to-sales ratios',
    'Open-to-buy by department and season',
    'Full-price versus markdown sales mix',
    'Return rates by style, reason and channel',
    'Store grade performance and allocation accuracy',
    'Like-for-like season comparison',
  ],
  security: [
    { title: 'Merchandising controls', body: 'Price and markdown changes restricted to authorized roles, with approval steps and a full price history.' },
    { title: 'Store permissions', body: 'Store staff see stock across stores for customer service but can only transact in their own location.' },
    { title: 'Return fraud signals', body: 'Flags for unusual return patterns, such as returns without receipts above a threshold, routed for review.' },
    { title: 'Customer privacy', body: 'Consent-based marketing data and role-restricted access to customer history.' },
  ],
  deployment: [
    'Most fashion retailers benefit from cloud-hosted central systems with store applications that tolerate intermittent connectivity.',
    'Customization typically centres on planning hierarchies, size curves, allocation rules and the specifics of return and exchange policy.',
    'Vertically integrated brands may extend the same platform into production planning, linking retail demand to garment manufacturing.',
  ],
  implementation: [
    { title: 'Product data foundations', body: 'Rebuild the catalogue around styles and SKUs with clean size scales, colourways and seasons — usually the most important preparation step.' },
    { title: 'Season-aligned cutover', body: 'Time go-live between seasons where possible, so opening stock and open purchase orders are smaller and easier to migrate.' },
    { title: 'Stores and channels', body: 'Bring stores online progressively, followed by e-commerce synchronization once inventory accuracy is established.' },
    { title: 'Planning capabilities', body: 'Introduce open-to-buy, allocation and markdown tooling once reliable sales and stock history accumulates.' },
  ],
  diagram: {
    caption: 'Illustrative seasonal flow for a fashion retailer.',
    stages: [
      { label: 'Plan', detail: 'Range and budget' },
      { label: 'Buy', detail: 'POs by drop' },
      { label: 'Allocate', detail: 'Size profiles' },
      { label: 'Sell', detail: 'Stores and online' },
      { label: 'Clear', detail: 'Markdown and returns' },
    ],
    systems: ['Style and SKU catalogue', 'Open-to-buy', 'Store inventory', 'Pricing', 'Sell-through analytics'],
  },
  faqs: [
    { q: 'Can we view stock as a size and colour grid?', a: 'Yes. Matrix views are available for stock, sales and purchase orders, while each SKU remains individually tracked for accuracy.' },
    { q: 'Can online returns be processed in a store?', a: 'Yes. Cross-channel returns locate the original order, restock at the returning store and issue the refund through the agreed method.' },
    { q: 'How are markdowns approved?', a: 'Markdown proposals follow an approval workflow by category or value, and approved prices are published to stores and online together.' },
    { q: 'We also manufacture our own garments. Can the system cover production?', a: 'Yes. Production orders, cut plans and supplier tracking can be added so retail demand and production are planned together.' },
  ],
  related: ['retail/electronics', 'retail/omnichannel', 'manufacturing/garments-textiles', 'retail/supermarkets'],
  insights: ['enterprise-software-for-multi-branch-retail', 'why-enterprise-software-must-adapt'],
}
