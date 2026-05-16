import { motion } from "framer-motion";

export default function AnimatedName({ firstName, lastName }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="accent-line mb-6 origin-left"
      />
      <h1 className="name-glow heading-display text-[clamp(2.75rem,11vw,6.5rem)] leading-[0.9] tracking-[-0.045em]">
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="block text-white"
        >
          {firstName}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 block text-accent sm:mt-0 sm:inline sm:pl-3"
        >
          {lastName}
        </motion.span>
      </h1>
    </div>
  );
}
