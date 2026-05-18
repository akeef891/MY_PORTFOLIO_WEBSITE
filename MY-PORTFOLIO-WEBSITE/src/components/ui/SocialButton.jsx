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
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-zinc-400 transition-[border-color,color,background-color] duration-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-zinc-100"
    >
      <Icon className="h-[17px] w-[17px]" />
    </motion.a>
  );
}
