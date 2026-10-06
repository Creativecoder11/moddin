import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import { TextEffect } from "../ui/text-effect";
import { ARTICLES } from "@/app/data/insights";
import { MobileCarousel } from "../ui/MobileCarousel";
import { InsightCard } from "./InsightCard";

export function Insights() {
  return (
    <section id="insights" className="insights">
      <div className="wrap">
        <div className="ins-head">
          <div>
            <Reveal className="eyebrow">
              <span>Insights</span>
            </Reveal>
            <SplitText tag="h2" className="section-title" style={{ marginTop: 20 }} textAlign="left">
              Bangladesh Market <em>Insights.</em>
            </SplitText>
          </div>
          <TextEffect as="p" per="word" preset="fade" scrollReveal delay={0.2}>
            {"Practical insights, sector updates, and guides for companies and investors evaluating Bangladesh."}
          </TextEffect>
        </div>

        <div className="ins-grid">
          <MobileCarousel breakpoint={900} slideClassName="ins-slide">
            {ARTICLES.slice(0, 3).map((article, i) => (
              <InsightCard key={article.slug} article={article} index={i} />
            ))}
          </MobileCarousel>
        </div>

        <Reveal className="ins-cta">
          <span className="t">All insights in one place</span>
          <Link href="/insights" className="btn btn-ghost">
            View Insights <span>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
