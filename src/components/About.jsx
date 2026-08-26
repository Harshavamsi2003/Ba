// src/components/About.jsx
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal.jsx";
import AnimatedText from "./AnimatedText.jsx";
import as1 from "../assets/aboutSection/as1.png";
import as1m from "../assets/aboutSection/as1m.png";
import as2 from "../assets/aboutSection/as2.png";
import as2m from "../assets/aboutSection/as2m.png";
import "../styles/About.css";

// Background photo pair — crossfades smoothly, desktop/mobile sources swap
// automatically at the same breakpoint the hero uses.
const slides = [
  { d: as1, m: as1m, alt: "Newborn baby wrapped and resting peacefully" },
  { d: as2, m: as2m, alt: "Newborn baby cradled in soft natural light" },
];

export default function About() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((v) => (v + 1) % slides.length), []);
  useEffect(() => { const t = setInterval(next, 5200); return () => clearInterval(t); }, [next]);

  // Preload every slide up front so the crossfade never stalls on a network
  // fetch — keeps the transition smooth with no lag or flash.
  useEffect(() => {
    slides.forEach((s) => {
      const a = new Image(); a.src = s.d;
      const b = new Image(); b.src = s.m;
    });
  }, []);

  return (
    <section className="about" id="about" data-navtheme="light">
      <div className="about__bg">
        <AnimatePresence mode="sync">
          <motion.picture key={i} className="about__bgpic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}>
            <source media="(max-width: 768px)" srcSet={slides[i].m} />
            <img src={slides[i].d} alt={slides[i].alt} />
          </motion.picture>
        </AnimatePresence>
        <div className="about__scrim" />
      </div>

      <div className="wrap about__grid">
        <div className="about__intro">
          <Reveal>
            <span className="eyebrow eyebrow--lg">About Baby Blossom</span>
            <h2 className="about__title">
              <AnimatedText text="Holistic Care for" className="about__title-green" />{" "}
              <AnimatedText text="Mind, Body & Life" className="about__title-violet" delay={0.18} />
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="about__lede">
              At <span className="about__brand">Baby Blossom Naturopathy Fertility &amp; Wellness Clinic</span>,
              we believe every journey is beautifully unique. Our holistic, evidence-based care nurtures
              reproductive health, restores the body&rsquo;s natural balance, and brings you closer to your
              dream of parenthood &mdash; and to lasting well-being.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="about__lede about__lede--2">
              Rooted in naturopathy, nutrition and yoga therapy, every plan we design is shaped around
              <em> you</em> &mdash; your body, your history and your hopes. No templates, no rushing:
              just calm, root-cause care and a team that walks beside you the whole way.
            </p>
          </Reveal>

          <Reveal className="about__actions" delay={0.24}>
            <Link to="/about-us" className="btn btn-primary">
              About Us
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link to="/founder" className="btn btn-ghost">
              Meet the Founder
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}