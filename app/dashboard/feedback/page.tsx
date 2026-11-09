import Link from "next/link";

type IconName =
  | "download"
  | "refresh"
  | "bolt"
  | "notes"
  | "star"
  | "check"
  | "bulb"
  | "arrow";

function Icon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "download":
      return (
        <svg {...common}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m7 10 5 5 5-5" />
          <path d="M12 15V3" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 7v5h-5" />
          <path d="M4 17v-5h5" />
          <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12" />
          <path d="M4 12l2.8 5a7 7 0 0 0 11.6-2" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="m13 2-3 9h7l-6 11 2-9H6l7-11Z" />
        </svg>
      );
    case "notes":
      return (
        <svg {...common}>
          <path d="M8 6h13M8 12h13M8 18h13" />
          <path d="M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4" />
          <path d="M8.5 14.5a7 7 0 1 1 7 0c-.8.6-1.2 1.4-1.3 2.5h-4.4c-.1-1.1-.5-1.9-1.3-2.5Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
  }
}

const metrics = [
  {
    title: "Confidence",
    subtitle: "Stability & Tone",
    score: 85,
    description:
      "Minimal filler words and steady pacing throughout the technical section.",
    color: "cyan",
    icon: "bolt" as const,
  },
  {
    title: "Clarity",
    subtitle: "Conciseness",
    score: 68,
    description:
      "Technical explanations were accurate but sometimes lacked simplified analogies.",
    color: "purple",
    icon: "notes" as const,
  },
  {
    title: "STAR Structure",
    subtitle: "Framework Adherence",
    score: 92,
    description:
      "Excellent results-oriented delivery in behavioral responses.",
    color: "emerald",
    icon: "star" as const,
  },
];

const suggestions = [
  {
    title: "Improve System Design Analogies",
    description:
      "When explaining load balancing, use real-world traffic examples to help non-technical interviewers follow along.",
  },
  {
    title: 'Reduce "Uhm" Frequency',
    description:
      'You used 12 filler words during the "Conflict Management" question. Try pausing for a breath instead.',
  },
  {
    title: "Expand on 'Results' in STAR",
    description:
      "Include more quantitative data (percentages, time saved) in your response about team leading.",
  },
];

export default function FeedbackDashboard() {
  return (
    <main className="w-full min-h-screen bg-[#090e13] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-10">

        {/* Page heading */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Interview Summary
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Interview Feedback
            </h1>

            <p className="text-sm text-zinc-400 mt-2">
              Senior Software Engineer Role
              <span className="mx-2 text-zinc-600">•</span>
              Oct 24, 2024
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-[#111820] text-zinc-300 text-sm font-semibold hover:bg-[#19232d] hover:border-white/20 transition-all"
            >
              <Icon name="download" size={17} />
              Download Report
            </button>

            <Link
              href="/setup/role"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 text-[#041116] text-sm font-bold hover:bg-cyan-300 transition-all shadow-[0_0_24px_rgba(0,229,255,0.14)]"
            >
              <Icon name="refresh" size={17} />
              Retake Interview
            </Link>
          </div>
        </div>

        {/* Score and performance history */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Overall score */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#10171f] p-6 sm:p-7">
            <div className="flex justify-between items-center mb-7">
              <h2 className="font-semibold text-lg">Overall Score</h2>
              <span className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1">
                Strong performance
              </span>
            </div>

            <div className="flex justify-center">
              <div className="relative w-44 h-44">
                <svg
                  viewBox="0 0 160 160"
                  className="w-full h-full -rotate-90"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="#202b35"
                    strokeWidth="10"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="#00d9f5"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="427.26"
                    strokeDashoffset="93.99"
                    className="drop-shadow-[0_0_8px_rgba(0,217,245,0.45)]"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold tracking-tight">
                    78
                  </span>
                  <span className="text-sm text-zinc-500">out of 100</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400 leading-relaxed">
                You're in the top 15% of candidates for this role.
                Excellent technical accuracy.
              </p>
            </div>
          </div>

          {/* Performance history */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.07] bg-[#10171f] p-6 sm:p-7">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-semibold text-lg">
                  Performance History
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Your recent interview scores
                </p>
              </div>

              <span className="text-[10px] tracking-wider uppercase text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-3 py-2 rounded-lg font-bold">
                Last 5 Sessions
              </span>
            </div>

            <div className="relative h-44 mt-3">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[25, 50, 75].map((value) => (
                  <div
                    key={value}
                    className="border-t border-dashed border-white/[0.07] w-full"
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/[0.08] to-transparent" />

              <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,70 25,65 50,75 75,55 100,50"
                  fill="none"
                  stroke="#00d9f5"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />

                {[
                  [0, 70],
                  [25, 65],
                  [50, 75],
                  [75, 55],
                  [100, 50],
                ].map(([cx, cy], index) => (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r="2.5"
                    fill="#00d9f5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              <div className="absolute -bottom-7 left-0 right-0 flex justify-between text-[10px] text-zinc-500">
                <span>Sep 12</span>
                <span>Sep 28</span>
                <span>Oct 05</span>
                <span>Oct 18</span>
                <span className="text-cyan-400 font-semibold">Today</span>
              </div>
            </div>
          </div>
        </section>

        {/* Performance metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className={`rounded-2xl border bg-[#10171f] p-5 sm:p-6 transition-all hover:-translate-y-1 ${
                metric.color === "cyan"
                  ? "border-cyan-400/20 hover:border-cyan-400/40"
                  : metric.color === "purple"
                    ? "border-purple-400/20 hover:border-purple-400/40"
                    : "border-emerald-400/20 hover:border-emerald-400/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    metric.color === "cyan"
                      ? "bg-cyan-400/10 text-cyan-400"
                      : metric.color === "purple"
                        ? "bg-purple-400/10 text-purple-400"
                        : "bg-emerald-400/10 text-emerald-400"
                  }`}
                >
                  <Icon name={metric.icon} />
                </div>

                <h3 className="font-semibold">{metric.title}</h3>
              </div>

              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-zinc-400">{metric.subtitle}</span>
                <span
                  className={`font-bold ${
                    metric.color === "cyan"
                      ? "text-cyan-400"
                      : metric.color === "purple"
                        ? "text-purple-400"
                        : "text-emerald-400"
                  }`}
                >
                  {metric.score}%
                </span>
              </div>

              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full ${
                    metric.color === "cyan"
                      ? "bg-cyan-400"
                      : metric.color === "purple"
                        ? "bg-purple-400"
                        : "bg-emerald-400"
                  }`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </section>

        {/* Suggestions and pro tip */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Suggestions */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                <Icon name="bulb" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Actionable Suggestions
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Areas to focus on in your next interview
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.title}
                  className="flex gap-4 rounded-xl border border-white/[0.07] bg-[#10171f] p-5 hover:border-cyan-400/20 transition-colors"
                >
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                    <Icon name="check" size={17} />
                  </div>

                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">
                      Recommendation 0{index + 1}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">
                      {suggestion.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro tip */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#101a19] p-6 sm:p-7">
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-emerald-400/[0.08] blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase mb-6">
                <Icon name="bulb" size={14} />
                Pro Tip
              </div>

              <h2 className="text-2xl font-bold leading-tight mb-3">
                Mastering the "Why"
              </h2>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Our AI detected that your strongest answers are when you
                explain the underlying reasoning behind architectural choices.
              </p>

              <div className="mt-8 pt-5 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <Icon name="star" size={15} />
                  Your standout strength
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Keep explaining the reasoning behind your technical
                  decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-10 pt-6 border-t border-white/[0.06] text-center text-xs text-zinc-600">
          MockMate Interview Insights
          <span className="mx-2">•</span>
          Keep learning. Keep improving.
        </footer>
      </div>
    </main>
  );
}