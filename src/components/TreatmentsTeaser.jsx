// src/components/TreatmentsTeaser.jsx
import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import AnimatedText from "./AnimatedText.jsx";
import bgDesktop from "../assets/treatments-teaser/bg_desktop.jpg";
import bgMobile from "../assets/treatments-teaser/bg_mobile.jpg";
import "../styles/TreatmentsTeaser.css";

export default function TreatmentsTeaser() {
  return (
    <section className="tt" id="treatments-teaser" data-navtheme="light">
      <div className="tt__bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={bgMobile} />
          <img src={bgDesktop} alt="Calm natural therapy space at Baby Blossom" />
        </picture>
        <div className="tt__scrim" />
      </div>

      <div className="wrap tt__inner">
        <Reveal className="tt__card">
          <span className="eyebrow eyebrow--lg">Our Treatments</span>
          <h2 className="tt__title">
            <AnimatedText text="Nurturing Natural Healing," className="split-green" /><br />
            <AnimatedText text="Restoring Balance" className="split-violet" delay={0.15} />
          </h2>
          <div className="divider" />

          <p className="tt__sub">
            Discover our comprehensive range of drug-free, evidence-based naturopathic treatments designed to
            revitalize your health, restore inner harmony, and support your journey to parenthood.
          </p>

          <p className="tt__text">
            At Baby Blossom, we believe that true healing happens when the body is provided the right natural
            environment to repair and renew itself. Rooted in the timeless principles of nature cure, our
            specialized therapies are thoughtfully designed to address the root causes of illness rather than
            just managing symptoms. Whether you are seeking targeted support on your fertility journey, relief
            from chronic stress and pain, or a complete metabolic reset, our personalized therapeutic programs
            blend ancient healing wisdom with modern clinical precision.
          </p>

          <div className="tt__actions">
            <Link to="/treatments" className="btn btn-primary">
              Explore Treatments
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <a href="/#contact" className="btn btn-ghost">Book Appointment</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}