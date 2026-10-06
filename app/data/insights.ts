/**
 * Insight articles. Each entry drives three surfaces:
 *   - the homepage Insights card (card fields)
 *   - the /insights index
 *   - the /insights/[slug] article page (hero, takeaways, sections, CTA)
 *
 * Add an article by appending to ARTICLES — routes, metadata, read time,
 * table of contents, and "related" links are all derived from this data.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: readonly string[]; ordered?: boolean }
  | { type: "checklist"; items: readonly string[] }
  | { type: "callout"; label: string; text: string }
  | { type: "quote"; text: string }
  | { type: "stats"; items: readonly { value: string; label: string }[] }
  | {
      type: "phases";
      items: readonly { when: string; title: string; items: readonly string[] }[];
    };

export type ArticleSection = {
  /** Anchor id used by the table of contents. */
  id: string;
  heading: string;
  blocks: readonly ArticleBlock[];
};

export type Article = {
  slug: string;
  /** Pill on the card cover. */
  tag: string;
  /** Series name — shown on card meta and the hero tab. */
  series: string;
  title: string;
  /** Hero headline; may contain <em> for the accent word. */
  titleHTML: string;
  /** Standfirst under the hero headline. */
  dek: string;
  /** Short summary used on cards. */
  excerpt: string;
  cta: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  author: string;
  image: { src: string; alt: string };
  accent: string;
  takeaways: readonly string[];
  sections: readonly ArticleSection[];
  disclaimer?: string;
  closing: { title: string; body: string; buttonLabel: string };
};

export const ARTICLES: readonly Article[] = [
  /* ------------------------------------------------------------------ */
  /* 01 — Opportunity Brief                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "bangladesh-opportunity-brief",
    tag: "Brief",
    series: "Opportunity Brief",
    title: "Bangladesh Opportunity Brief: Where the Market Is Heading",
    titleHTML: "Where the Bangladesh market is <em>heading.</em>",
    dek: "A structured read on the five shifts reshaping Bangladesh — and what each one means for investors, global companies, and the partners who back them.",
    excerpt:
      "Short, structured primers on where the market is going — and what that means for capital and partners.",
    cta: "Read the brief",
    published: "2026-09-08",
    author: "Moddin Research",
    image: {
      src: "/images/services/bangladesh-resilient-ready-skyline.webp",
      alt: "Dhaka skyline at sunset along the river",
    },
    accent: "var(--ember)",
    takeaways: [
      "Bangladesh is moving from a single-engine apparel economy to a multi-sector market with real consumer, digital, and infrastructure depth.",
      "Graduation from Least Developed Country status changes the trade rulebook — early movers who plan for it will capture the advantage.",
      "Infrastructure delivered over the last five years has shortened supply chains and opened new industrial corridors outside Dhaka.",
      "The opportunity is real; the bottleneck is conversion — access, sequencing, and local partners decide outcomes more than the thesis does.",
    ],
    sections: [
      {
        id: "the-thesis",
        heading: "The thesis in one paragraph",
        blocks: [
          {
            type: "p",
            text: "Bangladesh is the eighth most populous country in the world, with a GDP of roughly $460 billion and two decades of consistent, export-led growth behind it. For most of that period the story was told through one sector: ready-made garments. That story is now incomplete. A rising middle class, a fast-digitising economy, large-scale infrastructure, and a scheduled change in trade status are turning Bangladesh into a market that rewards a broader — and more deliberate — investment approach.",
          },
          {
            type: "stats",
            items: [
              { value: "176m", label: "People — the 8th largest consumer base globally" },
              { value: "$460bn", label: "GDP, with mid-single-digit real growth over the past decade" },
              { value: "$55bn+", label: "Annual exports, led by textiles, leather, and jute" },
            ],
          },
          {
            type: "p",
            text: "The question for global capital is no longer whether Bangladesh matters. It is where to play, how to enter, and with whom.",
          },
        ],
      },
      {
        id: "five-shifts",
        heading: "Five shifts reshaping the market",
        blocks: [
          { type: "h3", text: "1. From factory floor to consumer market" },
          {
            type: "p",
            text: "Bangladesh has long been understood as a place to make things for other markets. Increasingly, it is a market in its own right. Urbanisation, rising household incomes, and a median age in the late twenties are driving demand in packaged food, personal care, retail, housing, healthcare, education, and financial services. Companies that once viewed the country only as a sourcing base are now evaluating it as a sales destination.",
          },
          { type: "h3", text: "2. LDC graduation rewrites the trade rulebook" },
          {
            type: "p",
            text: "Bangladesh is scheduled to graduate from the UN's Least Developed Country category in November 2026. Graduation is a sign of economic maturity, but it also means that some preferential market access — including duty-free terms under schemes such as the EU's Everything But Arms — will phase out after a transition period. Exporters will need to compete more on productivity, compliance, and product mix, and less on preference margins.",
          },
          {
            type: "callout",
            label: "Why it matters",
            text: "Graduation creates pressure, and pressure creates deals. Expect demand for capital, technology, and partnerships that help local exporters move up the value chain — synthetic fibres, technical textiles, higher-value finishing, and stronger compliance systems.",
          },
          { type: "h3", text: "3. Infrastructure is redrawing the map" },
          {
            type: "p",
            text: "The Padma Bridge connected the south-west to Dhaka by road and rail. Dhaka's metro rail has begun to change commuting in the capital. Port capacity is expanding, with the Matarbari deep-sea port under development on the south-east coast. Taken together, these projects shorten lead times, reduce logistics costs, and make sites outside the Dhaka–Chattogram corridor viable for manufacturing and warehousing for the first time.",
          },
          { type: "h3", text: "4. A digital economy with real scale" },
          {
            type: "p",
            text: "Mobile financial services are used by tens of millions of people. Bangladesh has one of the largest online freelance workforces in the world, and a growing base of IT and IT-enabled services firms exporting to global clients. Digital payments, e-commerce, logistics technology, and software services are no longer niche bets — they are infrastructure for the next phase of growth.",
          },
          { type: "h3", text: "5. Energy and industrial policy are in transition" },
          {
            type: "p",
            text: "Reliable, affordable energy is one of the most important variables for investors. Bangladesh is diversifying its mix — imported LNG, new generation capacity including the Rooppur nuclear project, and a growing push on solar and efficiency. Alongside this, a network of economic zones and export processing zones offers serviced land, streamlined approvals, and incentive packages for qualifying investors.",
          },
        ],
      },
      {
        id: "what-it-means",
        heading: "What this means for capital and partners",
        blocks: [
          {
            type: "p",
            text: "Each of these shifts creates a different kind of opportunity, and different partners will want to approach them differently.",
          },
          {
            type: "list",
            items: [
              "Global companies: diversify sourcing beyond apparel, evaluate Bangladesh as a regional manufacturing base, and test the domestic consumer market with a local partner.",
              "Investors and funds: look at mid-market companies that need growth capital to meet post-graduation standards, plus platforms in fintech, logistics, healthcare, and consumer brands.",
              "Development institutions: back the transition — energy efficiency, skills, compliance, and SME finance are where catalytic capital moves the needle.",
              "Bangladeshi companies: the firms that secure international partners, certifications, and capital now will be best placed when preferential access narrows.",
            ],
          },
        ],
      },
      {
        id: "risks",
        heading: "Risks to price in",
        blocks: [
          {
            type: "p",
            text: "A credible brief names the friction as clearly as the upside. None of the following is a reason to stay away — but each should shape how you structure an entry.",
          },
          {
            type: "list",
            items: [
              "Regulatory complexity: approvals involve multiple agencies, and timelines vary. Sequencing matters as much as paperwork.",
              "Foreign exchange: currency movements and periodic pressure on reserves can affect pricing, import costs, and profit repatriation timing.",
              "Energy reliability: supply for industrial users has improved but remains a planning variable, especially for energy-intensive operations.",
              "Concentration: export earnings remain heavily weighted to apparel, which ties the macro outlook to global fashion demand.",
              "Policy continuity: shifts in priorities can change incentives. Strong local relationships help investors read signals early.",
            ],
          },
          {
            type: "quote",
            text: "Strong interest stalls short of execution — not because the thesis is wrong, but because the path isn't clear.",
          },
        ],
      },
      {
        id: "next-18-months",
        heading: "What to watch over the next 18 months",
        blocks: [
          {
            type: "checklist",
            items: [
              "How the LDC graduation transition is managed, and which trade agreements Bangladesh prioritises in response.",
              "Progress on port expansion and how quickly new logistics capacity comes online.",
              "Policy signals on foreign investment, including incentives in economic zones and treatment of profit repatriation.",
              "Energy supply for industrial users and the pace of renewable additions.",
              "Growth in digital payments and the regulatory stance on fintech and e-commerce.",
            ],
          },
          {
            type: "p",
            text: "Moddin publishes Opportunity Briefs to help decision-makers form a clear view quickly. If you are evaluating a specific sector, structure, or partner, we can turn this general picture into a targeted brief for your objective.",
          },
        ],
      },
    ],
    closing: {
      title: "Turn the brief into a plan.",
      body: "Tell us your objective and we'll map the sectors, stakeholders, and entry path that fit it — with a clear first 90-day sequence.",
      buttonLabel: "Request a tailored brief",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 02 — Sector Notes                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "sector-notes-market-signals",
    tag: "Sectors",
    series: "Sector Notes",
    title: "Sector Notes & Market Signals: Six Sectors to Watch",
    titleHTML: "Six sectors, read from <em>the ground.</em>",
    dek: "Where the momentum is in textiles, digital, energy, logistics, agri-food, and financial services — the signal, the opening, and what to watch in each.",
    excerpt:
      "On-the-ground reads across textiles, digital, energy, logistics, agri, and financial services.",
    cta: "See sector notes",
    published: "2026-09-22",
    author: "Moddin Research",
    image: {
      src: "/images/services/trade-market-expansion-port-logistics.webp",
      alt: "Container ship and cranes at a Bangladesh port at sunset",
    },
    accent: "var(--brass)",
    takeaways: [
      "Textiles remain the anchor, but the value is shifting to synthetics, technical fabrics, and compliance-led sourcing.",
      "Digital services and fintech have moved from emerging to essential, with scale already proven in mobile payments.",
      "Energy, logistics, and cold chain are the enabling sectors — and the ones where infrastructure gaps create investable demand.",
      "Across all six sectors, the best openings are partnerships with established local operators rather than greenfield entry alone.",
    ],
    sections: [
      {
        id: "how-to-read",
        heading: "How to read these notes",
        blocks: [
          {
            type: "p",
            text: "Each note follows the same structure: the signal we are seeing on the ground, where the opening sits for foreign companies and investors, and the indicators worth tracking. These are directional reads to help you prioritise — not substitutes for sector-specific due diligence.",
          },
        ],
      },
      {
        id: "textiles",
        heading: "Textiles & apparel",
        blocks: [
          {
            type: "callout",
            label: "Signal",
            text: "Bangladesh is one of the world's largest apparel exporters and the global leader in certified green garment factories. Buyers are consolidating suppliers and rewarding those with strong compliance and traceability.",
          },
          {
            type: "p",
            text: "The core industry is mature and highly cotton-weighted. The opening is in what comes next: man-made fibre fabrics, technical and functional textiles, higher-value finishing, and the systems — traceability, chemical management, energy efficiency — that global brands increasingly require.",
          },
          {
            type: "list",
            items: [
              "Opening: backward-linkage investment in synthetic and blended fabrics, plus recycling and circular-textile capacity.",
              "Opening: technology and services for compliance, traceability, and factory energy efficiency.",
              "Watch: post-LDC trade terms with major buyer markets and the speed of product-mix diversification.",
            ],
          },
        ],
      },
      {
        id: "digital",
        heading: "Digital & IT services",
        blocks: [
          {
            type: "callout",
            label: "Signal",
            text: "A large, young, English-capable talent pool and one of the world's biggest online freelance workforces are feeding a growing IT and IT-enabled services export sector.",
          },
          {
            type: "p",
            text: "Software development, business process outsourcing, and digital agencies are winning international clients on cost and capability. Domestically, e-commerce, ride-hailing, and digital platforms have shown that Bangladeshi consumers adopt technology quickly when it solves a real problem.",
          },
          {
            type: "list",
            items: [
              "Opening: offshore delivery centres and partnerships with established software and BPO firms.",
              "Opening: growth capital for B2B software, logistics tech, and vertical marketplaces.",
              "Watch: data-protection rules, cross-border payment flows for service exporters, and connectivity outside major cities.",
            ],
          },
        ],
      },
      {
        id: "energy",
        heading: "Energy & power",
        blocks: [
          {
            type: "callout",
            label: "Signal",
            text: "Industrial demand is rising faster than reliable supply. Manufacturers are actively seeking ways to secure and lower the cost of power.",
          },
          {
            type: "p",
            text: "Bangladesh has expanded generation capacity significantly, but fuel supply, grid reliability, and cost remain pressing issues. That creates demand on the customer side of the meter as much as at utility scale.",
          },
          {
            type: "list",
            items: [
              "Opening: rooftop solar and power-purchase models for factories and industrial parks.",
              "Opening: energy efficiency retrofits, storage, and industrial heat solutions.",
              "Watch: tariff policy, renewable procurement rounds, and payment security for independent producers.",
            ],
          },
        ],
      },
      {
        id: "logistics",
        heading: "Logistics & infrastructure",
        blocks: [
          {
            type: "callout",
            label: "Signal",
            text: "New bridges, expressways, and port capacity are cutting transit times, but warehousing, inland container depots, and last-mile networks have not kept pace.",
          },
          {
            type: "p",
            text: "Major projects such as the Padma Bridge and expanding port capacity at Chattogram and Matarbari are shifting where goods can be made and moved efficiently. The supporting layer — modern warehouses, third-party logistics, and digital freight platforms — is still fragmented.",
          },
          {
            type: "list",
            items: [
              "Opening: Grade-A warehousing and logistics parks near new transport corridors.",
              "Opening: third-party logistics, freight forwarding, and digital freight partnerships.",
              "Watch: commissioning timelines for port projects and customs process modernisation.",
            ],
          },
        ],
      },
      {
        id: "agri-food",
        heading: "Agri-food & processing",
        blocks: [
          {
            type: "callout",
            label: "Signal",
            text: "Bangladesh is a major producer of rice, vegetables, fish, and poultry, but post-harvest losses are high and processed-food demand is growing rapidly.",
          },
          {
            type: "p",
            text: "The gap between farm output and consumer demand for safe, packaged, branded food is one of the clearest opportunities in the market. Cold chain, food processing, feed, and agri-inputs all benefit from rising urban incomes.",
          },
          {
            type: "list",
            items: [
              "Opening: cold-chain storage and distribution, especially for fisheries, dairy, and fresh produce.",
              "Opening: food processing and packaging, both for the domestic market and for export to diaspora markets.",
              "Watch: food-safety standards, import duty treatment on equipment, and agri-finance availability.",
            ],
          },
        ],
      },
      {
        id: "financial-services",
        heading: "Financial services & fintech",
        blocks: [
          {
            type: "callout",
            label: "Signal",
            text: "Mobile financial services have reached mass adoption, yet large parts of the SME and retail market remain underserved by formal credit.",
          },
          {
            type: "p",
            text: "Mobile wallets have built the rails. The next layer — digital lending, SME finance, insurance, wealth, and payments infrastructure for merchants — is where growth is likely to concentrate. Regulators have shown willingness to license new models, including digital banks.",
          },
          {
            type: "list",
            items: [
              "Opening: partnerships with banks, MFS providers, and NBFIs to deliver digital credit and embedded finance.",
              "Opening: B2B payments, merchant acquiring, and remittance-linked products.",
              "Watch: licensing frameworks, credit-information infrastructure, and foreign-ownership limits in regulated entities.",
            ],
          },
        ],
      },
      {
        id: "reading-across",
        heading: "Reading across the sectors",
        blocks: [
          {
            type: "p",
            text: "Three patterns hold across all six sectors. First, the enabling sectors — energy, logistics, finance — are where infrastructure gaps translate most directly into investable demand. Second, established local operators often hold licences, land, relationships, and distribution that take years to build from scratch; partnering usually beats going alone. Third, timing matters: the LDC transition and new infrastructure are compressing the window in which early movers can set terms.",
          },
          {
            type: "quote",
            text: "The best sector thesis still fails without the right partner and the right sequence.",
          },
        ],
      },
    ],
    disclaimer:
      "Sector notes are directional and based on publicly available information and on-the-ground conversations. They are not investment advice.",
    closing: {
      title: "Go deeper on your sector.",
      body: "We'll prepare a focused sector read — market structure, leading operators, regulatory points, and potential partners — built around your objective.",
      buttonLabel: "Request a sector deep-dive",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 03 — Market Entry Guide                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "market-entry-guide-first-180-days",
    tag: "Guides",
    series: "Market Entry Guide",
    title: "Market Entry Guide: Setup, Licensing & Your First 180 Days",
    titleHTML: "Entering Bangladesh: your first <em>180 days.</em>",
    dek: "A step-by-step playbook covering entry structures, registration, partner selection, and a phased plan from first decision to operating presence.",
    excerpt:
      "Step-by-step playbooks covering setup, licensing, partner selection, and first 180 days.",
    cta: "Browse the guide",
    published: "2026-10-01",
    author: "Moddin Advisory",
    image: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
      alt: "Team planning a market entry strategy",
    },
    accent: "var(--terracotta)",
    takeaways: [
      "Choose your entry vehicle before anything else — liaison office, branch, subsidiary, or joint venture each carry different approvals, tax treatment, and flexibility.",
      "Decide early between an economic or export processing zone and a standard location; it changes your regulator, incentives, and timeline.",
      "Registration follows a sequence. Getting the order right saves weeks; getting it wrong can stall bank accounts and hiring.",
      "Partner selection deserves the same rigour as the investment itself. Verify, structure, and set governance before you sign.",
    ],
    sections: [
      {
        id: "entry-vehicle",
        heading: "Step 1 — Choose the right entry vehicle",
        blocks: [
          {
            type: "p",
            text: "The structure you choose determines what you are allowed to do, which authority approves you, how you are taxed, and how easily you can scale or exit. Match the vehicle to your objective, not the other way round.",
          },
          { type: "h3", text: "Liaison office" },
          {
            type: "p",
            text: "Best for market research, relationship building, and coordinating with local suppliers or partners. A liaison office cannot earn revenue locally and is funded from abroad. It is a low-commitment way to establish a presence while you validate the opportunity.",
          },
          { type: "h3", text: "Branch office" },
          {
            type: "p",
            text: "Allows a foreign company to carry out specific approved activities in Bangladesh as an extension of the parent. Useful for project-based work and services, but liability sits with the parent and the scope of permitted activity is defined at approval.",
          },
          { type: "h3", text: "Private limited company (subsidiary)" },
          {
            type: "p",
            text: "The most common choice for companies that intend to trade, manufacture, or serve the local market over the long term. Incorporated locally with the Registrar of Joint Stock Companies and Firms (RJSC), a subsidiary can be wholly foreign-owned in most sectors, giving full operational flexibility and limited liability.",
          },
          { type: "h3", text: "Joint venture" },
          {
            type: "p",
            text: "Pairs your capital, technology, or market access with a local partner's licences, land, relationships, and distribution. Often the fastest route to scale in regulated or relationship-driven sectors — provided governance and exit terms are agreed upfront.",
          },
          {
            type: "callout",
            label: "Zone or non-zone?",
            text: "Export-oriented manufacturers should evaluate Export Processing Zones (regulated by BEPZA) and Economic Zones (regulated by BEZA). Zones offer serviced land, one-stop approvals, and incentive packages, but come with their own rules. Outside zones, most investors register with the Bangladesh Investment Development Authority (BIDA).",
          },
        ],
      },
      {
        id: "registration",
        heading: "Step 2 — Registration and licensing sequence",
        blocks: [
          {
            type: "p",
            text: "Requirements vary by sector and structure, but a typical sequence for a foreign-owned private limited company looks like the checklist below. BIDA's One Stop Service can handle many of these steps through a single portal.",
          },
          {
            type: "checklist",
            items: [
              "Name clearance with RJSC.",
              "Open a temporary bank account and remit initial share capital through formal banking channels; obtain an encashment certificate.",
              "Incorporate with RJSC — Memorandum and Articles of Association, certificate of incorporation.",
              "Register the investment with BIDA (or BEPZA / BEZA if operating in a zone).",
              "Obtain a Trade Licence from the relevant city corporation or local authority.",
              "Register for an e-TIN and, where applicable, VAT/BIN with the National Board of Revenue.",
              "Secure import (IRC) and/or export (ERC) registration if you will trade goods.",
              "Apply for sector-specific licences and environmental clearance where required.",
              "Apply for work permits and visas for foreign staff.",
              "Convert to a permanent bank account and set up payroll and statutory compliance.",
            ],
          },
          {
            type: "callout",
            label: "Practical note",
            text: "Bring capital in through formal banking channels and keep every encashment certificate. They are the paper trail you will need later for repatriating dividends and capital.",
          },
        ],
      },
      {
        id: "partners",
        heading: "Step 3 — Selecting the right local partners",
        blocks: [
          {
            type: "p",
            text: "Whether it is a joint-venture partner, distributor, contract manufacturer, or service provider, the partners you choose will shape your reputation and your speed. Apply the same discipline you would to an acquisition.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Define the role: what exactly do you need the partner to bring — licences, land, customers, operations, or credibility?",
              "Build a long list from multiple sources: chambers of commerce, industry associations, embassies, development partners, and trusted advisers.",
              "Verify fundamentals: legal standing, ownership, financial health, litigation history, and compliance record.",
              "Check reputation: speak to customers, suppliers, bankers, and former partners.",
              "Test alignment: agree on growth ambitions, reinvestment, and decision rights before discussing valuation.",
              "Structure for clarity: governance, reporting, deadlock resolution, intellectual property, and exit terms in writing.",
            ],
          },
          {
            type: "quote",
            text: "The right partner can compress years of market learning into months. The wrong one can cost you the market.",
          },
        ],
      },
      {
        id: "first-180-days",
        heading: "Step 4 — Your first 180 days",
        blocks: [
          {
            type: "p",
            text: "Treat entry as a phased programme with clear decision gates, not a single event. A realistic plan for most mid-sized entries looks like this:",
          },
          {
            type: "phases",
            items: [
              {
                when: "Days 0–30",
                title: "Explore & decide",
                items: [
                  "Confirm the objective, target segment, and success measures.",
                  "Select the entry vehicle and location (zone or non-zone).",
                  "Map stakeholders: regulators, chambers, potential partners.",
                  "Appoint legal, tax, and on-ground advisers.",
                ],
              },
              {
                when: "Days 31–90",
                title: "Structure & register",
                items: [
                  "Complete incorporation and investment registration.",
                  "Run partner due diligence and agree heads of terms.",
                  "Open bank accounts and remit initial capital.",
                  "Shortlist premises and senior local hires.",
                ],
              },
              {
                when: "Days 91–180",
                title: "Engage & execute",
                items: [
                  "Finalise sector licences, work permits, and tax registrations.",
                  "Sign partnership or supply agreements.",
                  "Hire the core team and establish compliance routines.",
                  "Launch pilot operations and review against the original objective.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "pitfalls",
        heading: "Common pitfalls — and how to avoid them",
        blocks: [
          {
            type: "list",
            items: [
              "Starting registration before the structure is settled — changing vehicle mid-process means repeating approvals.",
              "Underestimating timelines — build buffers for documentation, attestation, and agency review.",
              "Choosing partners on introductions alone — always verify independently.",
              "Neglecting foreign-exchange documentation — it becomes critical when you repatriate profits.",
              "Treating compliance as a one-off — tax filings, licence renewals, and labour obligations recur every year.",
            ],
          },
          {
            type: "p",
            text: "Moddin works with companies through each of these stages — from choosing the structure to coordinating approvals, partner introductions, and on-ground execution.",
          },
        ],
      },
    ],
    disclaimer:
      "This guide is general information only and does not constitute legal, tax, or regulatory advice. Requirements change and vary by sector; confirm current rules with qualified advisers and the relevant authorities before acting.",
    closing: {
      title: "Plan your first 180 days with us.",
      body: "Share your objective and we'll come back with a recommended structure, approval sequence, and partner map for your entry.",
      buttonLabel: "Start your entry plan",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 2): Article[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);
}

export function articleHref(article: Pick<Article, "slug">) {
  return `/insights/${article.slug}`;
}

function blockText(block: ArticleBlock): string {
  switch (block.type) {
    case "p":
    case "h3":
    case "quote":
      return block.text;
    case "callout":
      return `${block.label} ${block.text}`;
    case "list":
    case "checklist":
      return block.items.join(" ");
    case "stats":
      return block.items.map((s) => `${s.value} ${s.label}`).join(" ");
    case "phases":
      return block.items
        .map((p) => `${p.when} ${p.title} ${p.items.join(" ")}`)
        .join(" ");
  }
}

/** Read time in minutes, computed from the article body at ~220 wpm. */
export function readTimeMinutes(article: Article): number {
  const text = [
    article.dek,
    ...article.takeaways,
    ...article.sections.flatMap((s) => [s.heading, ...s.blocks.map(blockText)]),
  ].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
