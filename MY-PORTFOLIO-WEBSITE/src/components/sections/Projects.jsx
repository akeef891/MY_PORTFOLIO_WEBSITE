import { memo, useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "../ui/SocialIcons";
import { projects } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SectionDivider from "../ui/SectionDivider";
import { ease, staggerContainer, staggerItem, viewport } from "../../lib/motion";

/** Featured project visual — dev / build metaphor (not a literal app UI clone) */
function FeaturedProjectMockup() {
  return (
    <div className="flex h-full min-h-[200px] items-center justify-center p-4 sm:min-h-[260px] sm:p-8 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="w-full max-w-md overflow-hidden rounded-xl border border-white/[0.09] bg-[#0c0d0f]/95 shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500/40" />
            <span className="h-2 w-2 rounded-full bg-amber-500/40" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/50" />
          </span>
          <span className="font-mono text-[9px] text-zinc-400 sm:text-[10px]">vite build · Task Quest</span>
        </div>
        <div className="p-3 font-mono text-[9px] leading-relaxed text-zinc-500 sm:p-4 sm:text-[10px] sm:leading-relaxed">
          <p className="text-zinc-600">
            <span className="text-teal-500/90">➜</span> <span className="text-zinc-400">portfolio</span> npm run build
          </p>
          <p className="mt-2 text-emerald-500/85">✓</p>
          <p className="pl-3 text-zinc-500">2180 modules transformed</p>
          <p className="mt-1.5 text-emerald-500/85">✓</p>
          <p className="pl-3 text-zinc-500">dist/index.html · 1.44 kB</p>
          <p className="mt-1.5 text-emerald-500/85">✓</p>
          <p className="pl-3 text-zinc-500">dist/assets/index.css · 70.77 kB</p>
          <p className="mt-3 border-t border-white/[0.05] pt-2.5 text-teal-400/90">
            ✓ built in 3.65s — <span className="text-zinc-500">React · local storage · dark UI</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
function ProjectPreview({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
      />
    );
  }

  if (project.highlight) {
    return (
      <div className={`relative h-full w-full bg-gradient-to-br ${project.accent}`}>
        <FeaturedProjectMockup />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/25 to-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${project.accent}`}>
      <div className="absolute inset-0 flex items-center justify-center p-6 opacity-20">
        <div className="h-16 w-full max-w-[160px] rounded-lg border border-white/10 bg-white/[0.04] sm:h-20 sm:max-w-[180px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050506] to-transparent" />
    </div>
  );
}

function TechBadge({ tag, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35, ease }}
      className="rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-zinc-400 transition-all duration-300 group-hover:border-teal-500/25 group-hover:text-zinc-200"
    >
      {tag}
    </motion.span>
  );
}

function ProjectActions({ project, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 sm:flex-row sm:flex-wrap ${className}`}>
      <motion.a
        href={project.liveUrl}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-medium text-zinc-950 transition-shadow hover:shadow-[0_10px_32px_-12px_rgba(255,255,255,0.35)] sm:flex-none"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Live Demo
      </motion.a>
      <motion.a
        href={project.githubUrl}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white sm:flex-none"
      >
        <GitHubIcon className="h-3.5 w-3.5" />
        GitHub
      </motion.a>
    </div>
  );
}

function FeaturedProject({ project }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(94,234,212,0.07), transparent 55%)`;

  const onMove = useCallback(
    (e) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set(e.clientX - rect.left);
      my.set(e.clientY - rect.top);
    },
    [mx, my]
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease }}
      onMouseMove={onMove}
      className="group project-card-glow"
    >
      <div className="card-surface overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0c] sm:aspect-[16/10] md:aspect-[2/1]">
          <ProjectPreview project={project} />
          <motion.div
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-5 sm:top-5">
            <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-teal-300/95 sm:text-[10px]">
              Flagship
            </span>
            <span className="text-section-index">01</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-[#050506] via-[#050506]/80 to-transparent p-5 pt-16 opacity-0 transition-opacity duration-400 group-hover:opacity-100 md:block">
            <ProjectActions project={project} className="justify-end" />
          </div>
        </div>

        <div className="space-y-5 p-4 sm:p-6 md:flex md:items-end md:justify-between md:gap-10 md:p-8">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-start gap-2">
              <h3 className="heading-display text-xl text-white sm:text-2xl md:text-3xl lg:text-[2.25rem]">
                {project.title}
              </h3>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-400 sm:h-5 sm:w-5" />
            </div>
            <p className="body-muted max-w-2xl text-sm sm:text-base">{project.description}</p>
          </div>

          <div className="shrink-0 space-y-4 md:max-w-sm md:text-right">
            <div className="flex flex-wrap gap-2 md:justify-end">
              {project.tags.map((tag, i) => (
                <TechBadge key={tag} tag={tag} index={i} />
              ))}
            </div>
            <ProjectActions project={project} className="md:justify-end md:hidden" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }) {
  const num = String(index + 2).padStart(2, "0");

  return (
    <motion.article variants={staggerItem} className="group project-card-glow h-full">
      <div className="card-surface flex h-full flex-col overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0c]">
          <ProjectPreview project={project} />
          <span className="text-section-index absolute right-3 top-3 sm:right-4 sm:top-4">
            {num}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="heading-display text-lg text-white sm:text-xl">{project.title}</h3>
          <p className="body-muted mt-2 flex-1 text-sm leading-relaxed">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((tag, i) => (
              <TechBadge key={tag} tag={tag} index={i} />
            ))}
          </div>
          <ProjectActions project={project} className="mt-4" />
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const featured = projects.find((p) => p.highlight);
  const others = projects.filter((p) => !p.highlight);

  return (
    <section id="projects" className="section-padding">
      <SectionDivider />
      <div className="section-container section-inner">
        <SectionHeading
          index="03"
          label="Projects"
          title="Projects I've built"
          description="Personal work where I practice React, layout, and UI polish — including this portfolio."
        />

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {featured && <FeaturedProject project={featured} />}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-5 sm:grid-cols-2 sm:gap-6"
          >
            {others.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(Projects);
