import { Brand } from "./Brand";
import { FOOTER_LINKS } from "@/app/data/site";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

export function Footer() {
  return (
    <footer className="bg-coal text-cream pt-[clamp(56px,7vw,96px)] pb-9 relative">
      <div className="wrap">
        {/* TOP: brand + link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-[clamp(24px,3vw,48px)] mb-16">
          <div className="flex flex-col gap-4 max-w-[360px]">
            <Brand variant="footer" />
            <p className="text-cream/70 text-[14.5px] leading-[1.5]">
              A partner to global businesses
              <br />
              entering Bangladesh.
            </p>
          </div>

          <FooterColumn title="Explore" links={FOOTER_LINKS.explore} />
          <FooterColumn title="Services" links={FOOTER_LINKS.services} />

          <div>
            <h4 className="serif-italic text-[16px] text-ember mb-5 font-normal tracking-[-0.005em]">
              Office
            </h4>
            <address className="not-italic text-[14.5px] text-cream/80 leading-[1.55]">
              Moddin
              <br />
              Dhaka, Bangladesh
              <br />
              <br />
              <a href="mailto:hello@moddin.com" className="hover:opacity-100 hover:text-ember">
                hello@moddin.com
              </a>
              <br />
              <a href="tel:+8801730035100" className="hover:opacity-100 hover:text-ember">
                +880 1730 035 100
              </a>
            </address>
          </div>
        </div>

        {/* MID: tagline + socials */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center py-7 border-t border-b border-[var(--rule-d-2)]">
          <div
            className="font-serif font-light tracking-[-0.025em] text-[clamp(40px,6vw,72px)] leading-none text-cream"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
          >
            Connecting Bangladesh
            <br />
            to{" "}
            <em
              className="text-ember"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
            >
              global businesses.
            </em>
          </div>
          <div className="flex gap-[10px]" aria-label="Social">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="size-[42px] rounded-full border border-[var(--rule-d-2)] grid place-items-center transition-all duration-[250ms] text-cream hover:bg-ember hover:border-ember hover:text-ink hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
            <a
              href="mailto:hello@moddin.com"
              aria-label="Mail"
              className="size-[42px] rounded-full border border-[var(--rule-d-2)] grid place-items-center transition-all duration-[250ms] text-cream hover:bg-ember hover:border-ember hover:text-ink hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-8 text-[13px] tracking-[0.01em] text-cream/55">
          <span>© 2026 Moddin · Dhaka, Bangladesh</span>
          <a href="#top" className="hover:text-ember hover:opacity-100">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="serif-italic text-[16px] text-ember mb-5 font-normal tracking-[-0.005em]">
        {title}
      </h4>
      <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[14.5px] text-cream/80 hover:text-ember hover:opacity-100 transition-opacity"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
