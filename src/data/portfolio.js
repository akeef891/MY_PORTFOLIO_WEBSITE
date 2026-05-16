export const personal = {
  name: "Mohammed Akeef K",
  role: "Frontend Developer",
  subtitle: "BCA Student",
  headline: "I build clean, responsive interfaces that recruiters remember.",
  intro:
    "BCA student specializing in React and modern CSS. I ship polished UIs with thoughtful motion, strong typography, and code that scales — from productivity apps to landing pages.",
  email: "akeef@example.com",
  location: "India",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  resumeUrl: "/Mohammed_Akeef_Frontend_Resume.pdf",
  stats: [
    { value: "10+", label: "Projects" },
    { value: "BCA", label: "Student" },
    { value: "2026", label: "Open to hire" },
  ],
};

export const about = {
  paragraphs: [
    "I'm a frontend developer and BCA student who cares about how products feel — not just how they look in a screenshot. I work in React, focus on component architecture, and obsess over spacing, contrast, and micro-interactions.",
    "Whether it's a task manager, dashboard, or marketing site, I aim for interfaces that load fast, read clearly, and guide users without friction.",
  ],
  highlights: [
    { label: "Focus", value: "UI Engineering" },
    { label: "Stack", value: "React · Vite · Tailwind" },
    { label: "Status", value: "Open to opportunities" },
  ],
};

export const skills = [
  {
    category: "Frontend",
    description: "Interfaces, components, and responsive layouts",
    items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Tools",
    description: "Workflow, design, and shipping faster",
    items: ["Vite", "Git & GitHub", "Figma", "VS Code", "npm", "Responsive Design"],
  },
  {
    category: "Backend & Database",
    description: "APIs and data foundations",
    items: ["REST APIs", "JSON", "Local Storage", "Firebase basics", "MySQL basics"],
  },
];

export const projects = [
  {
    id: "task-quest",
    title: "Task Quest",
    description:
      "A productivity web app for managing tasks with priorities, categories, and persistent storage. Built with a focus on clarity, keyboard-friendly flows, and a distraction-free dark interface.",
    tags: ["React", "JavaScript", "CSS", "Local Storage"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    highlight: true,
    image: null,
    accent: "from-emerald-950/80 via-[#0c1210] to-cyan-950/60",
  },
  {
    id: "portfolio",
    title: "Developer Portfolio",
    description:
      "This portfolio — React, Vite, Tailwind, and Framer Motion with a focus on performance, accessibility, and premium visual hierarchy.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    highlight: false,
    image: null,
    accent: "from-zinc-900 via-[#0a0a0c] to-zinc-800",
  },
  {
    id: "landing",
    title: "SaaS Landing Page",
    description:
      "Marketing landing page with scroll-driven sections, gradient hero, and mobile-first layout tuned for conversion.",
    tags: ["React", "Tailwind", "Responsive"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    highlight: false,
    image: null,
    accent: "from-indigo-950/60 via-[#0a0a0c] to-violet-950/40",
  },
];

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
