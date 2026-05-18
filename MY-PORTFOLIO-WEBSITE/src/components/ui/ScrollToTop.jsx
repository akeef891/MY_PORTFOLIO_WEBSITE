import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollToSection } from "../../lib/scroll";
import { ease, hoverLift, hoverLiftTransition } from "../../lib/motion";

export default function ScrollToTop() {
  return (
    <motion.button
      type="button"
      onClick={() => scrollToSection("hero")}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease }}
      whileHover={{ ...hoverLift, transition: hoverLiftTransition }}
      whileTap={{ scale: 0.95, y: 0 }}
      className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-zinc-300 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-teal-500/30 hover:bg-white/[0.08] hover:shadow-[0_12px_32px_-12px_rgba(45,212,191,0.15)]"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4 text-teal-400/90 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </motion.button>
  );
}
