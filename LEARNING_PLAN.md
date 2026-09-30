# Next.js and TanStack Query learning schedule

Plan: 15 sessions over three weeks, five sessions per week, 60–90 minutes per session. Start on any day; use weekends as optional catch-up. This is a study plan, not scheduled reminders.

Each session: 15–20 minutes reading, 40–60 minutes building, 10 minutes testing and recording what you learned. If a task takes longer, finish it before advancing.

Follow the [step-by-step daily tutorials](./TUTORIALS.md) alongside this checklist. The repository is already created; Day 1 continues with local setup.

## Week 1 — Next.js foundations

- [ ] **Day 1: Setup.** Create the GitHub repository, install Node.js and Git if needed, scaffold a TypeScript App Router app, and run it locally. Done when you can edit a heading and see the change. [Open tutorial](./TUTORIALS.md#day-1--setup).
- [ ] **Day 2: Routing.** Read the tutorial's layouts/pages and navigation material. Build dashboard and device-detail routes with a shared navigation layout. Done when links and direct URL visits work. [Open tutorial](./TUTORIALS.md#day-2--routes-and-layouts).
- [ ] **Day 3: Server/client boundaries.** Render a summary on the server and a small interactive filter on the client. Done when you can explain why each component belongs on its side of the boundary. [Open tutorial](./TUTORIALS.md#day-3--server-and-client-components).
- [ ] **Day 4: Read API.** Define a typed Device model and fictional fixtures. Add a GET route handler with validated search/page parameters. Done when the endpoint returns predictable results, including empty results and invalid input responses. [Open tutorial](./TUTORIALS.md#day-4--read-api).
- [ ] **Day 5: Loading and failures.** Add loading, error, and not-found handling. Simulate slow requests and failures. Done when the user sees understandable states rather than a blank screen. [Open tutorial](./TUTORIALS.md#day-5--loading-and-errors).

## Week 2 — TanStack Query and changes to data

- [ ] **Day 6: Query basics.** Add a stable QueryClient provider and fetch devices with useQuery. Check response.ok in the fetcher. Done when loading, success, and failure are handled. [Open tutorial](./TUTORIALS.md#day-6--tanstack-query).
- [ ] **Day 7: Search and pagination.** Put search and page in query keys; reset the page when search changes. Done when quickly switching filters does not show results for the wrong filter. [Open tutorial](./TUTORIALS.md#day-7--search-and-pagination).
- [ ] **Day 8: Cache behavior.** Experiment with staleTime, background refetching, and Query Devtools. Done when you can explain fresh versus stale data and why a request did or did not run. [Open tutorial](./TUTORIALS.md#day-8--caching).
- [ ] **Day 9: Edit and persist.** Choose a development database, seed fictional devices, and implement a validated update endpoint and accessible edit form. Done when an edit survives a reload. Budget an extra session if database setup is new. [Open tutorial](./TUTORIALS.md#day-9--persistent-edits).
- [ ] **Day 10: Mutations.** Use useMutation; invalidate affected list and detail queries after success. Show pending and failure feedback. Done when saved changes appear without manually reloading. Optimistic updates are optional after the basic flow works. [Open tutorial](./TUTORIALS.md#day-10--mutations).

## Week 3 — Quality and portfolio

- [ ] **Day 11: Monitoring experience.** Add a modest polling interval and last-updated time. Add one simple D3 chart using fictional metrics, with a text summary. Done when refreshes preserve usable navigation and focus. [Open tutorial](./TUTORIALS.md#day-11--refresh-and-visualization).
- [ ] **Day 12: Accessibility and responsive layout.** Test keyboard operation, labels, focus after form submission, contrast, and narrow layouts. Done when all primary workflows work without a mouse. [Open tutorial](./TUTORIALS.md#day-12--accessibility).
- [ ] **Day 13: Meaningful tests.** Use a familiar test stack. Cover API failure feedback, search/pagination, and successful/failed edits. Done when tests catch a deliberately introduced bug in one of these flows. [Open tutorial](./TUTORIALS.md#day-13--testing).
- [ ] **Day 14: Performance and review.** Profile the table; check production build and types. Record an actual bottleneck and improvement if found; avoid invented metrics. Explain caching and persistence limitations in the README. [Open tutorial](./TUTORIALS.md#day-14--performance).
- [ ] **Day 15: Publish evidence.** Add screenshots, setup instructions, test commands, architecture notes, and optionally a deployed demo. Review the repository contents before making it public. Add only completed work to your resume. [Open tutorial](./TUTORIALS.md#day-15--portfolio).

## Interview readiness

Explain without relying on AI-generated text:

1. Which components run on the server and which are interactive client components?
2. How do Next.js data caching and TanStack Query caching differ?
3. Why do query keys include search and page?
4. What happens after an edit succeeds or fails?
5. How did you test slow networks, failures, keyboard access, and small screens?

## Resume wording

While learning: “Professional development: Next.js App Router and TanStack Query — personal dashboard project in progress.”

After implementation, adapt to completed features: “Built a personal Next.js/TypeScript network dashboard with server-rendered summaries and TanStack Query for search, pagination, background refresh, and cache invalidation after updates.”

## Learning log

After every session record: date, completed work, one decision and its reason, one issue you debugged, and the next step. AI assistance is welcome, but review each change and explain its behavior yourself.
