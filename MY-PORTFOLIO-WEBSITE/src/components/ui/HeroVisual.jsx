import { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STACK = [
  { label: "React", accent: "text-sky-300", ring: "border-sky-400/25 hover:border-sky-400/40" },
  { label: "TypeScript", accent: "text-blue-300", ring: "border-blue-400/25 hover:border-blue-400/40" },
  { label: "Tailwind", accent: "text-cyan-300", ring: "border-cyan-400/25 hover:border-cyan-400/40" },
  { label: "Firebase", accent: "text-amber-300", ring: "border-amber-400/25 hover:border-amber-400/40" },
  {
    label: "Framer Motion",
    accent: "text-violet-300",
    ring: "border-violet-400/25 hover:border-violet-400/40",
  },
];

/** Syntax tokens per line — rendered progressively by the typewriter */
const SNIPPET_LINES = [
  [
    { c: "text-zinc-400", t: "const " },
    { c: "text-teal-300", t: "ui" },
    { c: "text-zinc-400", t: " = " },
    { c: "text-violet-300", t: "craft" },
    { c: "text-zinc-400", t: "({ " },
    { c: "text-amber-200", t: "motion" },
    { c: "text-zinc-400", t: ": " },
    { c: "text-emerald-300", t: "true" },
    { c: "text-zinc-400", t: " });" },
  ],
  [
    { c: "text-zinc-400", t: "await " },
    { c: "text-teal-300", t: "deploy" },
    { c: "text-zinc-400", t: "({ " },
    { c: "text-amber-200", t: "env" },
    { c: "text-zinc-400", t: ": " },
    { c: "text-emerald-300", t: "'production'" },
    { c: "text-zinc-400", t: " });" },
  ],
  [
    { c: "text-zinc-400", t: "export default " },
    { c: "text-teal-300", t: "function" },
    { c: "text-zinc-400", t: " " },
    { c: "text-violet-300", t: "Ship" },
    { c: "text-zinc-400", t: "() { " },
    { c: "text-zinc-400", t: "return " },
    { c: "text-amber-200", t: "<App />" },
    { c: "text-zinc-400", t: "; }" },
  ],
];

const HOLD_AFTER_TYPE_MS = 1500;
const HOLD_AFTER_ERASE_MS = 320;
const REDUCED_CYCLE_MS = 4000;

function lineLength(tokens) {
  return tokens.reduce((n, tok) => n + tok.t.length, 0);
}

function typingDelay(char, prevChar) {
  if (char === " ") return 26;
  if (";),}".includes(char)) return 90;
  if (prevChar === " " && /[a-z<]/.test(char)) return 48;
  return 36;
}

function renderVisibleTokens(tokens, visibleCount) {
  let left = visibleCount;
  const nodes = [];
  for (let i = 0; i < tokens.length && left > 0; i += 1) {
    const { c, t } = tokens[i];
    const slice = t.slice(0, left);
    if (slice) nodes.push(<span key={i} className={c}>{slice}</span>);
    left -= t.length;
  }
  return nodes;
}

/** Lightweight typewriter cycle: type → hold → erase → next line */
function useTypewriter(lines, reducedMotion) {
  const lengths = useMemo(() => lines.map(lineLength), [lines]);
  const lineTexts = useMemo(
    () => lines.map((tokens) => tokens.map((tok) => tok.t).join("")),
    [lines],
  );
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) {
      setCharIndex(lengths[0] ?? 0);
      setLineIndex(0);
      setDeleting(false);
    }
  }, [reducedMotion, lengths]);

  useEffect(() => {
    if (reducedMotion) {
      timerRef.current = window.setInterval(() => {
        setLineIndex((prev) => {
          const next = (prev + 1) % lines.length;
          setCharIndex(lengths[next] ?? 0);
          setDeleting(false);
          return next;
        });
      }, REDUCED_CYCLE_MS);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }

    const full = lengths[lineIndex] ?? 0;

    const schedule = (ms, fn) => {
      timerRef.current = window.setTimeout(fn, ms);
    };

    if (!deleting && charIndex < full) {
      const next = charIndex + 1;
      const text = lineTexts[lineIndex];
      const delay = typingDelay(text[next - 1], text[next - 2]);
      schedule(delay, () => setCharIndex(next));
    } else if (!deleting && charIndex >= full) {
      schedule(HOLD_AFTER_TYPE_MS, () => setDeleting(true));
    } else if (deleting && charIndex > 0) {
      schedule(18, () => setCharIndex((n) => n - 1));
    } else if (deleting && charIndex === 0) {
      schedule(HOLD_AFTER_ERASE_MS, () => {
        setDeleting(false);
        setLineIndex((prev) => (prev + 1) % lines.length);
      });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reducedMotion, lines, lengths, lineTexts, lineIndex, charIndex, deleting]);

  return { lineIndex, charIndex };
}

const WORKFLOW = [
  { id: "design", label: "Design" },
  { id: "build", label: "Build" },
  { id: "deploy", label: "Deploy" },
];

const EASE = [0.22, 1, 0.36, 1];

function TerminalHeader() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.025] px-4 py-2.5 sm:px-5 sm:py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-red-500/50" />
          <span className="h-2 w-2 rounded-full bg-amber-500/50" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
        </span>
        <span className="truncate font-mono text-[10px] tracking-tight text-zinc-400">
          frontend-engine · vite
        </span>
      </div>
      <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2 py-0.5 font-mono text-[9px] text-emerald-300 sm:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
        live
      </span>
    </div>
  );
}

const LiveCodePanel = memo(function LiveCodePanel({ reducedMotion }) {
  const { lineIndex, charIndex } = useTypewriter(SNIPPET_LINES, reducedMotion);
  const lineNum = lineIndex + 12;

  return (
    <div className="hero-visual-glass-inset overflow-hidden rounded-lg">
      <div className="flex border-b border-white/[0.07] bg-black/20">
        <span className="border-b-2 border-teal-500/50 px-3 py-2 font-mono text-[9px] text-zinc-200 sm:text-[10px]">
          ship.tsx
        </span>
        <span className="px-3 py-2 font-mono text-[9px] text-zinc-500 sm:text-[10px]">layout.tsx</span>
      </div>

      <div className="flex min-h-[4.25rem] sm:min-h-[4.5rem]">
        <div
          className="hidden w-9 shrink-0 select-none border-r border-white/[0.06] bg-black/25 py-3 pr-2 text-right font-mono text-[9px] leading-[1.65] text-zinc-500 sm:block"
          aria-hidden
        >
          {[lineNum - 1, lineNum, lineNum + 1].map((n) => (
            <div key={n} className={n === lineNum ? "text-zinc-400" : ""}>
              {n}
            </div>
          ))}
        </div>

        <div className="relative min-w-0 flex-1 px-3 py-3 sm:px-3.5">
          <p
            className="font-mono text-[10px] leading-[1.65] sm:text-[11px]"
            aria-live="polite"
            aria-atomic="true"
          >
            {renderVisibleTokens(SNIPPET_LINES[lineIndex], charIndex)}
            <span className="hero-typewriter-cursor ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[1px] bg-teal-400/90" />
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] bg-black/15 px-3 py-2 sm:px-3.5">
        <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 sm:text-[9px]">
          scripts
        </span>
        {["dev", "build", "preview"].map((cmd, i) => (
          <span
            key={cmd}
            className={`rounded-md border px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider transition-colors duration-200 sm:text-[9px] ${
              i === 1
                ? "border-teal-500/30 bg-teal-500/[0.1] text-teal-200"
                : "border-white/[0.08] bg-white/[0.03] text-zinc-400"
            }`}
          >
            {cmd}
          </span>
        ))}
      </div>
    </div>
  );
});

function TechStack() {
  return (
    <div>
      <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
        Tech stack
      </p>
      <div className="flex flex-wrap gap-2">
        {STACK.map((item) => (
          <span
            key={item.label}
            className={`rounded-md border bg-[#141419]/90 px-2.5 py-1.5 font-mono text-[9px] text-zinc-200 transition-[border-color,background-color] duration-200 sm:px-3 sm:text-[10px] ${item.ring}`}
          >
            <span className={item.accent}>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function WorkflowBar() {
  return (
    <div className="hero-visual-glass-inset flex flex-col gap-2.5 rounded-lg px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-3.5">
      <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
        Pipeline
      </p>
      <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
        {WORKFLOW.map((step, i) => (
          <div key={step.id} className="flex items-center gap-1.5">
            <span
              className={`rounded-md border px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider transition-colors duration-200 sm:text-[9px] ${
                i === 1
                  ? "border-teal-500/35 bg-teal-500/[0.12] text-teal-200"
                  : "border-white/[0.08] bg-white/[0.03] text-zinc-400"
              }`}
            >
              {step.label}
            </span>
            {i < WORKFLOW.length - 1 && (
              <span className="text-[8px] text-zinc-600" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

/**
 * Minimal premium hero visual — code panel, static stack, pipeline.
 * Fade/slide on mount only; no continuous or rotating motion.
 */
export default function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
      className="group/visual relative w-full max-w-full"
    >
      <div
        className="hero-visual-panel relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#12121a] via-[#101016] to-[#0e0e14] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/[0.05] backdrop-blur-md transition-[border-color,box-shadow] duration-300 ease-out group-hover/visual:border-white/[0.14] group-hover/visual:shadow-[0_20px_52px_-18px_rgba(0,0,0,0.7)]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden
        />

        <TerminalHeader />

        <motion.div
          className="relative space-y-4 px-4 py-4 sm:space-y-5 sm:px-5 sm:py-5"
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <motion.div variants={reduce ? undefined : fadeItem}>
            <LiveCodePanel reducedMotion={reduce} />
          </motion.div>

          <motion.div variants={reduce ? undefined : fadeItem}>
            <TechStack />
          </motion.div>

          <motion.div variants={reduce ? undefined : fadeItem}>
            <WorkflowBar />
          </motion.div>

          <motion.p
            variants={reduce ? undefined : fadeItem}
            className="font-mono text-[10px] leading-relaxed text-zinc-400 sm:text-[11px]"
          >
            Precision UI — built for clarity and performance.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
