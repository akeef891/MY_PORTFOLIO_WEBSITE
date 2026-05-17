import { motion } from "framer-motion";

export default function GlowOrb({ className = "", color = "cyan" }) {
  const colors = {
    cyan: "from-cyan-500/30 via-cyan-500/10 to-transparent",
    purple: "from-purple-500/30 via-purple-500/10 to-transparent",
    mixed: "from-cyan-500/25 via-purple-500/20 to-transparent",
  };

  return (
    <motion.div
      aria-hidden
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute rounded-full bg-gradient-radial blur-3xl ${colors[color]} ${className}`}
      style={{
        background: `radial-gradient(circle, var(--tw-gradient-stops))`,
      }}
    />
  );
}
