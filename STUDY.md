# Study notes — Explain questions

Personal notes for each **Explain** prompt in [TUTORIALS.md](./TUTORIALS.md). Fill in sections as you complete each day. Use your own words for interviews.

**Location:** `network-monitoring-dashboard/STUDY.md` (repo root, next to `TUTORIALS.md` — not inside `web/`).

---

## Day 1 — Setup

**Question:** What does Next.js add to a React application?

**Notes:**

- **React** is a UI library: components, state, hooks. It does not define URLs, first-load HTML strategy, or production build/deploy by itself.
- **Next.js** is a **framework on top of React** that adds:
  - **File-based routing** (`app/page.tsx` → `/`, nested folders → nested URLs).
  - **Layouts** (`layout.tsx`) shared across routes without re-mounting the shell.
  - **Rendering choices**: server components, static generation, client components—so you can send HTML first and run sensitive logic on the server.
  - **Tooling**: `next dev` (HMR), `next build` + `next start` (optimized bundles, code splitting).
  - **Full-stack patterns**: Route Handlers under `app/api/` for HTTP without a separate backend boilerplate.
- **One-liner:** Next.js keeps React for the UI and adds routing, rendering, APIs, and build pipeline so you ship a product instead of assembling webpack + router + SSR yourself.

**Related (Day 1 step 6 — `package.json` scripts):**

| Script | Purpose |
|--------|---------|
| `dev` | Local development server with fast refresh. |
| `build` | Production compile (static/server output in `.next`). |
| `start` | Serve the production build. |

### CRA / React Router vs this repo (`web/`)

**Typical old stack**

| Piece | What you usually had |
|--------|----------------------|
| Entry | `index.html` + `src/main.tsx` mounting `<App />` |
| Routing | `react-router-dom`: `<BrowserRouter>`, `<Routes>`, `<Route path="..." />` |
| Bundler | `webpack.config.js` or `vite.config.ts` (loaders, aliases, dev server) |
| Scripts | `react-scripts start/build` or `vite` / `vite build` |
| Output | Mostly static JS; SSR was a separate custom setup |

**What you see in `web/` instead**

| Old habit | In this Next app |
|-----------|------------------|
| `webpack.config.js` | **No webpack file** — bundling is inside Next (`next dev` / `next build`). Dev uses Turbopack; output goes to `.next/`. Small overrides only in `next.config.ts`. |
| `index.html` + entry | **No app `index.html`** — document shell is `app/layout.tsx` (`<html>`, `<body>`, fonts, metadata). |
| Route config in code | **File-based routes** under `app/` — e.g. `app/page.tsx` → `/`, later `app/dashboard/page.tsx` → `/dashboard`. Optional typed routes under `.next/.../routes.d.ts` after dev/build. |
| Nested routes + `<Outlet />` | **`layout.tsx` + `{children}`** per URL segment (`app/layout.tsx` wraps all pages). |
| `react-router-dom` in `package.json` | **Not installed** — only `next`, `react`, `react-dom`. |
| `tsc` → `dist/` | **`tsconfig.json`**: `"noEmit": true`, `"plugins": [{ "name": "next" }]` — Next compiles; TypeScript checks types. |
| Webpack `resolve.alias` | **`paths`**: `"@/*": ["./*"]` in `tsconfig.json`. |
| Generic React ESLint | **`eslint.config.mjs`** uses `eslint-config-next` (Core Web Vitals + TypeScript). |
| CSS loaders in webpack | **`postcss.config.mjs`** (Tailwind) + **`app/globals.css`** imported from `layout.tsx`. |

**Mental model**

```text
Before:  index.html → main.tsx → Router config → pages
         webpack/vite entry + config file

Now:     next dev/build reads the app/ tree
         page.tsx / layout.tsx / (later) route.ts = URLs + shell
         next.config.ts = thin override on hidden bundler + server
```

**Day-to-day differences**

1. New page → add a file under `app/`, not a new `<Route>`.
2. One command for dev: `npm run dev` (no separate dev-server config).
3. Build artifact is `.next/` (SSR/RSC-aware), not only CRA-style `build/static/js/main.*.js`.

---

## Day 2 — Routes and layouts

**Question:** How is a layout different from a page?

**Notes:**

_(Complete after Day 2.)_

---

## Day 3 — Server and client components

**Question:** Why does the filter need a client boundary while the summary does not?

**Notes:**

_(Complete after Day 3.)_

---

## Day 4 — Read API

**Question:** Why validate query parameters on the server even when the UI generates them?

**Notes:**

_(Complete after Day 4.)_

---

## Day 5 — Loading and errors

**Question:** What is the difference between an empty result, a missing device, and a failed request?

**Notes:**

_(Complete after Day 5.)_

---

## Day 6 — TanStack Query

**Question:** What is server state, and how is it different from whether a dialog is open?

**Notes:**

_(Complete after Day 6.)_

---

## Day 7 — Search and pagination

**Question:** Why is a query key more than a label?

**Notes:**

_(Complete after Day 7.)_

---

## Day 8 — Caching

**Question:** Can data be visible while a request is in progress?

**Notes:**

_(Complete after Day 8.)_

---

## Day 9 — Persistent edits

**Question:** Why is frontend validation alone insufficient?

**Notes:**

_(Complete after Day 9.)_

---

## Day 10 — Mutations

**Question:** Why does updating the server not automatically update every view?

**Notes:**

_(Complete after Day 10.)_

---

## Day 11 — Refresh and visualization

**Question:** When would polling be sufficient, and when would you choose WebSockets?

**Notes:**

_(Complete after Day 11.)_

---

## Day 12 — Accessibility

**Question:** Which problems did manual testing find that automated checks missed?

**Notes:**

_(Complete after Day 12.)_

---

## Day 13 — Testing

**Question:** What does each test prove, and what does it leave untested?

**Notes:**

_(Complete after Day 13.)_

---

## Day 14 — Performance

**Question:** How did you distinguish an API delay from expensive rendering?

**Notes:**

_(Complete after Day 14.)_

---

## Day 15 — Portfolio

**Question:** What would you change before using this for real customers?

**Notes:**

_(Complete after Day 15.)_
