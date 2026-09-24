# Architecture

Source of [liben.dev](https://www.liben.dev): a React 19 + TypeScript single-page app with build-time prerendering and two Vercel serverless functions.

## Pieces

| Area | Location | Notes |
| ---- | -------- | ----- |
| Routing | `src/lib/useRoute.ts`, `src/lib/site.ts` | History-based router hook; `routeMeta` holds titles and descriptions per route. Legacy `#resume` links redirect to real paths. |
| Content | `src/data/*.ts` | `projects.ts`, `resume.ts`, `siteContent.ts`, `posts.ts`, `skills.ts`. All copy is data, not JSX. |
| UI | `src/components/` | Section components (hero, services, projects, resume, writing, contact) and shared primitives. Framer Motion for motion. |
| Services | `src/services/`, `src/utils/` | Client helpers for the chat endpoint and contact form. |
| Prerender | `scripts/prerender.mjs` | Runs after `vite build`; writes `dist/<route>/index.html` with head tags, Open Graph, JSON-LD, plus `sitemap.xml`, `robots.txt`, `llms.txt`, `resume.json`. |
| Edge/API | `api/og.ts`, `api/chat.ts` | OG image generator (1200x630) and a Gemini-backed chatbot proxy; the API key stays server-side. |

## Build output

```
vite build -> dist/ (hashed chunks, vendor split)
prerender  -> dist/<route>/index.html for every route
vercel     -> clean URLs, SPA fallback, immutable asset caching, security headers
```

The landing view ships first; Resume, Projects, Writing, Contact, and the chatbot load as separate chunks.
