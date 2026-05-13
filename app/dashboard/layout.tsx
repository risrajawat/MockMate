import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-on-background">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold font-h1 tracking-tighter text-cyan-400">
            Mockmate AI
          </Link>
          <div className="text-[10px] tracking-widest text-zinc-500 uppercase mt-1 font-semibold">
            Interview Mode Active
          </div>
        </div>

        <nav className="flex-1 mt-6 space-y-1 px-3">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          {/* Active state for Interviews */}
          <Link href="/dashboard/feedback" className="flex items-center gap-3 px-3 py-2.5 bg-cyan-950/30 text-cyan-400 border-l-2 border-cyan-400 rounded-r-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]">forum</span>
            <span className="text-sm font-medium">Interviews</span>
          </Link>
          <Link href="/setup/resume" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="text-sm font-medium">Resume</span>
          </Link>
          <Link href="/dashboard/resources" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            <span className="text-sm font-medium">Resources</span>
          </Link>
          <Link href="/dashboard/insights" className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">bar_chart</span>
            <span className="text-sm font-medium">Insights</span>
          </Link>
        </nav>

        <div className="p-6">
          <Link href="/setup/role" className="w-full bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            New Session
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        {children}
        
        {/* Footer */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-8 text-xs text-zinc-600 mt-auto">
          <p>© 2024 MOCKMATE AI. FUTURE-PROOF YOUR CAREER.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-zinc-400 transition-colors uppercase tracking-widest">Privacy</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors uppercase tracking-widest">Terms</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors uppercase tracking-widest">Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
