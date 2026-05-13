import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-xl font-black text-cyan-400 font-h1 tracking-tighter">Mockmate AI</div>
          <p className="text-xs font-h1 tracking-widest uppercase text-zinc-600">
            © 2024 Mockmate AI. Future-proof your career.
          </p>
        </div>
        <div className="flex gap-8">
          <Link
            className="text-xs font-h1 tracking-widest uppercase text-zinc-600 hover:text-cyan-300 transition-colors"
            href="#"
          >
            Privacy
          </Link>
          <Link
            className="text-xs font-h1 tracking-widest uppercase text-zinc-600 hover:text-cyan-300 transition-colors"
            href="#"
          >
            Terms
          </Link>
          <Link
            className="text-xs font-h1 tracking-widest uppercase text-zinc-600 hover:text-cyan-300 transition-colors"
            href="#"
          >
            Support
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 text-zinc-500 hover:text-cyan-400 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">share</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
