import { Ticker } from "../components/chrome/Ticker";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";

export const metadata = {
  title: "Investment & Deal Facilitation — Moddin",
  description: "Support investors from opportunity discovery to deal execution—covering partnerships, structuring, and market entry.",
};

export default function InvestmentPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-[clamp(40px,8vw,80px)] text-ink mb-6">Investment & Deal Facilitation</h1>
        <p className="text-stone max-w-2xl text-lg">
          Support investors from opportunity discovery to deal execution—covering partnerships, structuring, and market entry.
        </p>
      </main>
      <Footer />
    </>
  );
}
