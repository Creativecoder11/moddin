import { Reveal } from "../ui/Reveal";
import { TRUST_ITEMS } from "@/app/data/site";

const HERO_IMG =
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <Reveal className="eyebrow">
              <span className="tick" />
              <span>Bangladesh market entry &amp; investment facilitation</span>
            </Reveal>

            <Reveal as="h1" delay={1} className="display">
              Bangladesh,
              <br />
              <em>Made Easier</em>
              <br />
              to Enter.
            </Reveal>

            <Reveal as="p" delay={2} className="sub">
              Moddin helps global investors, companies, and institutions understand
              the market, access the right stakeholders, and move from interest to
              execution.
            </Reveal>

            <Reveal delay={3} className="hero-ctas">
              <a href="#contact" className="btn btn-dark">
                Talk to Moddin <span>→</span>
              </a>
              <a href="#why" className="btn btn-ghost">
                Explore Bangladesh
              </a>
            </Reveal>
          </div>

          <Reveal delay={2} className="hero-photo" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMG} alt="Bangladesh industry" loading="eager" />
            <div className="cap">
              <span>Dhaka · Chattogram · Mongla</span>
              <span className="yr">2026 / 01</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={4} className="trust-strip">
          <span className="lab">What we do</span>
          <div className="trust-list">
            {TRUST_ITEMS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
