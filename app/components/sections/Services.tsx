import { Reveal } from "../ui/Reveal";
import { SERVICES } from "@/app/data/site";

export function Services() {
  return (
    <section id="services" className="services">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <Reveal className="eyebrow">
              <span className="tick" />
              <span className="idx">iv.</span>
              <span>Services</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title" style={{ marginTop: 20 }}>
              What <em>We Do.</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={2}>
            A focused set of capabilities across the market-entry arc — from first
            sector map to signed MOU to an operating presence in Dhaka.
          </Reveal>
        </div>

        <div className="svc-grid">
          {SERVICES.map((svc, i) => {
            // The original alternates delay 0/1/2 every row of three.
            const delay = (i % 3) as 0 | 1 | 2;
            return (
              <Reveal
                key={svc.num}
                as="article"
                delay={delay === 0 ? undefined : delay}
                className="svc-card"
              >
                <div className="num">
                  {svc.num} <span className="lab">service</span>
                </div>
                <h3 dangerouslySetInnerHTML={{ __html: svc.titleHTML }} />
                <p>{svc.body}</p>
                <div className="bottom">
                  <span className="pill">{svc.pill}</span>
                  <span className="arr">→</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
