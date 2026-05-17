import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { personal, contact } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SectionDivider from "../ui/SectionDivider";
import Button from "../ui/Button";
import Toast from "../ui/Toast";
import { validateContactForm } from "../../lib/validateContact";
import { ease, staggerContainer, staggerItem, viewport } from "../../lib/motion";

const MAILTO_HREF = `mailto:${personal.email}?subject=${encodeURIComponent("Portfolio inquiry")}`;

function buildReturnUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("sent", "1");
  url.hash = "contact";
  return url.toString();
}

function ContactBackground() {
  return (
    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-0 h-[min(80vw,480px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-teal-500/[0.04] blur-[100px]" />
      <motion.div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl" />
    </motion.div>
  );
}

function ContactLink({ href, icon: Icon, label, children, iconClassName = "" }) {
  return (
    <li>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-3 rounded-xl border border-transparent p-2 -ml-2 transition-colors hover:border-white/[0.06] hover:bg-white/[0.02]"
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-600">
            {label}
          </span>
          <span className="block truncate text-sm text-zinc-300 transition-colors group-hover:text-white sm:text-base">
            {children}
          </span>
        </span>
      </a>
    </li>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-400/90" role="alert">
      {message}
    </p>
  );
}

const EMPTY_FORM = { name: "", email: "", message: "", honey: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [returnUrl, setReturnUrl] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const dismissToast = useCallback(() => setToast({ message: "", type: "success" }), []);

  useEffect(() => {
    setReturnUrl(buildReturnUrl());

    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") {
      setToast({
        type: "success",
        message: "Message sent — I'll get back to you soon.",
      });
      const clean = new URL(window.location.href);
      clean.searchParams.delete("sent");
      const next = `${clean.pathname}${clean.search}${clean.hash || "#contact"}`;
      window.history.replaceState({}, "", next);
    }
  }, []);

  const handleSubmit = (e) => {
    if (submitting) {
      e.preventDefault();
      return;
    }

    if (form.honey.trim()) {
      e.preventDefault();
      return;
    }

    const { errors: nextErrors, valid } = validateContactForm(form);
    setErrors(nextErrors);
    if (!valid) {
      e.preventDefault();
      return;
    }

    setSubmitting(true);
  };

  const inputBase =
    "w-full rounded-xl border bg-white/[0.02] px-4 py-3.5 text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:bg-white/[0.03] focus:ring-2";
  const inputOk =
    "border-white/[0.08] focus:border-teal-500/40 focus:ring-teal-500/12";
  const inputErr = "border-red-500/30 focus:border-red-500/40 focus:ring-red-500/10";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <ContactBackground />
      <SectionDivider />
      <Toast message={toast.message} type={toast.type} onClose={dismissToast} />

      <div className="section-container section-inner relative">
        <SectionHeading
          index="04"
          label="Contact"
          title={contact.title}
          description={contact.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65, ease }}
          className="glass-strong mb-10 rounded-2xl border border-white/[0.08] p-6 text-center sm:mb-12 sm:p-10 md:p-12"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-400/80">
            Available for internships
          </p>
          <h3 className="heading-display mt-4 text-2xl sm:text-3xl md:text-4xl">
            {contact.ctaTitle}
          </h3>
          <p className="body-lead mx-auto mt-3 max-w-lg">{contact.ctaText}</p>
          <motion.div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button href={MAILTO_HREF} variant="primary" icon={Mail}>
              Email me
            </Button>
            <Button href={personal.resumeUrl} download variant="outline" icon={ArrowUpRight}>
              Download Resume
            </Button>
          </motion.div>
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
            <p className="body-muted mt-3 leading-relaxed">
              Based in Krishnagiri, {personal.location}. Usually reply within a day or two.
            </p>

            <ul className="mt-8 space-y-3 sm:space-y-4">
              <ContactLink
                href={`mailto:${personal.email}`}
                icon={Mail}
                label="Email"
                iconClassName="border-teal-500/20 bg-teal-500/10 text-teal-400"
              >
                {personal.email}
              </ContactLink>
              <ContactLink href={personal.phoneHref} icon={Phone} label="Phone">
                +91 {personal.phone}
              </ContactLink>
              <ContactLink href={personal.github} icon={GitHubIcon} label="GitHub">
                github.com/akeef891
              </ContactLink>
              <ContactLink href={personal.linkedin} icon={LinkedInIcon} label="LinkedIn">
                Mohammed Akeef K
              </ContactLink>
              <li className="flex items-start gap-3 p-2 -ml-2">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                    Location
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                    Krishnagiri, Tamil Nadu
                    <span className="mt-0.5 block text-zinc-500">{personal.location}</span>
                  </span>
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

          <motion.div variants={staggerItem} className="glass rounded-2xl p-5 sm:p-6 lg:p-8">
            <h3 className="heading-display text-xl text-white sm:text-2xl">Send a message</h3>
            <p className="body-muted mt-2 text-sm leading-relaxed">
              Your message goes straight to my inbox — no account needed.
            </p>

            <form
              action={contact.formSubmitAction}
              method="POST"
              onSubmit={handleSubmit}
              className="relative mt-6 space-y-5 sm:space-y-6"
              noValidate
              aria-busy={submitting}
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value={contact.formSubject} />
              {returnUrl && <input type="hidden" name="_next" value={returnUrl} />}

              <input
                type="text"
                name="_gotcha"
                value={form.honey}
                onChange={(e) => setForm({ ...form, honey: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
                aria-hidden
              />

              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-zinc-500">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  disabled={submitting}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`${inputBase} disabled:cursor-not-allowed disabled:opacity-60 ${errors.name ? inputErr : inputOk}`}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                <FieldError id="contact-name-error" message={errors.name} />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-zinc-500">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  disabled={submitting}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`${inputBase} disabled:cursor-not-allowed disabled:opacity-60 ${errors.email ? inputErr : inputOk}`}
                  placeholder="you@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                <FieldError id="contact-email-error" message={errors.email} />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-zinc-500">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  disabled={submitting}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  className={`${inputBase} resize-none disabled:cursor-not-allowed disabled:opacity-60 ${errors.message ? inputErr : inputOk}`}
                  placeholder="Tell me about an internship, project, or opportunity..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
                <FieldError id="contact-message-error" message={errors.message} />
              </div>
              <Button
                type="submit"
                variant="primary"
                icon={submitting ? Loader2 : Send}
                disabled={submitting}
                className={`w-full touch-manipulation sm:w-auto ${submitting ? "[&_svg]:animate-spin" : ""}`}
              >
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
