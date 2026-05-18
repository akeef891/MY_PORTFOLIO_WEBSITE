/** Static hero backdrop — CSS-only pulse (no Framer infinite loops) */
export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#050506]" />

      <div
        className="hero-glow-pulse absolute left-[10%] top-[15%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full motion-reduce:opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute right-0 top-0 h-full w-1/3 opacity-40"
        style={{
          background:
            "linear-gradient(270deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
        }}
      />

      <div className="absolute -right-24 bottom-0 h-px w-[40%] bg-gradient-to-l from-teal-500/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050506] to-transparent" />
    </div>
  );
}
