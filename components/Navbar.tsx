import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-zinc-950/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4_20px_rgba(0,0,0,0.5)] font-h1 tracking-tight">
      <div className="text-2xl font-bold tracking-tighter text-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
        Mockmate
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link className="text-cyan-400 border-b-2 border-cyan-400 pb-1" href="#">
          Practice
        </Link>
        <Link className="text-zinc-400 hover:text-zinc-100 transition-all duration-300" href="#">
          Feedback
        </Link>
        <Link className="text-zinc-400 hover:text-zinc-100 transition-all duration-300" href="#">
          Resources
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="hidden sm:block text-zinc-400 hover:text-white px-4 py-2 font-medium transition-all">
          Login
        </Link>
        <Link href="/login" className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-bold hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
