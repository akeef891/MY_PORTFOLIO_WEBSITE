import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "../../data/portfolio";
import { scrollToSection } from "../../lib/scroll";
import { ease } from "../../lib/motion";

function NavbarContent({ scrolled, mobileOpen, setMobileOpen, scrollTo }) {
  return (
    <>
      <header
        className={`site-header transition-[padding] duration-300 ${
          scrolled ? "pb-2" : "pb-3"
        }`}
      >
        <div className="section-container pt-[max(0.75rem,env(safe-area-inset-top))]">
          <nav
            className={`navbar-shell ${scrolled ? "navbar-shell--glass" : "px-0 py-2"}`}
          >
            {scrolled && <span className="navbar-glass-layer" aria-hidden />}

            <div className="navbar-glass-content site-header-fade-in">
              <button
                type="button"
                onClick={() => scrollTo("hero")}
                className="font-display min-h-[44px] min-w-[44px] text-left text-lg font-semibold tracking-tight sm:min-h-0 sm:min-w-0"
              >
                <span className="text-accent">MA</span>
                <span className="text-white">.</span>
              </button>

              <ul className="hidden items-center gap-6 md:flex lg:gap-7">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="rounded-md px-1 py-2 text-sm text-zinc-400 transition-colors duration-300 hover:text-zinc-100"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => scrollTo("lets-connect")}
                className="hidden min-h-[44px] rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-200 transition-[border-color,color,background-color] duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white md:inline-flex md:items-center"
              >
                Let&apos;s Talk
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu-overlay fixed inset-0 z-50 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-full max-w-[min(100%,300px)] flex-col border-l border-white/[0.06] bg-[#080809]/95 p-6 pt-[max(5rem,env(safe-area-inset-top))]"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, ease }}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="min-h-[48px] rounded-lg px-4 py-3 text-left text-base font-medium text-zinc-300 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, ease }}
                type="button"
                onClick={() => scrollTo("lets-connect")}
                className="mt-4 min-h-[48px] rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-950"
              >
                Let&apos;s Talk
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = useCallback((id) => {
    scrollToSection(id);
    setMobileOpen(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <NavbarContent
      scrolled={scrolled}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      scrollTo={scrollTo}
    />,
    document.body
  );
}
