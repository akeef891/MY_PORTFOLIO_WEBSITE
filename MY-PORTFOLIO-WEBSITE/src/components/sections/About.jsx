import { motion } from "framer-motion";
import { GraduationCap, Building2, MapPin, Sparkles } from "lucide-react";
import { about } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SectionDivider from "../ui/SectionDivider";
import { ease, staggerContainer, staggerItem, viewport } from "../../lib/motion";

const highlightIcons = {
  education: GraduationCap,
  college: Building2,
  location: MapPin,
};

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">{children}</p>
  );
}

function SoftDivider() {
  return (
    <div
      className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:my-6"
      aria-hidden
    />
  );
}

function FocusBadge({ label, index }) {
  return (
    <motion.li
      variants={staggerItem}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease }}
      className="list-none"
    >
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-400 transition-[border-color,box-shadow,color] duration-300 hover:border-teal-500/20 hover:text-zinc-200 hover:shadow-[0_0_20px_-8px_rgba(45,212,191,0.35)]">
        {index === 0 && <Sparkles className="h-3 w-3 text-teal-500/60" aria-hidden />}
        {label}
      </span>
    </motion.li>
  );
}

function QuickStat({ stat }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease }}
      className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 transition-[border-color,box-shadow] duration-300 hover:border-teal-500/20 hover:shadow-[0_0_24px_-10px_rgba(45,212,191,0.2)] sm:px-4 sm:py-4"
    >
      <p className="heading-display text-lg text-white sm:text-xl">{stat.value}</p>
      <p className="mt-1 text-[11px] leading-snug text-zinc-600 sm:text-xs">{stat.label}</p>
    </motion.div>
  );
}

function MiniHighlight({ item }) {
  return (
    <motion.div
      variants={staggerItem}
      className="rounded-xl border border-white/[0.06] bg-[#0a0a0c]/80 px-4 py-3.5 transition-colors duration-300 hover:border-white/[0.1] sm:py-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">{item.label}</p>
      <p className="mt-1 text-sm font-medium text-zinc-300">{item.value}</p>
    </motion.div>
  );
}

function AboutLeftColumn() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="flex flex-col gap-4 sm:gap-5"
    >
      <motion.article
        variants={staggerItem}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/[0.1] sm:p-6"
      >
        <SectionLabel>Introduction</SectionLabel>
        <p className="mt-3 text-base leading-[1.7] text-zinc-300 sm:text-[1.0625rem] sm:leading-[1.75]">
          {about.intro}
        </p>

        <SoftDivider />

        <SectionLabel>Journey</SectionLabel>
        <p className="body-muted mt-3 max-w-[52ch] text-sm leading-[1.75] sm:text-[0.9375rem]">
          {about.journey}
        </p>
        <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-zinc-600">{about.closing}</p>
      </motion.article>

      <motion.div variants={staggerItem}>
        <SectionLabel>Current focus</SectionLabel>
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-3 flex flex-wrap gap-2"
        >
          {about.focus.map((label, i) => (
            <FocusBadge key={label} label={label} index={i} />
          ))}
        </motion.ul>
      </motion.div>

      <motion.div variants={staggerItem}>
        <SectionLabel>At a glance</SectionLabel>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3"
        >
          {about.quickStats.map((stat) => (
            <QuickStat key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-2 gap-2.5 sm:gap-3"
      >
        {about.miniHighlights.map((item) => (
          <MiniHighlight key={item.label} item={item} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function AboutHighlightCard({ item }) {
  const Icon = highlightIcons[item.id] ?? GraduationCap;
  const isCompact = item.id === "location";

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-[border-color,box-shadow,background-color] duration-300 hover:border-teal-500/25 hover:bg-white/[0.035] hover:shadow-[0_0_40px_-12px_rgba(45,212,191,0.15)] sm:p-6 ${
        isCompact ? "lg:flex-none" : "lg:flex-1"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-500/[0.06] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <motion.div
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent opacity-60"
        aria-hidden
      />

      <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-colors duration-300 group-hover:border-teal-500/20 group-hover:text-teal-400/90 sm:mb-4 sm:h-10 sm:w-10 sm:rounded-xl">
        <Icon className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" aria-hidden />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
        {item.label}
      </p>
      <h3 className="heading-display mt-1.5 text-[0.9375rem] leading-snug text-white sm:mt-2 sm:text-base md:text-lg">
        {item.title}
      </h3>
      {item.subtitle && (
        <p className="mt-1 text-xs font-medium text-teal-400/75 sm:text-sm">{item.subtitle}</p>
      )}

      <p className="mt-3 text-[0.8125rem] leading-[1.65] text-zinc-500 sm:mt-3.5 sm:text-sm sm:leading-relaxed">
        {item.body}
      </p>
      {item.bodySecondary && (
        <p className="mt-2.5 text-[0.8125rem] leading-[1.65] text-zinc-600 sm:text-sm sm:leading-relaxed">
          {item.bodySecondary}
        </p>
      )}

      {item.tags?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-4">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-white/[0.06] bg-[#0a0a0c] px-2 py-0.5 font-mono text-[9px] text-zinc-500 transition-colors duration-300 group-hover:border-teal-500/15 group-hover:text-zinc-400 sm:px-2.5 sm:py-1 sm:text-[10px]"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {item.footer && (
        <p className="mt-auto border-t border-white/[0.06] pt-3.5 text-[11px] leading-relaxed text-zinc-600 sm:pt-4 sm:text-xs">
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
      <div className="section-container section-inner">
        <SectionHeading
          index="01"
          label="About"
          title={about.title}
          description={about.description}
        />

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0 xl:gap-x-12">
          <AboutLeftColumn />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col gap-4 sm:gap-5 lg:min-h-0 lg:gap-4"
          >
            {about.highlights.map((item) => (
              <AboutHighlightCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
