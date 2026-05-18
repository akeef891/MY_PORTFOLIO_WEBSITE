import { motion, useReducedMotion } from "framer-motion";
import { heroWord, heroWordStagger } from "../../lib/motion";

export default function HeroHeadline({ text, className = "" }) {
  const reduce = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (reduce) {
    return (
      <p
        className={`hero-headline heading-display mt-5 text-[clamp(1.0625rem,3.5vw,1.5rem)] leading-snug text-zinc-200 sm:mt-8 md:text-2xl md:leading-[1.35] ${className}`}
      >
        {text}
      </p>
    );
  }

  return (
    <motion.p
      variants={heroWordStagger}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: 0.32 }}
      className={`hero-headline heading-display mt-5 text-[clamp(1.0625rem,3.5vw,1.5rem)] leading-snug text-zinc-200 sm:mt-8 md:text-2xl md:leading-[1.35] ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={heroWord}
          whileTap={{ scale: 0.98, y: -1 }}
          className="hero-headline-word mr-[0.32em] inline-block last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
