/**
 * Site model shared by the browser app and the build-time prerender script.
 * Keep this file free of React and browser globals: scripts/prerender.mjs imports it in Node.
 */
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { headline, availability } from "../data/siteContent";

export const SITE = {
  origin: "https://www.liben.dev",
  name: "Liben Adugna",
  shortName: "liben.dev",
  email: "libenadugna285@gmail.com",
  github: "https://github.com/Lib1221",
  linkedin: "https://www.linkedin.com/in/liben-adugna-6b192a2b9/",
  medium: "https://medium.com/@adugnaliben65",
  leetcode: "https://leetcode.com/libenadugna",
  codeforces: "https://codeforces.com/profile/Hehehc",
  portrait: "https://res.cloudinary.com/dkiuz3gfn/image/upload/v1759949739/liben_fupt3c.jpg",
  updated: "2026-09-08",
} as const;

export type Section = "About" | "Resume" | "Portfolio" | "Blog" | "Contact";

export type Route =
  | { kind: "home" }
  | { kind: "resume" }
  | { kind: "projects" }
  | { kind: "project"; slug: string; project: Project }
  | { kind: "writing" }
  | { kind: "contact" }
  | { kind: "notfound"; path: string };

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const projectSlug = (project: Project): string => project.slug ?? slugify(project.title);

export const projectPath = (project: Project): string => `/projects/${projectSlug(project)}`;

export const findProject = (slug: string): Project | undefined =>
  projects.find((project) => projectSlug(project) === slug);

const sectionPaths: Record<Section, string> = {
  About: "/",
  Resume: "/resume",
  Portfolio: "/projects",
  Blog: "/writing",
  Contact: "/contact",
};

export const pathForSection = (section: Section): string => sectionPaths[section];

export const sectionForRoute = (route: Route): Section => {
  switch (route.kind) {
    case "resume":
      return "Resume";
    case "projects":
    case "project":
      return "Portfolio";
    case "writing":
      return "Blog";
    case "contact":
      return "Contact";
    default:
      return "About";
  }
};

/** Old links used #resume, #portfolio, #blog, #contact. Map them to paths so nothing breaks. */
export const pathForLegacyHash = (hash: string): string | null => {
  const key = hash.replace(/^#\/?/, "").toLowerCase();
  const legacy: Record<string, string> = {
    about: "/",
    resume: "/resume",
    portfolio: "/projects",
    projects: "/projects",
    blog: "/writing",
    writing: "/writing",
    contact: "/contact",
  };
  return legacy[key] ?? null;
};

const trim = (pathname: string): string => {
  const cleaned = pathname.replace(/\/+$/, "").replace(/\.html$/, "");
  return cleaned === "" ? "/" : cleaned;
};

export const parsePath = (pathname: string): Route => {
  const path = trim(pathname);
  if (path === "/" || path === "/index") return { kind: "home" };
  if (path === "/resume") return { kind: "resume" };
  if (path === "/projects" || path === "/portfolio") return { kind: "projects" };
  if (path === "/writing" || path === "/blog") return { kind: "writing" };
  if (path === "/contact") return { kind: "contact" };
  const match = path.match(/^\/projects\/([a-z0-9-]+)$/);
  if (match) {
    const project = findProject(match[1]);
    if (project) return { kind: "project", slug: match[1], project };
  }
  return { kind: "notfound", path };
};

export const pathForRoute = (route: Route): string => {
  switch (route.kind) {
    case "home":
      return "/";
    case "resume":
      return "/resume";
    case "projects":
      return "/projects";
    case "project":
      return `/projects/${route.slug}`;
    case "writing":
      return "/writing";
    case "contact":
      return "/contact";
    case "notfound":
      return route.path;
  }
};

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  /** Short heading for the preview card. */
  ogTitle: string;
  ogSubtitle: string;
  /** Image for the card background, when the page has one. */
  image?: string;
  noindex?: boolean;
};

const clip = (text: string, max = 155): string =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;

export const routeMeta = (route: Route): RouteMeta => {
  switch (route.kind) {
    case "home":
      return {
        path: "/",
        title: "Liben Adugna | Software Engineer, ML Systems and AI Benchmark Design",
        description:
          "Software engineer building ML-backed products with Python, Django and Flutter, and authoring the evaluation benchmarks used to test AI coding agents. Remote, with full overlap with European working hours.",
        ogTitle: "Software Engineer",
        ogSubtitle: headline.title,
      };
    case "resume":
      return {
        path: "/resume",
        title: "Resume | Liben Adugna",
        description:
          "Experience, education and certifications of Liben Adugna: freelance ML engineering since 2022, benchmark task authoring for Terminal-Bench and SWE-bench, full-stack delivery with Django and Flutter.",
        ogTitle: "Resume",
        ogSubtitle: `Software engineer · ${availability.hours} · ${availability.note}`,
      };
    case "projects":
      return {
        path: "/projects",
        title: "Projects | Liben Adugna",
        description: `${projects.length} projects across machine learning, AI evaluation, Flutter and Django: Smart Gebere, benchmark design for AI coding agents, anomaly detection, e-commerce and more.`,
        ogTitle: "Projects",
        ogSubtitle: `${projects.length} projects across ML, AI evaluation, Flutter and Django`,
      };
    case "project":
      return {
        path: `/projects/${route.slug}`,
        title: `${route.project.title} | Liben Adugna`,
        description: clip(route.project.description),
        ogTitle: route.project.title,
        ogSubtitle: `${route.project.role} · ${route.project.technologies.slice(0, 4).join(" · ")}`,
        image: route.project.image,
      };
    case "writing":
      return {
        path: "/writing",
        title: "Writing | Liben Adugna",
        description: "Articles by Liben Adugna on Flutter, Django and Python: connecting a Flutter app to a Django backend, Flutter UI performance, and why Python endures.",
        ogTitle: "Writing",
        ogSubtitle: "Flutter, Django and Python articles",
      };
    case "contact":
      return {
        path: "/contact",
        title: "Contact | Liben Adugna",
        description: `Reach Liben Adugna for ML, AI evaluation and full-stack work. Email ${SITE.email}, book a call, or connect on LinkedIn. Usually replies within 24 hours.`,
        ogTitle: "Contact",
        ogSubtitle: "Usually replies within 24 hours",
      };
    case "notfound":
      return {
        path: route.path,
        title: "Page not found | Liben Adugna",
        description: "That page does not exist.",
        ogTitle: "Not found",
        ogSubtitle: SITE.shortName,
        noindex: true,
      };
  }
};

/** Absolute URL for the preview card of a route. Served by api/og.ts on Vercel. */
export const ogImageUrl = (meta: RouteMeta): string => {
  const params = new URLSearchParams({ title: meta.ogTitle, subtitle: meta.ogSubtitle });
  return `${SITE.origin}/api/og?${params.toString()}`;
};

/** Every prerendered, indexable route. */
export const allRoutes = (): Route[] => [
  { kind: "home" },
  { kind: "projects" },
  ...projects.map((project): Route => ({ kind: "project", slug: projectSlug(project), project })),
  { kind: "resume" },
  { kind: "writing" },
  { kind: "contact" },
];
