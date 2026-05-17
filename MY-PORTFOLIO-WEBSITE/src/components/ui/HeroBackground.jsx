import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#050506]" />

      <motion.div
        className="absolute left-[10%] top-[15%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute right-0 top-0 h-full w-1/3 opacity-40"
        style={{
          background:
            "linear-gradient(270deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
        }}
      />

      <motion.div
        className="absolute -right-24 bottom-0 h-px w-[40%] bg-gradient-to-l from-teal-500/20 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />

      <motion.div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050506] to-transparent" />
    </div>
  );
}
