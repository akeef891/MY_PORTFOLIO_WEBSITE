import { personal } from "../../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.05] pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10">
      <div className="section-container flex flex-col items-center justify-between gap-4 text-center text-sm text-zinc-600 sm:flex-row sm:text-left">
        <p>
          © {year} {personal.name}
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">Crafted with React & Framer Motion</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
          Frontend Developer
        </p>
      </div>
    </footer>
  );
}
