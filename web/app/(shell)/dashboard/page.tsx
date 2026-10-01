import type { Customer, DashboardData } from "@/app/lib/definitions";
import { formatAmount } from "@/app/lib/format";
import { customers, dashboardData } from "@/app/lib/placeholder-data";

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

export default function DashboardPage() {
  const summary = summarizeRecords(dashboardData);

  return (
    <main className="p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Dummy data
          </p>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
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
                    <td className="px-4 py-3">
                      {getCustomerName(record.customer_id, customers)}
                    </td>
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
