"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Reveal } from "../ui/Reveal";

type Faq = {
  question: string;
  answer: string;
};

type Props = {
  faqs: readonly Faq[];
};

function FaqItem({ faq, index, isOpen, toggle }: {
  faq: Faq;
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className={`sfaq-item${isOpen ? " sfaq-item--open" : ""}`}>
      <button
        className="sfaq-trigger"
        onClick={toggle}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="sfaq-num">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="sfaq-q">{faq.question}</span>
        <span className="sfaq-chevron" aria-hidden>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        className="sfaq-body"
        style={{ maxHeight: isOpen ? height : 0 }}
      >
        <div ref={bodyRef} className="sfaq-body__inner">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function ServiceFaq({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section className="sfaq">
      <div className="wrap">
        <div className="sfaq-head">
          <div>
            <Reveal className="eyebrow">
              <span>FAQ</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title" style={{ marginTop: 18 }}>
              Common <em className="italic text-terracotta" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}>Questions.</em>
            </Reveal>
          </div>
        </div>

        <div className="sfaq-list">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              toggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
