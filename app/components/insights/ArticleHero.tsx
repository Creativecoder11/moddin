import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import {
  formatArticleDate,
  readTimeMinutes,
  type Article,
} from "@/app/data/insights";

/** Article hero — reuses the sub-page hero shell (image band + cream slab). */
export function ArticleHero({ article }: { article: Article }) {
  return (
    <section
      className="sub-hero article-hero"
      style={{ ["--svc-accent" as string]: article.accent }}
      aria-label={article.title}
    >
      <div className="sub-hero__media">
        <div aria-hidden className="sub-hero__img">
          <Image src={article.image.src} alt="" fill priority sizes="100vw" />
        </div>
        <div aria-hidden className="sub-hero__veil" />
        <div aria-hidden className="sub-hero__topo" />
      </div>

      <div className="sub-hero__slab">
        <div className="sub-hero__tab">
          <span className="sub-hero__tab-mark" aria-hidden />
          <span>{article.series}</span>
        </div>

        <div className="wrap sub-hero__grid article-hero__grid">
          <Reveal className="sub-hero__headline">
            <nav aria-label="Breadcrumb" className="article-crumbs">
              <Link href="/">Home</Link>
              <span aria-hidden>/</span>
              <Link href="/insights">Insights</Link>
            </nav>
            <h1
              className="sub-hero__title"
              dangerouslySetInnerHTML={{ __html: article.titleHTML }}
            />
          </Reveal>

          <Reveal as="aside" delay={2} className="sub-hero__aside">
            <p className="sub-hero__lede article-hero__dek">{article.dek}</p>
            <dl className="article-meta">
              <div>
                <dt>Published</dt>
                <dd>
                  <time dateTime={article.published}>
                    {formatArticleDate(article.published)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>Read</dt>
                <dd>{readTimeMinutes(article)} min</dd>
              </div>
              <div>
                <dt>By</dt>
                <dd>{article.author}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
