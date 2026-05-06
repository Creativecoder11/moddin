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
      <TextEffect as="p" per="word" preset="blur" scrollReveal>
        {role.body}
      </TextEffect>
      <div className="tag-row">
        <span className="lab">{role.tag}</span>
        <span className="arr">→</span>
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
              <span style={{ display: "block" }}>
                Turning Market Interest <em>Into</em>
              </span>
              <span style={{ display: "block" }}>
                <em>Real Outcomes.</em>
              </span>
            </SplitText>
          </div>
          <TextEffect as="p" per="word" preset="blur" scrollReveal delay={0.2}>
            {"A structured approach to move from opportunity to execution—clearly, confidently, and at speed."}
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
