import type { Article, ArticleBlock } from "@/app/data/insights";
import { ArticleToc } from "./ArticleToc";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={block.ordered ? "article-ol" : "article-ul"}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }
    case "checklist":
      return (
        <ul className="article-check">
          {block.items.map((item) => (
            <li key={item}>
              <span className="article-check__box" aria-hidden>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="article-callout">
          <span className="article-callout__k">{block.label}</span>
          <p>{block.text}</p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="article-quote">
          <p>{block.text}</p>
        </blockquote>
      );
    case "stats":
      return (
        <dl className="article-stats">
          {block.items.map((s) => (
            <div key={s.value}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      );
    case "phases":
      return (
        <ol className="article-phases">
          {block.items.map((phase) => (
            <li key={phase.when}>
              <span className="article-phases__when">{phase.when}</span>
              <h4>{phase.title}</h4>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      );
  }
}

export function ArticleBody({ article }: { article: Article }) {
  return (
    <section
      className="article"
      style={{ ["--svc-accent" as string]: article.accent }}
    >
      <div className="wrap article__grid">
        <aside className="article__side">
          <ArticleToc
            items={article.sections.map(({ id, heading }) => ({ id, heading }))}
          />
        </aside>

        <div className="article__main">
          <div className="article-takeaways">
            <span className="article-takeaways__k">Key takeaways</span>
            <ul>
              {article.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="article-prose">
            {article.sections.map((section, i) => (
              <section key={section.id} id={section.id} className="article-section">
                <h2>
                  <span className="article-section__n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </section>
            ))}
          </div>

          {article.disclaimer && (
            <p className="article-disclaimer">{article.disclaimer}</p>
          )}
        </div>
      </div>
    </section>
  );
}
