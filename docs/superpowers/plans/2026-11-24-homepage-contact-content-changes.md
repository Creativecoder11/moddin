# Homepage + Contact page content changes — implementation plan

Sources (verbatim copy lives here):
- `Moddin Homepage — Content Changes (Developer Handoff).docx`
- `Moddin Contact Page — Content Changes (Developer Handoff).docx`

Rule: fonts, colours, spacing and component patterns stay. Only text, fields, links and the listed behaviours change.

## Decisions
- Deck PDF: use `source/Moddin Business Deck13April.pdf`, served at `/moddin-business-deck.pdf`.
- Email delivery: Resend REST API via `fetch` (no new dependency). Env: `RESEND_API_KEY`, optional `RESEND_FROM`.
  Without a key: dev logs the payload and succeeds; production returns an error so the UI shows the failure state.
- Spam: hidden honeypot field `website` + in-memory per-IP rate limit (5 / 10 min).
- Booking URL pending: `CONTACT.bookingUrl` = `null` → CTAs fall back to `/contact` in the same tab.
- Socials pending: `CONTACT.socials` = `[]` → icons hidden.
- Insight dates pending: keep existing `published` values as placeholders.

## Phase 1 — shared data (`app/data/site.ts`)
- `CONTACT`: office, email, phone, phoneHref, hours, bookingUrl, deckUrl, socials, map coords/links.
- `SERVICES`: new bodies; drop `pill`; add `href`, `linkLabel`, `title` (plain).
- `STATS`: Consumers 179m, GDP $501bn, Exports $48bn, Workforce 2.2m (decimals supported).
- `ROLES`: new bodies, `outcome` replaces `tag`.
- `PARTNERS`: drop `topTag`/`idx`, new bodies.
- `FOOTER_LINKS.explore`: `/#why`, `/#services`, `/#who`, `/insights`, `/#contact`.

## Phase 2 — parallel build
1. Footer, `/privacy`, `app/sitemap.ts`.
2. Homepage: Hero, StatCounter (SSR final value, reduced motion), Role, Services, Who, InsightCard date, FinalCta.
3. Contact page + ServiceHero (ReactNode title, optional CTA).
4. Forms: `app/actions/leads.ts` server actions, ContactForm rewrite, DeckRequest component (replaces PrimerForm, used on homepage + contact aside), ServiceCta reads CONTACT.

## Phase 3 — verify
- `pnpm lint`, `pnpm build`.
- Browser: `/`, `/contact`, `/privacy`, one service page; JS-off HTML shows final stat values; contact form validation/success/failure; deck flow; footer links from a sub-page.
