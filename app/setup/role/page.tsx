import Link from 'next/link';

export default function RoleSelection() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-12 pb-32">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex flex-col items-center mb-6">
          <div className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase mb-2">Interview Setup</div>
          <div className="flex gap-2">
            <div className="h-0.5 w-12 bg-cyan-400 rounded-full"></div>
            <div className="h-0.5 w-12 bg-white/10 rounded-full"></div>
          </div>
          <div className="text-xs text-zinc-500 mt-2">Step 2 of 3</div>
        </div>
        <h1 className="text-4xl font-bold font-h2 mb-4">Select Your Role</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Choose the track you want to master. Our AI will tailor technical and behavioral questions specifically for this career path.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Selected Card */}
        <div className="bg-zinc-900/30 border-2 border-cyan-400 rounded-xl p-6 relative cursor-pointer hover:bg-zinc-900/50 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.1)] flex flex-col min-h-[220px]">
          <div className="w-10 h-10 rounded bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-4">
            <span className="material-symbols-outlined text-[20px]">web</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Frontend Developer</h3>
          <p className="text-xs text-zinc-400 flex-grow mb-6">React, Vue, performance optimization, and CSS wizardry challenges.</p>
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
            Selected
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
          </div>
        </div>

        {/* Unselected Cards */}
        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/5 hover:border-white/10 transition-colors flex flex-col min-h-[220px]">
          <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-zinc-300 mb-4">
            <span className="material-symbols-outlined text-[20px]">database</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Backend Developer</h3>
          <p className="text-xs text-zinc-400 flex-grow mb-6">Systems design, API architectures, and scalable database management.</p>
          <div className="flex items-center gap-1 text-zinc-500 text-sm font-bold group-hover:text-zinc-300 transition-colors">
            Choose Role
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/5 hover:border-white/10 transition-colors flex flex-col min-h-[220px]">
          <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-zinc-300 mb-4">
            <span className="material-symbols-outlined text-[20px]">query_stats</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Data Scientist</h3>
          <p className="text-xs text-zinc-400 flex-grow mb-6">Machine learning, statistics, and complex data visualization scenarios.</p>
          <div className="flex items-center gap-1 text-zinc-500 text-sm font-bold group-hover:text-zinc-300 transition-colors">
            Choose Role
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/5 hover:border-white/10 transition-colors flex flex-col min-h-[220px]">
          <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-zinc-300 mb-4">
            <span className="material-symbols-outlined text-[20px]">groups</span>
          </div>
          <h3 className="text-lg font-bold mb-2">HR Interview</h3>
          <p className="text-xs text-zinc-400 flex-grow mb-6">Behavioral questions, culture fit, and soft skills evaluation.</p>
          <div className="flex items-center gap-1 text-zinc-500 text-sm font-bold group-hover:text-zinc-300 transition-colors">
            Choose Role
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-6 cursor-pointer hover:bg-white/5 hover:border-white/10 transition-colors flex flex-col min-h-[220px]">
          <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-zinc-300 mb-4">
            <span className="material-symbols-outlined text-[20px]">account_tree</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Product Manager</h3>
          <p className="text-xs text-zinc-400 flex-grow mb-6">Roadmapping, stakeholder management, and product-market fit.</p>
          <div className="flex items-center gap-1 text-zinc-500 text-sm font-bold group-hover:text-zinc-300 transition-colors">
            Choose Role
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>

        {/* Other Role Card */}
        <div className="border border-dashed border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/5 hover:border-white/20 transition-colors flex flex-col items-center justify-center min-h-[220px]">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 mb-4">
            <span className="material-symbols-outlined text-[24px]">add</span>
          </div>
          <h3 className="text-lg font-bold text-zinc-300">Other Role</h3>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-4xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 z-50 ml-0 md:ml-32">
        <div>
          <h3 className="text-xl font-bold mb-1">Frontend Developer Selected</h3>
          <p className="text-sm text-zinc-400">Estimated session duration: 25 minutes</p>
        </div>
        <Link href="/interview" className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold py-4 px-8 rounded-xl transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)] block text-center">
          Start Interview Session
        </Link>
      </div>
    </div>
  );
}
