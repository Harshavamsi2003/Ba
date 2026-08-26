import { motion, useReducedMotion } from "framer-motion";

// Scroll-triggered reveal: fades + rises + subtle scale as it enters view.
export default function Reveal({ children, delay = 0, y = 42, className, as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 0.61, 0.24, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
