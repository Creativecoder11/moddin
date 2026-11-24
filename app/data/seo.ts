import type { Metadata } from "next";

/**
 * Next replaces (never merges) `openGraph` per route segment, so any page that
 * sets its own openGraph must restate the site-wide fields or og:site_name drops.
 */
export const OG_DEFAULTS = {
  siteName: "Moddin",
  type: "website",
  locale: "en_GB",
} as const;

type PageMetadataInput = {
  /** Bare page name; the root layout's title template appends " | Moddin". */
  title: string;
  description: string;
  /** Route path used for the canonical link, e.g. "/contact". */
  path: string;
  /** Extra openGraph fields (e.g. article type, images) layered over the defaults. */
  openGraph?: Metadata["openGraph"];
};

export function pageMetadata({
  title,
  description,
  path,
  openGraph,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...OG_DEFAULTS, title, description, ...openGraph },
  };
}
