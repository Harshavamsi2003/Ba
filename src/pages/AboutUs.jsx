// src/pages/AboutUs.jsx
import { useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/Reveal.jsx";
import MotionIcon from "../components/MotionIcon.jsx";
import AnimatedText from "../components/AnimatedText.jsx";
import CountUp from "../components/CountUp.jsx";
import { company, founder, stats, values, clinic } from "../data/site.js";
import portrait from "../assets/founder/founder_vidya.jpg";
import logo from "../assets/logo/logo.png";
import wellnessD from "../assets/about_us/wellness_d.jpg";
import wellnessM from "../assets/about_us/wellness_m.jpg";
import statFamilies from "../assets/icons/stats/happy_families.png";
import statExperience from "../assets/icons/stats/years_experience.png";
import statTherapies from "../assets/icons/stats/specialized_therapies.png";
import statHolistic from "../assets/icons/features/holistic_approach.png";
import valHolistic from "../assets/icons/values/holistic_healing.png";
import valNatural from "../assets/icons/values/natural_safe.png";
import valSupport from "../assets/icons/journey/better_health.png";
import valWellbeing from "../assets/icons/features/long_term_wellbeing.png";
import ovServices from "../assets/icons/services/fertility.png";
import ovWellness from "../assets/icons/wellness/fertility.png";
import ovTreatments from "../assets/icons/features/natural_healing.png";
import "../styles/AboutUs.css";

// Stat icons — bare glyphs (same treatment as the home hero), each unique.
const statIcons = [statFamilies, statExperience, statTherapies, statHolistic];

// Core-value glyphs — every icon here is unique across the whole site,
// none of them repeat anywhere else (hero, services, wellness, journey).
const valIcons = {
  holistic_healing: valHolistic,
  natural_safe: valNatural,
  compassion_support: valSupport,
  long_term_wellbeing: valWellbeing,
};

// Clinic gallery — dynamically loads every image inside
// src/assets/about_us/gallery/ in filename order. This means the gallery
// never breaks the build if a photo is added or removed later: it simply
// iterates whatever is in the folder, in order, with no hardcoded imports.
const galleryModules = import.meta.glob("../assets/about_us/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,Jpg,Jpeg,Png,Webp}", {
  eager: true,
  import: "default",
});
// Numeric-aware sort: pulls the number out of each filename (1.jpeg,
// 07-waiting-area.jpg, etc.) and orders by that, not by plain string
// comparison — a plain string sort would put "10.jpeg" between "1" and
// "2" once a filename goes past a single digit. Files with no number in
// the name fall back to alphabetical, so nothing crashes if one shows up.
const gallery = Object.keys(galleryModules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)(?!.*\d)/)?.[0] ?? "", 10);
    const numB = parseInt(b.match(/(\d+)(?!.*\d)/)?.[0] ?? "", 10);
    if (!Number.isNaN(numA) && !Number.isNaN(numB) && numA !== numB) return numA - numB;
    return a.localeCompare(b);
  })
  .map((path) => ({ src: galleryModules[path], alt: "Inside Baby Blossom Naturopathy Fertility & Wellness Clinic" }));
// Quick-links to the three pillars of care, reusing the exact icon-badge
// treatment from their home-page sections (service / wellness / journey)
// so the visual language stays consistent site-wide.
const overview = [
  { key: "services", badge: "icon-badge--service", icon: ovServices, title: "Services",
    text: "Eight dedicated therapy pathways — fertility, PMOS, stress, weight, and more.", href: "/#services" },
  { key: "wellness", badge: "icon-badge--wellness", icon: ovWellness, title: "Wellness Programs",
    text: "Structured natural programs blending diet, detox, yoga and hands-on therapy.", href: "/#wellness" },
  { key: "treatments", badge: "icon-badge--treatments", icon: ovTreatments, title: "Treatments",
    text: "Nine core naturopathy modalities — hydrotherapy, acupuncture, yoga and more.", href: "/treatments" },
];

export default function AboutUs() {
  const reduce = useReducedMotion();
  const [activeImg, setActiveImg] = useState(0);
  const prevImg = () => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % gallery.length);

  // Same routing logic as Navbar/Footer: "/#section" hash links scroll
  // smoothly (navigating home first if needed), plain "/route" links use
  // the router instead of a full page reload.
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleNav = useCallback((e, to) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      const hash = "#" + to.split("#")[1];
      const scroll = () => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      };
      if (pathname !== "/") { navigate("/"); setTimeout(scroll, 80); }
      else scroll();
    } else {
      e.preventDefault();
      navigate(to);
    }
  }, [navigate, pathname]);

  return (
    <div id="main" className="aboutus-page">
      <SEO
        title="About Us | Baby Blossom Naturopathy Fertility & Wellness Clinic"
        description="Learn about Baby Blossom Naturopathy Fertility & Wellness Clinic, Chennai — our mission, our root-cause approach and why families trust us for natural, holistic fertility care."
        path="/about-us"
      />

      {/* Company intro — the logo mark stands alone, no ring/backdrop */}
      <section className="au-intro" data-navtheme="light">
        <div className="wrap au-intro__grid">
          <div className="au-intro__text">
            <Reveal>
              <Link to="/" className="au-back">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
                Back to Home
              </Link>
              <span className="eyebrow">About Our Clinic</span>
              <h1><AnimatedText text="Nurturing Life," className="split-green" />{" "}<AnimatedText text="Naturally" className="split-violet" delay={0.15} /></h1>
              <p className="au-intro__lede">{company.intro}</p>
            </Reveal>
          </div>

          <motion.div className="au-intro__mark"
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={reduce
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 1, scale: [1, 1.025, 1], y: [0, -7, 0], rotate: [0, 1, 0, -1, 0] }}
            whileHover={reduce ? {} : { scale: 1.06, rotate: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } }}
            transition={reduce
              ? { duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }
              : {
                  opacity: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                  rotate: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                }}>
            <img src={logo} alt="Baby Blossom logo" className="au-intro__logo" />
          </motion.div>
        </div>

        {/* stats — same bare glyph + bold serif number treatment as the home hero */}
        <div className="wrap">
          <Reveal delay={0.15}>
            <div className="au-stats">
              {stats.map((s, idx) => (
                <div className="au-stat" key={s.label}>
                  <span className={`au-stat__icon ${idx % 2 ? "tone-green" : "tone-purple"}`}
                    aria-hidden="true"
                    style={{ WebkitMaskImage: `url(${statIcons[idx]})`, maskImage: `url(${statIcons[idx]})` }} />
                  <span className="au-stat__num"><CountUp end={s.value} suffix={s.suffix} /></span>
                  <span className="au-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="au-mv section-pad">
        <div className="wrap au-mv__grid">
          <Reveal className="au-mv__card au-mv__card--mission">
            <span className="au-mv__tag">Our Mission</span>
            <p>{company.mission}</p>
          </Reveal>
          <Reveal className="au-mv__card au-mv__card--vision" delay={0.1}>
            <span className="au-mv__tag">Our Vision</span>
            <p>{company.vision}</p>
          </Reveal>
        </div>
      </section>

      {/* Core Values — no cards, no boxes: bare circular badges directly
          on a lightly patterned background */}
      <section className="au-values">
        <div className="au-values__pattern" aria-hidden="true" />
        <div className="wrap">
          <div className="head-center">
            <Reveal>
              <span className="eyebrow">What Guides Us</span>
              <h2><AnimatedText text="Our Core" className="split-green" />{" "}<AnimatedText text="Values" className="split-violet" delay={0.15} /></h2>
              <div className="divider" />
            </Reveal>
          </div>
          <div className="au-values__grid">
            {values.map((v, idx) => (
              <Reveal className="au-value" key={v.key} delay={idx * 0.08}>
                <span className="au-value__icon">
                  <MotionIcon src={valIcons[v.key]} className="icon-glyph" delay={idx * 0.08 + 0.1} />
                </span>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our story — full-bleed photo of the calm the clinic offers, behind the text */}
      <section className="au-story">
        <div className="au-story__bg">
          <picture>
            <source media="(max-width: 768px)" srcSet={wellnessM} />
            <img src={wellnessD} alt="A calm, welcoming space for holistic fertility care at Baby Blossom" />
          </picture>
          <div className="au-story__scrim" />
        </div>
        <div className="wrap au-story__grid">
          <Reveal className="au-story__head">
            <span className="eyebrow">Our Story</span>
            <h2><AnimatedText text="Where Science" className="split-green" />{" "}<AnimatedText text="Meets Compassion" className="split-violet" delay={0.15} /></h2>
            <div className="divider" />
            <div className="au-story__body">
              {company.story.map((para, idx) => (
                <Reveal key={idx} delay={idx * 0.1}><p>{para}</p></Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery — a lightbox-style viewer: one large image at a time (both
          landscape and portrait shown fully, never cropped), prev/next
          arrows, a counter pill, and a thumbnail strip below.
          Guarded: if the gallery folder is empty for any reason (build-time
          glob found nothing), this section simply doesn't render instead of
          crashing the whole page on gallery[activeImg] being undefined. */}
      {gallery.length > 0 && (
      <section className="au-gallery section-pad">
        <div className="wrap">
          <div className="head-center">
            <Reveal>
              <span className="eyebrow">Take a Look Inside</span>
              <h2><AnimatedText text="Step Into Our" className="split-green" />{" "}<AnimatedText text="Clinic" className="split-violet" delay={0.15} /></h2>
              <div className="divider" />
            </Reveal>
          </div>

          <Reveal className="au-gallery__viewer">
            <div className="au-gallery__stage">
              <div className="au-gallery__backdrop" style={{ backgroundImage: `url(${gallery[activeImg].src})` }} aria-hidden="true" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={gallery[activeImg].src}
                  src={gallery[activeImg].src}
                  alt={gallery[activeImg].alt}
                  className="au-gallery__stage-img"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
              </AnimatePresence>

              <button type="button" className="au-gallery__nav au-gallery__nav--prev" onClick={prevImg} aria-label="Previous photo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" className="au-gallery__nav au-gallery__nav--next" onClick={nextImg} aria-label="Next photo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>

            </div>

            <div className="au-gallery__dots">
              {gallery.map((g, idx) => (
                <button
                  type="button"
                  key={g.src}
                  className={`au-gallery__dot ${idx === activeImg ? "is-active" : ""}`}
                  onClick={() => setActiveImg(idx)}
                  aria-label={`Show photo ${idx + 1}`}
                />
              ))}
            </div>

            <div className="au-gallery__thumbs">
              {gallery.map((g, idx) => (
                <button
                  type="button"
                  key={g.src}
                  className={`au-gallery__thumb ${idx === activeImg ? "is-active" : ""}`}
                  onClick={() => setActiveImg(idx)}
                  aria-label={`Show photo ${idx + 1}`}
                >
                  <img src={g.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      )}

      {/* Approach */}
      <section className="au-approach section-pad">
        <div className="wrap">
          <div className="head-center">
            <Reveal>
              <span className="eyebrow">How We Care</span>
              <h2><AnimatedText text="Our Holistic" className="split-green" />{" "}<AnimatedText text="Approach" className="split-violet" delay={0.15} /></h2>
              <div className="divider" />
            </Reveal>
          </div>
          <div className="au-approach__grid">
            {company.approach.map((a, idx) => (
              <Reveal className="au-approach__card" key={a.title} delay={idx * 0.08}>
                <h4>{a.title}</h4>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us + founder teaser */}
      <section className="au-why">
        <div className="wrap au-why__grid">
          <Reveal className="au-why__list-wrap">
            <span className="eyebrow">Why Families Choose Us</span>
            <h2><AnimatedText text="Reasons to Begin" className="split-green" />{" "}<AnimatedText text="With Baby Blossom" className="split-violet" delay={0.15} /></h2>
            <ul className="au-why__list">
              {company.reasons.map((r, idx) => (
                <li key={idx}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <motion.div className="au-why__founder"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
            <div className="au-why__photo"><img src={portrait} alt={`${founder.name}, ${founder.creds}`} /></div>
            <div className="au-why__founder-body">
              <span className="eyebrow">Led By</span>
              <h3>{founder.name}</h3>
              <p className="au-why__creds">{founder.creds}</p>
              <p>{founder.roles.join("  ·  ")} with 15+ years guiding families to natural, root-cause fertility care.</p>
              <Link to="/founder" className="btn btn-primary">
                Meet the Founder
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What we offer — quick links to Services / Wellness */}
      <section className="au-overview section-pad">
        <div className="wrap">
          <div className="head-center">
            <Reveal>
              <span className="eyebrow">What We Offer</span>
              <h2><AnimatedText text="Complete Care, Under" className="split-green" />{" "}<AnimatedText text="One Roof" className="split-violet" delay={0.15} /></h2>
              <div className="divider" />
            </Reveal>
          </div>
          <div className="au-overview__grid">
            {overview.map((o, idx) => (
              <Reveal className="au-overview__card" key={o.key} delay={idx * 0.1}>
                <span className={`icon-badge ${o.badge}`}>
                  <MotionIcon src={o.icon} className="icon-glyph" delay={idx * 0.1 + 0.1} />
                </span>
                <h4>{o.title}</h4>
                <p>{o.text}</p>
                <a href={o.href} onClick={(e) => handleNav(e, o.href)} className="au-overview__link">
                  Explore
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visit / Reviews */}
      <section className="au-visit">
        <div className="wrap au-visit__inner">
          <Reveal>
            <span className="eyebrow">Come Say Hello</span>
            <h2><AnimatedText text="Visit Us or Read" className="split-green" />{" "}<AnimatedText text="What Families Say" className="split-violet" delay={0.15} /></h2>
            <p className="au-visit__addr">{clinic.address}</p>
            <div className="au-visit__actions">
              <a href={clinic.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <svg viewBox="0 0 24 24" width="17" height="17"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A10.99 10.99 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z" /></svg>
                Google Reviews
              </a>
              <a href={clinic.mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                Visit Our Clinic
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="au-cta" data-navtheme="light">
        <div className="wrap au-cta__inner">
          <Reveal>
            <h2><AnimatedText text="Your Journey to" className="split-green" />{" "}<AnimatedText text="Motherhood Begins Here" className="split-violet" delay={0.15} /></h2>
            <p>Book a personalized consultation and take the first gentle step with us.</p>
            <div className="au-cta__actions">
              <a href="/#contact" className="btn btn-primary">Book Appointment</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
