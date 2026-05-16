import { memo } from "react";
import { motion } from "framer-motion";
import { springTap } from "../../lib/motion";

const variants = {
  primary:
    "bg-white text-zinc-950 hover:bg-zinc-50 active:bg-zinc-100 shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset] hover:shadow-[0_12px_40px_-16px_rgba(255,255,255,0.35)]",
  outline:
    "border border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/18 hover:bg-white/[0.05] hover:text-white active:bg-white/[0.08]",
  secondary:
    "glass text-zinc-200 hover:border-white/12 hover:bg-white/[0.04]",
  ghost: "text-zinc-500 hover:bg-white/5 hover:text-white",
};

function Button({
  children,
  variant = "primary",
  href,
  download,
  onClick,
  className = "",
  icon: Icon,
  type = "button",
  ...props
}) {
  const classes = `inline-flex w-full min-h-[44px] touch-manipulation items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-[box-shadow,background-color,border-color,color] duration-300 ease-out sm:w-auto ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0 opacity-75" aria-hidden />}
      {children}
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98, y: 0 },
    transition: springTap,
    className: classes,
    ...props,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  );
}

export default memo(Button);
