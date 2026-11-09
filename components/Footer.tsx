
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#090D12]">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-8">

        <div className="grid gap-12 border-b border-white/[0.07] pb-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6 text-cyan-300">
                  <rect x="4" y="7" width="16" height="13" rx="4" />
                  <path d="M12 3v4M9 13h.01M15 13h.01M9 17h6" />
                </svg>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Mock<span className="text-cyan-400">Mate</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-500">
              Practice smarter. Interview stronger. Build confidence
              through realistic AI-powered interview practice.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
              Explore
            </h3>
            <div className="mt-5 flex flex-col gap-4">
              <Link href="/" className="text-sm text-zinc-500 transition-colors hover:text-cyan-300">
                Home
              </Link>
              <Link href="/#how-it-works" className="text-sm text-zinc-500 transition-colors hover:text-cyan-300">
                How it works
              </Link>
              <Link href="/login" className="text-sm text-zinc-500 transition-colors hover:text-cyan-300">
                Start practicing
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
              Your Journey
            </h3>
            <div className="mt-5 flex flex-col gap-4">
              <span className="text-sm text-zinc-500">Resume preparation</span>
              <span className="text-sm text-zinc-500">AI voice interviews</span>
              <span className="text-sm text-zinc-500">Interview feedback</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} MockMate. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Built to help you show up with confidence.
          </div>
        </div>
      </div>
    </footer>
  );
}
