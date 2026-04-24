const BAND_IMG = "/bg-bangladesh.webp";

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
