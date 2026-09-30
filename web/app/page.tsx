export default function Page() {
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
      </div>
    </main>
  );
}
