"use client";

import { useEffect, useState } from "react";

type Item = { id: string; heading: string };

/** Sticky table of contents that tracks the section currently in view. */
export function ArticleToc({ items }: { items: readonly Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="In this article" className="article-toc">
      <span className="article-toc__k">In this article</span>
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={active === item.id ? "is-active" : undefined}
            >
              <span className="article-toc__n">{String(i + 1).padStart(2, "0")}</span>
              <span>{item.heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
