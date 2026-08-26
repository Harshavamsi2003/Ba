import { motion, useReducedMotion } from "framer-motion";

// Reveals a line of text word-by-word as it scrolls into view.
export default function AnimatedText({ text, className, delay = 0 }) {
  const reduce = useReducedMotion();
  const words = String(text).split(" ");
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } };
  const word = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
  };
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {w + (i < words.length - 1 ? " " : "")}
        </motion.span>
      ))}
    </motion.span>
  );
}
