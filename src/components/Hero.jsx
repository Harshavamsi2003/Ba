import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CountUp from "./CountUp.jsx";
import { heroStats } from "../data/site.js";
import coupleD from "../assets/hero/hero_couple_desktop.jpg";
import motherD from "../assets/hero/hero_mother_desktop.jpg";
import coupleM from "../assets/hero/hero_couple_mobile.jpg";
import motherM from "../assets/hero/hero_mother_mobile.jpg";
import statFamilies from "../assets/icons/stats/happy_families.png";
import statExperience from "../assets/icons/stats/years_experience.png";
import statTherapies from "../assets/icons/stats/specialized_therapies.png";
import statCare from "../assets/icons/values/compassion_support.png";
import "../styles/Hero.css";

const slides = [
  { d: coupleD, m: coupleM, alt: "Expecting couple sharing a tender moment by a sunlit window" },
  { d: motherD, m: motherM, alt: "Joyful mother cradling her newborn baby" },
];

const heroIcons = {
  happy_families: statFamilies,
  years_experience: statExperience,
  specialized_therapies: statTherapies,
  personalized_care: statCare,
};

export default function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const next = useCallback(() => setI((v) => (v + 1) % slides.length), []);
  useEffect(() => { const t = setInterval(next, 5200); return () => clearInterval(t); }, [next]);

  // Preload every slide (desktop + mobile source) up front so the crossfade
  // never stalls waiting on a network fetch — eliminates any visible lag/jump.
  useEffect(() => {
    slides.forEach((s) => {
      const a = new Image(); a.src = s.d;
      const b = new Image(); b.src = s.m;
    });
  }, []);

  return (
    <section className="hero" id="home" data-navtheme="light">
      <div className="hero__slides">
        <AnimatePresence mode="sync">
          <motion.picture key={i} className="hero__pic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}>
            <source media="(max-width: 768px)" srcSet={slides[i].m} />
            <img src={slides[i].d} alt={slides[i].alt}
              className={reduce ? "" : "hero__img--kb"} fetchpriority="high" />
          </motion.picture>
        </AnimatePresence>
        <div className="hero__scrim" />
      </div>

      <div className="wrap hero__inner">
        <motion.div className="hero__content"
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}>
          <h1 className="hero__title">Journey to<em>motherhood</em></h1>
          <p className="hero__mind">Holistic Fertility Care for <b>Mind, Body &amp; Life</b></p>
          <p className="hero__lede">
            Natural, evidence-based therapies to nurture your path to parenthood —
            with compassion at every step.
          </p>
          <div className="hero__cta-block">
            <div className="hero__actions">
              <a href="/#contact" className="btn btn-primary">Book Appointment</a>
              <a href="/#services" className="btn btn-ghost">Explore Services</a>
            </div>

            <motion.div className="hero__stats"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.55 }}>
              {heroStats.map((s, idx) => (
                <motion.div className="hero__stat" key={s.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: 0.65 + idx * 0.1 }}>
                  <span className={`hero__stat-icon ${idx % 2 ? "tone-green" : "tone-purple"}`}
                    aria-hidden="true"
                    style={{ WebkitMaskImage: `url(${heroIcons[s.icon]})`, maskImage: `url(${heroIcons[s.icon]})` }} />
                  <span className="hero__stat-num"><CountUp end={s.value} suffix={s.suffix} /></span>
                  <span className="hero__stat-label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}