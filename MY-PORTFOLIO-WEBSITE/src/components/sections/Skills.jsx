import { motion } from "framer-motion";
import { skills } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";

const { groups: skillGroups, description: skillsDescription } = skills;
import SectionDivider from "../ui/SectionDivider";
import { ease, hoverLift, hoverLiftTransition, staggerContainer, staggerItem, viewport } from "../../lib/motion";

function SkillBadge({ name, delay }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease }}
      whileHover={{ ...hoverLift, transition: hoverLiftTransition }}
      className="list-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-zinc-300 transition-colors duration-300 hover:border-teal-500/25 hover:text-zinc-100"
    >
      {name}
    </motion.li>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <SectionDivider />
      <div className="section-container section-inner">
        <SectionHeading
          index="02"
          label="Skills"
          title="What I work with"
          description={skillsDescription}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              variants={staggerItem}
              className={`card-surface relative rounded-2xl p-5 sm:p-6 md:p-7 ${
                i === 1 ? "md:translate-y-4" : ""
              }`}
            >
              <span className="text-section-index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="heading-display mt-3 text-lg text-white">{group.category}</h3>
              <p className="body-muted mt-2 text-sm">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {group.items.map((skill, j) => (
                  <SkillBadge key={skill} name={skill} delay={j * 0.04} />
                ))}
              </ul>
              <div className="absolute left-0 top-8 h-8 w-px bg-gradient-to-b from-teal-500/40 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
