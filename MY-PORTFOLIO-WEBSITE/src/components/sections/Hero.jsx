import { useCallback } from "react";

import { motion } from "framer-motion";

import { Download, ArrowUpRight } from "lucide-react";

import { personal } from "../../data/portfolio";

import { GitHubIcon, InstagramIcon, LinkedInIcon } from "../ui/SocialIcons";

import Button from "../ui/Button";

import SocialButton from "../ui/SocialButton";

import HeroBackground from "../ui/HeroBackground";

import AnimatedName from "../ui/AnimatedName";

import HeroHeadline from "../ui/HeroHeadline";

import HeroVisual from "../ui/HeroVisual";

import { scrollToSection } from "../../lib/scroll";

import { ease, heroItem, heroStagger, hoverLift, hoverLiftTransition, tapLift } from "../../lib/motion";



export default function Hero() {

  const scrollToProjects = useCallback(() => {

    scrollToSection("projects");

  }, []);



  return (

    <section

      id="hero"

      className="relative overflow-hidden pt-[calc(5.25rem+env(safe-area-inset-top))] pb-10 sm:pb-12 md:pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20"

    >

      <HeroBackground />



      <motion.div className="section-container relative z-10 w-full min-w-0">

        <div className="grid min-w-0 items-end gap-8 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">

          <motion.div

            className="hero-copy min-w-0 max-w-2xl"

            variants={heroStagger}

            initial="hidden"

            animate="show"

          >

            <motion.div

              variants={heroItem}

              className="hero-badge mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mb-8"

            >

              <motion.span

                initial={{ opacity: 0, y: 6 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.42, delay: 0.1, ease }}

                className="hero-badge-index text-section-index"

              >

                01

              </motion.span>

              <motion.span

                initial={{ scaleX: 0, opacity: 0 }}

                animate={{ scaleX: 1, opacity: 1 }}

                transition={{ duration: 0.55, delay: 0.22, ease }}

                className="hidden h-px w-8 origin-left bg-white/[0.12] sm:block"

                aria-hidden

              />

              <motion.span

                initial={{ opacity: 0, y: 8 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5, delay: 0.28, ease }}

                className="text-label normal-case tracking-[0.14em] sm:tracking-[0.16em]"

              >

                {personal.role} · {personal.subtitle}

              </motion.span>

            </motion.div>



            <motion.div variants={heroItem}>

              <AnimatedName firstName="Mohammed" lastName="Akeef K" />

            </motion.div>



            <motion.div variants={heroItem}>

              <HeroHeadline text={personal.headline} />

            </motion.div>



            <motion.p
              variants={heroItem}
              whileTap={{ y: -1 }}
              className="hero-intro body-muted mt-4 max-w-[48ch] sm:mt-5"
            >
              {personal.intro}
            </motion.p>



            <motion.div

              variants={heroItem}

              className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"

            >

              <Button onClick={scrollToProjects} variant="primary" icon={ArrowUpRight}>

                View Projects

              </Button>

              <Button href={personal.resumeUrl} download variant="outline" icon={Download}>

                Download Resume

              </Button>

            </motion.div>



            <motion.div variants={heroItem} className="mt-6 flex items-center gap-3 sm:mt-8">

              <SocialButton href={personal.github} label="GitHub" icon={GitHubIcon} />

              <SocialButton href={personal.linkedin} label="LinkedIn" icon={LinkedInIcon} />

              <SocialButton href={personal.instagram} label="Instagram" icon={InstagramIcon} />

            </motion.div>



            <motion.div

              variants={heroItem}

              className="mt-8 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-6 sm:mt-12 sm:gap-6 sm:pt-8"

            >

              {personal.stats.map((stat) => (

                <motion.div

                  key={stat.label}

                  className="stat-block min-w-0 px-0.5"

                  whileHover={hoverLift}

                  whileTap={tapLift}

                  transition={hoverLiftTransition}

                >

                  <p className="heading-display text-[clamp(1rem,2.6vw,1.5rem)] leading-none sm:text-xl md:text-2xl">

                    {stat.value}

                  </p>

                  <p className="stat-caption mt-2 max-w-[10rem] sm:mt-2">{stat.label}</p>

                </motion.div>

              ))}

            </motion.div>

          </motion.div>



          <motion.div

            className="relative hidden min-w-0 lg:block lg:translate-y-6"

            initial={{ opacity: 0, y: 24 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.85, delay: 0.55, ease }}

          >

            <HeroVisual />

          </motion.div>

        </div>



        <motion.div

          className="mt-6 sm:mt-10 lg:hidden"

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.75, delay: 0.45, ease }}

        >

          <HeroVisual />

        </motion.div>

      </motion.div>

    </section>

  );

}

