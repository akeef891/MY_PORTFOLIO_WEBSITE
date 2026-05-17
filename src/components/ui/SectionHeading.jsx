import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../../lib/motion";

export default function SectionHeading({
  label,
  title,
  description,
  index,
  className = "",
}) {
  return (
    <motion.header
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={`mb-10 sm:mb-12 md:mb-16 ${className}`}
    >
      <motion.div variants={staggerItem} className="flex items-center gap-3 sm:gap-4">
        {index && (
          <span className="font-mono text-[10px] text-zinc-700 sm:text-xs">{index}</span>
        )}
        <span className="h-px w-6 bg-white/10 sm:w-8" />
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-[11px] sm:tracking-[0.22em]">
          {label}
        </p>
      </motion.div>
      <motion.h2 variants={staggerItem} className="heading-section mt-4 max-w-3xl sm:mt-5">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={staggerItem} className="body-muted mt-3 max-w-2xl sm:mt-4 md:mt-5">
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
