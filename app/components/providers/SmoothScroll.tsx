"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type ScrollToOptions = { offset?: number; immediate?: boolean };

type SmoothScrollApi = {
  scrollTo: (target: string | number | HTMLElement, opts?: ScrollToOptions) => void;
  start: () => void;
  stop: () => void;
  ready: boolean;
};

const noop: SmoothScrollApi = {
  scrollTo: (target, opts) => {
    if (typeof window === "undefined") return;
    if (typeof target === "number") {
      window.scrollTo({ top: target + (opts?.offset ?? 0), behavior: "smooth" });
      return;
    }
    if (typeof target === "string") {
      const el = document.querySelector(target) as HTMLElement | null;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0);
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }
    const top = target.getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0);
    window.scrollTo({ top, behavior: "smooth" });
  },
  start: () => {},
  stop: () => {},
  ready: false,
};

const SmoothScrollContext = createContext<SmoothScrollApi>(noop);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

const NAV_OFFSET = -72;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const instanceRef = useRef<{ destroy: () => void; scrollTo: (...args: unknown[]) => void; start: () => void; stop: () => void } | null>(null);
  const [api, setApi] = useState<SmoothScrollApi>(noop);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;

    (async () => {
      const mod = await import("locomotive-scroll");
      if (cancelled) return;

      const Ctor = (mod as { default?: unknown }).default ?? mod;
      const scroll = new (Ctor as new (opts: Record<string, unknown>) => {
        destroy: () => void;
        scrollTo: (...args: unknown[]) => void;
        start: () => void;
        stop: () => void;
      })({
        lenisOptions: {
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        },
      });

      instanceRef.current = scroll;

      setApi({
        ready: true,
        start: () => scroll.start(),
        stop: () => scroll.stop(),
        scrollTo: (target, opts) => {
          const offset = opts?.offset ?? NAV_OFFSET;
          scroll.scrollTo(target as never, { offset, ...(opts?.immediate ? { immediate: true } : {}) });
        },
      });
    })();

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
      setApi(noop);
    };
  }, [pathname]);

  useEffect(() => {
    if (!api.ready) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      const target = href === "#top" ? "#top" : href;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      api.scrollTo(target, { offset: NAV_OFFSET });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [api]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
