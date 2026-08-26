import Reveal from "./Reveal.jsx";
import MotionIcon from "./MotionIcon.jsx";
import AnimatedText from "./AnimatedText.jsx";
import { services } from "../data/site.js";
import fertility from "../assets/icons/services/fertility.png";
import pcos from "../assets/icons/services/pcos.png";
import preconception from "../assets/icons/services/preconception.png";
import stress from "../assets/icons/services/stress.png";
import weight from "../assets/icons/services/weight.png";
import diet from "../assets/icons/services/diet.png";
import yoga from "../assets/icons/services/yoga.png";
import lifestyle from "../assets/icons/services/lifestyle.png";
import "../styles/Services.css";

const icons = { fertility, pcos, preconception, stress, weight, diet, yoga, lifestyle };

export default function Services() {
  return (
    <section className="services section-pad" id="services" data-navtheme="light">
      <div className="wrap">
        <div className="head-center">
          <Reveal>
            <span className="eyebrow">What We Offer</span>
            <h2><AnimatedText text="Our Holistic Care" className="split-green" />{" "}<AnimatedText text="Services" className="split-violet" delay={0.15} /></h2>
            <div className="divider on-cream" />
            <p>Eight dedicated pathways to reproductive health and lasting well-being.</p>
          </Reveal>
        </div>
        <div className="services__grid">
          {services.map((s, idx) => (
            <Reveal className="service-card" key={s.key} delay={(idx % 4) * 0.07}>
              <div className="service-card__inner">
                <span className="icon-badge icon-badge--service">
                  <MotionIcon src={icons[s.key]} className="icon-glyph" delay={(idx % 4) * 0.07 + 0.1} />
                </span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
                <span className="service-card__rule" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
