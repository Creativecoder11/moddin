import { Reveal } from "../ui/Reveal";
import { SERVICES } from "@/app/data/site";
import { ServiceIcons } from "../ui/BrandIcons";

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
            const Icon = ServiceIcons[svc.num];
            return (
              <Reveal
                key={svc.num}
                as="article"
                delay={delay === 0 ? undefined : delay}
                className="svc-card group"
              >
                {Icon && (
                  <div className="absolute -bottom-16 -right-12 text-ink opacity-10 group-hover:text-cream group-hover:opacity-15 transition-all duration-700 ease-out pointer-events-none z-0 transform group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="w-72 h-72 stroke-[1]" />
                  </div>
                )}
                <div className="num relative z-10">
                  {svc.num} <span className="lab">service</span>
                </div>
                <h3 className="relative z-10" dangerouslySetInnerHTML={{ __html: svc.titleHTML }} />
                <p className="relative z-10">{svc.body}</p>
                <div className="bottom relative z-10 mt-auto">
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
