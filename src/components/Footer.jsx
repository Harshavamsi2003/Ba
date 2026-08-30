// src/components/Footer.jsx
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { clinic, nav } from "../data/site.js";
import Reveal from "./Reveal.jsx";
import logo from "../assets/logo/logo.png";
import "../styles/Footer.css";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Same routing logic as Navbar: "/#section" hash links scroll smoothly
  // (navigating home first if needed), plain "/route" links use the
  // router instead of a full page reload — this is what was 404ing on
  // Vercel, since a full reload hit the server before the SPA fallback
  // could kick in.
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
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />

      <div className="wrap footer__grid">
        <Reveal className="footer__brand">
          <img src={logo} alt={clinic.full} className="footer__logo" />
          <p className="footer__tag">
            Holistic fertility &amp; wellness care — nurturing your journey to
            parenthood, naturally.
          </p>
          <div className="footer__social">
            <a href={`https://wa.me/${clinic.phoneRaw}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1.1 2.6c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z"/></svg>
            </a>
            <a href={`tel:+${clinic.phoneRaw}`} aria-label="Call the clinic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2Z"/></svg>
            </a>
            <a href={`mailto:${clinic.email}`} aria-label="Email the clinic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m3 6.5 9 6 9-6"/></svg>
            </a>
          </div>
        </Reveal>

        <Reveal className="footer__col footer__col--nav" delay={0.05}>
          <h5>Explore</h5>
          <ul>
            {nav.map((n) => (
              <li key={n.label}>
                <a href={n.to} onClick={(e) => handleNav(e, n.to)}>{n.label}</a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="footer__col footer__col--contact" delay={0.1}>
          <h5>Contact</h5>
          <ul>
            <li>
              <a href={`tel:+${clinic.phoneRaw}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2Z"/></svg>
                <span>{clinic.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${clinic.email}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m3 6.5 9 6 9-6"/></svg>
                <span>{clinic.email}</span>
              </a>
            </li>
            <li>
              <a href={clinic.mapsLink} target="_blank" rel="noopener noreferrer" className="footer__addr">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{clinic.address}</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="wrap footer__bottom">
        <span>© {new Date().getFullYear()} {clinic.full}</span>
        <button type="button" className="footer__top" onClick={scrollTop} aria-label="Back to top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </button>
        <span>Journey to Motherhood · Designed with care</span>
      </div>
    </footer>
  );
}
