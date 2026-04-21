import { Reveal } from "../ui/Reveal";
import { ROLES } from "@/app/data/site";

export function Role() {
  return (
    <section className="role">
      <div className="wrap">
        <div className="role-head">
          <div>
            <Reveal className="eyebrow">
              <span className="tick" />
              <span className="idx">iii.</span>
              <span>Our Role</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title" style={{ marginTop: 20 }}>
              Moddin Turns Interest
              <br />
              Into <em>Action.</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={2}>
            Three capabilities, designed to work together. We shape the opportunity,
            open the right doors, and stay on the pitch until it converts.
          </Reveal>
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
              <p>{role.body}</p>
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
