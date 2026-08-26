// src/components/WellnessJourney.jsx
import Reveal from "./Reveal.jsx";
import MotionIcon from "./MotionIcon.jsx";
import AnimatedText from "./AnimatedText.jsx";
import { motion } from "framer-motion";
import { wellnessPrograms, journeySteps } from "../data/site.js";

import wFertility from "../assets/icons/wellness/fertility.png";
import wPcos from "../assets/icons/wellness/pcos.png";
import wPre from "../assets/icons/wellness/preconception.png";
import wStress from "../assets/icons/wellness/stress.png";
import wWeight from "../assets/icons/wellness/weight.png";
import wDetox from "../assets/icons/wellness/detox.png";
import jBook from "../assets/icons/journey/book_appointment.png";
import jCons from "../assets/icons/journey/consultation.png";
import jAss from "../assets/icons/journey/assessment.png";
import jPlan from "../assets/icons/journey/personalized_plan.png";
import jTher from "../assets/icons/journey/therapy_guidance.png";
import jBetter from "../assets/icons/journey/better_health.png";
import "../styles/WellnessJourney.css";


const progIcons = { fertility: wFertility, pcos: wPcos, preconception: wPre, stress: wStress, weight: wWeight, detox: wDetox };
const jrnIcons = { book_appointment: jBook, consultation: jCons, assessment: jAss, personalized_plan: jPlan, therapy_guidance: jTher, better_health: jBetter };

export default function WellnessJourney() {
  return (
    <section className="wj" id="wellness" data-navtheme="light">
      {/* Intro */}
      <div className="wj-intro">
        <div className="wrap">
          <div className="head-center wj-intro__head">
            <Reveal>
              <span className="eyebrow eyebrow--lg">Wellness Programs</span>
              <h2 className="wj-intro__title">
                <AnimatedText text="Wellness Programs for a" className="wj-intro__title-green" />{" "}
                <AnimatedText text="Healthier You" className="wj-intro__title-violet" delay={0.18} />
              </h2>
              <p>Holistic programs designed to restore balance, improve well-being and support your
                fertility &amp; overall health naturally.</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="wj-programs">
        <div className="wrap">
          <div className="wj-programs__grid">
            {wellnessPrograms.map((p, idx) => (
              <Reveal className="wj-program" key={p.key} delay={(idx % 3) * 0.08}>
                <span className="icon-badge icon-badge--wellness">
                  <MotionIcon src={progIcons[p.key]} className="icon-glyph" delay={(idx % 3) * 0.08 + 0.1} />
                </span>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Journey timeline */}
      <div className="wj-journey" data-navtheme="light">
        <div className="wrap">
          <div className="head-center">
            <Reveal>
              <span className="eyebrow eyebrow--lg">The Process</span>
              <h3><AnimatedText text="Your Journey" className="split-green" />{" "}<AnimatedText text="With Us" className="split-violet" delay={0.15} /></h3>
              <div className="divider" />
            </Reveal>
          </div>
          <div className="wj-journey__track">
            <motion.span className="wj-journey__line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.3, ease: [0.2, 0.8, 0.2, 1] }} />
            {journeySteps.map((s, idx) => (
              <Reveal className="wj-step" key={s.key} delay={idx * 0.09}>
                <span className="wj-step__tag">Step {String(idx + 1).padStart(2, "0")}</span>
                <span className="icon-badge icon-badge--journey">
                  <MotionIcon src={jrnIcons[s.key]} className="icon-glyph" delay={idx * 0.09 + 0.1} />
                </span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}