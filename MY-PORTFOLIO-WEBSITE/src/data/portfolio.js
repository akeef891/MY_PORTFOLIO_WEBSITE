export const personal = {
  name: "Mohammed Akeef K",
  role: "Frontend Developer",
  subtitle: "BCA Student",
  college: "Arignar Anna College, Krishnagiri",
  location: "Tamil Nadu, India",
  locationShort: "Tamil Nadu, India",
  email: "mdakeef2009@gmail.com",
  phone: "9342903964",
  phoneHref: "tel:+919342903964",
  github: "https://github.com/akeef891",
  linkedin: "https://www.linkedin.com/in/mohammed-akeef-k-3241a1373/",
  resumeUrl: "/Mohammed_Akeef_Frontend_Resume.pdf",
  headline: "I build clean, responsive web interfaces — one project at a time.",
  intro:
    "I'm a first-year BCA student at Arignar Anna College, Krishnagiri, learning frontend development through real projects. I enjoy turning ideas into polished UIs with React, TypeScript, and Tailwind — and I'm actively looking for internships to grow alongside a team.",
  stats: [
    { value: "3+", label: "Projects built" },
    { value: "BCA", label: "Year 1 student" },
    { value: "2026", label: "Open to intern" },
  ],
};

export const about = {
  title: "Learning the craft of frontend development",
  description:
    "A motivated student who learns by building — not just by watching tutorials.",
  paragraphs: [
    "I'm Mohammed Akeef K, a first-year BCA student at Arignar Anna College in Krishnagiri. I got into web development because I liked seeing ideas come alive in the browser — and that curiosity turned into a habit of building small apps, landing pages, and this portfolio.",
    "Most of my learning happens through projects: breaking problems down, searching docs when I'm stuck, and refining layouts until they feel right on mobile and desktop. I'm especially drawn to modern UI work — clear typography, sensible spacing, and interfaces that feel calm to use.",
    "I'm still early in my journey, but I'm serious about it. If you're hiring interns or looking for someone eager to contribute and learn fast, I'd love to connect.",
  ],
  highlights: [
    {
      id: "education",
      label: "Education",
      title: "Bachelor of Computer Applications (BCA)",
      subtitle: "First-year student · Arignar Anna College",
      body: "Focused on frontend development, modern UI engineering, and building responsive web applications with React, Tailwind CSS, JavaScript, and TypeScript.",
      bodySecondary:
        "Actively building real-world projects and improving performance optimization, accessibility, and component-driven architecture skills.",
      tags: ["React", "TypeScript", "Tailwind CSS", "JavaScript"],
      footer: "Working toward a frontend developer role through internships and steady project work.",
    },
    {
      id: "college",
      label: "College",
      title: "Arignar Anna College",
      subtitle: "Krishnagiri, Tamil Nadu",
      body: "A structured BCA program where coursework meets self-driven learning — labs, assignments, and personal projects run alongside classes.",
      bodySecondary:
        "I learn best by applying concepts in the browser: small experiments first, then fuller apps once the fundamentals feel solid.",
      footer: "Balancing academics with hands-on web development every week.",
    },
    {
      id: "location",
      label: "Location",
      title: "Based in Krishnagiri",
      subtitle: "Tamil Nadu, India",
      body: "Open to remote internships, frontend developer opportunities, and collaborative projects.",
      bodySecondary: null,
      tags: null,
      footer: null,
    },
  ],
};

export const skills = {
  description:
    "Technologies I'm using and practicing through coursework and personal projects.",
  groups: [
    {
      category: "Frontend",
      description: "Core languages and UI work",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Responsive Design",
      ],
    },
    {
      category: "Tools & Workflow",
      description: "How I build and ship projects",
      items: ["Git & GitHub", "VS Code", "Firebase", "npm", "Vite"],
    },
    {
      category: "Practices",
      description: "What I focus on while learning",
      items: [
        "Component structure",
        "Mobile-first layout",
        "Clean UI",
        "Git basics",
        "Debugging",
      ],
    },
  ],
};

export const projects = [
  {
    id: "task-quest",
    title: "Task Quest",
    description:
      "A productivity web app for managing tasks with priorities, categories, and local storage. Built to practice React state, component structure, and a focused dark UI.",
    tags: ["React", "JavaScript", "CSS", "Local Storage"],
    liveUrl: "#",
    githubUrl: "https://github.com/akeef891",
    featured: true,
    highlight: true,
    image: null,
    accent: "from-emerald-950/80 via-[#0c1210] to-cyan-950/60",
  },
  {
    id: "portfolio",
    title: "Developer Portfolio",
    description:
      "This site — React, Vite, Tailwind, and Framer Motion. Built to showcase my work and practice premium layout, motion, and responsive design.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "https://github.com/akeef891",
    featured: false,
    highlight: false,
    image: null,
    accent: "from-zinc-900 via-[#0a0a0c] to-zinc-800",
  },
  {
    id: "landing",
    title: "SaaS Landing Page",
    description:
      "A marketing-style landing page with scroll sections and a mobile-first layout — practice for typography, spacing, and conversion-focused structure.",
    tags: ["React", "Tailwind", "Responsive"],
    liveUrl: "#",
    githubUrl: "https://github.com/akeef891",
    featured: false,
    highlight: false,
    image: null,
    accent: "from-indigo-950/60 via-[#0a0a0c] to-violet-950/40",
  },
];

export const contact = {
  title: "Let's connect",
  description:
    "Open to internships, project collaborations, or a quick conversation about frontend work.",
  ctaTitle: "Ready to connect?",
  ctaText:
    "Whether you're hiring interns, need help on a small frontend task, or just want to say hello — my inbox is open.",
  formSubmitUrl: "https://formsubmit.co/ajax/mdakeef2009@gmail.com",
};

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
