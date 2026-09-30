# Daily tutorials: Network Monitoring Dashboard

These guided exercises build on your React/TypeScript experience. Each day includes a goal, instructions, a check, and a question to prepare for interviews. Budget 60–90 minutes per session; database setup and testing may take two sessions. Finish a working checkpoint before moving on.

**Status:** These are learning instructions, not an implemented or tested application. Examples illustrate the stated step; you will connect them as you build. Use fictional data only.

## Contents

1. [Setup](#day-1--setup)
2. [Routes and layouts](#day-2--routes-and-layouts)
3. [Server and client components](#day-3--server-and-client-components)
4. [Read API](#day-4--read-api)
5. [Loading and errors](#day-5--loading-and-errors)
6. [TanStack Query](#day-6--tanstack-query)
7. [Search and pagination](#day-7--search-and-pagination)
8. [Caching](#day-8--caching)
9. [Persistent edits](#day-9--persistent-edits)
10. [Mutations](#day-10--mutations)
11. [Refresh and visualization](#day-11--refresh-and-visualization)
12. [Accessibility](#day-12--accessibility)
13. [Testing](#day-13--testing)
14. [Performance](#day-14--performance)
15. [Portfolio](#day-15--portfolio)

## Day 1 — Setup

**Goal:** Run your own Next.js app and save it in the existing GitHub repository.

Read: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation).

1. In your terminal, run `node --version`, `npm --version`, and `git --version`. Install a supported Node.js LTS version if missing. On your Mac, if Git reports missing developer tools, run `xcode-select --install` and finish the installer.
2. Clone the existing repository. GitHub Desktop is an alternative if terminal authentication is unfamiliar; never use your account password as a Git token.
3. Create the application in a subfolder named `web`. This keeps your existing README and learning documents intact.

```sh
git clone https://github.com/catherinegao/network-monitoring-dashboard.git
cd network-monitoring-dashboard
npx create-next-app@latest web
```

Choose customized settings: TypeScript, ESLint, App Router, a `src/` directory, and the default `@/*` alias. Plain CSS is sufficient; Tailwind is optional. Skip optional experimental features for this exercise. All subsequent source paths are relative to `web/`.

```sh
cd web
npm run dev
```

4. Open the localhost address printed in the terminal.
5. Replace the contents of `src/app/page.tsx` with a component displaying “Network Monitoring Dashboard.”
6. Inspect `package.json`: explain the dev, build, and start commands.
7. From the repository root, inspect `git status` and `git diff`, then commit the app and lockfile. Do not commit `node_modules`, `.next`, or environment files.

**Check:** Editing the heading updates the browser. GitHub shows a `web/` folder after you push. If you already created an app elsewhere, do not create another: move that app into `web/`, excluding any nested `.git` directory.

**Explain:** What does Next.js add to a React application?

## Day 2 — Routes and layouts

**Goal:** Navigate between a dashboard and device pages.

Read: [Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages).

1. Create `src/app/dashboard/page.tsx` with a summary heading.
2. Create `src/app/dashboard/devices/page.tsx` with links to two fictional devices.
3. Create `src/app/dashboard/devices/[id]/page.tsx` for a device detail page.
4. Create `src/app/dashboard/layout.tsx` with a navigation element and `{children}`. Keep the root layout's `html` and `body` elements in the root layout.
5. Use `Link` from `next/link` instead of click handlers for navigation.

Dynamic route example:

```tsx
export default async function DevicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <h1>Device {id}</h1>;
}
```

**Check:** Visit `/dashboard/devices/router-01` directly, refresh it, and navigate back using your links. The shared navigation remains consistent.

**Common issue:** A folder alone does not expose a page; it needs a `page.tsx`.

**Explain:** How is a layout different from a page?

## Day 3 — Server and client components

**Goal:** Keep data preparation on the server and interaction in a small client component.

Read: [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).

1. Create `src/lib/types.ts`:

```ts
export type Device = {
  id: string;
  name: string;
  status: "online" | "offline";
  latencyMs: number;
};
export type DevicePage = {
  items: Device[];
  total: number;
  page: number;
  pageSize: number;
};
```

2. Create `src/lib/devices.ts` with a typed array of at least 25 fictional devices. Use stable unique IDs and a mixture of online/offline statuses.
3. In your dashboard page, import the fixtures, count the online devices, and display that count. Leave this page as a Server Component.
4. Create `src/components/status-filter.tsx` with `"use client"`, a labeled select element, and React state. Display the selected status.
5. Render this component within the server page. Pass only serializable values across the boundary.

**Check:** The select responds without a page reload. A temporary console log in the server page appears in your server terminal. Remove diagnostic logs afterward.

**Common issue:** `"use client"` creates a client module boundary; it does not mean all rendering happens only in the browser. Do not import database code into it.

**Explain:** Why does the filter need a client boundary while the summary does not?

## Day 4 — Read API

**Goal:** Return a typed, searchable page of devices.

Read: [Route handlers](https://nextjs.org/docs/app/getting-started/route-handlers).

1. Create `src/app/api/devices/route.ts`.
2. Export `GET(request: Request)`.
3. Parse `q` and `page` from `new URL(request.url).searchParams`.
4. Reject a page that is not an integer of at least 1 with HTTP 400.
5. Filter devices by a case-insensitive name match, then slice the filtered array. Use a fixed page size of 10.
6. Return the response shape below using `Response.json`. Add `Cache-Control: no-store` for this learning endpoint to keep HTTP caching out of the first experiments.

```ts
// Inside GET, after validating page and computing filtered devices:
return Response.json(
  {
    items: filtered.slice((page - 1) * 10, page * 10),
    total: filtered.length,
    page,
    pageSize: 10,
  },
  { headers: { "Cache-Control": "no-store" } },
);
```

**Check:** Open `/api/devices?q=router&page=1`, `?page=2`, and `?page=-1`. An unmatched search returns an empty items array, not an error. Inspect response codes in DevTools.

**Common issue:** Calculate total before slicing, otherwise pagination cannot know the full result count.

**Explain:** Why validate query parameters on the server even when the UI generates them?

## Day 5 — Loading and errors

**Goal:** Make slow and failed operations understandable.

Read: [Error handling](https://nextjs.org/docs/app/getting-started/error-handling).

1. Create `src/app/dashboard/loading.tsx` with a brief loading message.
2. Temporarily make your dashboard page async and await a two-second delay before rendering. Navigate to it to observe the fallback; development mode and prefetching can affect what you see.
3. Create a client `error.tsx` in the dashboard segment with a friendly message and a button invoking the supplied `reset` callback.
4. Temporarily throw an error in the dashboard page to exercise the boundary, then remove it.
5. In the device detail page, look up the ID and call `notFound()` from `next/navigation` when absent. Add `not-found.tsx` with a return link.
6. Remove artificial delays and forced exceptions.

**Check:** An invalid device URL shows your not-found UI. A simulated render failure shows a recovery option.

**Common issue:** Route boundaries do not automatically handle every event-handler or client fetch failure. Day 6 handles query failures explicitly.

**Explain:** What is the difference between an empty result, a missing device, and a failed request?

## Day 6 — TanStack Query

**Goal:** Fetch devices without manually coordinating loading and error state.

Read: [TanStack Query quick start](https://tanstack.com/query/latest/docs/framework/react/quick-start).

1. In `web/`, install `@tanstack/react-query` and `@tanstack/react-query-devtools`.
2. Create `src/app/providers.tsx` as a Client Component. Instantiate a QueryClient once with `useState(() => new QueryClient())`, then wrap children in `QueryClientProvider`.
3. Wrap the root layout's children with Providers, inside `body`. Keep the root layout a Server Component.
4. Create a client `DeviceTable` component. Use this query pattern with the types from Day 3:

```tsx
const devicesQuery = useQuery<DevicePage>({
  queryKey: ["devices", { q: "", page: 1 }],
  queryFn: async ({ signal }) => {
    const response = await fetch("/api/devices?page=1", {
      signal,
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Unable to load devices");
    return response.json();
  },
});
```

5. Render pending, error with retry, empty, and table states. Use semantic table headers and stable device IDs as row keys.
6. Render DeviceTable on the devices page. Keep your server-rendered overview on the separate dashboard page.

**Check:** Use DevTools request blocking or offline mode, then reload the device page to test failures. Restore the connection and retry. Retries may delay the final error state.

**Common issue:** fetch does not reject merely because an HTTP response is 400 or 500; check response.ok.

**Explain:** What is server state, and how is it different from whether a dialog is open?

## Day 7 — Search and pagination

**Goal:** Keep request parameters and cached results aligned.

Read: [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys).

1. Add a labeled search input and state for `q` and `page`.
2. Use `["devices", { q, page }]` as your query key.
3. Build the request with `new URLSearchParams({ q, page: String(page) })`.
4. Reset page to 1 when the search changes.
5. Add Previous and Next buttons. Disable Previous on page 1; disable Next when `page * pageSize >= total`.
6. Keep the fetch cancellation signal from Day 6.
7. Optional: introduce a debounced search value after the basic behavior works. Use that same debounced value in both the key and request.

**Check:** Start on page 3, then search for a single device. It should appear on page 1. Rapidly change searches and verify the rendered results match the current search.

**Common issue:** If search is omitted from the query key, unrelated searches share one cached entry.

**Explain:** Why is a query key more than a label?

## Day 8 — Caching

**Goal:** Observe freshness rather than guessing at it.

Read: [Important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults).

1. Add Query Devtools inside the provider.
2. Set the devices query's `staleTime` to 30,000 milliseconds.
3. Open a device query, navigate away, and return before 30 seconds. Observe the request count and cached results.
4. Wait until stale, switch browser focus away and back, and observe whether a refetch happens.
5. Repeat with `staleTime: 0`.
6. Record observations in `LEARNING_LOG.md`: setting, user action, requests, and visible result.
7. Set a deliberate value for your demo and document why.

**Check:** Explain the difference between freshness, inactive cache retention (`gcTime`), and background fetching. Stale data is not automatically deleted.

**Common issue:** The browser's HTTP cache, Next.js server caching, and TanStack Query's cache are separate mechanisms. This project initially uses no-store responses to simplify HTTP behavior.

**Explain:** Can data be visible while a request is in progress?

## Day 9 — Persistent edits

**Goal:** Save an edit that survives a server restart.

Read: [Next.js database chapter](https://nextjs.org/learn/dashboard-app/setting-up-your-database).

This is the longest session. Use the course's PostgreSQL setup if you do not already have a preferred development database. Adapt the example data model to devices; do not copy invoice tables and leave them unexplained.

1. Create a devices table with ID, name, status, and latency fields. Seed your fictional fixtures.
2. Put connection credentials in a gitignored `web/.env.local`. Never prefix a database secret with `NEXT_PUBLIC_`.
3. Create a server-only data module with list, find-by-ID, and update functions. Use parameterized SQL; import it only from server code.
4. Replace fixture reads in the API and server pages with these functions. Keep the Day 4 response contract unchanged.
5. Create `src/app/api/devices/[id]/route.ts` with a PATCH handler. Await dynamic params. Parse JSON safely and allow editing only name and status.
6. Validate that name is a trimmed string of 1–80 characters and status is online or offline. Return 400 for invalid data, 404 for an unknown ID, and the updated device on success. Do not expose raw database errors.
7. Add a labeled edit form to the device detail page as a Client Component. Pass in the current device. Wire its submission on Day 10.

**Check:** Update a record using an API client, restart your server, and read it again. Test an invalid status and an unknown ID.

**Common issue:** Updating an in-memory array is not durable persistence. A writable public demo also needs authorization; keep this learning endpoint local until that is addressed.

**Explain:** Why is frontend validation alone insufficient?

## Day 10 — Mutations

**Goal:** Submit the form and refresh affected data.

Read: [Invalidation after mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations).

1. In your edit form, get `queryClient` from `useQueryClient()`.
2. Use `useMutation` to PATCH the device endpoint. Send JSON and check response.ok before returning the updated device.
3. On success, await `queryClient.invalidateQueries({ queryKey: ["devices"] })`. This covers all matching search/page variants.
4. If you also added a client detail query, invalidate its `["device", id]` key.
5. For server-rendered detail data, call `router.refresh()` after success. Keep database reads uncached initially; if you later add server caching, explicitly revalidate it too.
6. Disable Save while pending, retain form input after a failure, and show useful success/error feedback.
7. Do not add optimistic updates until this flow is reliable.

**Check:** Rename a device, return to the table, and verify the new name. Simulate a failed PATCH and confirm the UI does not claim success.

**Common issue:** TanStack invalidation does not itself invalidate Next.js server caches.

**Explain:** Why does updating the server not automatically update every view?

## Day 11 — Refresh and visualization

**Goal:** Show changing data without disrupting interaction.

Read: [useQuery options](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) and [D3 scales](https://d3js.org/d3-scale).

1. Add `refetchInterval: 15000` to the device query.
2. Show a small refreshing indicator using `isFetching`, without replacing an existing table with a full-page spinner.
3. Use `dataUpdatedAt` for “last fetched” time; this is not the time a device last changed.
4. Install `d3-scale` and its TypeScript definitions. Build a small SVG bar chart for latency using `scaleLinear`.
5. Let React render the SVG elements; use D3 for scales. This avoids React and D3 competing to modify the same elements.
6. Include labels and a textual/table alternative. Mark the values as fictional. Handle zero values and an empty dataset.
7. Keep edited form values separate from refreshable query data so polling cannot overwrite unsaved input.

**Check:** Focus a table link, wait for a refresh, and confirm focus remains. An unchanged backend may return the same metrics; polling does not create real telemetry.

**Explain:** When would polling be sufficient, and when would you choose WebSockets?

## Day 12 — Accessibility

**Goal:** Complete the primary flow with keyboard input and at a narrow width.

Read: [WAI forms tutorial](https://www.w3.org/WAI/tutorials/forms/).

1. Use headings in a logical order and label all inputs.
2. Link field errors to controls with `aria-describedby`, and mark invalid fields with `aria-invalid`.
3. Use native buttons and links; give status badges text, not just color.
4. Keep a visible focus indicator. Test Tab, Shift+Tab, Enter, and Space.
5. At 320px width, stack summary cards and contain table overflow in a labeled region. Check that horizontal overflow does not affect the whole page.
6. Announce important save feedback with a restrained status message. Avoid announcing the entire table every polling interval.
7. Use a screen reader available to you, such as VoiceOver on your Mac. Record what you tested rather than claiming complete WCAG certification.

**Check:** Search for a device, open it, edit it, and return to the table without using the mouse.

**Explain:** Which problems did manual testing find that automated checks missed?

## Day 13 — Testing

**Goal:** Protect behavior, especially failed requests and stale data.

Read: [Next.js Cypress guide](https://nextjs.org/docs/app/guides/testing/cypress).

Use Cypress because you already know it. Add other testing tools only when there is a reason.

1. Install Cypress as a dev dependency in `web/` and follow its E2E setup.
2. Set baseUrl to your running local app. Start the app before running the tests.
3. Stub `GET /api/devices*` with `cy.intercept` and a known DevicePage response. Assert visible rows.
4. Return a 500 response to test failure feedback, accounting for your query retry policy.
5. Test search from a later page: inspect request parameters and verify page resets to 1.
6. Stub a successful PATCH and subsequent GET response to verify edited data becomes visible.
7. Stub a failed PATCH and confirm input remains and success feedback does not appear.
8. Temporarily break an assertion target or remove page reset, confirm a relevant test fails, then restore the code.

Example pattern to adapt to your actual controls:

```ts
cy.intercept("GET", "/api/devices*", {
  body: {
    items: [{ id: "router-01", name: "Router Alpha", status: "online", latencyMs: 12 }],
    total: 1, page: 1, pageSize: 10,
  },
}).as("devices");
cy.visit("/dashboard/devices");
cy.wait("@devices");
cy.contains("Router Alpha").should("be.visible");
```

**Check:** Tests run repeatedly with deterministic data. Add one real API/database check separately; stubs do not verify persistence.

**Explain:** What does each test prove, and what does it leave untested?

## Day 14 — Performance

**Goal:** Measure one real interaction before optimizing.

Read: [React Profiler](https://react.dev/reference/react/Profiler).

1. In `web/`, run `npm run build`, `npx tsc --noEmit`, and the generated lint script. If there is no lint script, use `npx eslint .`. Resolve relevant errors.
2. Run the production app using `npm start` on an available port.
3. Profile a search and a page change with browser performance tools. Use React DevTools in development to inspect component renders.
4. Record the dataset size, browser, build mode, and network conditions.
5. Identify the actual delay: network, database, rendering, or JavaScript work.
6. Make one justified improvement and repeat under the same conditions. Do not add memoization or virtualization merely to claim them; a ten-row page may not need either.
7. Document any remaining limitation, including simulated metrics or missing authorization.

**Check:** Build, lint, and tests pass. Any reported improvement has before/after evidence; if none is needed, say so.

**Explain:** How did you distinguish an API delay from expensive rendering?

## Day 15 — Portfolio

**Goal:** Present honest evidence of what you built.

Read: [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying).

1. Update README status from planning to the accurate implementation status.
2. Add screenshots of the overview, table, and edit/error states.
3. Document setup from a fresh clone: enter `web/`, install with `npm ci`, configure environment variables, initialize the database, and run the app.
4. Add an `.env.example` containing names and placeholders only.
5. Document test commands and known limitations.
6. Write three short architecture decisions: server/client boundary, query-key strategy, and cache refresh after edits.
7. If deploying, configure the project root as `web` and use a persistent hosted database. Before exposing write endpoints, implement authorization or publish a read-only demo. Repository visibility and deployed-app access are separate.
8. Keep the repository private until you are ready to share it. Add a resume bullet only for features you completed and can demonstrate.

Possible completed-project wording:

> Built a personal Next.js/TypeScript network dashboard with server-rendered summaries and TanStack Query for search, pagination, background refresh, and cache invalidation after edits.

**Check:** Someone following your README can run it. You can explain the architecture in two minutes and debug a request without asking AI to explain every line.

**Explain:** What would you change before using this for real customers?

## Daily learning log

Copy this template after each session:

- Date / day:
- What I completed:
- Files changed:
- One decision and why:
- One bug and how I diagnosed it:
- Checks performed:
- What I can explain without assistance:
- Next step:

Useful AI prompt: “Help me with Day N of this tutorial. Explain the concept first, give me one small task, and review my code afterward. Do not implement the entire project for me.”
