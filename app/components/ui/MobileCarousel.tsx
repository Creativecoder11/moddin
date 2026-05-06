"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";

interface MobileCarouselProps {
  children: ReactNode[];
  /** CSS class applied to the outer wrapper */
  className?: string;
  /** Breakpoint (px) below which carousel mode activates. Default 768 */
  breakpoint?: number;
  /** Class applied to each slide wrapper for uniform sizing */
  slideClassName?: string;
  /** Auto-slide interval in ms. Default 4000. Set 0 to disable. */
  autoSlideMs?: number;
}

/** Slide width as a fraction (0.80 = 80%) */
const SLIDE_W = 0.8;
/** Gap between slides in px */
const GAP_PX = 10;

/**
 * A touch-swipeable peek carousel that activates only below a given breakpoint.
 * Each slide is 80% wide with a 10px gap — the next slide peeks in from the
 * right to hint that more content is available. Auto-advances every 4 s.
 */
export function MobileCarousel({
  children,
  className = "",
  breakpoint = 768,
  slideClassName = "",
  autoSlideMs = 4000,
}: MobileCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);
  const total = children.length;
  // Start at the middle set of clones
  const [active, setActive] = useState(total);
  const [wrapWidth, setWrapWidth] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Responsive check
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    onChange(mq);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  // Track wrap width for accurate slide offsets
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(() => {
      if (wrapRef.current) {
        setWrapWidth(wrapRef.current.offsetWidth);
      }
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Reset active slide when switching modes
  useEffect(() => {
    if (!isMobile) setActive(total);
  }, [isMobile, total]);

  const goTo = useCallback(
    (idx: number, smooth = true) => {
      if (trackRef.current) {
        trackRef.current.style.transition = smooth
          ? "transform 0.45s cubic-bezier(0.22, 0.68, 0.32, 1)"
          : "none";
      }
      setActive(idx);

      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

      if (idx >= total * 2) {
        transitionTimerRef.current = setTimeout(() => {
          if (trackRef.current) trackRef.current.style.transition = "none";
          setActive(idx - total);
        }, 450);
      } else if (idx < total) {
        transitionTimerRef.current = setTimeout(() => {
          if (trackRef.current) trackRef.current.style.transition = "none";
          setActive(idx + total);
        }, 450);
      }
    },
    [total]
  );

  /* ---- Auto-slide ---- */
  const resetAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    if (!isMobile || autoSlideMs <= 0) return;
    autoTimerRef.current = setInterval(() => {
      goTo(active + 1);
    }, autoSlideMs);
  }, [isMobile, autoSlideMs, active, goTo]);

  useEffect(() => {
    resetAutoTimer();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [resetAutoTimer]);

  // Reset the timer whenever the user manually interacts
  const interactAndGo = useCallback(
    (idx: number) => {
      goTo(idx);
      resetAutoTimer();
    },
    [goTo, resetAutoTimer]
  );

  /** Returns the pixel offset for a given slide index */
  const getOffset = useCallback(
    (idx: number) => {
      const wrapW = wrapWidth || wrapRef.current?.offsetWidth || 375;
      const slideW = wrapW * SLIDE_W;
      return -(idx * (slideW + GAP_PX));
    },
    [wrapWidth]
  );

  /* ---- Touch handlers ---- */
  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
    // Pause auto-slide while dragging
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  const onTouchMove = (e: ReactTouchEvent) => {
    if (!isDragging.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    if (trackRef.current) {
      const base = getOffset(active);
      trackRef.current.style.transform = `translateX(${base + touchDeltaX.current}px)`;
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.transition = "";
    }
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      interactAndGo(active + 1);
    } else if (touchDeltaX.current > threshold) {
      interactAndGo(active - 1);
    } else {
      interactAndGo(active); // snap back
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${getOffset(active)}px)`;
      }
    }
    touchDeltaX.current = 0;
  };

  /* ---- Non-mobile: render children directly ---- */
  if (!isMobile) {
    return <>{children}</>;
  }

  /* ---- Mobile carousel ---- */
  const offset = getOffset(active);
  const currentWrapW = wrapWidth || wrapRef.current?.offsetWidth || 375;
  const currentSlideW = currentWrapW * SLIDE_W;

  const extendedChildren = [...children, ...children, ...children];

  return (
    <div className={`carousel-wrap ${className}`.trim()} ref={wrapRef}>
      <div
        className="carousel-track"
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {extendedChildren.map((child, i) => (
          <div 
            className={`carousel-slide ${slideClassName}`.trim()} 
            key={i}
            style={{ flex: `0 0 ${currentSlideW}px`, width: `${currentSlideW}px` }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {Array.from({ length: total }, (_, i) => {
          const realIndex = active % total;
          return (
            <button
              key={i}
              className={`carousel-dot${i === realIndex ? " active" : ""}`}
              onClick={() => interactAndGo(i + total)}
              aria-label={`Go to slide ${i + 1}`}
            />
          );
        })}
      </div>

      {/* Arrows */}
      <div className="carousel-arrows">
        <button
          className="carousel-arrow carousel-arrow--prev"
          onClick={() => interactAndGo(active - 1)}
          aria-label="Previous slide"
        >
          ←
        </button>
        <span className="carousel-counter">
          {(active % total) + 1} / {total}
        </span>
        <button
          className="carousel-arrow carousel-arrow--next"
          onClick={() => interactAndGo(active + 1)}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </div>
  );
}
