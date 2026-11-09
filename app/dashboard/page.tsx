
import Link from "next/link";

const overviewCards = [
  {
    title: "Interviews completed",
    value: "—",
    description: "Your completed practice sessions",
    icon: "messages",
  },
  {
    title: "Average performance",
    value: "—",
    description: "Your overall interview score",
    icon: "chart",
  },
  {
    title: "Practice time",
    value: "—",
    description: "Time spent improving your skills",
    icon: "clock",
  },
];

function OverviewIcon({ type }: { type: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "messages") {
    return (
      <svg {...common}>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 3 6-7" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function Dashboard() {
  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-10 py-9 space-y-9">

      {/* Welcome section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Your workspace
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Welcome to MockMate.
          </h1>

          <p className="text-zinc-400 mt-3 max-w-xl leading-relaxed">
            Your personal space to practice interviews, track your progress,
            and become more confident with every session.
          </p>
        </div>

        <Link
          href="/setup/resume"
          className="inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold px-6 py-3.5 rounded-xl transition-all hover:shadow-[0_0_24px_rgba(0,229,255,0.2)]"
        >
          Start an interview
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* Overview */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Your performance
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            An overview of your interview preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {overviewCards.map((card) => (
            <div
              key={card.title}
              className="bg-[#111820] border border-white/[0.07] rounded-2xl p-6 hover:border-cyan-400/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                  {card.title}
                </span>

                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                  <OverviewIcon type={card.icon} />
                </div>
              </div>

              <div className="text-3xl font-bold text-white mt-5">
                {card.value}
              </div>

              <p className="text-xs text-zinc-500 mt-2">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main dashboard content */}
      <section className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-5">

        {/* Recent activity */}
        <div className="bg-[#111820] border border-white/[0.07] rounded-2xl p-6 md:p-7">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Recent interviews
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Your latest practice sessions.
              </p>
            </div>

            <Link
              href="/dashboard/feedback"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View feedback →
            </Link>
          </div>

          <div className="min-h-[220px] flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-xl px-5 py-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center mb-4">
              <OverviewIcon type="messages" />
            </div>

            <h3 className="text-white font-semibold">
              Your journey starts here
            </h3>

            <p className="text-sm text-zinc-500 mt-2 max-w-sm leading-relaxed">
              Complete your first mock interview and your recent activity
              will appear here.
            </p>

            <Link
              href="/setup/resume"
              className="mt-5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Start practicing →
            </Link>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-[#111820] border border-white/[0.07] rounded-2xl p-6 md:p-7">
          <h2 className="text-lg font-semibold text-white">
            Quick actions
          </h2>
          <p className="text-sm text-zinc-500 mt-1 mb-6">
            Pick up where you want to improve.
          </p>

          <div className="space-y-3">
            <Link
              href="/setup/resume"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-xl">
                ↑
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  Upload resume
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Personalize your interview.
                </p>
              </div>
              <span className="text-zinc-500 group-hover:text-cyan-400">
                →
              </span>
            </Link>

            <Link
              href="/setup/role"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-xl">
                ◎
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  Explore interview roles
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Choose your career track.
                </p>
              </div>
              <span className="text-zinc-500 group-hover:text-cyan-400">
                →
              </span>
            </Link>

            <Link
              href="/dashboard/feedback"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-xl">
                ↗
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  Interview feedback
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Review interview feedback.
                </p>
              </div>
              <span className="text-zinc-500 group-hover:text-cyan-400">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-950/40 to-[#111820] p-7 md:p-9">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
            Keep improving
          </span>

          <h2 className="text-2xl font-bold text-white mt-3">
            Confidence comes from practice.
          </h2>

          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            Practice answering questions, improve how you communicate,
            and prepare for your next opportunity with MockMate.
          </p>

          <Link
            href="/setup/resume"
            className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-cyan-400 hover:text-cyan-300"
          >
            Begin your next session →
          </Link>
        </div>

        <div className="absolute -right-12 -bottom-28 w-72 h-72 rounded-full bg-cyan-400/[0.06] blur-3xl pointer-events-none" />
      </section>
    </main>
  );
}
