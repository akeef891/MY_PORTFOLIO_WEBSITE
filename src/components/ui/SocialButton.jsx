import { motion } from "framer-motion";

export default function SocialButton({ href, label, icon: Icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-500 transition-colors hover:border-white/15 hover:text-zinc-200"
    >
      <Icon className="h-[17px] w-[17px]" />
    </motion.a>
  );
}
