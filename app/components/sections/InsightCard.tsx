import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import { TextEffect } from "../ui/text-effect";
import { IMAGE_BLUR_DATA_URL } from "../ui/image-placeholders";
import { articleHref, readTimeMinutes, type Article } from "@/app/data/insights";

export function InsightCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <Reveal
      as="article"
      delay={index % 3 === 0 ? undefined : ((index % 3) as 1 | 2)}
      className="ins-card"
    >
      <Link href={articleHref(article)} className="ins-card__link">
        <div className="cover">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
            sizes="(max-width: 900px) 100vw, 33vw"
          />
          <span className="tag">{article.tag}</span>
        </div>
        <div className="body">
          <div className="meta">
            <span>{article.series}</span>
            <span>{readTimeMinutes(article)} min read</span>
          </div>
          <TextEffect as="h3" per="word" preset="fade" scrollReveal>
            {article.title}
          </TextEffect>
          <TextEffect as="p" per="word" preset="fade" scrollReveal>
            {article.excerpt}
          </TextEffect>
          <div className="row">
            <span className="go">{article.cta}</span>
            <span className="arr" aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
