import type { Customer, DashboardData } from "@/app/lib/definitions";
import { customers, dashboardData } from "@/app/lib/placeholder-data";

function formatAmount(amountInCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountInCents / 100);
}

function getCustomerName(customerId: string, customerList: Customer[]) {
  return customerList.find((customer) => customer.id === customerId)?.name ?? "Unknown";
}

function summarizeRecords(records: DashboardData[]) {
  return records.reduce(
    (summary, record) => {
      summary.totalAmount += record.amount;
      if (record.status === "pending") {
        summary.pendingCount += 1;
        summary.pendingAmount += record.amount;
      } else {
        summary.paidCount += 1;
        summary.paidAmount += record.amount;
      }
      return summary;
    },
    {
      totalAmount: 0,
      pendingCount: 0,
      paidCount: 0,
      pendingAmount: 0,
      paidAmount: 0,
    },
  );
}

export default function Page() {
  const summary = summarizeRecords(dashboardData);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Live Network Insights
          </p>
          <h1 className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-4xl font-bold text-transparent">
            Network Monitoring Dashboard
          </h1>
        </header>

        <section
          aria-label="Record summary"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">Total records</p>
            <p className="mt-2 text-2xl font-semibold">{dashboardData.length}</p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">Total amount</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatAmount(summary.totalAmount)}
            </p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">Pending</p>
            <p className="mt-2 text-2xl font-semibold text-amber-300">
              {summary.pendingCount}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {formatAmount(summary.pendingAmount)}
            </p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">Paid</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-300">
              {summary.paidCount}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {formatAmount(summary.paidAmount)}
            </p>
          </article>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-slate-100">
              Traffic Volume (Dummy Data)
            </h2>
            <span className="text-sm text-emerald-300">+12.3% this hour</span>
          </div>

          <div className="h-64 w-full rounded-lg border border-slate-800 bg-slate-950 p-4">
            <svg
              viewBox="0 0 600 220"
              className="h-full w-full"
              role="img"
              aria-label="Dummy network traffic chart"
            >
              <line x1="0" y1="200" x2="600" y2="200" stroke="#334155" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#1e293b" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#1e293b" />
              <line x1="0" y1="20" x2="600" y2="20" stroke="#1e293b" />

              <polyline
                fill="none"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeLinecap="round"
                points="0,170 75,150 150,165 225,120 300,135 375,90 450,105 525,70 600,85"
              />

              <g fill="#22d3ee">
                <circle cx="75" cy="150" r="4" />
                <circle cx="225" cy="120" r="4" />
                <circle cx="375" cy="90" r="4" />
                <circle cx="525" cy="70" r="4" />
              </g>
            </svg>
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-100">
              Placeholder records
            </h2>
            <p className="text-sm text-slate-400">Fictional fixture data</p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">
                Placeholder customer records with amount, status, and date
              </caption>
              <thead className="bg-slate-950 text-slate-300">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.map((record) => (
                  <tr
                    key={`${record.customer_id}-${record.date}-${record.amount}`}
                    className="border-t border-slate-800"
                  >
                    <td className="px-4 py-3">{getCustomerName(record.customer_id, customers)}</td>
                    <td className="px-4 py-3">{formatAmount(record.amount)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          record.status === "paid"
                            ? "rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300"
                            : "rounded-full bg-amber-500/15 px-2 py-1 text-amber-300"
                        }
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
