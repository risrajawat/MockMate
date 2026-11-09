
const features = [
  {
    number: '01',
    title: 'Conversations, not questionnaires.',
    description:
      'Practice with an AI interviewer that responds to your answers and keeps the interview conversation moving with relevant follow-up questions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      </svg>
    ),
    color: 'cyan',
    visual: 'conversation',
  },
  {
    number: '02',
    title: 'Your resume. Your interview.',
    description:
      'Bring your skills, projects and experience into the interview context. Practice questions that are more relevant to your background.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h5M8 9h1" />
      </svg>
    ),
    color: 'violet',
    visual: 'resume',
  },
  {
    number: '03',
    title: 'Speak naturally. Get comfortable.',
    description:
      'Practice answering questions out loud with voice interaction. Build confidence through realistic spoken interview sessions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" />
      </svg>
    ),
    color: 'blue',
    visual: 'voice',
  },
  {
    number: '04',
    title: 'Know what to improve next.',
    description:
      'Review your interview performance and understand where your answers can become clearer, stronger and more structured.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 6-7" />
      </svg>
    ),
    color: 'cyan',
    visual: 'feedback',
  },
];

function FeatureVisual({ type }: { type: string }) {
  if (type === 'conversation') {
    return (
      <div className="mt-8 space-y-3 rounded-xl border border-white/[0.07] bg-[#0A1017] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
            <span className="text-xs font-bold">AI</span>
          </div>
          <div className="rounded-xl rounded-tl-sm border border-white/[0.07] bg-white/[0.035] p-3">
            <p className="text-xs leading-5 text-zinc-300">
              Can you explain how you handled a challenging project?
            </p>
          </div>
        </div>
        <div className="flex items-start justify-end gap-3">
          <div className="max-w-[85%] rounded-xl rounded-tr-sm border border-cyan-400/15 bg-cyan-400/[0.07] p-3">
            <p className="text-xs leading-5 text-zinc-300">
              I started by breaking the problem into smaller tasks...
            </p>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
            <span className="text-xs font-bold">YOU</span>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 text-[10px] text-cyan-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
          Ready for the next question
        </div>
      </div>
    );
  }

  if (type === 'resume') {
    return (
      <div className="mt-8 rounded-xl border border-white/[0.07] bg-[#0A1017] p-4">
        <div className="flex items-center gap-3 border-b border-white/[0.07] pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
              <path d="M14 2v6h6M8 13h8M8 17h5" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-200">Your resume</p>
            <p className="text-[10px] text-zinc-500">Interview context</p>
          </div>
          <span className="ml-auto rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2 py-1 text-[9px] font-semibold text-emerald-300">
            CONTEXT READY
          </span>
        </div>
        <div className="space-y-3 pt-4">
          <div>
            <div className="mb-2 flex justify-between text-[10px] text-zinc-400">
              <span>Skills</span>
              <span>Relevant context</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Python'].map((skill) => (
                <span key={skill} className="rounded-md border border-violet-400/15 bg-violet-400/[0.07] px-2.5 py-1 text-[10px] text-violet-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="h-px bg-white/[0.06]" />
          <p className="text-[10px] leading-5 text-zinc-500">
            Your projects and experience can help shape more relevant practice questions.
          </p>
        </div>
      </div>
    );
  }

  if (type === 'voice') {
    return (
      <div className="mt-8 flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#0A1017] p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Voice interaction
          </div>
          <p className="mt-2 text-[10px] text-zinc-500">
            Listen. Respond. Improve.
          </p>
        </div>
        <div className="flex h-12 items-center gap-[3px]">
          {[12, 20, 32, 18, 38, 25, 44, 19, 34, 24, 40, 17, 30, 12].map(
            (height, index) => (
              <span
                key={index}
                style={{ height: `${height}px` }}
                className={`w-[3px] rounded-full ${
                  index % 3 === 0 ? 'bg-blue-400' : 'bg-cyan-400'
                }`}
              />
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl border border-white/[0.07] bg-[#0A1017] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-zinc-300">
          Interview review
        </p>
        <span className="text-[10px] text-zinc-500">Sample preview</span>
      </div>
      <div className="mt-5 space-y-4">
        {[
          { label: 'Answer clarity', width: '85%' },
          { label: 'Communication', width: '72%' },
          { label: 'Answer structure', width: '90%' },
        ].map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-[10px]">
              <span className="text-zinc-400">{item.label}</span>
              <span className="text-cyan-300">Review area</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400"
                style={{ width: item.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              Built for better interviews
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need to
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              walk in with confidence.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            More than a list of interview questions. MockMate helps you
            practice speaking, think through your answers and learn from
            every session.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111820] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_15px_50px_rgba(0,212,255,0.06)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/[0.025] blur-3xl transition-all duration-500 group-hover:bg-cyan-400/[0.07]" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                      feature.color === 'violet'
                        ? 'border-violet-400/20 bg-violet-400/10 text-violet-300'
                        : feature.color === 'blue'
                          ? 'border-blue-400/20 bg-blue-400/10 text-blue-300'
                          : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <span className="font-mono text-xs text-zinc-600">
                    / {feature.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-400">
                  {feature.description}
                </p>

                <FeatureVisual type={feature.visual} />
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="m5 12 4 4L19 6" />
            </svg>
          </span>
          <p className="text-xs text-zinc-500">
            Practice at your own pace. Learn from every interview.
          </p>
        </div>
      </div>
    </section>
  );
}
