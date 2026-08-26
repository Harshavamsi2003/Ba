import { motion, useReducedMotion } from "framer-motion";

// Renders the icon as a CSS-masked shape. The glyph takes its colour from the
// badge's `color` (currentColor) via CSS mask — so we can tint it flat purple
// or green with no gradients / shading, and recolour the whole site from CSS.
export default function MotionIcon({ src, className, delay = 0 }) {
  const reduce = useReducedMotion();
  const style = { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` };
  if (reduce) return <span aria-hidden="true" className={className} style={style} />;
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={style}
      initial={{ scale: 0.55, opacity: 0, rotate: -8 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0, y: [0, -4, 0] }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        scale: { type: "spring", stiffness: 210, damping: 13, delay },
        opacity: { duration: 0.4, delay },
        rotate: { type: "spring", stiffness: 210, damping: 13, delay },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
      }}
    />
  );
}
