import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import AnimatedText from "./AnimatedText.jsx";
import { testimonials, clinic } from "../data/site.js";
import "../styles/Testimonials.css";

const GoogleG = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" fill="#4285F4" />
    <path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853" />
    <path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14z" fill="#FBBC05" />
    <path d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-3.9 5.6-3.9z" fill="#EA4335" />
  </svg>
);

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  const next = useCallback(() => setI((v) => (v + 1) % count), [count]);
  const prev = () => setI((v) => (v - 1 + count) % count);
  const goTo = (idx) => setI(idx);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, paused, reduce]);

  const t = testimonials[i];

  return (
    <section className="tst section-pad" id="testimonials" data-navtheme="light">
      <div className="wrap">
        <div className="head-center">
          <Reveal>
            <span className="eyebrow eyebrow--lg">Stories of Hope</span>
            <h2><AnimatedText text="What Our" className="split-green" />{" "}<AnimatedText text="Families Say" className="split-violet" delay={0.15} /></h2>
            <div className="divider" />
            <p className="tst__sub">
              <GoogleG className="tst__g" />
              Real words from real families on Google
            </p>
          </Reveal>
        </div>

        <Reveal
          className="tst__stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <svg className="tst__quote" viewBox="0 0 32 24" aria-hidden="true"><path d="M0 24V14.4C0 6 4.8 1.2 12.6 0l1.8 3.6C9.6 4.8 7.2 7.8 7.2 12h6v12H0Zm18 0V14.4C18 6 22.8 1.2 30.6 0l1.8 3.6c-4.8 1.2-7.2 4.2-7.2 8.4h6v12H18Z" /></svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="tst__slide"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.24, 1] }}
            >
              <p className="tst__text">{t.quote}</p>
              <div className="tst__who">
                <span className="tst__avatar">{t.name.charAt(0)}</span>
                <b>{t.name}</b>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="tst__controls">
            <button type="button" className="tst__arrow" onClick={prev} aria-label="Previous review">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <div className="tst__dots">
              {testimonials.map((rev, idx) => (
                <button
                  type="button"
                  key={rev.name}
                  className={`tst__dot ${idx === i ? "is-active" : ""}`}
                  onClick={() => goTo(idx)}
                  aria-label={`Show review from ${rev.name}`}
                />
              ))}
            </div>
            <button type="button" className="tst__arrow" onClick={next} aria-label="Next review">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="tst__cta">
          <a href={clinic.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <GoogleG className="tst__g" />
            See Our Google Reviews
          </a>
        </Reveal>
      </div>
    </section>
  );
}
