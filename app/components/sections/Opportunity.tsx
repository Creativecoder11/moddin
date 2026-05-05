import { Reveal } from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import { StatCounter } from "./StatCounter";
import { STATS } from "@/app/data/site";

export function Opportunity() {
  return (
    <section id="why" className="opportunity">
      <div className="wrap">
        <div className="opp-head">
          <div>
            <Reveal className="eyebrow">
              <span>The Opportunity</span>
            </Reveal>
            <SplitText tag="h2" className="section-title" style={{ marginTop: 20 }} textAlign="left">
              <span style={{ display: "block" }}>Why Bangladesh,</span>
              <span style={{ display: "block" }}>
                <em>Why Now.</em>
              </span>
            </SplitText>
          </div>
          <Reveal delay={2} className="lead-quote">
            Bangladesh is no longer defined by manufacturing alone. It is becoming
            a strategic destination for global businesses seeking scale,{" "}
            <em>efficiency, and long-term growth</em>.
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
