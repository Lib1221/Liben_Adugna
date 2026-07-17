# AGENTS.md

## Cursor Cloud specific instructions

This is a React 19 + Vite 7 + TypeScript portfolio website (single-page app, no backend or database).

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite Dev Server | `npm run dev` | 5173 | Only service needed; use `--host 0.0.0.0` for network access |

### Key commands

- **Lint:** `npm run lint` (ESLint; the repo has pre-existing lint errors — do not treat them as blockers)
- **Build:** `npm run build` (runs `tsc -b && vite build`; the repo has pre-existing TS errors that block `tsc -b` but do not affect the dev server)
- **Dev server:** `npm run dev`
- **Preview prod build:** `npm run preview`

### Gotchas

- The `npm run build` script will fail due to pre-existing TypeScript errors (unused variables, type-only imports). The Vite dev server works fine because it uses esbuild which ignores type errors.
- The AI chatbot feature requires a `VITE_GEMINI_API_KEY` environment variable in `.env.local`. Without it, the site still works but the chatbot button won't function.
- No automated test suite exists in this project (`package.json` has no test script).
- Node.js 20+ is required (uses ES module syntax and modern dependencies).
