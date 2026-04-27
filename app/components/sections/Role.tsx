import { Reveal } from "../ui/Reveal";
import { TextEffect } from "../ui/text-effect";
import { ROLES } from "@/app/data/site";

export function Role() {
  return (
    <section className="role">
      <div className="wrap">
        <div className="role-head">
          <div>
            <Reveal className="eyebrow">
              <span>Our Role</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title" style={{ marginTop: 20 }}>
              Turning Market Interest <em>Into</em>
              <br />
              <em>Real Outcomes.</em>
            </Reveal>
          </div>
          <TextEffect as="p" per="word" preset="blur" scrollReveal delay={0.2}>
            {"A structured approach to move from opportunity to execution—clearly, confidently, and at speed."}
          </TextEffect>
        </div>

        <div className="role-grid">
          {ROLES.map((role, i) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
