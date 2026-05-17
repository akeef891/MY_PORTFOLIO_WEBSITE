import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { personal } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SectionDivider from "../ui/SectionDivider";
import Button from "../ui/Button";
import { ease, staggerContainer, staggerItem, viewport } from "../../lib/motion";

function ContactBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-0 h-[min(80vw,480px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-teal-500/[0.04] blur-[100px]" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl" />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-teal-500/40 focus:bg-white/[0.03] focus:ring-2 focus:ring-teal-500/12";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <ContactBackground />
      <SectionDivider />
      <div className="section-container section-inner relative">
        <SectionHeading
          index="04"
          label="Contact"
          title="Let's build something great"
          description="Open to internships, freelance work, and collaborations. I'd love to hear what you're building."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65, ease }}
          className="glass-strong mb-10 rounded-2xl border border-white/[0.08] p-6 text-center sm:mb-12 sm:p-10 md:p-12"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-400/80">
            Available for opportunities
          </p>
          <h3 className="heading-display mt-4 text-2xl sm:text-3xl md:text-4xl">
            Ready to collaborate?
          </h3>
          <p className="body-lead mx-auto mt-3 max-w-lg">
            Whether you&apos;re hiring, need a frontend engineer, or want to discuss a product idea
            — let&apos;s talk.
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href={`mailto:${personal.email}`} variant="primary" icon={Mail}>
              {personal.email}
            </Button>
            <Button href={personal.resumeUrl} download variant="outline" icon={ArrowUpRight}>
              Download Resume
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 lg:grid-cols-2 lg:gap-8"
        >
          <motion.div
            variants={staggerItem}
            className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-white/[0.1] sm:p-6 lg:p-8"
          >
            <h3 className="heading-display text-xl text-white sm:text-2xl">Get in touch</h3>
            <p className="body-muted mt-3">
              Based in {personal.location}. I typically respond within 24–48 hours.
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="group flex items-center gap-3 rounded-xl border border-transparent p-2 -ml-2 transition-colors hover:border-white/[0.06] hover:bg-white/[0.02]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-400">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                      Email
                    </span>
                    <span className="text-sm text-zinc-300 transition-colors group-hover:text-white sm:text-base">
                      {personal.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 p-2 -ml-2">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                    Location
                  </span>
                  <span className="text-sm text-zinc-300 sm:text-base">{personal.location}</span>
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={personal.github} variant="secondary" icon={GitHubIcon}>
                GitHub
              </Button>
              <Button href={personal.linkedin} variant="secondary" icon={LinkedInIcon}>
                LinkedIn
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="glass rounded-2xl p-5 sm:p-6 lg:p-8"
          >
            <h3 className="heading-display text-xl text-white sm:text-2xl">Send a message</h3>
            <p className="body-muted mt-2 text-sm">Share a bit about your project or role.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-500">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-500">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-500">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project or role..."
                />
              </div>
              <Button type="submit" variant="primary" icon={Send} className="w-full sm:w-auto">
                {submitted ? "Message sent — thank you!" : "Send message"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
