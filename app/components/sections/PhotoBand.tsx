import Image from "next/image";
import bandImage from "../../../public/bg-bangladesh.webp";

export function PhotoBand() {
  return (
    <section className="band" aria-label="Field work">
      <Image
        className="band-img"
        src={bandImage}
        alt="Bangladesh textile workers on factory floor"
        fill
        loading="lazy"
        placeholder="blur"
        sizes="100vw"
      />
      <div className="band-inner wrap">
        <div className="eyebrow">
          <span className="tick" />
          <span>On the ground in Bangladesh</span>
        </div>
        <h3>
          We spend most of
          <br />
          our week in
          <br />
          <em>ports, boardrooms,</em>
          <br />
          and <em>ministries</em> —
          <br />
          not on slide decks.
        </h3>
      </div>
    </section>
  );
}
