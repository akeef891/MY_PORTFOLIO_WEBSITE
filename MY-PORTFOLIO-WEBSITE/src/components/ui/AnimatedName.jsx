import { motion, useReducedMotion } from "framer-motion";
import { ease, heroNameLine } from "../../lib/motion";

export default function AnimatedName({ firstName, lastName }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div className="hero-name-wrap relative">
        <motion.div className="accent-line mb-6" />
        <h1 className="name-glow heading-display text-[clamp(2.75rem,11vw,6.5rem)] leading-[0.9] tracking-[-0.045em]">
          <span className="hero-name-first block text-white">{firstName}</span>
          <span className="hero-name-accent mt-1 block text-accent sm:mt-0 sm:inline sm:pl-3">
            {lastName}
          </span>
        </h1>
      </motion.div>
    );
  }

  return (
    <motion.div className="hero-name-wrap relative">
      <span
        className="hero-name-glow pointer-events-none absolute -left-6 top-8 h-32 w-32 rounded-full sm:h-40 sm:w-40"
        aria-hidden
      />

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.35, ease }}
        className="accent-line mb-6 origin-left"
      />

      <h1 className="name-glow heading-display text-[clamp(2.75rem,11vw,6.5rem)] leading-[0.9] tracking-[-0.045em]">
        <motion.span
          variants={heroNameLine}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.99 }}
          className="hero-name-first block text-white"
        >
          {firstName}
        </motion.span>
        <motion.span
          variants={heroNameLine}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.32 }}
          whileTap={{ scale: 0.99 }}
          className="hero-name-accent mt-1 block text-accent sm:mt-0 sm:inline sm:pl-3"
        >
          {lastName}
        </motion.span>
      </h1>
    </motion.div>
  );
}
