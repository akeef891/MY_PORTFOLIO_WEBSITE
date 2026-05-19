import { memo } from "react";
import { motion } from "framer-motion";
import { ease } from "../../lib/motion";

/** Handcrafted preview art — matches portfolio dark/teal aesthetic */
function TaskQuestPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease }}
      className="relative mx-auto w-full max-w-[320px] p-4 sm:max-w-[360px] sm:p-6"
    >
      <motion.div
        className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0c0e10]/95 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.4, ease }}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2.5 sm:px-4">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500/50" />
            <span className="h-2 w-2 rounded-full bg-amber-500/50" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
          </div>
          <span className="font-mono text-[9px] text-teal-400/80 sm:text-[10px]">Task Quest</span>
        </div>
        <motion.div className="space-y-2 p-3 sm:p-4">
          <motion.div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-zinc-300 sm:text-xs">Today&apos;s quests</span>
            <span className="rounded-full bg-teal-500/15 px-2 py-0.5 font-mono text-[9px] text-teal-300">
              Lv. 4
            </span>
          </motion.div>
          {[
            { label: "Ship portfolio section", done: true },
            { label: "Refine mobile layout", done: false },
            { label: "Firebase auth flow", done: false },
          ].map((task, i) => (
            <motion.div
              key={task.label}
              className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2 sm:px-3"
              style={{ opacity: 1 - i * 0.08 }}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  task.done
                    ? "border-teal-500/40 bg-teal-500/20 text-teal-300"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {task.done && <span className="text-[8px] leading-none">✓</span>}
              </span>
              <span
                className={`truncate text-[10px] sm:text-[11px] ${
                  task.done ? "text-zinc-500 line-through" : "text-zinc-300"
                }`}
              >
                {task.label}
              </span>
            </motion.div>
          ))}
          <motion.div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-teal-500/80 to-emerald-500/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function InternDashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease }}
      className="relative mx-auto w-full max-w-[320px] p-4 sm:max-w-[360px] sm:p-6"
    >
      <motion.div
        className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0b0d12]/95 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.4, ease }}
      >
        <motion.div className="flex border-b border-white/[0.06]">
          <motion.div className="w-[28%] space-y-2 border-r border-white/[0.06] bg-white/[0.02] p-2 sm:p-2.5">
            {["Home", "Events", "Admin"].map((item, i) => (
              <motion.div
                key={item}
                className={`rounded-md px-2 py-1 text-[8px] sm:text-[9px] ${
                  i === 0 ? "bg-indigo-500/20 text-indigo-200" : "text-zinc-500"
                }`}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="flex-1 p-2.5 sm:p-3">
            <p className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 sm:text-[9px]">
              Intern Hub
            </p>
            <motion.div className="mt-2 grid grid-cols-2 gap-1.5 sm:gap-2">
              {[
                { label: "Active", value: "24" },
                { label: "Events", value: "8" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5"
                >
                  <p className="text-[8px] text-zinc-500 sm:text-[9px]">{stat.label}</p>
                  <p className="text-sm font-semibold text-zinc-200 sm:text-base">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="mt-2 space-y-1">
              {[1, 2].map((row) => (
                <motion.div
                  key={row}
                  className="h-2 rounded bg-white/[0.04]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * row, duration: 0.5, ease }}
                  style={{ transformOrigin: "left" }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ProjectPreviewArt({ variant }) {
  if (variant === "task-quest") return <TaskQuestPreview />;
  if (variant === "intern-dashboard") return <InternDashboardPreview />;
  return null;
}

export default memo(ProjectPreviewArt);
