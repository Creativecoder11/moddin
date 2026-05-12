import { Ticker } from "../components/chrome/Ticker";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";

export const metadata = {
  title: "Trade & Market Expansion — Moddin",
  description: "Enable cross-border trade through structured market access, sourcing alignment, and partner connections across Bangladesh’s industrial ecosystem.",
};

export default function TradePage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-[clamp(40px,8vw,80px)] text-ink mb-6">Trade & Market Expansion</h1>
        <p className="text-stone max-w-2xl text-lg">
          Enable cross-border trade through structured market access, sourcing alignment, and partner connections across Bangladesh’s industrial ecosystem.
        </p>
      </main>
      <Footer />
    </>
  );
}
