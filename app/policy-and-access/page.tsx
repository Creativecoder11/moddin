import { Ticker } from "../components/chrome/Ticker";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";

export const metadata = {
  title: "Policy & Institutional Access — Moddin",
  description: "Navigate regulatory pathways and unlock access to ministries, agencies, and key institutions—enabling smoother entry and execution.",
};

export default function PolicyAndAccessPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-[clamp(40px,8vw,80px)] text-ink mb-6">Policy & Institutional Access</h1>
        <p className="text-stone max-w-2xl text-lg">
          Navigate regulatory pathways and unlock access to ministries, agencies, and key institutions—enabling smoother entry and execution.
        </p>
      </main>
      <Footer />
    </>
  );
}
