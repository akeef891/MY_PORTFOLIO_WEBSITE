/** Offset for fixed navbar so section headings are not hidden */
function getScrollOffset() {
  const header = document.querySelector(".site-header");
  return (header?.offsetHeight ?? 72) + 12;
}

/** Smooth scroll to in-page section — respects reduced motion */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - getScrollOffset());

  window.scrollTo({
    top,
    left: 0,
    behavior: reduced ? "auto" : "smooth",
  });
}
