import taskQuestImage from "../assets/taskquest-dashboard.png";
import internDashboardImage from "../assets/intern-dashboard.png";

export const personal = {
  name: "Mohammed Akeef K",
  role: "Frontend Developer",
  subtitle: "BCA Student",
  college: "Arignar Anna College, Krishnagiri",
  location: "Tamil Nadu, India",
  locationShort: "Tamil Nadu, India",
  email: "mdakeef2009@gmail.com",
  emailHref: "mailto:mdakeef2009@gmail.com?subject=Portfolio%20inquiry",
  phone: "9342903964",
  phoneHref: "tel:+919342903964",
  github: "https://github.com/akeef891",
  linkedin: "https://www.linkedin.com/in/mohammed-akeef-k-3241a1373/",
  resumeUrl: "/Mohammed_Akeef_Frontend_Resume.pdf",
  headline: "I build clean, responsive web interfaces — one project at a time.",
  intro:
    "I'm a first-year BCA student at Arignar Anna College, Krishnagiri, learning frontend development through real projects. I enjoy turning ideas into polished UIs with React, TypeScript, and Tailwind — and I'm actively looking for internships to grow alongside a team.",
  stats: [
    { value: "2", label: "Production apps" },
    { value: "BCA", label: "Year 1 student" },
    { value: "2026", label: "Open to intern" },
  ],
};

export const about = {
  title: "Learning the craft of frontend development",
  description:
    "A motivated student who learns by building — not just by watching tutorials.",
  intro:
    "I'm Mohammed Akeef K, a first-year BCA student at Arignar Anna College, Krishnagiri. I build for the web because I like seeing ideas take shape in the browser — from small experiments to full projects like this portfolio.",
  journey:
    "Most of what I know comes from doing: breaking problems down, reading docs when I'm stuck, and refining layouts until they feel right on mobile and desktop. I care about clear typography, calm spacing, and interfaces that are easy to use.",
  closing:
    "Still early in my path — serious about growing. Open to internships and teams that value curiosity and clean frontend work.",
  focus: [
    "Frontend Development",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Responsive UI",
  ],
  quickStats: [
    { value: "2", label: "Shipped apps" },
    { value: "React", label: "+ TypeScript" },
    { value: "Frontend", label: "Focused" },
    { value: "UI", label: "Responsive enthusiast" },
  ],
  miniHighlights: [
    { label: "Approach", value: "Learn by building" },
    { label: "Status", value: "Open to intern · 2026" },
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
      "Gamified productivity and task management application built with React, TypeScript, Tailwind CSS, and Firebase. Includes authentication, responsive UI, task organization, and modern frontend architecture.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Framer Motion"],
    features: [
      "Firebase Authentication",
      "Responsive Dashboard",
      "Task Organization",
      "Smooth UI Animations",
    ],
    liveUrl: "https://task-manageer.netlify.app/",
    githubUrl: "https://github.com/akeef891/Task-Quest",
    highlight: true,
    image: taskQuestImage,
    accent: "from-emerald-950/90 via-[#0a1210] to-teal-950/70",
    preview: "task-quest",
  },
  {
    id: "intern-dashboard",
    title: "Intern Dashboard",
    description:
      "Modern internship management dashboard with announcements, leaderboard, event tracking, admin panels, and responsive UI components built for internship workflow management.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Firebase"],
    features: [
      "Dashboard UI",
      "Internship Workflow",
      "Admin Panels",
      "Responsive Design",
    ],
    liveUrl: "https://intern-prohub.netlify.app/",
    githubUrl: "https://github.com/akeef891/Intern-Dashboard",
    highlight: false,
    image: internDashboardImage,
    accent: "from-slate-900/90 via-[#0a0c12] to-indigo-950/60",
    preview: "intern-dashboard",
  },
];

export const contact = {
  title: "Let's connect",
  description:
    "Open to internships, project collaborations, or a quick conversation about frontend work.",
  ctaTitle: "Ready to connect?",
  ctaText:
    "Whether you're hiring interns, need help on a small frontend task, or just want to say hello — my inbox is open.",
  firestoreCollection: "contactMessages",
};

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact-touch", label: "Contact" },
];
