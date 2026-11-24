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

/** Resolve a `#hash` to its element; hashes come from the URL, so tolerate malformed escapes. */
function hashTarget(hash: string): HTMLElement | null {
  if (hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

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

  // Same-page hash links (`#id`, or `/#id` while already on `/`) glide through Lenis.
  // Capture + stopPropagation keeps next/link from also running its own instant
  // scroll-to-hash on top of the glide. Without Lenis (reduced motion) the browser /
  // Next handle the jump natively and `scroll-margin-top` supplies the nav offset.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search
      ) {
        return;
      }
      const el = hashTarget(url.hash);
      if (!el) return;
      // Skip-link target: <main> is not focusable by default, so Enter would leave focus on <body>.
      if (el.id === "main-content") {
        el.tabIndex = -1;
        el.focus({ preventScroll: true });
      }
      if (!api.ready) return;
      e.preventDefault();
      e.stopPropagation();
      api.scrollTo(el, { offset: NAV_OFFSET });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [api]);

  // Land on the URL's hash on first load and after a route change. The homepage re-lays out
  // right after hydration (mobile carousels swap in and shrink the page), so keep re-pinning
  // the target until layout settles or the user takes over. Lenis is re-created per route, so
  // `api` changes then; it is driven through instanceRef because `api` can be a stale closure
  // over a destroyed instance during that swap. Reduced motion has no Lenis: scroll natively.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hashTarget(window.location.hash) || (!instanceRef.current && !reduce)) return;
    const land = () => {
      const el = hashTarget(window.location.hash);
      if (!el) return;
      if (instanceRef.current) instanceRef.current.scrollTo(el, { offset: NAV_OFFSET, immediate: true });
      else el.scrollIntoView();
    };
    land();
    const observer = new ResizeObserver(land);
    observer.observe(document.body);
    const userEvents = ["wheel", "touchstart", "keydown", "pointerdown"];
    const stop = () => {
      observer.disconnect();
      clearTimeout(timer);
      userEvents.forEach((ev) => window.removeEventListener(ev, stop));
    };
    const timer = setTimeout(stop, 1500);
    userEvents.forEach((ev) => window.addEventListener(ev, stop, { passive: true }));
    return stop;
  }, [api, pathname]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
