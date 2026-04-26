/**
 * Centralised content for the Moddin one-pager.
 * Keeping copy out of components keeps the JSX skim-able and lets non-devs
 * edit without touching markup.
 */

export const NAV_LINKS = [
  { label: "Trade" },
  { label: "Investment" },
  { label: "Branding" },
  { label: "Policy & Access" },
] as const;

export const TICKER_ITEMS = [
  "Bangladesh Market Entry",
  "Investment Facilitation",
  "Institutional Access",
  "Strategic Matchmaking",
  "Execution Support",
] as const;

export const TRUST_ITEMS = [
  "Market Intelligence",
  "Institutional Access",
  "Strategic Matchmaking",
  "Execution Support",
] as const;

export type Stat = {
  kicker: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
};
export const STATS: Stat[] = [
  {
    kicker: "Population",
    value: 176,
    suffix: "m",
    label: "The 8th largest consumer base in the world.",
  },
  {
    kicker: "GDP",
    value: 460,
    prefix: "$",
    suffix: "bn",
    label: "Consistent mid-single-digit real growth over the past decade.",
  },
  {
    kicker: "Exports",
    value: 55,
    prefix: "$",
    suffix: "bn+",
    label: "Led by textiles, leather, jute, and a fast-rising digital economy.",
  },
  {
    kicker: "Workforce",
    value: 8,
    suffix: "th",
    label:
      "Largest workforce globally, with deep industrial and technical depth.",
  },
];

export type GapItem = {
  num: string;
  label: string;
  titleHTML: string;
  body: string;
};
export const GAP_ITEMS: GapItem[] = [
  {
    num: "i.",
    label: "What Bangladesh already has",
    titleHTML:
      "Scale, <em>export strength</em>, industrial depth, and cost advantage.",
    body: "A proven manufacturing base, a young and ambitious workforce, and two decades of consistent export-led growth.",
  },
  {
    num: "ii.",
    label: "What investors still face",
    titleHTML:
      "Fragmented access, regulatory <em>complexity</em>, and difficulty finding the right local pathways.",
    body: "Navigating ministries, chambers, and capital partners without trusted intermediaries slows every decision.",
  },
  {
    num: "iii.",
    label: "What this leads to",
    titleHTML:
      "Delayed decisions, <em>missed opportunities</em>, and weaker market entry outcomes.",
    body: "Strong interest stalls short of execution — not because the thesis is wrong, but because the path isn't clear.",
  },
];

export type Role = {
  num: string;
  title: string;
  body: string;
  tag: string;
  tint: 1 | 2 | 3;
};
export const ROLES: Role[] = [
  {
    num: "01",
    title: "Position.",
    body: "Shape the opportunity with clear market narratives, sector context, and investor-ready materials.",
    tag: "Market shaping",
    tint: 1,
  },
  {
    num: "02",
    title: "Connect.",
    body: "Open access to institutions, trade bodies, investors, and local partners who actually matter.",
    tag: "Access & relationships",
    tint: 2,
  },
  {
    num: "03",
    title: "Execute.",
    body: "Support market entry, partnerships, trade missions, and transaction pathways from first step to real outcome.",
    tag: "On-ground delivery",
    tint: 3,
  },
];

export type Service = {
  num: string;
  titleHTML: string;
  body: string;
  pill: string;
};
export const SERVICES: Service[] = [
  {
    num: "01",
    titleHTML: "Market Entry &amp; <em>Setup</em> Support",
    body: "Entry strategy, local navigation, regulatory guidance, and partner coordination.",
    pill: "For global companies",
  },
  {
    num: "02",
    titleHTML: "Government &amp; <em>Institutional</em> Facilitation",
    body: "Coordination with ministries, agencies, trade bodies, and chambers.",
    pill: "For institutions",
  },
  {
    num: "03",
    titleHTML: "Investor Outreach &amp; <em>Opportunity</em> Promotion",
    body: "Target mapping, strategic outreach, and curated opportunity visibility.",
    pill: "For promoters",
  },
  {
    num: "04",
    titleHTML: "JV, M&amp;A &amp; <em>Strategic</em> Matchmaking",
    body: "Qualified partner identification, alignment, and relationship facilitation.",
    pill: "For investors",
  },
  {
    num: "05",
    titleHTML: "Deal Structuring &amp; <em>Market</em> Positioning",
    body: "Opportunity packaging, due diligence support, and market-facing positioning.",
    pill: "For funds & corporates",
  },
  {
    num: "06",
    titleHTML: "Expos, Summits &amp; <em>Trade</em> Missions",
    body: "High-impact engagements built around curation, agenda, sponsorship, and execution.",
    pill: "For agencies",
  },
];

export type Partner = {
  src: string;
  alt: string;
  topTag: string;
  idx: string;
  title: string;
  body: string;
};
export const PARTNERS: Partner[] = [
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
    alt: "Global corporates in a boardroom",
    topTag: "Global",
    idx: "For companies",
    title: "Global Companies",
    body: "Exploring sourcing, expansion, regional strategy, and operational setup in Bangladesh.",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    alt: "Investors reviewing analytics",
    topTag: "Capital",
    idx: "For capital",
    title: "Investors & Funds",
    body: "Capital looking at high-growth opportunities, partnerships, and long-term market access.",
  },
  {
    src: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=900&q=80",
    alt: "Government and institutional meeting",
    topTag: "Public",
    idx: "For institutions",
    title: "Government & Institutions",
    body: "Agencies, embassies, chambers, and development organizations supporting trade and investment flows.",
  },
  {
    src: "https://images.unsplash.com/photo-1580136607317-ead5073ba6c8?auto=format&fit=crop&w=900&q=80",
    alt: "Bangladesh industry and export business",
    topTag: "Local",
    idx: "For BD firms",
    title: "Bangladeshi Companies",
    body: "Local firms seeking capital, global positioning, strategic partnerships, and cross-border growth.",
  },
];

export type Step = { num: string; label: string; title: string; body: string };
export const STEPS: Step[] = [
  {
    num: "i.",
    label: "Explore",
    title: "Explore.",
    body: "Understand the market, the objective, and the opportunity.",
  },
  {
    num: "ii.",
    label: "Structure",
    title: "Structure.",
    body: "Define the right entry path, stakeholder map, and partnership model.",
  },
  {
    num: "iii.",
    label: "Engage",
    title: "Engage.",
    body: "Activate introductions, coordination, and opportunity development.",
  },
  {
    num: "iv.",
    label: "Execute",
    title: "Execute.",
    body: "Move into setup, deal progress, and on-ground support.",
  },
];

export type Insight = {
  src: string;
  alt: string;
  tag: string;
  metaA: string;
  metaB: string;
  title: string;
  body: string;
  cta: string;
};
export const INSIGHTS: Insight[] = [
  {
    src: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=900&q=80",
    alt: "Dhaka port",
    tag: "Brief",
    metaA: "Country brief",
    metaB: "10 min read",
    title: "Bangladesh Opportunity Briefs",
    body: "Short, structured primers on where the market is going — and what that means for capital and partners.",
    cta: "Read the series",
  },
  {
    src: "https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?auto=format&fit=crop&w=900&q=80",
    alt: "Sector analytics and signals",
    tag: "Sectors",
    metaA: "Sector notes",
    metaB: "Quarterly",
    title: "Sector Notes & Market Signals",
    body: "On-the-ground reads across textiles, digital, energy, logistics, agri, and financial services.",
    cta: "See sector notes",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    alt: "Market entry planning",
    tag: "Guides",
    metaA: "Guides",
    metaB: "Checklists",
    title: "Market Entry Guides & Checklists",
    body: "Step-by-step playbooks covering setup, licensing, partner selection, and first 180 days.",
    cta: "Browse the guides",
  },
];

export const FOOTER_LINKS = {
  explore: [
    { href: "#why", label: "Why Bangladesh" },
    { href: "#services", label: "Services" },
    { href: "#who", label: "Who We Work With" },
    { href: "#insights", label: "Insights" },
    { href: "#contact", label: "Contact" },
  ],
  services: [
    { href: "#services", label: "Market Entry & Setup" },
    { href: "#services", label: "Institutional Facilitation" },
    { href: "#services", label: "Investor Outreach" },
    { href: "#services", label: "JV, M&A, Matchmaking" },
    { href: "#services", label: "Deal Structuring" },
    { href: "#services", label: "Expos & Trade Missions" },
  ],
} as const;
