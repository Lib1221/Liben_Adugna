# liben.dev

Personal site of Liben Adugna. Live at [www.liben.dev](https://www.liben.dev).

React 19, TypeScript, Vite 7, Tailwind 3, Framer Motion. Deployed on Vercel.

## How it works

- **Real URLs.** `/`, `/resume`, `/projects`, `/projects/<slug>`, `/writing`, `/contact`. Old `#resume` style links redirect to their path. Routing is a small history-based hook in `src/lib/useRoute.ts`; the route model and page metadata live in `src/lib/site.ts`.
- **Prerendered pages.** `scripts/prerender.mjs` runs after `vite build` and writes `dist/<route>/index.html` for every route with its own `<head>` (title, description, canonical, Open Graph, JSON-LD) and a static HTML body generated from `src/data`. Crawlers and link previews get complete pages without JavaScript; React takes over in the browser. The script also emits `sitemap.xml`, `robots.txt`, `llms.txt` and `resume.json`.
- **Preview cards.** `api/og.ts` is an Edge function that renders a 1200x630 card per page (`/api/og?title=…&subtitle=…`). Each prerendered page points its `og:image` at it.
- **Chatbot.** `api/chat.ts` is a serverless function in front of Gemini. The API key never reaches the browser.
- **Code splitting.** The landing view ships first; Resume, Projects, project pages, Writing, Contact and the chatbot are separate chunks loaded on demand. Vendor code (React, motion, icons) is split for long-lived caching.

## Run locally

```bash
npm install
npm run dev          # site only; /api/* returns 404 without the Vercel runtime
npx vercel dev       # site + serverless functions (chat, og)
npm run build        # tsc + vite build + prerender into dist/
npm run check        # eslint + api typecheck + full build
```

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Vercel project settings (server-side only) | Read by `api/chat.ts`. `VITE_GEMINI_API_KEY` is accepted as a fallback for older deployments, but prefer the unprefixed name so it is never bundled. |
| `VITE_WEB3FORMS_ACCESS_KEY` | Vercel project settings | Contact form. Web3Forms access keys are public by design. |

See `.env.example`.

## Where to change things

| Want to change | Edit |
| --- | --- |
| Projects, case studies, slugs | `src/data/projects.ts` |
| Experience, education, certifications | `src/data/resume.ts` |
| Headline, availability, "Right now", metrics | `src/data/siteContent.ts` |
| Articles | `src/data/posts.ts` |
| Skills | `src/data/skills.ts` (chatbot) and `src/components/sections/skills.tsx` (grid with icons) |
| Page titles and descriptions | `src/lib/site.ts` (`routeMeta`) |
| Static crawlable HTML per page | `scripts/prerender.mjs` (`bodyFor`) |
| Preview card design | `api/og.ts` |

Bump `SITE.updated` in `src/lib/site.ts` and `now.updated` in `src/data/siteContent.ts` when content changes; both are shown to visitors and crawlers.

## Deployment notes

`vercel.json` sets clean URLs, an SPA fallback for client-side navigation, immutable caching for hashed assets, and security headers. Directory index files from the prerender take precedence over the fallback, so every route serves its own prerendered HTML on first load.
