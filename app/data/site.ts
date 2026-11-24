/**
 * Centralised content for the Moddin one-pager.
 * Keeping copy out of components keeps the JSX skim-able and lets non-devs
 * edit without touching markup.
 */

/** Canonical origin for metadata, OG URLs and the sitemap. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://moddin.com").replace(/\/$/, "");

/**
 * Approved contact details — the single source of truth for every email,
 * phone, address and booking link on the site.
 */
export const CONTACT = {
  office: "House: 654, Road: 09, Ave: 04, Mirpur DOHS, Dhaka 1216",
  officeShort: "House 654, Road 09, Ave 04, Mirpur DOHS, Dhaka 1216",
  email: "muddin@mostafiz.org",
  phone: "+880 1784-398934",
  phoneHref: "tel:+8801784398934",
  hours: "Sun – Thu, 9:00 – 18:00 GMT+6 (Dhaka)",
  /** PLACEHOLDER: replace "#" with the booking-calendar URL (Calendly, Google appointment page…). */
  bookingUrl: "#" as string,
  /** Business deck served from /public. */
  deckUrl: "/moddin-business-deck.pdf",
  /** PLACEHOLDER: replace each "#" with the real profile URL. */
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
  ] as { label: "LinkedIn" | "X"; href: string }[],
  map: {
    lat: 23.837439828964076,
    lng: 90.36883026744783,
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=23.837439828964076,90.36883026744783",
    embedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=90.35883026744783%2C23.832439828964076%2C90.37883026744783%2C23.842439828964076&layer=mapnik&marker=23.837439828964076%2C90.36883026744783",
  },
} as const;

/** Booking CTA target; opens in a new tab once a real URL replaces the "#" placeholder. */
export const BOOKING_LINK =
  CONTACT.bookingUrl === "#"
    ? { href: "#" }
    : { href: CONTACT.bookingUrl, target: "_blank", rel: "noopener noreferrer" };

export const NAV_LINKS = [
  { label: "Trade", href: "/trade" },
  { label: "Investment", href: "/investment" },
  { label: "Branding", href: "/branding" },
  { label: "Policy & Access", href: "/policy-and-access" },
  { label: "Insights", href: "/insights" },
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
  /** Decimal places shown while counting and at rest (e.g. 1 for "2.2"). */
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
};
export const STATS: Stat[] = [
  {
    kicker: "Consumers",
    value: 179,
    suffix: "m",
    label: "The world's 8th-largest consumer base",
  },
  {
    kicker: "GDP",
    value: 501,
    prefix: "$",
    suffix: "bn",
    label: "A half-trillion-dollar economy (FY2025-26)",
  },
  {
    kicker: "Exports",
    value: 48,
    prefix: "$",
    suffix: "bn",
    label: "Garments, home textiles, leather, jute, engineering and agro-products",
  },
  {
    kicker: "Workforce",
    value: 2.2,
    decimals: 1,
    suffix: "m",
    label: "Young graduates join the workforce every year",
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
  outcome: string;
  tint: 1 | 2 | 3;
};
export const ROLES: Role[] = [
  {
    num: "01",
    title: "Position",
    body: "We shape the market case: sector insight, narrative and investor-ready positioning.",
    outcome: "A clear entry thesis",
    tint: 1,
  },
  {
    num: "02",
    title: "Connect",
    body: "Introductions to the ministries, investors and partners that matter, made with context.",
    outcome: "The right rooms, the right people",
    tint: 2,
  },
  {
    num: "03",
    title: "Execute",
    body: "Hands-on support through market entry, partnerships and transactions.",
    outcome: "A deal or operation that's live",
    tint: 3,
  },
];

export type Service = {
  num: string;
  label: string;
  /** Plain-text title (footer, contact page focus cards). */
  title: string;
  /** Service page URL. */
  href: string;
  /** Contact page focus-card link label. */
  linkLabel: string;
  titleHTML: string;
  body: string;
};
/** Shared by the homepage Services cards, the footer and the contact page focus cards. */
export const SERVICES: Service[] = [
  {
    num: "01",
    label: "Trade",
    title: "Trade & Market Expansion",
    href: "/trade",
    linkLabel: "Explore Trade",
    titleHTML: "Trade &amp; <em>Market</em> Expansion",
    body: "Market access, sourcing alignment and partner connections for cross-border trade.",
  },
  {
    num: "02",
    label: "Investment",
    title: "Investment & Deal Facilitation",
    href: "/investment",
    linkLabel: "Explore Investment",
    titleHTML: "Investment &amp; <em>Deal</em> Facilitation",
    body: "From opportunity discovery to deal execution.",
  },
  {
    num: "03",
    label: "Branding",
    title: "Country Branding & Positioning",
    href: "/branding",
    linkLabel: "Explore Branding",
    titleHTML: "Country Branding &amp; <em>Positioning</em>",
    body: "Investment narratives, sector positioning and investor communication.",
  },
  {
    num: "04",
    label: "Policy & Access",
    title: "Policy & Institutional Access",
    href: "/policy-and-access",
    linkLabel: "Explore Policy & Access",
    titleHTML: "Policy &amp; <em>Institutional</em> Access",
    body: "Regulatory pathways and structured access to ministries and agencies.",
  },
];

export type Partner = {
  src: string;
  alt: string;
  title: string;
  body: string;
};
export const PARTNERS: Partner[] = [
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
    alt: "Global corporates in a boardroom",
    title: "Global Companies",
    body: "A clear route to sourcing, expansion and local setup, with partners already vetted.",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    alt: "Investors reviewing analytics",
    title: "Investors & Funds",
    body: "A qualified pipeline and faster go/no-go decisions.",
  },
  {
    src: "/890c84c0-c673-48c9-836c-185287fdcecc-ezgif.com-resize.webp",
    alt: "International flags outside a government institution",
    title: "Government & Institutions",
    body: "A coherent national story, and the partners to deliver it.",
  },
  {
    src: "/images/partners/bangladesh-local-companies-shapla-square.webp",
    alt: "Dhaka Shapla Square traffic at dusk",
    title: "Bangladeshi Companies",
    body: "Capital, global positioning and partnerships to grow beyond home.",
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

export const FOOTER_LINKS = {
  explore: [
    { href: "/#why", label: "Why Bangladesh" },
    { href: "/#services", label: "Services" },
    { href: "/#who", label: "Who We Work With" },
    { href: "/insights", label: "Insights" },
    { href: "/#contact", label: "Contact" },
  ],
  services: SERVICES.map((service) => ({
    href: service.href,
    label: service.title,
  })),
} as const;
