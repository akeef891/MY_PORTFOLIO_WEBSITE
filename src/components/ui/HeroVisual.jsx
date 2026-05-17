import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0c] shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-zinc-600" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="ml-2 font-mono text-[10px] text-zinc-600">task-quest.app</span>
        </div>

        <div className="grid grid-cols-4 gap-px bg-white/[0.04] p-4">
          <div className="col-span-1 space-y-2 pr-2">
            {["Inbox", "Today", "Done"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                className={`rounded-md px-2 py-2 text-[10px] ${
                  i === 1 ? "bg-white/[0.06] text-zinc-300" : "text-zinc-600"
                }`}
              >
                {item}
              </motion.div>
            ))}
          </div>
          <div className="col-span-3 space-y-2 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
            {["Ship portfolio hero", "Refine project cards", "Apply to internships"].map(
              (task, i) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  className="flex items-center gap-2 rounded-md border border-white/[0.04] bg-black/20 px-2 py-2"
                >
                  <span
                    className={`h-3 w-3 rounded border ${
                      i === 0 ? "border-cyan-500/50 bg-cyan-500/20" : "border-zinc-700"
                    }`}
                  />
                  <span className="text-[11px] text-zinc-400">{task}</span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute -bottom-3 left-4 rounded-lg border border-white/[0.06] bg-[#0c0c0e] px-3 py-2"
      >
        <p className="font-mono text-[10px] text-zinc-600">Featured build</p>
        <p className="text-xs font-medium text-zinc-300">Task Quest</p>
      </motion.div>
    </motion.div>
  );
}
