import { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, ArrowUpRight } from "lucide-react";
import { personal } from "../../data/portfolio";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import Button from "../ui/Button";
import SocialButton from "../ui/SocialButton";
import HeroBackground from "../ui/HeroBackground";
import AnimatedName from "../ui/AnimatedName";
import HeroVisual from "../ui/HeroVisual";
import { scrollToSection } from "../../lib/scroll";
import { fadeUp } from "../../lib/motion";

export default function Hero() {
  const scrollToProjects = useCallback(() => {
    scrollToSection("projects");
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[calc(5.25rem+env(safe-area-inset-top))] pb-14 sm:pb-20 md:pt-32 md:pb-28"
    >
      <HeroBackground />

      <div className="section-container relative z-10 w-full">
        <div className="grid items-end gap-8 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          <div className="min-w-0 max-w-2xl">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mb-8"
            >
              <span className="font-mono text-[10px] text-zinc-700">01</span>
              <span className="hidden h-px w-8 bg-white/10 sm:block" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 sm:text-[11px]">
                {personal.role} · {personal.subtitle}
              </span>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
              <AnimatedName firstName="Mohammed" lastName="Akeef K" />
            </motion.div>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="heading-display mt-5 text-[clamp(1.0625rem,3.5vw,1.5rem)] leading-snug text-zinc-300 sm:mt-8 md:text-2xl md:leading-[1.35]"
            >
              {personal.headline}
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="body-muted mt-4 max-w-[48ch] sm:mt-5"
            >
              {personal.intro}
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button onClick={scrollToProjects} variant="primary" icon={ArrowUpRight}>
                View Projects
              </Button>
              <Button href={personal.resumeUrl} download variant="outline" icon={Download}>
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 flex items-center gap-3 sm:mt-8"
            >
              <SocialButton href={personal.github} label="GitHub" icon={GitHubIcon} />
              <SocialButton href={personal.linkedin} label="LinkedIn" icon={LinkedInIcon} />
            </motion.div>

            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-7 sm:mt-12 sm:gap-8 sm:pt-9"
            >
              {personal.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="stat-block min-w-0 px-0.5 sm:px-1"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="heading-display text-[clamp(1.125rem,3.2vw,1.875rem)] leading-none sm:text-2xl md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="stat-caption mt-2.5 max-w-[11rem] sm:mt-3">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative hidden min-w-0 lg:block lg:translate-y-6">
            <HeroVisual />
          </div>
        </div>

        <div className="mt-6 sm:mt-10 lg:hidden">
          <HeroVisual />
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-zinc-700 transition-colors hover:text-zinc-500"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
