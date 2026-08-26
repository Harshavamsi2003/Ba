// src/components/Navbar.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nav, clinic } from "../data/site.js";
import logo from "../assets/logo/logo.png";
import "../styles/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // text theme over current section
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const NAV_H = 74;
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      // find the section currently under the navbar to adapt text colour
      const secs = document.querySelectorAll("[data-navtheme]");
      let t = "light";
      secs.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= NAV_H && r.bottom > NAV_H) t = s.getAttribute("data-navtheme");
      });
      setTheme(t);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const handleNav = useCallback((e, to) => {
    setOpen(false);
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

  const cls = `nav ${open ? "nav--open nav--scrolled" : (scrolled ? "nav--scrolled" : "nav--top")} nav--${open ? "light" : theme}`;

  return (
    <header className={cls}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="wrap nav__inner">
        <a href="/" className="nav__brand" onClick={(e) => handleNav(e, "/#home")} aria-label={clinic.full}>
          <img src={logo} alt="" className="nav__logo" />
          <span className="nav__brandtxt">
            <b>{clinic.name}</b>
            <small>Naturopathy Fertility &amp; Wellness</small>
          </span>
        </a>

        <nav className="nav__menu" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.label} href={item.to} onClick={(e) => handleNav(e, item.to)}>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <a href="/#contact" className="nav__cta" onClick={(e) => handleNav(e, "/#contact")}>
          Book Appointment
        </a>

        <button
          className={`nav__burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu" aria-expanded={open}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="nav__backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />
            <motion.aside className="nav__panel"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}>
              <div className="nav__panel-head">
                <img src={logo} alt="" />
                <button className="nav__close" onClick={() => setOpen(false)} aria-label="Close menu">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </div>
              <nav className="nav__panel-links">
                {nav.map((item, i) => (
                  <motion.a key={item.label} href={item.to} onClick={(e) => handleNav(e, item.to)}
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}>
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <a href="/#contact" className="btn btn-primary nav__panel-cta" onClick={(e) => handleNav(e, "/#contact")}>
                Book Appointment
              </a>
              <div className="nav__panel-foot">
                <a href={`tel:+${clinic.phoneRaw}`}>{clinic.phone}</a>
                <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}