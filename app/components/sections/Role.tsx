import { Reveal } from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import { TextEffect } from "../ui/text-effect";
import { MobileCarousel } from "../ui/MobileCarousel";
import { ROLES } from "@/app/data/site";

export function Role() {
  const cards = ROLES.map((role, i) => (
    <Reveal
      key={role.num}
      as="article"
      delay={i === 0 ? undefined : (i as 1 | 2)}
      className={`role-card tint-${role.tint}`}
    >
      <div className="num-big">{role.num}</div>
      <h3>{role.title}</h3>
      <TextEffect as="p" per="word" preset="fade" scrollReveal>
        {role.body}
      </TextEffect>
      <div className="tag-row">
        <span className="lab">Outcome: {role.outcome}</span>
      </div>
    </Reveal>
  ));

  return (
    <section className="role">
      <div className="wrap">
        <div className="role-head">
          <div>
            <Reveal className="eyebrow">
              <span>Our Role</span>
            </Reveal>
            <SplitText tag="h2" className="section-title" style={{ marginTop: 20 }} textAlign="left">
              <span style={{ display: "block" }}>Turning Market Interest </span>
              <span style={{ display: "block" }}>
                <em>Into Real Outcomes.</em>
              </span>
            </SplitText>
          </div>
          <TextEffect as="p" per="word" preset="fade" scrollReveal delay={0.2}>
            {"One structured path, from first look to signed deal."}
          </TextEffect>
        </div>

        <div className="role-grid">
          <MobileCarousel breakpoint={900} slideClassName="role-slide">
            {cards}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}
