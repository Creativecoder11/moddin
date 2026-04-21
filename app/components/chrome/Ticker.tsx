import { TICKER_ITEMS } from "@/app/data/site";

/**
 * Fixed mono-font ticker bar at the very top of the page.
 * Items are doubled for a seamless CSS-keyframe loop.
 */
export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <>
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[51] h-[34px] flex items-center overflow-hidden bg-ink text-cream border-b border-[var(--rule-d-2)] font-mono text-[11px] uppercase tracking-[0.14em]"
      >
        <div className="flex gap-14 whitespace-nowrap animate-ticker">
          {items.map((label, i) => (
            <span key={i} className="inline-flex items-center gap-3 opacity-85">
              <i className="size-1 rounded-full bg-ember not-italic" />
              {label}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes tk { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .animate-ticker { animation: tk 48s linear infinite; }
      `}</style>
    </>
  );
}
