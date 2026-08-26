import { clinic } from "../data/site.js";
import "../styles/FloatingActions.css";

export default function FloatingActions() {
  return (
    <div className="fab">
      <a className="fab__btn fab__btn--wa" href={`https://wa.me/${clinic.phoneRaw}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 1-13 8l-5 1 1-5A9 9 0 1 1 21 12z" />
          <path d="M8.5 9c0 4 3 6.5 6.5 6.5.7 0 1.3-.6 1-1.3l-.8-1.5-1.7.6a4 4 0 0 1-2.6-2.6l.6-1.7L10 8.2C9.3 7.9 8.5 8.3 8.5 9z" />
        </svg>
      </a>
      <a className="fab__btn fab__btn--call" href={`tel:+${clinic.phoneRaw}`} aria-label="Call the clinic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      </a>
    </div>
  );
}
