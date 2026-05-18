import { personal } from "../../data/portfolio";
import ScrollToTop from "../ui/ScrollToTop";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 sm:pt-10">
      <div className="section-container">
        <div className="flex w-full flex-col-reverse items-stretch gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 text-center text-sm text-zinc-500 sm:text-left">
            <p>
              © {year} {personal.name}
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">Crafted with React & Framer Motion</span>
            </p>
            <p className="text-label mt-2 tracking-wider sm:mt-1.5">
              {personal.role} · {personal.locationShort}
            </p>
          </div>
          <div className="flex justify-end">
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
