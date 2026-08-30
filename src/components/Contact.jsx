// src/components/Contact.jsx
import { useState, useRef } from "react";
import Reveal from "./Reveal.jsx";
import AnimatedText from "./AnimatedText.jsx";
import { clinic, services, WEB3FORMS_ACCESS_KEY } from "../data/site.js";
import "../styles/Contact.css";

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

// Simple, forgiving check for an Indian mobile number (allows +91, spaces,
// dashes) — good enough to catch typos without being overly strict.
const PHONE_RE = /^[+]?[\d\s-]{10,15}$/;

const initialForm = { name: "", phone: "", service: services[0].title, date: "", message: "", botcheck: "" };

// Spam guards (client-side, on top of enabling hCaptcha + domain
// restriction in the Web3Forms dashboard — see README):
// 1. "botcheck" — a field invisible to real visitors (hidden, not
//    focusable, no label). Web3Forms silently discards any submission
//    where it's filled in — real users never touch it, but bots that
//    auto-fill every input on a form do.
// 2. MIN_FILL_MS — a real person needs at least a couple of seconds to
//    read the form and type into it. Submissions faster than this are
//    almost always scripted and are dropped without hitting the API.
const MIN_FILL_MS = 2500;

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const mountedAt = useRef(Date.now());

  const update = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!form.phone.trim() || !PHONE_RE.test(form.phone.trim())) next.phone = "Please enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Bot signals: honeypot filled in, or submitted too fast to be human.
    // Fail "successfully" without calling the API — showing an error
    // instead would just teach the bot what tripped the filter.
    const isBot = form.botcheck.trim() !== "" || Date.now() - mountedAt.current < MIN_FILL_MS;
    if (isBot) {
      setStatus("success");
      setForm(initialForm);
      mountedAt.current = Date.now();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New appointment request — ${form.service}`,
          from_name: "Baby Blossom Website",
          name: form.name,
          phone: form.phone,
          service: form.service,
          preferred_date: form.date || "Not specified",
          message: form.message || "—",
          botcheck: form.botcheck,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(clinic.mapsQuery)}&output=embed`;

  return (
    <section className="contact section-pad" id="contact" data-navtheme="light">
      <div className="wrap">
        <div className="head-center">
          <Reveal>
            <span className="eyebrow">Get In Touch</span>
            <h2><AnimatedText text="Your Journey to" className="split-green" />{" "}<AnimatedText text="Motherhood Begins Here" className="split-violet" delay={0.15} /></h2>
            <div className="divider" />
          </Reveal>
        </div>

        <div className="contact__grid">
          <Reveal className="contact__info">
            <div className="contact__line">
              <span className="contact__ic"><Icon d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><Icon d="M12 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></span>
              <div><b>Visit Us</b><span>{clinic.address}</span></div>
            </div>
            <div className="contact__line">
              <span className="contact__ic"><Icon d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></span>
              <div><b>Call / WhatsApp</b><a href={`tel:+${clinic.phoneRaw}`}>{clinic.phone}</a></div>
            </div>
            <div className="contact__line">
              <span className="contact__ic"><Icon d="M3 5h18v14H3zM3 7l9 6 9-6" /></span>
              <div><b>Email</b><a href={`mailto:${clinic.email}`}>{clinic.email}</a></div>
            </div>

            <div className="contact__map">
              <iframe
                title="Baby Blossom Naturopathy location on Google Maps"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a className="contact__maplink" href={clinic.mapsLink} target="_blank" rel="noreferrer">
              Open in Google Maps
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </a>
          </Reveal>

          <Reveal className="contact__form-wrap" delay={0.1}>
            {status === "success" ? (
              <div className="contact__success">
                <span className="contact__success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <h3>Form Submitted!</h3>
                <p>Thank you — we've received your request and will get back to you shortly. You can also reach us directly on WhatsApp any time.</p>
                <button type="button" className="btn btn-ghost" onClick={() => { setStatus("idle"); mountedAt.current = Date.now(); }}>
                  Send Another Request
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={submit} noValidate>
                <h3>Book Your Appointment</h3>

                {/* Honeypot — invisible to real visitors, tempting to bots */}
                <input
                  type="text"
                  name="botcheck"
                  value={form.botcheck}
                  onChange={update("botcheck")}
                  autoComplete="off"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="contact__hp"
                />

                <label className="field">
                  <span>Full Name</span>
                  <input type="text" value={form.name} onChange={update("name")} placeholder="Your name"
                    className={errors.name ? "field--error" : ""} />
                  {errors.name && <em className="field__err">{errors.name}</em>}
                </label>

                <label className="field">
                  <span>Phone Number</span>
                  <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+91"
                    className={errors.phone ? "field--error" : ""} />
                  {errors.phone && <em className="field__err">{errors.phone}</em>}
                </label>

                <label className="field">
                  <span>Service</span>
                  <select value={form.service} onChange={update("service")}>
                    {services.map((s) => <option key={s.key}>{s.title}</option>)}
                    <option>Other</option>
                  </select>
                </label>

                <label className="field">
                  <span>Preferred Date</span>
                  <input type="date" value={form.date} onChange={update("date")} />
                </label>

                <label className="field">
                  <span>Message</span>
                  <textarea rows="3" value={form.message} onChange={update("message")} placeholder="Tell us a little about your needs" />
                </label>

                <button type="submit" className="btn btn-primary contact__submit" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Request Appointment"}
                </button>

                {status === "error" && (
                  <p className="contact__error">
                    Something went wrong sending your request. Please try again, or WhatsApp us directly at {clinic.phone}.
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
