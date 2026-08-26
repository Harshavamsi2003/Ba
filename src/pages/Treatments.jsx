// src/pages/Treatments.jsx
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/Reveal.jsx";
import AnimatedText from "../components/AnimatedText.jsx";
import { treatments, clinic } from "../data/site.js";

import hydrotherapy from "../assets/treatments/hydrotherapy.jpg";
import acupuncture from "../assets/treatments/acupuncture.jpg";
import acupressure from "../assets/treatments/acupressure.jpg";
import magnetotherapy from "../assets/treatments/magnetotherapy.jpg";
import massage from "../assets/treatments/massage.jpg";
import chromotherapy from "../assets/treatments/chromotherapy.jpg";
import yoga from "../assets/treatments/yoga.jpg";
import diet from "../assets/treatments/diet.jpg";
import fasting from "../assets/treatments/fasting.jpg";

import "../styles/Treatments.css";

const images = { hydrotherapy, acupuncture, acupressure, magnetotherapy, massage, chromotherapy, yoga, diet, fasting };

export default function Treatments() {
  return (
    <div id="main" className="treatments-page">
      <SEO
        title="Naturopathy Treatments | Baby Blossom Fertility & Wellness Clinic"
        description="Explore our nine natural, evidence-based naturopathy treatments — hydrotherapy, acupuncture, acupressure, magnetotherapy, massage, chromotherapy, yoga, diet and fasting — for fertility and holistic wellness."
        path="/treatments"
      />

      <section className="tr-hero" data-navtheme="light">
        <div className="wrap tr-hero__inner">
          <Reveal>
            <Link to="/" className="tr-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              Back to Home
            </Link>
            <span className="eyebrow">Our Treatments</span>
            <h1><AnimatedText text="Nurturing Natural Healing," className="split-green" /><br /><AnimatedText text="Restoring Balance" className="split-violet" delay={0.15} /></h1>
            <p className="tr-hero__sub">
              Discover our comprehensive range of drug-free, evidence-based naturopathic treatments designed to
              revitalize your health, restore inner harmony, and support your journey to parenthood.
            </p>
            <p className="tr-hero__lede">
              At Baby Blossom, we believe that true healing happens when the body is provided the right natural
              environment to repair and renew itself. Rooted in the timeless principles of nature cure, our
              specialized therapies are thoughtfully designed to address the root causes of illness rather than
              just managing symptoms. Whether you are seeking targeted support on your fertility journey, relief
              from chronic stress and pain, or a complete metabolic reset, our personalized therapeutic programs
              blend ancient healing wisdom with modern clinical precision.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="tr-grid section-pad" id="tr-grid">
        <div className="wrap">
          {treatments.map((t, idx) => (
            <Reveal className="tr-card" key={t.key} delay={0.05}>
              <div className={`tr-item ${idx % 2 ? "tr-item--rev" : ""}`}>
                <div className="tr-item__media">
                  <img src={images[t.key]} alt={t.title} loading="lazy" />
                </div>
                <div className="tr-item__body">
                  <h2>{t.title}</h2>
                  <p className="tr-item__desc">{t.description}</p>
                  <span className="tr-item__line" />
                  <div className="tr-item__benefits">
                    <div className="tr-item__benefit tr-item__benefit--general">
                      <h4>General Benefits</h4>
                      <p>{t.benefits}</p>
                    </div>
                    <div className="tr-item__benefit tr-item__benefit--fertility">
                      <h4>Fertility Benefits</h4>
                      <p>{t.fertility}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="tr-cta" data-navtheme="light">
        <div className="wrap tr-cta__inner">
          <Reveal>
            <h2><AnimatedText text="Ready to begin" className="split-green" />{" "}<AnimatedText text="your healing journey?" className="split-violet" delay={0.15} /></h2>
            <p>Book a personal consultation and let us design a natural therapy plan made only for you.</p>
            <div className="tr-cta__actions">
              <a href="/#contact" className="btn btn-primary">Book Appointment</a>
              <a href={`tel:+${clinic.phoneRaw}`} className="btn btn-ghost">Call {clinic.phone}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}