/** Shared motion tokens — calm, premium easing */
export const ease = [0.22, 1, 0.36, 1];
export const easeSoft = [0.25, 0.46, 0.45, 0.94];

export const transitionFast = { duration: 0.35, ease };
export const transitionBase = { duration: 0.55, ease };
export const transitionSlow = { duration: 0.7, ease };

export const viewport = { once: true, margin: "-60px" };
export const viewportTight = { once: true, margin: "-40px" };

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...transitionBase, delay: 0.12 + i * 0.06 },
  }),
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
};

/** Instant reveal when user prefers reduced motion */
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.01 } },
};

export const springTap = { type: "spring", stiffness: 400, damping: 28 };
