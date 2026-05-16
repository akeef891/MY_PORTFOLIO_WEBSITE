/** Signature identity — subtle drifting grid (CSS-only for performance) */
export default function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden motion-reduce:hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 animate-grid-drift opacity-60 motion-reduce:animate-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(94,234,212,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(94,234,212,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 30%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 30%, black, transparent)",
        }}
      />
    </div>
  );
}
