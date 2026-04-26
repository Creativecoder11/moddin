import { Reveal } from "../ui/Reveal";
import { SERVICES, type Service } from "@/app/data/site";

type Photo = { src: string; alt: string };

const SERVICE_PHOTOS: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
    alt: "Executive boardroom overlooking a financial district at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    alt: "Two executives shaking hands as a deal is finalised",
  },
  {
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80",
    alt: "City skyline with global trade connections",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=80",
    alt: "Audience seated at a global business summit",
  },
];

type Variant = "light" | "dark";

function ServiceCard({
  svc,
  variant = "light",
  wide = false,
  delay,
}: {
  svc: Service;
  variant?: Variant;
  wide?: boolean;
  delay?: 1 | 2 | 3 | 4 | 5;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`svc-card svc-card--${variant}${wide ? " svc-card--wide" : ""}`}
    >
      <header className="svc-card__head">
        <span className="svc-num">{svc.num}</span>
        <span className="svc-card__lab">service</span>
        <span className="svc-rule" aria-hidden />
        <span className="svc-rule__dot" aria-hidden />
      </header>

      <h3
        className="svc-title"
        dangerouslySetInnerHTML={{ __html: svc.titleHTML }}
      />

      <p className="svc-body">{svc.body}</p>

      <footer className="svc-card__foot">
        <span className="svc-pill">
          <span className="svc-pill__dot" aria-hidden />
          {svc.pill}
        </span>
        <span className="svc-arr" aria-hidden>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </footer>
    </Reveal>
  );
}

function PhotoCard({
  photo,
  wide = false,
  delay,
}: {
  photo: Photo;
  wide?: boolean;
  delay?: 1 | 2 | 3 | 4 | 5;
}) {
  return (
    <Reveal
      as="figure"
      delay={delay}
      className={`svc-photo${wide ? " svc-photo--wide" : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.src} alt={photo.alt} loading="lazy" />
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="services">
      <div className="wrap">
        <div className="svc-head">
          <div className="svc-head__main">
            <Reveal className="eyebrow">
              <span className="tick" />
              <span className="idx">iv.</span>
              <span>Services</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title svc-h2">
              What <em>We Do.</em>
            </Reveal>
          </div>

          <Reveal as="div" delay={2} className="svc-head__aside">
            <p className="svc-head__lead">
              A focused set of capabilities across the market-entry arc — from
              first sector map to signed MOU to an operating presence in Dhaka.
            </p>

          </Reveal>
        </div>

        <div className="svc-grid">
          {/* Row 1 */}
          <ServiceCard svc={SERVICES[0]} delay={1} />
          <PhotoCard photo={SERVICE_PHOTOS[0]} delay={2} />
          <ServiceCard svc={SERVICES[1]} delay={2} />
          <PhotoCard photo={SERVICE_PHOTOS[1]} delay={3} />

          {/* Row 2 */}
          <ServiceCard svc={SERVICES[2]} variant="dark" delay={1} />
          <ServiceCard svc={SERVICES[3]} delay={2} />
          <PhotoCard photo={SERVICE_PHOTOS[2]} delay={2} />
          <ServiceCard svc={SERVICES[4]} delay={3} />

          {/* Row 3 */}
          <PhotoCard photo={SERVICE_PHOTOS[3]} wide delay={1} />
          <ServiceCard svc={SERVICES[5]} wide delay={2} />
        </div>
      </div>
    </section>
  );
}
