// src/components/Navbar.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { nav, clinic } from "../data/site.js";
import logo from "../assets/logo/logo.png";
import "../styles/Navbar.css";

// Section ids that have a nav entry ("/#services" -> "services"), in nav order.
// These are the only sections the scroll-spy watches, so exactly one link lights up.
const SPY_IDS = nav.filter((i) => i.to.startsWith("/#")).map((i) => i.to.slice(2));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // text theme over current section
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(SPY_IDS[0] || "");
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      const navH = headerRef.current?.offsetHeight || 74;
      setScrolled(window.scrollY > 30);

      // adapt nav text colour to whatever section sits under the bar
      let t = "light";
      document.querySelectorAll("[data-navtheme]").forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= navH && r.bottom > navH) t = s.getAttribute("data-navtheme");
      });
      setTheme(t);

      // ---- scroll-spy: which on-page section are we in? (home route only) ----
      if (pathname === "/") {
        const line = navH + 30; // just below the bar; matches section scroll-margin-top
        let current = "";
        SPY_IDS.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        });
        // at the very bottom, always light the last tracked section
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        if (atBottom) {
          for (let i = SPY_IDS.length - 1; i >= 0; i--) {
            if (document.getElementById(SPY_IDS[i])) { current = SPY_IDS[i]; break; }
          }
        }
        setActiveId(current || SPY_IDS[0] || "");
      } else {
        setActiveId("");
      }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const handleNav = useCallback((e, to) => {
    setOpen(false);
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      const scroll = () => {
        const el = document.getElementById(id);
        if (el && id !== "home") el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      };
      if (pathname !== "/") { navigate("/"); setTimeout(scroll, 80); }
      else scroll();
    } else {
      e.preventDefault();
      navigate(to);
    }
  }, [navigate, pathname]);

  // Active-link rules, mutually exclusive so only ever one link is lit:
  //  - a hash link ("/#services") lights only on the home route, and only when
  //    the scroll-spy says that section is the one under the bar;
  //  - a page link ("/about-us") lights only when it is the current route.
  const isActive = (to) =>
    to.startsWith("/#") ? pathname === "/" && to.slice(2) === activeId : pathname === to;

  const cls = `nav ${open ? "nav--open nav--scrolled" : (scrolled ? "nav--scrolled" : "nav--top")} nav--${open ? "light" : theme}`;

  return (
    <header className={cls} ref={headerRef}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="wrap nav__inner">
        <a href="/" className="nav__brand" onClick={(e) => handleNav(e, "/#home")} aria-label={clinic.full}>
          <span className="nav__logowrap">
            <img src={logo} alt="" className="nav__logo" />
          </span>
          <span className="nav__brandtxt">
            <b>{clinic.name}</b>
            <small>Naturopathy Fertility &amp; Wellness Clinic</small>
          </span>
        </a>

        <nav className="nav__menu" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.to}
              onClick={(e) => handleNav(e, item.to)}
              className={isActive(item.to) ? "is-active" : ""}
              aria-current={isActive(item.to) ? "page" : undefined}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <a href="/#contact" className="nav__cta" onClick={(e) => handleNav(e, "/#contact")}>
          <span>Book Appointment</span>
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
                    className={isActive(item.to) ? "is-active" : ""}
                    aria-current={isActive(item.to) ? "page" : undefined}
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
