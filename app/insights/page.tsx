import type { Metadata } from "next";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";
import { Reveal } from "../components/ui/Reveal";
import { InsightCard } from "../components/sections/InsightCard";
import { ARTICLES } from "@/app/data/insights";

export const metadata: Metadata = {
  title: "Insights - Moddin",
  description:
    "Opportunity briefs, sector notes, and market entry guides for companies and investors evaluating Bangladesh.",
};

export default function InsightsIndexPage() {
  const articles = [...ARTICLES].sort((a, b) =>
    b.published.localeCompare(a.published),
  );

  return (
    <>
      <Nav />
      <main>
        <section className="insights insights-index">
          <div className="wrap">
            <div className="ins-head">
              <div>
                <Reveal className="eyebrow">
                  <span>Insights</span>
                </Reveal>
                <h1 className="section-title" style={{ marginTop: 20 }}>
                  Bangladesh Market <em>Insights.</em>
                </h1>
              </div>
              <Reveal as="p" delay={1}>
                Opportunity briefs, sector notes, and market entry guides for
                companies and investors evaluating Bangladesh — written from
                the ground, for decision-makers.
              </Reveal>
            </div>

            <div className="ins-grid insights-index__grid">
              {articles.map((article, i) => (
                <InsightCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
