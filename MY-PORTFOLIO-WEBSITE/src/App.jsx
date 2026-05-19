import { Suspense, lazy } from "react";
import GridBackground from "./components/ui/GridBackground";
import GrainOverlay from "./components/ui/GrainOverlay";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";

const About = lazy(() => import("./components/sections/About"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Contact = lazy(() => import("./components/sections/Contact"));

function SectionFallback() {
  return <div className="section-padding min-h-[38vh]" aria-hidden />;
}

export default function App() {
  return (
    <>
      {/* Fixed layers + navbar live OUTSIDE overflow-hidden wrapper (fixes production backdrop-filter) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[#050506]" />
      <GridBackground />
      <GrainOverlay />
      <Navbar />

      <div className="relative min-h-screen overflow-x-hidden bg-[#050506]">
        <main id="main-content">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Skills />
            <Projects />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
