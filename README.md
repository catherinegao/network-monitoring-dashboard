# Network Monitoring Dashboard

A personal learning project for Next.js App Router, TypeScript, and TanStack Query. Uses fictional network devices and metrics.

**Status:** Planning. Application implementation has not started.

## Planned features

- Dashboard summary and device detail routes
- Searchable, paginated device table
- Edit-device form with validation and cache invalidation
- Background status refresh, loading, empty, and error states
- Accessible controls and responsive layouts
- Focused automated tests and a small D3 visualization

## Architecture to practice

Use Server Components for the initial summary and Client Components with TanStack Query for interactive device data. Keep modal and form UI state local. Query keys must include search and pagination parameters. Next.js server caching and TanStack Query's browser cache are separate; document how each is refreshed.

Start with fixtures behind GET route handlers. Before implementing edits, choose a persistent development database; do not rely on a process-global array for deployed persistence. Polling is sufficient for the first version; WebSockets are an optional extension.

## Start here

Start with [Day 1 of the daily tutorials](./TUTORIALS.md#day-1--setup). Use [LEARNING_PLAN.md](./LEARNING_PLAN.md) to track completion. Each tutorial includes steps, examples, checks, and interview questions.

Clone this repository, then scaffold the application inside a `web/` subfolder. This preserves the existing learning documents. Choose TypeScript, ESLint, App Router, a `src/` directory, and the default import alias.

```sh
git clone https://github.com/catherinegao/network-monitoring-dashboard.git
cd network-monitoring-dashboard
npx create-next-app@latest web
cd web
npm run dev
```

When reaching the data-fetching milestone:

```sh
npm install @tanstack/react-query @tanstack/react-query-devtools
```

Commit the generated package lockfile. Keep API credentials server-side and environment files out of Git.

## Learning resources

- https://nextjs.org/learn/dashboard-app
- https://nextjs.org/docs/app/getting-started/fetching-data
- https://tanstack.com/query/latest/docs/framework/react/overview

## Portfolio evidence to add when completed

Screenshots, run instructions, test results, a demo link, architecture decisions, limitations, and a brief explanation of what I implemented and learned. The planned features above are not completed accomplishments.
