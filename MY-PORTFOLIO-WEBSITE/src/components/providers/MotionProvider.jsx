import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { ease, transitionBase } from "../../lib/motion";

export default function MotionProvider({ children }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion={reducedMotion ? "always" : "user"}
        transition={transitionBase}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
