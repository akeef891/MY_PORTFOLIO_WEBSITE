import { memo, useCallback, useRef } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { GitHubIcon } from "../ui/SocialIcons";
import ProjectPreviewArt from "../ui/ProjectPreviewArt";
import { projects } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SectionDivider from "../ui/SectionDivider";
import { staggerContainer, staggerItem, tapLift, viewport } from "../../lib/motion";

const TILT_MAX = 2.5;
const springTilt = { stiffness: 260, damping: 28 };

function useCardTilt(enabled) {
  const rx = useSpring(0, springTilt);
  const ry = useSpring(0, springTilt);

  const onMove = useCallback(
    (e) => {
      if (!enabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry.set(px * TILT_MAX);
      rx.set(-py * TILT_MAX);
    },
    [enabled, rx, ry]
  );

  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return { rx, ry, onMove, onLeave };
}

function ProjectMedia({ project, index, isFeatured }) {
  const num = String(index + 1).padStart(2, "0");
  const hasImage = Boolean(project.image);

  return (
    <div className="project-media relative">
      <div className="project-media-glow pointer-events-none" aria-hidden />
      <div className="project-media-inner">
        <div className="project-preview-wrap">
          {hasImage ? (
            <img
              src={project.image}
              alt={`${project.title} dashboard screenshot`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="project-preview-media"
            />
          ) : (
            <motion.div
              className={`project-preview-fallback flex h-full w-full items-center justify-center bg-gradient-to-br ${project.accent}`}
            >
              <ProjectPreviewArt variant={project.preview} />
            </motion.div>
          )}
          <div className="project-media-vignette pointer-events-none" aria-hidden />
          <div className="project-media-glass pointer-events-none" aria-hidden />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex items-start justify-between gap-2 p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {isFeatured && <span className="project-chip project-chip--accent">Flagship</span>}
          <span className="project-chip">{num}</span>
        </div>
        <span className="project-link-icon" aria-hidden>
          <ArrowUpRight className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
        </span>
      </div>

      <span className="project-media-label pointer-events-none">
        {hasImage ? "Live product" : "UI preview"}
      </span>
    </div>
  );
}

function TechBadge({ tag }) {
  return <span className="project-tech-badge">{tag}</span>;
}

function FeatureItem({ text }) {
  return (
    <li className="project-feature">
      <span className="project-feature-icon" aria-hidden>
        <Check className="h-2.5 w-2.5 text-teal-400/90" strokeWidth={2.5} />
      </span>
      <span>{text}</span>
    </li>
  );
}

function ProjectActions({ project }) {
  return (
    <div className="project-actions">
      <motion.a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="project-btn project-btn--primary interactive-tap"
      >
        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Live Demo
      </motion.a>
      <motion.a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="project-btn project-btn--ghost interactive-tap"
      >
        <GitHubIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        GitHub
      </motion.a>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const isFeatured = project.highlight;
  const tiltEnabled = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ).current;
  const { rx, ry, onMove, onLeave } = useCardTilt(tiltEnabled);
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  return (
    <motion.article
      variants={staggerItem}
      whileTap={tapLift}
      className="project-card-glow group h-full"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="project-glass h-full" style={{ transform }}>
        <ProjectMedia project={project} index={index} isFeatured={isFeatured} />

        <div className="project-body">
          <div className="project-body-head">
            <h3 className="project-title">{project.title}</h3>
          </div>

          <p className="project-desc">{project.description}</p>

          <div className="project-divider" aria-hidden />

          {project.features?.length > 0 && (
            <ul className="project-features">
              {project.features.map((feature) => (
                <FeatureItem key={feature} text={feature} />
              ))}
            </ul>
          )}

          <div className="project-tags">
            {project.tags.map((tag) => (
              <TechBadge key={tag} tag={tag} />
            ))}
          </div>

          <ProjectActions project={project} />
        </div>
      </motion.div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-padding">
      <SectionDivider />
      <div className="section-container section-inner projects-shell">
        <SectionHeading
          index="03"
          label="Projects"
          title="Production apps I've shipped"
          description="Real-world React applications with authentication, dashboards, and responsive UI ? built to solve actual workflow problems."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="projects-grid"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Projects);
