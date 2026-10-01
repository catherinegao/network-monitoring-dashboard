import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <main className="p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Live Network Insights
          </p>
          <h1
            className={`${inter.className} bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-4xl font-bold text-transparent`}
          >
            Network Monitoring
          </h1>
          <p className="max-w-2xl text-slate-400">
            Overview of fictional traffic and health signals. Open Dashboard in
            the sidebar for placeholder business metrics.
          </p>
        </header>

        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-slate-100">
              Traffic volume
            </h2>
            <span className="text-sm text-emerald-300">+12.3% this hour</span>
          </div>
          <Image
            src="/network-traffic.png"
            alt="Network traffic over time"
            width={600}
            height={220}
            className="w-full max-w-full rounded-lg border border-slate-800"
          />
        </section>
      </div>
    </main>
  );
}
