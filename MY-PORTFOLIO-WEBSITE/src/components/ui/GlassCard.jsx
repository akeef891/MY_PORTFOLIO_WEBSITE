import { motion } from "framer-motion";
import { ease, hoverLift, hoverLiftTransition } from "../../lib/motion";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease }}
      whileHover={hover ? { ...hoverLift, transition: hoverLiftTransition } : undefined}
      className={`glass group rounded-2xl p-6 sm:p-7 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
