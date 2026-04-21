import { Reveal } from "../ui/Reveal";
import { StatCounter } from "./StatCounter";
import { STATS } from "@/app/data/site";

export function Opportunity() {
  return (
    <section id="why" className="opportunity">
      <div className="wrap">
        <div className="opp-head">
          <div>
            <Reveal className="eyebrow">
              <span className="tick" />
              <span className="idx">i.</span>
              <span>The Opportunity</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title" style={{ marginTop: 20 }}>
              Why Bangladesh,
              <br />
              <em>Why Now.</em>
            </Reveal>
          </div>
          <Reveal delay={2} className="lead-quote">
            Bangladesh is no longer just a manufacturing story. It is becoming a
            serious market-entry and partnership destination for global businesses
            looking for{" "}
            <em>scale, cost competitiveness, and long-term growth</em>.
          </Reveal>
        </div>

        <Reveal delay={1} className="stats">
          {STATS.map((s) => (
            <div key={s.kicker} className="stat">
              <div className="kicker">{s.kicker}</div>
              <StatCounter target={s.value} prefix={s.prefix} suffix={s.suffix} />
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
