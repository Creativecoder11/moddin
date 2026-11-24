import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "./components/chrome/Nav";
import { Footer } from "./components/chrome/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-paper">
        <section className="notfound">
          <div className="wrap">
            <div className="eyebrow">
              <span>404</span>
            </div>
            <h1 className="section-title notfound__title">
              Page not <em>found.</em>
            </h1>
            <p className="notfound__lede">
              The page you&apos;re looking for has moved or doesn&apos;t exist.
            </p>
            <div className="notfound__actions">
              <Link href="/" className="btn btn-dark">
                Home <span>→</span>
              </Link>
              <Link href="/insights" className="btn btn-ghost">
                Insights
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
