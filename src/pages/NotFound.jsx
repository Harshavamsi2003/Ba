import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <div id="main" style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center", padding: "120px 20px 60px" }}>
      <SEO title="Page not found | Baby Blossom Naturopathy" description="The page you are looking for could not be found." path="/" />
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 style={{ fontSize: "clamp(2.4rem,6vw,4rem)", margin: "12px 0 10px" }}>This page has wandered off</h1>
        <p style={{ color: "var(--muted)", marginBottom: 26 }}>Let's guide you back to familiar ground.</p>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    </div>
  );
}
