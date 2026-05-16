import { motion } from "framer-motion";
import { ease } from "../../lib/motion";

export default function SectionDivider() {
  return (
    <div className="section-divider-wrap" aria-hidden>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease }}
        className="section-divider section-divider-animated origin-left"
      />
    </div>
  );
}
