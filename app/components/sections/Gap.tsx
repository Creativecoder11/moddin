import { Reveal } from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import { TextEffect } from "../ui/text-effect";
import { GAP_ITEMS } from "@/app/data/site";

export function Gap() {
  return (
    <section className="gap">
      <div className="wrap">
        <div className="gap-head">
          <div>
            <Reveal className="eyebrow">
              <span>The Gap</span>
            </Reveal>
            <SplitText tag="h2" className="section-title" style={{ marginTop: 20 }} textAlign="left">
              <span style={{ display: "block" }}>High Potential.</span>
              <span style={{ display: "block" }}>
                <em>Still Hard to Unlock.</em>
              </span>
            </SplitText>
          </div>
          <TextEffect as="p" per="word" preset="fade" scrollReveal delay={0.2}>
            {"Interest in Bangladesh is strong. Conversion into real investment and partnerships is where friction begins — and where Moddin comes in."}
          </TextEffect>
        </div>

        <div className="gap-grid">
          {GAP_ITEMS.map((item, i) => (
            <Reveal
              key={item.num}
              delay={i === 0 ? undefined : (i as 1 | 2)}
              className="gap-col"
            >
              <div className="num">
                <b>{item.num}</b>
                <span>{item.label}</span>
              </div>
              <h3 dangerouslySetInnerHTML={{ __html: item.titleHTML }} />
              <TextEffect as="p" per="word" preset="fade" scrollReveal>
                {item.body}
              </TextEffect>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
