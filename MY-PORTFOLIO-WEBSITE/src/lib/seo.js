import { personal, projects, skills } from "../data/portfolio";
import { DEFAULT_SITE_URL } from "../../site.config.js";

/** Override with VITE_SITE_URL in Netlify if needed — no trailing slash */
export const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

export const siteMeta = {
  title: "Mohammed Akeef K | Frontend Developer Portfolio",
  shortTitle: "Mohammed Akeef K — Frontend Developer",
  description:
    "Mohammed Akeef K is a frontend developer and BCA student from Tamil Nadu, India. React, TypeScript, and Tailwind portfolio with production apps, GitHub projects, and internship availability.",
  keywords: [
    "Mohammed Akeef K",
    "Mohammed Akeef",
    "Akeef frontend developer",
    "Mohammed Akeef portfolio",
    "frontend developer Tamil Nadu",
    "React developer portfolio",
    "TypeScript developer",
    "Tailwind CSS portfolio",
    "BCA student developer",
    "Krishnagiri developer",
  ].join(", "),
  author: personal.name,
  locale: "en_IN",
  ogImage: `${siteUrl}/og-image.svg`,
  twitterHandle: "",
};

const skillList = skills.groups.flatMap((group) => group.items);

export function buildStructuredData() {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: personal.name,
        alternateName: ["Mohammed Akeef", "Akeef", "Mohammed Akeef K"],
        jobTitle: personal.role,
        description: personal.intro,
        url: siteUrl,
        email: personal.email,
        telephone: `+91${personal.phone}`,
        image: siteMeta.ogImage,
        sameAs: [personal.github, personal.linkedin, personal.instagram],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Krishnagiri",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: personal.college,
        },
        knowsAbout: skillList,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteMeta.shortTitle,
        description: siteMeta.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: `${personal.name} Portfolio`,
        description: siteMeta.description,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        about: { "@id": personId },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: "Portfolio Projects",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: project.title,
            description: project.description,
            applicationCategory: "WebApplication",
            operatingSystem: "Web",
            url: project.liveUrl,
            author: { "@id": personId },
          },
        })),
      },
    ],
  };
}
