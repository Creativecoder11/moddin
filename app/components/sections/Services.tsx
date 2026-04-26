import Image, { type StaticImageData } from "next/image";
import { Reveal } from "../ui/Reveal";
import { SERVICES, type Service } from "@/app/data/site";
import { IMAGE_BLUR_DATA_URL } from "../ui/image-placeholders";
import bangladeshResilientReadySkyline from "../../../public/images/services/bangladesh-resilient-ready-skyline.webp";
import investmentDealFacilitationInstitutionalAccess from "../../../public/images/services/investment-deal-facilitation-institutional-access.png";
import tradeMarketExpansionPortLogistics from "../../../public/images/services/trade-market-expansion-port-logistics.webp";

type Photo = { src: string | StaticImageData; alt: string };

const SERVICE_PHOTOS: Photo[] = [
  {
    src: tradeMarketExpansionPortLogistics,
    alt: "Port operator coordinating beside a container ship at sunset",
  },
  {
    src: "/images/services/policy-institutional-access-meeting.png",
    alt: "Policy and institutional access meeting with Bangladesh government view",
  },
  {
    src: bangladeshResilientReadySkyline,
    alt: "Bangladesh resilient ready skyline billboard at sunset",
  },
  {
    src: investmentDealFacilitationInstitutionalAccess,
    alt: "Executives shaking hands in a Bangladesh institutional access meeting",
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
        <span className="svc-card__lab">{svc.label}</span>
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
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        loading="lazy"
        placeholder="blur"
        blurDataURL={
          typeof photo.src === "string" ? IMAGE_BLUR_DATA_URL : undefined
        }
        sizes={
          wide
            ? "(max-width: 600px) 100vw, (max-width: 1100px) 100vw, 50vw"
            : "(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
        }
      />
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
              Four capabilities across the market-entry journey—from first
              insight to signed partnership and operating presence in
              Bangladesh.
            </p>

          </Reveal>
        </div>

        <div className="svc-grid">
          {/* Row 1 */}
          <PhotoCard photo={SERVICE_PHOTOS[0]} delay={1} />
          <ServiceCard svc={SERVICES[0]} delay={2} />
          <PhotoCard photo={SERVICE_PHOTOS[1]} delay={2} />
          <ServiceCard svc={SERVICES[1]} delay={3} />

          {/* Row 2 */}
          <ServiceCard svc={SERVICES[2]} variant="dark" delay={1} />
          <PhotoCard photo={SERVICE_PHOTOS[2]} delay={2} />
          <ServiceCard svc={SERVICES[3]} delay={2} />
          <PhotoCard photo={SERVICE_PHOTOS[3]} delay={3} />
        </div>
      </div>
    </section>
  );
}
