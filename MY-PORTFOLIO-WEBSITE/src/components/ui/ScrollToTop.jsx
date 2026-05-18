import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollToSection } from "../../lib/scroll";
import { ease, hoverLift, hoverLiftTransition } from "../../lib/motion";

export default function ScrollToTop() {
  const reduce = useReducedMotion();
  const [burstKey, setBurstKey] = useState(0);

  const handleClick = useCallback(() => {
    if (!reduce) setBurstKey((k) => k + 1);
    scrollToSection("hero");
  }, [reduce]);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease }}
      whileHover={reduce ? undefined : { ...hoverLift, transition: hoverLiftTransition }}
      whileTap={reduce ? undefined : { scale: 0.92 }}
      className="scroll-top-btn group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      aria-label="Back to top"
    >
      {!reduce && (
        <>
          <span className="scroll-top-idle-ring pointer-events-none absolute inset-0 rounded-full" aria-hidden />
          <span className="scroll-top-glow pointer-events-none absolute inset-0 rounded-full" aria-hidden />
          {burstKey > 0 && (
            <span key={burstKey} className="scroll-top-burst-wrap pointer-events-none absolute inset-0" aria-hidden>
              <span className="scroll-top-burst scroll-top-burst-1" />
              <span className="scroll-top-burst scroll-top-burst-2" />
              <span className="scroll-top-burst scroll-top-burst-3" />
            </span>
          )}
        </>
      )}

      <span className="scroll-top-face relative z-[1] flex h-full w-full items-center justify-center rounded-full border border-teal-500/35 bg-gradient-to-br from-white/[0.1] via-[#12121a]/95 to-[#0a0a0e] shadow-[0_0_20px_-4px_rgba(45,212,191,0.35),0_8px_28px_-10px_rgba(0,0,0,0.65)] transition-[border-color,box-shadow,transform] duration-300 group-hover:border-teal-400/50 group-hover:shadow-[0_0_28px_-2px_rgba(45,212,191,0.45),0_12px_32px_-10px_rgba(0,0,0,0.7)]">
        <ArrowUp className="h-[1.125rem] w-[1.125rem] text-teal-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-active:scale-90" />
      </span>
    </motion.button>
  );
}
