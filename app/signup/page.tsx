import Link from 'next/link';

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Header */}
      <header className="py-12 flex flex-col items-center justify-center space-y-2">
        <Link href="/" className="text-4xl font-bold font-h1 tracking-tighter text-cyan-400 drop-shadow-[0_0_12px_rgba(0,229,255,0.5)]">
          Mockmate
        </Link>
        <p className="text-zinc-400">Interview excellence powered by AI.</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-zinc-900/50 border border-white/5 p-8 rounded-2xl shadow-2xl relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.05),transparent_50%)] rounded-2xl pointer-events-none"></div>
          
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-2xl font-bold font-h2 mb-2">Create Account</h2>
            <p className="text-xs tracking-widest text-zinc-500 uppercase font-semibold">Join thousands of successful candidates</p>
          </div>

          <form className="space-y-5 relative z-10">
            <div className="space-y-1.5">
              <label className="text-sm text-zinc-400 block">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-zinc-500 text-[20px]">
                  person
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-zinc-400 block">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-zinc-500 text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm text-zinc-400 block">Password</label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-zinc-500 text-[20px]">
                  lock
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <Link href="/setup/resume" className="w-full bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2">
              Create Account
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>

            <div className="relative py-4 flex items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-zinc-600 uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <button type="button" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-lg border border-white/5 flex items-center justify-center gap-3 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-sm text-zinc-400">
              Already have an account? <Link href="/login" className="text-cyan-400 font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-zinc-500 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <Link href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
        <Link href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
        <Link href="#" className="hover:text-zinc-300 transition-colors">Help Center</Link>
      </footer>
      
      <div className="bg-zinc-950 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-8 text-xs text-zinc-600">
        <p>© 2024 MOCKMATE AI. FUTURE-PROOF YOUR CAREER.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Privacy</Link>
          <Link href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Terms</Link>
          <Link href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Support</Link>
        </div>
      </div>
    </div>
  );
}
