import { motion } from "framer-motion";
import { GraduationCap, Building2, MapPin } from "lucide-react";
import { about } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SectionDivider from "../ui/SectionDivider";
import { ease, staggerContainer, staggerItem, viewport } from "../../lib/motion";

const highlightIcons = {
  education: GraduationCap,
  college: Building2,
  location: MapPin,
};

function AboutHighlightCard({ item }) {
  const Icon = highlightIcons[item.id] ?? GraduationCap;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-[border-color,box-shadow,background-color] duration-300 hover:border-teal-500/25 hover:bg-white/[0.035] hover:shadow-[0_0_40px_-12px_rgba(45,212,191,0.15)] sm:p-7"
    >
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-500/[0.06] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <motion.div
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent opacity-60"
        aria-hidden
      />

      <motion.div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-colors duration-300 group-hover:border-teal-500/20 group-hover:text-teal-400/90"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.25, ease }}
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </motion.div>

      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
        {item.label}
      </p>
      <h3 className="heading-display mt-2 text-base leading-snug text-white sm:text-lg">
        {item.title}
      </h3>
      {item.subtitle && (
        <p className="mt-1.5 text-sm font-medium text-teal-400/75">{item.subtitle}</p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-zinc-500">{item.body}</p>
      {item.bodySecondary && (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.bodySecondary}</p>
      )}

      {item.tags?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-white/[0.06] bg-[#0a0a0c] px-2.5 py-1 font-mono text-[10px] text-zinc-500 transition-colors duration-300 group-hover:border-teal-500/15 group-hover:text-zinc-400"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {item.footer && (
        <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs leading-relaxed text-zinc-600">
          {item.footer}
        </p>
      )}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding">
      <SectionDivider />
      <motion.div className="section-container section-inner">
        <SectionHeading
          index="01"
          label="About"
          title={about.title}
          description={about.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 sm:gap-7 lg:grid-cols-[1.35fr_1fr] lg:gap-8"
        >
          <motion.div
            variants={staggerItem}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/[0.1] sm:p-7 md:p-8"
          >
            {about.paragraphs.map((para, i) => (
              <p key={i} className={`body-muted leading-relaxed ${i > 0 ? "mt-5" : ""}`}>
                {para}
              </p>
            ))}
          </motion.div>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-1">
            {about.highlights.map((item) => (
              <AboutHighlightCard key={item.id} item={item} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
