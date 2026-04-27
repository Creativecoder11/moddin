"use client";

import { useEffect, useRef } from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  delay?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "delay" | "className" | "children">;

/**
 * Wraps children in a fade/translate-in element. Locomotive Scroll can add the
 * "in" class, and the local observer keeps content visible when smooth scroll
 * is disabled or unavailable.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay,
  className = "",
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).classList.add("in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-scroll
      data-scroll-class="in"
      data-delay={delay}
      className={`reveal ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
