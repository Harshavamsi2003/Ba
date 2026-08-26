import SEO from "../components/SEO.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import TreatmentsTeaser from "../components/TreatmentsTeaser.jsx";
import WellnessJourney from "../components/WellnessJourney.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Blogs from "../components/Blogs.jsx";
import Contact from "../components/Contact.jsx";

export default function Home() {
  return (
    <div id="main">
      <SEO
        title="Baby Blossom Naturopathy | Fertility & Wellness Clinic, Chennai"
        description="Holistic, natural, evidence-based fertility care by Dr.C Vidya in Chennai — PCOS management, preconception care, yoga therapy and more."
        path="/"
      />
      <Hero />
      <About />
      <Services />
      <TreatmentsTeaser />
      <WellnessJourney />
      <Testimonials />
      <Blogs />
      <Contact />
    </div>
  );
}