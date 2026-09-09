/**
 * Build-time prerender. Runs after `vite build`.
 *
 * For every route it writes dist/<route>/index.html: the built shell with a route-specific
 * <head> (title, description, canonical, Open Graph, JSON-LD) and a static HTML body generated
 * from src/data. Crawlers and link unfurlers get a complete page without JavaScript; React
 * replaces the static body on load.
 *
 * Also emits sitemap.xml, robots.txt, llms.txt and resume.json.
 *
 * No browser involved, so this runs anywhere Node runs, including Vercel's build step.
 */
import { build } from "esbuild";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(new URL("..", import.meta.url).pathname);
const dist = join(root, "dist");
const tmp = join(root, "node_modules", ".prerender");

// Bundle the site model (TypeScript) into a single ESM file Node can import.
await mkdir(tmp, { recursive: true });
const bundlePath = join(tmp, "site.mjs");
await build({
  entryPoints: [join(root, "src/lib/site.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  outfile: bundlePath,
  logLevel: "silent",
});
const site = await import(pathToFileURL(bundlePath).href);
const { SITE, allRoutes, routeMeta, ogImageUrl, projectPath, projectSlug } = site;

// The data modules the static body needs, bundled the same way.
const dataPath = join(tmp, "data.mjs");
await writeFile(
  join(tmp, "data-entry.ts"),
  `export { projects } from "${join(root, "src/data/projects.ts")}";
   export { skills } from "${join(root, "src/data/skills.ts")}";
   export { headline, availability, impactMetrics, now, contactConversion } from "${join(root, "src/data/siteContent.ts")}";
   export { resume } from "${join(root, "src/data/resume.ts")}";
   export { posts } from "${join(root, "src/data/posts.ts")}";`,
);
await build({ entryPoints: [join(tmp, "data-entry.ts")], bundle: true, format: "esm", platform: "node", target: "node18", outfile: dataPath, logLevel: "silent" });
const data = await import(pathToFileURL(dataPath).href);
const { projects, skills, headline, availability, impactMetrics, now, contactConversion, resume, posts } = data;

const template = await readFile(join(dist, "index.html"), "utf8");

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const absolute = (path) => (path.startsWith("http") ? path : `${SITE.origin}${path}`);

const replaceBetween = (html, startMarker, endMarker, replacement) => {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start);
  if (start === -1 || end === -1) throw new Error(`Marker not found: ${startMarker}`);
  const startLineEnd = html.indexOf("\n", start) + 1;
  return html.slice(0, startLineEnd) + replacement + html.slice(end);
};

/* ---------- JSON-LD ---------- */

const person = {
  "@type": "Person",
  "@id": `${SITE.origin}/#person`,
  name: SITE.name,
  alternateName: "Lib1221",
  url: `${SITE.origin}/`,
  image: SITE.portrait,
  email: `mailto:${SITE.email}`,
  jobTitle: "Software Engineer",
  description: routeMeta({ kind: "home" }).description,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Adama Science and Technology University" },
    { "@type": "Organization", name: "Africa to Silicon Valley (A2SV)" },
  ],
  sameAs: [SITE.github, SITE.linkedin, SITE.medium, SITE.leetcode, SITE.codeforces],
  knowsAbout: [
    "Machine Learning",
    "Natural Language Processing",
    "Anomaly Detection",
    "AI Evaluation and Benchmark Design",
    "Terminal-Bench",
    "SWE-bench",
    "Python",
    "Django",
    "Flutter",
    "React",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Docker",
  ],
  knowsLanguage: ["English", "Amharic"],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE.origin}/#website`,
  name: SITE.shortName,
  url: `${SITE.origin}/`,
  inLanguage: "en",
  publisher: { "@id": `${SITE.origin}/#person` },
};

const jsonLdFor = (route, meta) => {
  const graph = [person, website];
  if (route.kind === "home") {
    graph.push({
      "@type": "ProfilePage",
      "@id": `${SITE.origin}/#profilepage`,
      url: `${SITE.origin}/`,
      name: SITE.name,
      dateModified: SITE.updated,
      mainEntity: { "@id": `${SITE.origin}/#person` },
      isPartOf: { "@id": `${SITE.origin}/#website` },
    });
  } else if (route.kind === "project") {
    const p = route.project;
    graph.push({
      "@type": p.repoLink ? "SoftwareSourceCode" : "CreativeWork",
      "@id": `${SITE.origin}${meta.path}#work`,
      name: p.title,
      url: `${SITE.origin}${meta.path}`,
      description: p.description,
      author: { "@id": `${SITE.origin}/#person` },
      image: absolute(p.image),
      keywords: p.technologies.join(", "),
      genre: p.category,
      ...(p.repoLink ? { codeRepository: p.repoLink } : {}),
      ...(p.duration ? { dateCreated: String(p.duration).slice(0, 4) } : {}),
      isPartOf: { "@id": `${SITE.origin}/#website` },
    });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Projects", item: `${SITE.origin}/projects` },
        { "@type": "ListItem", position: 2, name: p.title, item: `${SITE.origin}${meta.path}` },
      ],
    });
  } else if (route.kind === "projects") {
    graph.push({
      "@type": "CollectionPage",
      "@id": `${SITE.origin}/projects#page`,
      url: `${SITE.origin}/projects`,
      name: "Projects by Liben Adugna",
      isPartOf: { "@id": `${SITE.origin}/#website` },
      hasPart: projects.map((p) => ({ "@type": "CreativeWork", name: p.title, url: `${SITE.origin}${projectPath(p)}` })),
    });
  } else {
    graph.push({
      "@type": "WebPage",
      "@id": `${SITE.origin}${meta.path}#page`,
      url: `${SITE.origin}${meta.path}`,
      name: meta.title,
      description: meta.description,
      isPartOf: { "@id": `${SITE.origin}/#website` },
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/</g, "\\u003c");
};

/* ---------- Head ---------- */

const headFor = (route, meta) => {
  const url = `${SITE.origin}${meta.path === "/" ? "/" : meta.path}`;
  const og = ogImageUrl(meta);
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1";
  const type = route.kind === "project" ? "article" : route.kind === "home" ? "profile" : "website";
  return `    <title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${esc(og)}" />
    <meta property="og:image:alt" content="${esc(meta.ogTitle)} - ${esc(SITE.name)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="${SITE.shortName}" />
    <meta property="og:locale" content="en_US" />
${route.kind === "home" ? `    <meta property="profile:first_name" content="Liben" />\n    <meta property="profile:last_name" content="Adugna" />\n` : ""}    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(meta.description)}" />
    <meta name="twitter:image" content="${esc(og)}" />
    <meta name="twitter:image:alt" content="${esc(meta.ogTitle)} - ${esc(SITE.name)}" />
    <script type="application/ld+json">
${jsonLdFor(route, meta)}
    </script>
`;
};

/* ---------- Static body ---------- */

const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const list = (items) => `<ul>\n${items.map((item) => `          <li>${item}</li>`).join("\n")}\n        </ul>`;

const contactLine = () =>
  `<p>${link(`mailto:${SITE.email}`, SITE.email)} · ${link(SITE.github, "GitHub")} · ${link(SITE.linkedin, "LinkedIn")} · ${link("/resume", "Resume")} · ${link("/projects", "Projects")} · ${link("/contact", "Contact")}</p>`;

const projectSummary = (p) =>
  `${link(projectPath(p), p.title)}: ${esc(p.description.split(". ")[0])}. <em>${esc(p.technologies.slice(0, 4).join(", "))}</em>`;

const bodyFor = (route) => {
  switch (route.kind) {
    case "home":
      return `<h1>${esc(SITE.name)}</h1>
        <p>${esc(headline.title)}</p>
        <p>${esc(headline.summary)}</p>
        <p>${esc(availability.hours)}. ${esc(availability.note)}</p>
        ${contactLine()}
        <h2>Selected work</h2>
        ${list(projects.filter((p) => ["smart-gebere", "ai-benchmark-design", "ecommerce-platform", "behavioral-user-segmentation", "transaction-anomaly-detection"].includes(projectSlug(p))).map(projectSummary))}
        <h2>Right now (${esc(now.updated)})</h2>
        ${list(now.items.map(esc))}
        <h2>Experience</h2>
        ${list(resume.experience.map((e) => `${esc(e.role)}, ${esc(e.company)} (${esc(e.period)})`))}
        <h2>Education</h2>
        ${list(resume.education.map((e) => `${esc(e.degree)}, ${esc(e.title)} (${esc(e.period)})`))}
        <h2>Writing</h2>
        ${list(posts.map((post) => link(post.link, post.title)))}`;
    case "projects":
      return `<h1>Projects</h1>
        <p>${esc(routeMeta(route).description)}</p>
        ${contactLine()}
        ${list(projects.map(projectSummary))}`;
    case "project": {
      const p = route.project;
      return `<p>${link("/projects", "All projects")}</p>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.role)} · ${esc(p.category)} · ${esc(p.duration)}${p.isPrivate ? " · client work, code not public" : ""}</p>
        <p>${[p.repoLink && link(p.repoLink, "Source code"), p.liveDemo && link(p.liveDemo, "Live demo"), p.youtubeLink && link(p.youtubeLink, "Walkthrough video")].filter(Boolean).join(" · ") || "&nbsp;"}</p>
        <h2>Problem</h2>
        <p>${esc(p.description)}</p>
        ${p.architecture ? `<h2>How it is built</h2>\n        <p><code>${esc(p.architecture)}</code></p>` : ""}
        ${p.features?.length ? `<h2>What I built</h2>\n        ${list(p.features.map(esc))}` : ""}
        ${p.challenges?.length ? `<h2>Hard parts</h2>\n        ${list(p.challenges.map(esc))}` : ""}
        ${p.impactMetrics?.length ? `<h2>Result</h2>\n        ${list(p.impactMetrics.map(esc))}` : ""}
        <h2>Stack</h2>
        <p>${esc(p.technologies.join(", "))}</p>
        <p>By ${link("/", SITE.name)} · ${link("/contact", "Discuss a similar project")}</p>`;
    }
    case "resume":
      return `<h1>Resume</h1>
        <p>${esc(SITE.name)} · Software engineer · ${esc(availability.hours)}. ${esc(availability.note)}</p>
        <p>${link("/resume.pdf", "Download the PDF")} · ${link("/resume.json", "JSON Resume")}</p>
        <h2>Experience</h2>
        ${resume.experience
          .map(
            (e) => `<h3>${esc(e.role)} · ${esc(e.company)}</h3>
        <p>${esc(e.period)}${e.location ? ` · ${esc(e.location)}` : ""}</p>
        ${list(e.points.map(esc))}`,
          )
          .join("\n        ")}
        <h2>Education</h2>
        ${list(resume.education.map((e) => `${esc(e.degree)}, ${esc(e.title)} (${esc(e.period)}). ${esc(e.details ?? "")}`))}
        <h2>Certifications</h2>
        ${list(resume.certifications.map((c) => `${esc(c.title)}, ${esc(c.issuer)}${c.link ? ` (${link(c.link, "certificate")})` : ""}`))}
        <h2>Skills</h2>
        <p>${esc(skills.map((s) => s.label).join(", "))}</p>
        ${contactLine()}`;
    case "writing":
      return `<h1>Writing</h1>
        <p>${esc(routeMeta(route).description)}</p>
        ${list(posts.map((post) => `${link(post.link, post.title)} (${esc(post.date)}): ${esc(post.summary)}`))}
        ${contactLine()}`;
    case "contact":
      return `<h1>Contact</h1>
        <p>${esc(contactConversion.responseTime)}. ${esc(availability.hours)}.</p>
        <p>Email ${link(`mailto:${SITE.email}`, SITE.email)} · ${link(contactConversion.bookingUrl, "Book a call")} · ${link(SITE.linkedin, "LinkedIn")} · ${link(SITE.github, "GitHub")}</p>
        <h2>Good fits</h2>
        ${list(contactConversion.acceptedProjects.map(esc))}`;
    default:
      return `<h1>Page not found</h1>${contactLine()}`;
  }
};

/* ---------- Write pages ---------- */

const routes = allRoutes();
const written = [];
for (const route of routes) {
  const meta = routeMeta(route);
  let html = replaceBetween(template, "<!-- @route-head:start", "    <!-- @route-head:end -->", headFor(route, meta));
  html = replaceBetween(
    html,
    "<!-- @static:start -->",
    "      <!-- @static:end -->",
    `      <main class="static-shell" id="main-content">\n        ${bodyFor(route)}\n        <noscript><p>This site works best with JavaScript enabled. The essentials are above.</p></noscript>\n      </main>\n`,
  );
  const outPath = meta.path === "/" ? join(dist, "index.html") : join(dist, meta.path, "index.html");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html);
  written.push(meta.path);
}

// 404 page: same shell, noindex, the app renders the not-found view.
{
  const route = { kind: "notfound", path: "/404" };
  const meta = routeMeta(route);
  let html = replaceBetween(template, "<!-- @route-head:start", "    <!-- @route-head:end -->", headFor(route, meta));
  html = replaceBetween(html, "<!-- @static:start -->", "      <!-- @static:end -->", `      <main class="static-shell" id="main-content">\n        ${bodyFor(route)}\n      </main>\n`);
  await writeFile(join(dist, "404.html"), html);
}

/* ---------- sitemap, robots, llms.txt, resume.json ---------- */

const lastmod = SITE.updated;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const meta = routeMeta(route);
    const priority = route.kind === "home" ? "1.0" : route.kind === "project" ? "0.7" : "0.8";
    return `  <url>\n    <loc>${SITE.origin}${meta.path === "/" ? "/" : meta.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);

await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.origin}/sitemap.xml\n`,
);

const llms = `# ${SITE.name}

> ${routeMeta({ kind: "home" }).description}

${headline.summary}

Availability: ${availability.hours}. ${availability.note}
Contact: ${SITE.email} · ${SITE.github} · ${SITE.linkedin}
Updated: ${SITE.updated}

## Pages

- [Home](${SITE.origin}/)
- [Resume](${SITE.origin}/resume) (machine-readable: ${SITE.origin}/resume.json)
- [Projects](${SITE.origin}/projects)
- [Writing](${SITE.origin}/writing)
- [Contact](${SITE.origin}/contact)

## Projects

${projects.map((p) => `- [${p.title}](${SITE.origin}${projectPath(p)}): ${p.description.split(". ")[0]}. Stack: ${p.technologies.join(", ")}.${p.repoLink ? ` Code: ${p.repoLink}` : ""}`).join("\n")}

## Experience

${resume.experience.map((e) => `- ${e.role}, ${e.company} (${e.period}): ${e.points[0]}`).join("\n")}

## Education

${resume.education.map((e) => `- ${e.degree}, ${e.title} (${e.period})`).join("\n")}
`;
await writeFile(join(dist, "llms.txt"), llms);

const jsonResume = {
  $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  basics: {
    name: SITE.name,
    label: "Software Engineer",
    image: SITE.portrait,
    email: SITE.email,
    url: `${SITE.origin}/`,
    summary: `${headline.title} ${headline.summary}`,
    profiles: [
      { network: "GitHub", username: "Lib1221", url: SITE.github },
      { network: "LinkedIn", username: "liben-adugna", url: SITE.linkedin },
      { network: "Medium", username: "adugnaliben65", url: SITE.medium },
    ],
  },
  work: resume.experience.map((e) => ({ name: e.company, position: e.role, ...(e.location ? { location: e.location } : {}), summary: e.period, highlights: e.points })),
  education: resume.education.map((e) => ({ institution: e.title, area: e.degree, studyType: e.degree, endDate: e.period })),
  certificates: resume.certifications.map((c) => ({ name: c.title, issuer: c.issuer, ...(c.link ? { url: c.link } : {}) })),
  skills: ["programming", "ml", "mlops", "datascience", "tools"].map((category) => ({
    name: category,
    keywords: skills.filter((s) => s.category === category).map((s) => s.label),
  })),
  projects: projects.map((p) => ({
    name: p.title,
    description: p.description,
    keywords: p.technologies,
    url: `${SITE.origin}${projectPath(p)}`,
    ...(p.repoLink ? { source: p.repoLink } : {}),
    roles: [p.role],
  })),
  languages: [
    { language: "English", fluency: "Professional" },
    { language: "Amharic", fluency: "Native" },
  ],
  meta: { canonical: `${SITE.origin}/resume.json`, lastModified: SITE.updated, version: "v1.0.0" },
};
await writeFile(join(dist, "resume.json"), JSON.stringify(jsonResume, null, 2) + "\n");

await rm(tmp, { recursive: true, force: true });
console.log(`prerender: ${written.length} pages, sitemap (${routes.length} urls), robots.txt, llms.txt, resume.json, 404.html`);
