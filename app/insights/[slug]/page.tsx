import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "../../components/chrome/Nav";
import { Footer } from "../../components/chrome/Footer";
import { ArticleHero } from "../../components/insights/ArticleHero";
import { ArticleBody } from "../../components/insights/ArticleBody";
import { InsightCard } from "../../components/sections/InsightCard";
import { ServiceCta } from "../../components/sections/ServiceCta";
import { ARTICLES, getArticle, getRelatedArticles } from "@/app/data/insights";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} - Moddin`,
    description: article.dek,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      publishedTime: article.published,
      authors: [article.author],
      images: [{ url: article.image.src, alt: article.image.alt }],
    },
  };
}

export default async function InsightArticlePage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug);

  return (
    <>
      <Nav />
      <main>
        <ArticleHero article={article} />
        <ArticleBody article={article} />

        {related.length > 0 && (
          <section className="insights article-related">
            <div className="wrap">
              <div className="article-related__head">
                <h2 className="section-title">
                  Keep <em>reading.</em>
                </h2>
                <Link href="/insights" className="btn btn-ghost">
                  All insights <span>→</span>
                </Link>
              </div>
              <div className="article-related__grid">
                {related.map((a, i) => (
                  <InsightCard key={a.slug} article={a} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        <ServiceCta
          title={article.closing.title}
          body={article.closing.body}
          buttonLabel={article.closing.buttonLabel}
          accent={article.accent}
        />
      </main>
      <Footer />
    </>
  );
}
