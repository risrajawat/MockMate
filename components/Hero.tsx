
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-20 sm:py-24 lg:py-32">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/[0.06] blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">

        {/* LEFT: Hero content */}
        <div className="relative z-10 space-y-8">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Your Personal AI Interview Coach
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-2xl space-y-5">
            <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[64px]">
              Don't just prepare.
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get interview ready.
              </span>
            </h1>

            <p className="max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              Practice real interview conversations with AI. Speak your
              answers, tackle role-specific questions, and get feedback
              that helps you improve with every session.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-400 px-7 py-4 text-sm font-bold text-[#071017] shadow-[0_0_30px_rgba(0,212,255,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)]"
            >
              Start Practicing
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              How it works
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m7 10 5 5 5-5" />
              </svg>
            </a>
          </div>

          {/* Product benefits */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.08] pt-7">
            {[
              'Voice-based practice',
              'Role-specific questions',
              'Actionable feedback',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
                <span className="text-xs font-medium text-zinc-400">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Product preview */}
        <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">

          {/* Ambient glow */}
          <div className="absolute inset-8 rounded-full bg-cyan-400/[0.08] blur-[90px]" />

          {/* Main window */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111820] shadow-[0_25px_100px_rgba(0,0,0,0.45)]">

            {/* Window header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="ml-2 text-xs font-medium text-zinc-400">
                  MockMate Interview Room
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Preview
                </span>
              </div>
            </div>

            {/* Session information */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-xs text-zinc-500">PRACTICE SESSION</p>
                <h3 className="mt-1 text-sm font-semibold text-white">
                  Backend Developer
                </h3>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                <p className="text-[10px] text-zinc-500">SESSION</p>
                <p className="text-xs font-semibold text-zinc-200">
                  Technical
                </p>
              </div>
            </div>

            {/* Interviewer panel */}
            <div className="mx-5 overflow-hidden rounded-xl border border-cyan-400/10 bg-[#0B1119]">

              <div className="relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden px-5 py-8">

                {/* Background circles */}
                <div className="absolute h-48 w-48 rounded-full border border-cyan-400/[0.08]" />
                <div className="absolute h-36 w-36 rounded-full border border-cyan-400/[0.12]" />
                <div className="absolute h-24 w-24 rounded-full border border-cyan-400/[0.16]" />

                {/* AI Avatar */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 shadow-[0_0_45px_rgba(0,212,255,0.15)]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-10 w-10 text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="7" width="16" height="13" rx="4" />
                    <path d="M12 3v4M9 13h.01M15 13h.01M9 17h6M2 12h2M20 12h2" />
                  </svg>
                </div>

                <p className="relative mt-4 text-sm font-semibold text-white">
                  AI Interviewer
                </p>
                <p className="relative mt-1 text-xs text-zinc-500">
                  Ready to begin your practice
                </p>
              </div>

              {/* Question */}
              <div className="border-t border-white/[0.07] px-5 py-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                    Sample interview question
                  </span>
                </div>
                <p className="text-sm font-medium leading-7 text-zinc-200 sm:text-base">
                  How would you design a scalable REST API that can handle
                  thousands of concurrent requests?
                </p>
              </div>
            </div>

            {/* Audio waveform */}
            <div className="mx-5 my-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
                  <svg
                    className="h-4 w-4 text-cyan-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <rect x="9" y="3" width="6" height="12" rx="3" />
                    <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    Voice interaction
                  </p>
                  <p className="mt-1 text-[10px] text-zinc-500">
                    Listen. Respond. Improve.
                  </p>
                </div>
              </div>

              <div className="flex h-8 items-center gap-[3px]">
                {[12, 20, 27, 16, 30, 22, 12, 25, 18, 29, 14, 21, 11].map(
                  (height, index) => (
                    <span
                      key={index}
                      style={{ height: `${height}px` }}
                      className={`w-[3px] rounded-full ${
                        index % 3 === 0
                          ? 'bg-blue-400/60'
                          : 'bg-cyan-400'
                      }`}
                    />
                  )
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-4">
              <span className="text-[11px] text-zinc-500">
                Your next interview starts here.
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span className="text-[10px] font-semibold text-zinc-400">
                  AI-powered practice
                </span>
              </div>
            </div>
          </div>

          {/* Floating feedback card */}
          <div className="absolute -bottom-7 -left-4 hidden rounded-xl border border-white/10 bg-[#171F29] p-4 shadow-2xl sm:block md:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10">
                <svg
                  className="h-5 w-5 text-violet-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="m7 14 4-4 4 4 6-7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Feedback that matters
                </p>
                <p className="mt-1 text-[10px] text-zinc-500">
                  Improve with every session
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
