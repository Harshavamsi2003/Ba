import Reveal from "./Reveal.jsx";
import AnimatedText from "./AnimatedText.jsx";
import { blogs } from "../data/site.js";
import "../styles/Blogs.css";

export default function Blogs() {
  return (
    <section className="blogs section-pad" id="blogs" data-navtheme="light">
      <div className="wrap">
        <div className="head-center">
          <Reveal>
            <span className="eyebrow">From The Journal</span>
            <h2><AnimatedText text="Wellness" className="split-green" />{" "}<AnimatedText text="Insights & Stories" className="split-violet" delay={0.15} /></h2>
            <div className="divider" />
            <p>Fertility awareness, nutrition and real journeys — in English &amp; Tamil.</p>
          </Reveal>
        </div>

        <div className="blogs__grid">
          {blogs.map((b, idx) => (
            <Reveal className="blog-card" key={b.title} delay={(idx % 3) * 0.08}>
              <article>
                <span className="blog-card__tag">{b.tag}</span>
                <h4>{b.title}</h4>
                <p>{b.excerpt}</p>
                <span className="blog-card__rule" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
