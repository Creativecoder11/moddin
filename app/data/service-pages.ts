export type ServicePageBlock = {
  title: string;
  body: string;
  bullets?: readonly string[];
};

type ServicePageFaq = {
  question: string;
  answer: string;
};

export type ServicePageHeroMeta = {
  category: string;
  subhead: string;
  bg: string;
  accent: string;
};

export type ServiceWireframeVariant =
  | "brief"
  | "corridor"
  | "pipeline"
  | "narrative"
  | "network";

export type ServicePageContent = {
  metadata: {
    title: string;
    description: string;
  };
  label: string;
  title: string;
  intro: string;
  image: {
    src: string;
    alt: string;
  };
  hero: ServicePageHeroMeta;
  wireframeVariant: ServiceWireframeVariant;
  asciiWireframe: string;
  blocks: readonly ServicePageBlock[];
  faqs: readonly ServicePageFaq[];
  cta: {
    title: string;
    body: string;
    buttonLabel: string;
  };
};

export type ServicePageKey =
  | "whyBangladesh"
  | "trade"
  | "investment"
  | "branding"
  | "policyAndAccess";

export const SERVICE_PAGE_CONTENT: Record<ServicePageKey, ServicePageContent> = {
  whyBangladesh: {
    metadata: {
      title: "Why Bangladesh - Moddin",
      description:
        "A practical Bangladesh market brief: opportunity, friction points, priority sectors, and what it takes to execute with confidence.",
    },
    label: "Country Primer",
    title: "Why Bangladesh",
    intro:
      "Bangladesh combines export scale, industrial depth, and a young workforce with a market that still feels hard to navigate from the outside. This page should give decision-makers a clear, execution-focused answer to one question: why now, and how do we enter with less risk?",
    image: {
      src: "/bg-bangladesh.webp",
      alt: "Dhaka skyline at dusk",
    },
    hero: {
      category: "Country primer",
      subhead: "Bangladesh by the numbers, the frictions to expect, and a credible way in.",
      bg: "#0e2b22",
      accent: "#3daa80",
    },
    wireframeVariant: "brief",
    asciiWireframe: `+--------------------------------------------------------------------------------+
| NAV + TICKER                                                                   |
+--------------------------------------------------------------------------------+
| HERO: WHY BANGLADESH                                                           |
| Subhead + one-paragraph country thesis                                         |
+--------------------------------------+-----------------------------------------+
| OPPORTUNITY SNAPSHOT                 | EXECUTION FRICTIONS                     |
| 3-4 quick facts                      | 3-4 common blockers                     |
+--------------------------------------+-----------------------------------------+
| PRIORITY SECTORS GRID (4 cards)                                                |
+--------------------------------------------------------------------------------+
| HOW MODDIN REDUCES RISK (3-step process)                                       |
+--------------------------------------------------------------------------------+
| FAQ                                                                            |
+--------------------------------------------------------------------------------+
| CTA: Request Bangladesh Market Brief                                           |
+--------------------------------------------------------------------------------+`,
    blocks: [
      {
        title: "Opportunity snapshot",
        body: "Position Bangladesh as a high-growth production and consumer market with proven export capability and improving infrastructure. Keep this section concrete and numbers-led rather than abstract.",
        bullets: [
          "Large and increasingly urban consumer base",
          "Competitive manufacturing platform with global supply chain relevance",
          "Strong momentum across textiles, light engineering, agribusiness, and digital services",
          "Geographic position linking South and Southeast Asian trade corridors",
        ],
      },
      {
        title: "Where decisions usually stall",
        body: "Acknowledge the execution gap directly: most international teams understand the macro story, but struggle with stakeholder mapping, policy interpretation, and finding credible partners fast enough.",
        bullets: [
          "Regulatory pathways are fragmented across institutions",
          "Partner discovery can be noisy and hard to validate",
          "Market-entry sequencing is often unclear at board level",
          "Early momentum is lost when local coordination is weak",
        ],
      },
      {
        title: "Priority sectors for near-term entry",
        body: "Frame sectors through actionable entry potential, not generic trend language. Focus on where cross-border trade and investment can move in the next 12-24 months.",
        bullets: [
          "Textiles and technical fabrics upgrade chains",
          "Agri-processing and cold-chain linked opportunities",
          "Energy transition infrastructure and industrial services",
          "Digital back-office, fintech infrastructure, and B2B software enablement",
        ],
      },
      {
        title: "How Moddin supports execution",
        body: "End the core narrative with a practical operating model: diagnose market fit, structure the right local route, and activate institutional plus commercial pathways required to execute.",
      },
    ],
    faqs: [
      {
        question: "What is the fastest way to assess Bangladesh fit for our business?",
        answer:
          "Run a focused market-entry sprint that combines sector validation, stakeholder mapping, and a shortlist of viable entry routes.",
      },
      {
        question: "Can this page speak to both investors and operating companies?",
        answer:
          "Yes. Keep the macro thesis shared, then separate execution pathways by capital-led entry and operations-led entry.",
      },
      {
        question: "What should users do after reading this page?",
        answer:
          "Book a country brief call or request a tailored opportunity memo tied to their target sector.",
      },
    ],
    cta: {
      title: "Request a Bangladesh market brief",
      body: "Get a focused, sector-specific brief with opportunity mapping, likely blockers, and a practical first-step plan.",
      buttonLabel: "Request Brief",
    },
  },
  trade: {
    metadata: {
      title: "Trade & Market Expansion - Moddin",
      description:
        "Content architecture for trade expansion into and from Bangladesh: market selection, partner matching, and execution support.",
    },
    label: "Service Content",
    title: "Trade & Market Expansion",
    intro:
      "This page should reassure global operators that Bangladesh trade entry can be systematic, data-backed, and operationally manageable. Keep the message focused on route-to-market clarity, supply-side reliability, and partner fit.",
    image: {
      src: "/images/services/trade-market-expansion-port-logistics.webp",
      alt: "Port logistics and container shipping operations",
    },
    hero: {
      category: "Trade & Market Expansion",
      subhead: "Market entry, sourcing, and partner setup—built one corridor at a time.",
      bg: "#0e2b22",
      accent: "#3daa80",
    },
    wireframeVariant: "corridor",
    asciiWireframe: `+--------------------------------------------------------------------------------+
| NAV + TICKER                                                                   |
+--------------------------------------------------------------------------------+
| HERO: TRADE & MARKET EXPANSION                                                 |
| One-line promise + short supporting paragraph                                  |
+--------------------------------------+-----------------------------------------+
| MARKET PRIORITIZATION               | SOURCING + PARTNER FIT                  |
| Where to play first                 | Who to work with and why                |
+--------------------------------------+-----------------------------------------+
| EXECUTION MODULES (logistics, compliance, commercial setup)                    |
+--------------------------------------------------------------------------------+
| CASE EXAMPLES / OUTCOMES                                                      |
+--------------------------------------------------------------------------------+
| FAQ                                                                            |
+--------------------------------------------------------------------------------+
| CTA: Start Trade Expansion Sprint                                              |
+--------------------------------------------------------------------------------+`,
    blocks: [
      {
        title: "What this page should communicate",
        body: "Trade expansion is not just finding buyers or suppliers. It is sequencing market choice, partner quality, channel strategy, and operating readiness in one coherent plan.",
      },
      {
        title: "Core service modules",
        body: "Present the service as modular but connected so clients can start where they are and scale support as execution advances.",
        bullets: [
          "Market prioritization and demand-side screening",
          "Supplier or distributor discovery with fit scoring",
          "Commercial model design (direct, partner-led, hybrid)",
          "Trade execution support across documentation, compliance, and operating setup",
        ],
      },
      {
        title: "Who this is for",
        body: "Write for importers, exporters, and manufacturers exploring either Bangladesh entry or Bangladesh-linked expansion into new regions.",
        bullets: [
          "Global companies testing Bangladesh sourcing",
          "Bangladeshi firms opening cross-border channels",
          "Sector players seeking strategic local distribution partners",
        ],
      },
      {
        title: "Expected outcomes",
        body: "Set outcomes in operational language: faster partner qualification, fewer false starts, and a clear first 90-day execution path.",
      },
    ],
    faqs: [
      {
        question: "Do you only support export opportunities from Bangladesh?",
        answer:
          "No. The service supports both inbound trade pathways and outbound expansion from Bangladesh-based operators.",
      },
      {
        question: "Can support start before we have a local entity?",
        answer:
          "Yes. Early support typically starts with market and partner validation before legal setup decisions are finalized.",
      },
      {
        question: "What is a realistic first milestone?",
        answer:
          "A validated target-market and partner shortlist with a practical execution plan for the next quarter.",
      },
    ],
    cta: {
      title: "Start a trade expansion sprint",
      body: "Get a focused plan for market selection, partner fit, and first-phase execution.",
      buttonLabel: "Start Trade Sprint",
    },
  },
  investment: {
    metadata: {
      title: "Investment & Deal Facilitation - Moddin",
      description:
        "Investment-focused page content covering opportunity origination, diligence coordination, stakeholder access, and transaction support.",
    },
    label: "Service Content",
    title: "Investment & Deal Facilitation",
    intro:
      "This page should help investors move from broad interest to executable opportunity. The voice should be disciplined and transaction-oriented, with clear emphasis on pipeline quality, local intelligence, and coordinated deal progress.",
    image: {
      src: "/images/services/investment-deal-facilitation-institutional-access.png",
      alt: "Executives shaking hands after an investment meeting",
    },
    hero: {
      category: "Investment & Deal Facilitation",
      subhead: "Mandate-aligned pipeline, structured diligence, faster go/no-go decisions.",
      bg: "#0c2620",
      accent: "#c29a4e",
    },
    wireframeVariant: "pipeline",
    asciiWireframe: `+--------------------------------------------------------------------------------+
| NAV + TICKER                                                                   |
+--------------------------------------------------------------------------------+
| HERO: INVESTMENT & DEAL FACILITATION                                           |
| Core value proposition for investors                                            |
+--------------------------------------+-----------------------------------------+
| DEAL THESIS DEVELOPMENT             | PIPELINE ORIGINATION                     |
| Sector + mandate alignment          | Curated opportunities                    |
+--------------------------------------+-----------------------------------------+
| DILIGENCE + STRUCTURING SUPPORT                                                |
+--------------------------------------------------------------------------------+
| STAKEHOLDER ACCESS (institutions, sponsors, operators)                         |
+--------------------------------------------------------------------------------+
| FAQ                                                                            |
+--------------------------------------------------------------------------------+
| CTA: Discuss Investment Mandate                                                 |
+--------------------------------------------------------------------------------+`,
    blocks: [
      {
        title: "Mandate-aligned opportunity development",
        body: "Open with how Moddin translates investor mandate into Bangladesh-specific target criteria so teams spend time on viable opportunities, not broad market noise.",
      },
      {
        title: "Investment support across the deal cycle",
        body: "Show end-to-end support from origination to close, while making it clear that legal and financial advisory remains coordinated through specialist partners.",
        bullets: [
          "Opportunity sourcing and strategic fit screening",
          "Commercial and stakeholder diligence coordination",
          "Management and partner introductions",
          "Transaction process support and milestone tracking",
        ],
      },
      {
        title: "Decision confidence through local context",
        body: "Emphasize that local context is often the deciding factor in emerging market transactions. The page should signal pragmatic intelligence, not promotional language.",
      },
      {
        title: "Execution outcomes",
        body: "Anchor value in outcomes investors care about: tighter pipeline quality, reduced dead-end diligence, and faster movement to informed go/no-go decisions.",
      },
    ],
    faqs: [
      {
        question: "Do you act as an investment advisor?",
        answer:
          "No. Moddin acts as a strategic facilitation partner and coordinates with licensed legal, tax, and financial advisors where required.",
      },
      {
        question: "Can we use this for minority and control transactions?",
        answer:
          "Yes. The support model can be adapted to both minority positions and control-oriented investment strategies.",
      },
      {
        question: "How quickly can a first pipeline view be prepared?",
        answer:
          "A first qualified opportunity view is typically developed in a short discovery cycle once mandate details are clear.",
      },
    ],
    cta: {
      title: "Share your investment mandate",
      body: "Get a structured pathway from thesis definition to qualified Bangladesh opportunities.",
      buttonLabel: "Discuss Mandate",
    },
  },
  branding: {
    metadata: {
      title: "Country Branding & Positioning - Moddin",
      description:
        "Country branding page content: narrative strategy, investor messaging, campaign assets, and institutional communication alignment.",
    },
    label: "Service Content",
    title: "Country Branding & Positioning",
    intro:
      "This page should frame branding as economic strategy, not cosmetics. The core message: strong national positioning improves investor confidence, partner quality, and deal conversion when narrative and execution signals are aligned.",
    image: {
      src: "/images/services/bangladesh-resilient-ready-skyline.webp",
      alt: "Bangladesh skyline with national branding billboard",
    },
    hero: {
      category: "Country Branding & Positioning",
      subhead: "National narrative as conversion infrastructure—not campaign collateral.",
      bg: "#13302a",
      accent: "#3daa80",
    },
    wireframeVariant: "narrative",
    asciiWireframe: `+--------------------------------------------------------------------------------+
| NAV + TICKER                                                                   |
+--------------------------------------------------------------------------------+
| HERO: COUNTRY BRANDING & POSITIONING                                           |
| National narrative as an investment conversion tool                             |
+--------------------------------------+-----------------------------------------+
| POSITIONING FRAMEWORK               | AUDIENCE MESSAGING                       |
| Core narrative pillars              | Investors, corporates, institutions       |
+--------------------------------------+-----------------------------------------+
| CONTENT ASSETS (briefs, decks, campaigns, event narratives)                    |
+--------------------------------------------------------------------------------+
| IMPLEMENTATION ROADMAP + GOVERNANCE                                             |
+--------------------------------------------------------------------------------+
| FAQ                                                                            |
+--------------------------------------------------------------------------------+
| CTA: Build Country Narrative Platform                                           |
+--------------------------------------------------------------------------------+`,
    blocks: [
      {
        title: "Narrative architecture",
        body: "Define the national narrative through a clear structure: why the market matters now, where opportunities are concentrated, and what execution pathways are credible for external stakeholders.",
      },
      {
        title: "Audience-specific messaging",
        body: "Separate communication by audience so the same country story can drive relevance for investors, global operators, policy partners, and local ecosystem participants.",
        bullets: [
          "Investor messaging: risk, return, and execution confidence",
          "Corporate messaging: market scale, supply-chain fit, operating practicality",
          "Institutional messaging: collaboration pathways and development alignment",
        ],
      },
      {
        title: "Content and campaign system",
        body: "Position this as an operating system of assets, not one-off collateral. Content should include country briefs, sector decks, spokesperson narratives, and event-ready communication kits.",
      },
      {
        title: "Governance and consistency",
        body: "Highlight coordination mechanisms that keep ministries, agencies, and delivery partners aligned on one coherent market-facing message.",
      },
    ],
    faqs: [
      {
        question: "Is this service only for public-sector entities?",
        answer:
          "No. It can support public agencies, investment promotion bodies, and consortiums that need a unified market-facing narrative.",
      },
      {
        question: "What is the biggest failure mode in country branding work?",
        answer:
          "Narratives that look strong in campaigns but are disconnected from real investor and operator experience.",
      },
      {
        question: "What should this page convert to?",
        answer:
          "A strategy workshop or narrative diagnostic engagement that produces a practical positioning roadmap.",
      },
    ],
    cta: {
      title: "Build a clearer country narrative",
      body: "Align message, evidence, and delivery signals to improve investor trust and conversion.",
      buttonLabel: "Book Narrative Workshop",
    },
  },
  policyAndAccess: {
    metadata: {
      title: "Policy & Institutional Access - Moddin",
      description:
        "Policy and access service page content for regulatory navigation, stakeholder alignment, and institution-facing execution support in Bangladesh.",
    },
    label: "Service Content",
    title: "Policy & Institutional Access",
    intro:
      "This page should reduce perceived policy uncertainty by showing a structured approach to institutional engagement. The tone should be practical, process-driven, and focused on reducing execution friction.",
    image: {
      src: "/images/services/policy-institutional-access-meeting.png",
      alt: "Institutional policy meeting with government stakeholders",
    },
    hero: {
      category: "Policy & Institutional Access",
      subhead: "Sequenced engagement with the institutions that move execution forward.",
      bg: "#0a221c",
      accent: "#c29a4e",
    },
    wireframeVariant: "network",
    asciiWireframe: `+--------------------------------------------------------------------------------+
| NAV + TICKER                                                                   |
+--------------------------------------------------------------------------------+
| HERO: POLICY & INSTITUTIONAL ACCESS                                            |
| Clear statement on reducing regulatory and access friction                      |
+--------------------------------------+-----------------------------------------+
| REGULATORY PATHWAY MAP              | STAKEHOLDER LANDSCAPE                    |
| Required approvals by phase          | Ministries, agencies, chambers           |
+--------------------------------------+-----------------------------------------+
| ENGAGEMENT SUPPORT (briefings, sequencing, coordination)                       |
+--------------------------------------------------------------------------------+
| RISK CONTROLS + COMPLIANCE CHECKPOINTS                                         |
+--------------------------------------------------------------------------------+
| FAQ                                                                            |
+--------------------------------------------------------------------------------+
| CTA: Plan Institutional Engagement                                              |
+--------------------------------------------------------------------------------+`,
    blocks: [
      {
        title: "Regulatory and institutional clarity",
        body: "Lead with a simple promise: make policy pathways understandable, sequenced, and execution-ready for cross-border teams.",
      },
      {
        title: "Service components",
        body: "Describe support across mapping, preparation, and engagement so clients understand both strategic and practical coverage.",
        bullets: [
          "Regulatory pathway mapping by project phase",
          "Institutional stakeholder identification and prioritization",
          "Engagement preparation materials and briefing support",
          "Coordination support for cross-agency and cross-partner follow-through",
        ],
      },
      {
        title: "Operating principle",
        body: "Keep the message grounded in alignment and compliance: the objective is not shortcut access, but well-prepared engagement that improves speed and quality of decisions.",
      },
      {
        title: "Client outcomes",
        body: "Position outcomes as fewer process surprises, better institutional communication, and stronger continuity from initial outreach to implementation.",
      },
    ],
    faqs: [
      {
        question: "Does this include legal advice?",
        answer:
          "No. Moddin coordinates process and access strategy while legal interpretation is handled with qualified legal counsel.",
      },
      {
        question: "When should this service start?",
        answer:
          "Ideally before major commitments, so pathway sequencing and stakeholder engagement can be built into early planning.",
      },
      {
        question: "Can this run alongside trade or investment support?",
        answer:
          "Yes. Policy and institutional access is often integrated with trade and investment workstreams.",
      },
    ],
    cta: {
      title: "Plan your institutional engagement path",
      body: "Map policy pathways and stakeholder engagement before execution risk compounds.",
      buttonLabel: "Plan Access Strategy",
    },
  },
};
