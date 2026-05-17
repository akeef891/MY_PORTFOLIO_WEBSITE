import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { ease } from "../../lib/motion";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.35, ease }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 right-4 z-[100] mx-auto flex max-w-md items-start gap-3 rounded-xl border border-white/[0.1] bg-[#0c0c0e]/95 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:left-auto sm:right-6"
        >
          {type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" aria-hidden />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />
          )}
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-zinc-200">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-zinc-500 transition-colors hover:text-zinc-300"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
