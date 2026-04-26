import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { PARTNERS } from "@/app/data/site";
import { IMAGE_BLUR_DATA_URL } from "../ui/image-placeholders";

export function Who() {
  return (
    <section id="who" className="who">
      <div className="wrap">
        <div className="who-head">
          <div>
            <Reveal className="eyebrow">
              <span className="tick" />
              <span className="idx">v.</span>
              <span>Partners</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title" style={{ marginTop: 20 }}>
              Who <em>We Work With.</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={2}>
            Four kinds of partners typically come to Moddin. Each gets a different
            path — same discipline, same people on the ground.
          </Reveal>
        </div>

        <div className="who-grid">
          {PARTNERS.map((p, i) => (
            <Reveal
              key={p.title}
              as="article"
              delay={i === 0 ? undefined : (i as 1 | 2 | 3)}
              className="who-card"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
                sizes="(max-width: 640px) 100vw, (max-width: 1060px) 50vw, 25vw"
              />
              <span className="top-tag">{p.topTag}</span>
              <div className="inner">
                <div className="idx">{p.idx}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
