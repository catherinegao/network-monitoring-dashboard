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

Follow [LEARNING_PLAN.md](./LEARNING_PLAN.md). After installing Node.js and Git, create the app in a separate folder with the official Next.js setup command, choosing TypeScript, ESLint, and App Router. Then bring these planning documents into the generated project.

```sh
npx create-next-app@latest network-dashboard-app
cd network-dashboard-app
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
