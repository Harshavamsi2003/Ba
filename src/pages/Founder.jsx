// src/pages/Founder.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/Reveal.jsx";
import AnimatedText from "../components/AnimatedText.jsx";
import { founder, clinic } from "../data/site.js";
import portrait from "../assets/founder/founder_vidya.jpg";
import "../styles/Founder.css";

export default function Founder() {
  return (
    <div id="main" className="founder-page">
      <SEO
        title="Founder — Dr.C Vidya | Baby Blossom Naturopathy"
        description="Meet Dr.C Vidya (BNYS, DVMS, MPH, MS) — naturopath, women's wellness expert and fertility specialist, and the founder of Baby Blossom Naturopathy Fertility & Wellness Clinic, Chennai."
        path="/founder"
      />

      {/* Hero split — portrait + intro */}
      <section className="fd-hero" data-navtheme="light">
        <div className="wrap fd-hero__grid">
          <motion.div className="fd-hero__media"
            initial={{ opacity: 0, x: -26 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
            <div className="fd-hero__photo"><img src={portrait} alt={`${founder.name}, ${founder.creds}`} /></div>
            <p className="fd-hero__caption">15+ years of dedicated, root-cause care for families</p>
          </motion.div>

          <div className="fd-hero__body">
            <Reveal>
              <Link to="/about-us" className="fd-back">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
                About Baby Blossom
              </Link>
              <span className="eyebrow">Meet Our Founder</span>
              <h1 className="fd-name"><AnimatedText text={founder.name} /><span>{founder.creds}</span></h1>
              <p className="fd-roles">{founder.roles.join("  ·  ")}</p>
              <ul className="fd-quals">
                {founder.qualifications.map((q) => <li key={q}>{q}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="fd-bio">{founder.bio}</p>
              <blockquote className="fd-quote">{founder.mission}</blockquote>
              <div className="fd-actions">
                <a href="/#contact" className="btn btn-primary">Book a Consultation</a>
                <a href={`tel:+${clinic.phoneRaw}`} className="btn btn-ghost">Call {clinic.phone}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="fd-story section-pad">
        <div className="wrap fd-story__inner">
          <div className="head-center">
            <Reveal>
              <span className="eyebrow">Her Journey</span>
              <h2><AnimatedText text="A Practice Built" className="split-green" />{" "}<AnimatedText text="on Listening" className="split-violet" delay={0.15} /></h2>
              <div className="divider" />
            </Reveal>
          </div>
          <div className="fd-story__cols">
            {founder.story.map((para, idx) => (
              <Reveal className="fd-story__col" key={idx} delay={idx * 0.1}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise / highlights */}
      <section className="fd-high">
        <div className="wrap">
          <div className="head-center">
            <Reveal>
              <span className="eyebrow">Why Families Trust Her</span>
              <h2><AnimatedText text="Expertise Rooted" className="split-green" />{" "}<AnimatedText text="in Compassion" className="split-violet" delay={0.15} /></h2>
              <div className="divider" />
            </Reveal>
          </div>
          <div className="fd-high__grid">
            {founder.highlights.map((h, idx) => (
              <Reveal className="fd-high__card" key={h.title} delay={idx * 0.08}>
                <h4>{h.title}</h4>
                <p>{h.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="fd-cta" data-navtheme="light">
        <div className="wrap fd-cta__inner">
          <Reveal>
            <h2><AnimatedText text="Care that treats you" className="split-green" />{" "}<AnimatedText text="as a whole person" className="split-violet" delay={0.15} /></h2>
            <p>Begin your journey with a doctor who truly listens — and a plan made only for you.</p>
            <div className="fd-cta__actions">
              <a href="/#contact" className="btn btn-primary">Book Appointment</a>
              <Link to="/about-us" className="btn btn-ghost">About the Clinic</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}