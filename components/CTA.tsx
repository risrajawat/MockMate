
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.035] to-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-cyan-400/15 bg-[#111820] px-6 py-16 text-center shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:px-12">

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
            </svg>
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Your next opportunity starts here
          </p>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to face your
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              next interview?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            Take the first step towards becoming a more confident
            candidate. Start practicing with MockMate.
          </p>

          <Link
            href="/login"
            className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-bold text-[#071017] shadow-[0_0_30px_rgba(0,212,255,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)]"
          >
            Start Your Practice
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </Link>

          <p className="mt-5 text-[11px] text-zinc-600">
            Your practice. Your pace. Your progress.
          </p>
        </div>
      </div>
    </section>
  );
}
