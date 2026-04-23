import { SVGProps } from "react";

/**
 * A collection of bespoke, geometric brand icons for Moddin.
 * Designed with an "impeccable", abstract, architectural aesthetic.
 * They rely on `currentColor` so they can be tinted by the parent component,
 * but also use opacity to create depth.
 */

// 1. Market Entry & Setup Support
// A brutalist geometric gateway / horizon line.
export function IconGateway(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 44H44" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M16 44V16H32V44" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 4V16" stroke="currentColor" strokeWidth="2" strokeDasharray="2 4" />
    </svg>
  );
}

// 2. Government & Institutional Facilitation
// A solid structural pillar / classical column abstracted.
export function IconPillar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="8" y="6" width="32" height="6" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="12" width="20" height="24" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="36" width="32" height="6" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="12" x2="24" y2="36" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

// 3. Investor Outreach & Opportunity Promotion
// Abstract radar / signal radiating outwards.
export function IconSignal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="36" r="4" fill="currentColor" />
      <path d="M12 24C18.6274 24 24 29.3726 24 36" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M12 12C25.2548 12 36 22.7452 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M44 36L44 32" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M36 44L32 44" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

// 4. JV, M&A & Strategic Matchmaking
// Interlocking nodes / Venn diagram abstracted.
export function IconNode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="18" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="30" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M24 16L24 32" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}

// 5. Deal Structuring & Market Positioning
// Architectural blueprint / grid.
export function IconFramework(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="2" />
      <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <rect x="20" y="20" width="8" height="8" fill="currentColor" />
      <rect x="32" y="8" width="8" height="8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// 6. Expos, Summits & Trade Missions
// Radial assembly / Gathering around a central point.
export function IconAssembly(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="24" cy="24" r="6" fill="currentColor" />
      <circle cx="24" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="42" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="42" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="12" x2="24" y2="16" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="32" x2="24" y2="36" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="24" x2="16" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="24" x2="36" y2="24" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// Map service numbers to specific icons
export const ServiceIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  "01": IconGateway,
  "02": IconPillar,
  "03": IconSignal,
  "04": IconNode,
  "05": IconFramework,
  "06": IconAssembly,
};
