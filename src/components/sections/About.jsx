import { motion } from "framer-motion";
import { about } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SectionDivider from "../ui/SectionDivider";
import { staggerContainer, staggerItem, viewport } from "../../lib/motion";

export default function About() {
  return (
    <section id="about" className="section-padding">
      <SectionDivider />
      <div className="section-container section-inner">
        <SectionHeading
          index="01"
          label="About"
          title="Building interfaces with purpose"
          description="A developer who blends design sensibility with solid engineering."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 sm:gap-6 lg:grid-cols-[1.4fr_1fr]"
        >
          <motion.div
            variants={staggerItem}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 md:p-8"
          >
            {about.paragraphs.map((para, i) => (
              <p key={i} className={`body-muted ${i > 0 ? "mt-5" : ""}`}>
                {para}
              </p>
            ))}
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {about.highlights.map((item, i) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]"
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                  {item.label}
                </p>
                <p className="heading-display mt-2 text-base text-white sm:text-lg">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
