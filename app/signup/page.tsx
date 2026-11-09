
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0F14] text-white">

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-500/[0.04] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      {/* Brand header */}
      <header className="relative z-10 flex flex-col items-center px-6 pb-8 pt-10 sm:pt-12">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_25px_rgba(0,212,255,0.1)] transition-all group-hover:shadow-[0_0_35px_rgba(0,212,255,0.2)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <rect x="4" y="7" width="16" height="13" rx="4" />
              <path d="M12 3v4M9 13h.01M15 13h.01M9 17h6" />
            </svg>
          </div>
          <span className="font-display text-3xl font-bold tracking-tight text-white">
            Mock<span className="text-cyan-400">Mate</span>
          </span>
        </Link>

        <p className="mt-3 text-sm text-zinc-500">
          Your next opportunity starts here.
        </p>
      </header>

      {/* Signup card */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-5 pb-12">
        <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111820]/90 p-7 shadow-[0_25px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-9">

          {/* Card glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-cyan-400/[0.06] blur-[70px]" />

          <div className="relative">

            {/* Heading */}
            <div className="mb-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                  Get started
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Start preparing for your next interview with MockMate.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">

              {/* Full name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-xs font-semibold text-zinc-300">
                  Full name
                </label>

                <div className="group relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-cyan-400"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                  </svg>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-white/[0.09] bg-[#0B1119] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 hover:border-white/15 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold text-zinc-300">
                  Email address
                </label>

                <div className="group relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-cyan-400"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/[0.09] bg-[#0B1119] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 hover:border-white/15 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-semibold text-zinc-300">
                  Password
                </label>

                <div className="group relative">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-cyan-400"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4M12 15v3" />
                  </svg>

                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-white/[0.09] bg-[#0B1119] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 hover:border-white/15 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                  />
                </div>

                <p className="text-[10px] text-zinc-600">
                  Choose a password you can securely remember.
                </p>
              </div>

              {/* Create account */}
              <Link
                href="/setup/resume"
                className="group mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 py-4 text-sm font-bold text-[#071017] shadow-[0_0_25px_rgba(0,212,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(0,212,255,0.22)]"
              >
                Create Account
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </Link>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.035] py-3.5 text-sm font-semibold text-zinc-200 transition-all hover:border-white/20 hover:bg-white/[0.07]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Login link */}
            <div className="mt-8 border-t border-white/[0.07] pt-6 text-center">
              <p className="text-sm text-zinc-500">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-center gap-3 border-t border-white/[0.06] px-6 py-6 sm:flex-row sm:gap-8">
        <Link href="/" className="text-xs text-zinc-600 transition-colors hover:text-cyan-300">
          Back to home
        </Link>
        <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} MockMate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
