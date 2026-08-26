import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CountUp({ end, suffix = "", duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setVal(end); return; }
    const el = ref.current;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * end));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(end);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [end, duration, reduce]);

  return <span ref={ref}>{val}{suffix}</span>;
}
