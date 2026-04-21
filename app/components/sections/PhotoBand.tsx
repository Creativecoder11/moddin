const BAND_IMG =
  "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=2000&q=80";

export function PhotoBand() {
  return (
    <section className="band" aria-label="Field work">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="band-img"
        src={BAND_IMG}
        alt="Bangladesh textile workers on factory floor"
        loading="lazy"
      />
      <div className="band-inner wrap">
        <div className="eyebrow">
          <span className="tick" />
          <span>On the ground in Bangladesh</span>
        </div>
        <h3>
          We spend most of our week in <em>ports, boardrooms,</em> and ministries —
          not on slide decks.
        </h3>
      </div>
    </section>
  );
}
