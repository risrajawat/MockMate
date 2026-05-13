import Link from 'next/link';

export default function FeedbackDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-h2 mb-1">Interview Feedback</h1>
          <p className="text-sm text-zinc-400">Senior Software Engineer Role • Oct 24, 2024</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download Report
          </button>
          <Link href="/setup/role" className="bg-cyan-400 hover:bg-cyan-300 text-cyan-950 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Retake Interview
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Overall Score */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
          <h3 className="font-bold text-lg mb-6 w-full text-left">Overall Score</h3>
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#00e5ff" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="62.2" className="drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" strokeLinecap="round" />
            </svg>
            <div className="absolute flex items-baseline gap-1">
              <span className="text-4xl font-bold font-h1">78</span>
              <span className="text-sm text-zinc-500 font-medium">/100</span>
            </div>
          </div>
          <p className="text-sm text-zinc-400">
            You're in the top 15% of candidates for this role. Excellent technical accuracy.
          </p>
        </div>

        {/* Performance History */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Performance History</h3>
            <span className="text-[10px] tracking-widest text-cyan-400 uppercase font-bold bg-cyan-950/30 px-2 py-1 rounded">Last 5 Sessions</span>
          </div>
          <div className="flex-1 w-full flex items-end relative min-h-[150px]">
            {/* Mock Chart */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <polyline points="0,70 25,65 50,75 75,55 100,50" fill="none" stroke="#00e5ff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle cx="0" cy="70" r="3" fill="#00e5ff" />
              <circle cx="25" cy="65" r="3" fill="#00e5ff" />
              <circle cx="50" cy="75" r="3" fill="#00e5ff" />
              <circle cx="75" cy="55" r="3" fill="#00e5ff" />
              <circle cx="100" cy="50" r="3" fill="#00e5ff" className="drop-shadow-[0_0_8px_rgba(0,229,255,1)]" />
            </svg>
            
            <div className="w-full flex justify-between text-[10px] text-zinc-500 font-medium absolute -bottom-5">
              <span>Sep 12</span>
              <span>Sep 28</span>
              <span>Oct 05</span>
              <span>Oct 18</span>
              <span className="text-cyan-400">Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-zinc-900/40 border border-cyan-500/30 rounded-xl p-5 shadow-[0_0_15px_rgba(0,229,255,0.03)]">
          <div className="flex items-center gap-2 text-cyan-400 font-bold mb-4">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            Confidence
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-zinc-400">Stability & Tone</span>
            <span className="font-bold text-cyan-400">85%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-cyan-400 w-[85%] rounded-full shadow-[0_0_8px_rgba(0,229,255,0.5)]"></div>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">Minimal filler words and steady pacing throughout the technical section.</p>
        </div>

        <div className="bg-zinc-900/40 border border-purple-500/30 rounded-xl p-5 shadow-[0_0_15px_rgba(168,85,247,0.03)]">
          <div className="flex items-center gap-2 text-purple-400 font-bold mb-4">
            <span className="material-symbols-outlined text-[18px]">notes</span>
            Clarity
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-zinc-400">Conciseness</span>
            <span className="font-bold text-purple-400">68%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-purple-400 w-[68%] rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">Technical explanations were accurate but sometimes lacked simplified analogies.</p>
        </div>

        <div className="bg-zinc-900/40 border border-emerald-500/30 rounded-xl p-5 shadow-[0_0_15px_rgba(16,185,129,0.03)]">
          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4">
            <span className="material-symbols-outlined text-[18px]">star</span>
            STAR Structure
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-zinc-400">Framework Adherence</span>
            <span className="font-bold text-emerald-400">92%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-emerald-400 w-[92%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed">Excellent results-oriented delivery in behavioral responses.</p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4 font-bold text-lg">
            <span className="material-symbols-outlined text-cyan-400">tips_and_updates</span>
            Actionable Suggestions
          </div>
          <div className="space-y-3">
            <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl flex gap-4">
              <span className="material-symbols-outlined text-cyan-400 mt-0.5">check_circle</span>
              <div>
                <h4 className="font-bold text-sm mb-1 text-zinc-200">Improve System Design Analogies</h4>
                <p className="text-xs text-zinc-400">When explaining load balancing, use real-world traffic examples to help non-technical interviewers follow along.</p>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl flex gap-4">
              <span className="material-symbols-outlined text-cyan-400 mt-0.5">check_circle</span>
              <div>
                <h4 className="font-bold text-sm mb-1 text-zinc-200">Reduce "Uhm" Frequency</h4>
                <p className="text-xs text-zinc-400">You used 12 filler words during the "Conflict Management" question. Try pausing for a breath instead.</p>
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl flex gap-4">
              <span className="material-symbols-outlined text-cyan-400 mt-0.5">check_circle</span>
              <div>
                <h4 className="font-bold text-sm mb-1 text-zinc-200">Expand on 'Results' in STAR</h4>
                <p className="text-xs text-zinc-400">Include more quantitative data (percentages, time saved) in your response about team leading.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-colors"></div>
          
          <div className="text-[10px] tracking-widest text-emerald-400 font-bold uppercase mb-2 bg-emerald-950/50 inline-block px-2 py-1 rounded">Pro Tip</div>
          <h3 className="text-xl font-bold font-h2 mb-2 text-white">Mastering the 'Why'</h3>
          <p className="text-sm text-zinc-400 mb-6 relative z-10">
            Our AI detected that your strongest answers are when you explain the underlying reasoning behind architectural choices.
          </p>
          
          {/* Decorative element */}
          <div className="relative h-24 w-full opacity-60">
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <polyline points="0,80 20,70 40,90 60,40 80,60 100,20" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
              <circle cx="100" cy="20" r="4" fill="#10b981" className="animate-pulse" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
