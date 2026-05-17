import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { personal, contact } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SectionDivider from "../ui/SectionDivider";
import Button from "../ui/Button";
import { saveContactMessage } from "../../lib/saveContactMessage";
import { sendContactEmailNotification } from "../../lib/sendContactEmail";
import { ease, staggerContainer, staggerItem, viewport } from "../../lib/motion";

const MAILTO_HREF = `mailto:${personal.email}?subject=${encodeURIComponent("Portfolio inquiry")}`;

const INPUT_CLASS =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-teal-500/40 focus:bg-white/[0.03] focus:ring-2 focus:ring-teal-500/12";

const SUBMIT_BTN_CLASS =
  "inline-flex w-full min-h-[44px] touch-manipulation items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-zinc-950 shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset] transition-[box-shadow,background-color,transform,opacity] duration-300 ease-out hover:bg-zinc-50 hover:shadow-[0_12px_40px_-16px_rgba(255,255,255,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto";

function ContactBackground() {
  return (
    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-0 h-[min(80vw,480px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-teal-500/[0.04] blur-[100px]" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl" />
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

function FormStatus({ status, message }) {
  if (!message) return null;
  const isSuccess = status === "success";
  return (
    <p
      role="status"
      className={`rounded-lg border px-4 py-3 text-sm ${
        isSuccess
          ? "border-teal-500/20 bg-teal-500/10 text-teal-300"
          : "border-red-500/20 bg-red-500/10 text-red-300"
      }`}
    >
      {message}
    </p>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }
    if (trimmedMessage.length < 10) {
      setStatus({ type: "error", message: "Message should be at least 10 characters." });
      return;
    }

    setSending(true);
    setStatus({ type: "", message: "" });

    try {
      await saveContactMessage({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      });

      try {
        await sendContactEmailNotification({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        });
      } catch (emailError) {
        console.error("[contact] Email notification failed:", emailError);
        setName("");
        setEmail("");
        setMessage("");
        setStatus({
          type: "success",
          message:
            "Message saved. Email alert did not send — I'll still see it in my inbox soon.",
        });
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setStatus({
        type: "success",
        message: "Message sent — I'll get back to you soon.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Couldn't save your message. Try Email me or try again later.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <ContactBackground />
      <SectionDivider />

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
              Your message is saved securely — I'll reply as soon as I can.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:space-y-6" noValidate>
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
                  value={name}
                  disabled={sending}
                  onChange={(e) => setName(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Your name"
                />
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
                  value={email}
                  disabled={sending}
                  onChange={(e) => setEmail(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="you@email.com"
                />
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
                  value={message}
                  disabled={sending}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${INPUT_CLASS} resize-none`}
                  placeholder="Tell me about an internship, project, or opportunity..."
                />
              </div>

              <FormStatus status={status.type} message={status.message} />

              <button type="submit" disabled={sending} className={SUBMIT_BTN_CLASS}>
                {sending ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin opacity-75" aria-hidden />
                ) : (
                  <Send className="h-4 w-4 shrink-0 opacity-75" aria-hidden />
                )}
                {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
