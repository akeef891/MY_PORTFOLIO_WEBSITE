import { memo } from "react";
import { motion } from "framer-motion";
import { hoverLift, springTap } from "../../lib/motion";

const variants = {
  primary:
    "bg-white text-zinc-950 hover:bg-zinc-50 active:bg-zinc-100 shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset] hover:shadow-[0_10px_32px_-14px_rgba(255,255,255,0.28)]",
  outline:
    "border border-white/[0.12] bg-white/[0.03] text-zinc-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:bg-white/[0.08]",
  secondary:
    "glass text-zinc-200 hover:border-white/14 hover:bg-white/[0.05]",
  ghost: "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100",
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
  disabled = false,
  ...props
}) {
  const classes = `inline-flex w-full min-h-[44px] touch-manipulation items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-[box-shadow,background-color,border-color,color,opacity] duration-300 ease-out sm:w-auto disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0 opacity-75" aria-hidden />}
      {children}
    </>
  );

  if (href) {
    const isHttp = href.startsWith("http://") || href.startsWith("https://");
    const isMailOrTel = href.startsWith("mailto:") || href.startsWith("tel:");

    if (isMailOrTel) {
      return (
        <a
          href={disabled ? undefined : href}
          className={classes}
          aria-disabled={disabled || undefined}
          onClick={
            disabled
              ? (e) => e.preventDefault()
              : undefined
          }
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <motion.a
        href={disabled ? undefined : href}
        download={download || undefined}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        whileHover={disabled ? undefined : hoverLift}
        whileTap={disabled ? undefined : { scale: 0.98, y: 0 }}
        transition={springTap}
        className={classes}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : hoverLift}
      whileTap={disabled ? undefined : { scale: 0.98, y: 0 }}
      transition={springTap}
      className={classes}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {content}
    </motion.button>
  );
}

export default memo(Button);
