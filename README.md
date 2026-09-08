# liben.dev

Personal site of Liben Adugna. Live at [www.liben.dev](https://www.liben.dev).

React 19, TypeScript, Vite 7, Tailwind 3, Framer Motion. Deployed on Vercel. The chatbot is a
Vercel serverless function (`api/chat.ts`) in front of Gemini, so the API key never reaches the browser.

## Run locally

```bash
npm install
npm run dev          # site only; /api/chat returns 404 without the Vercel runtime
npx vercel dev       # site + serverless chat endpoint
```

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | Vercel project settings (server-side only) | Read by `api/chat.ts`. `VITE_GEMINI_API_KEY` is accepted as a fallback for older deployments, but prefer the unprefixed name so it is never bundled. |
| `VITE_WEB3FORMS_ACCESS_KEY` | Vercel project settings | Contact form. Web3Forms access keys are public by design. |

See `.env.example`.

## Checks

```bash
npm run check        # eslint + api typecheck + production build
```

## Where things live

- `index.html`: head metadata, JSON-LD, and a static HTML summary inside `#root` that crawlers and
  link previews see before React mounts. Keep it in sync with `src/data`.
- `src/data/`: all copy and data (projects, skills, site content, chatbot context). Change text here, not in components.
- `src/components/sections/`: one file per tab. Tabs are hash-routed (`#resume`, `#portfolio`, ...).
- `api/chat.ts`: chatbot endpoint. Fixed system prompt, input caps, no key exposure.
