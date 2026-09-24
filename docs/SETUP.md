# Setup

```bash
npm install
npm run dev          # site only; /api/* is unavailable
npx vercel dev       # site + serverless functions
npm run build        # tsc + vite build + prerender
npm run check        # eslint + api typecheck + full build
```

## Environment variables

| Name | Purpose |
| ---- | ------- |
| `GEMINI_API_KEY` | Server-side key read by `api/chat.ts` |
| `VITE_WEB3FORMS_ACCESS_KEY` | Contact form (public by design) |

Copy `.env.example` to `.env.local` for `vercel dev`.

## Editing content

Change `src/data/*.ts` for projects, resume, posts, and skills; `src/lib/site.ts` for page metadata. Bump `SITE.updated` and `now.updated` when content changes.
