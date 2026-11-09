
const steps = [
  {
    number: '01',
    title: 'Upload your resume',
    description:
      'Start by uploading your resume. MockMate uses your skills, projects and experience to build your interview context.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M12 18v-6m-3 3 3-3 3 3" />
      </svg>
    ),
    visual: 'resume',
  },
  {
    number: '02',
    title: 'Choose your role',
    description:
      'Select the position you want to prepare for and configure your interview based on your career goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </svg>
    ),
    visual: 'role',
  },
  {
    number: '03',
    title: 'Start your interview',
    description:
      'Enter a voice-based interview with your AI interviewer. Listen to questions, speak your answers and experience a natural conversation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" />
      </svg>
    ),
    visual: 'interview',
  },
  {
    number: '04',
    title: 'Review your feedback',
    description:
      'Go through your interview results, identify improvement areas and use the insights to prepare for your next attempt.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 6-7" />
      </svg>
    ),
    visual: 'feedback',
  },
];

function StepVisual({ type }: { type: string }) {
  if (type === 'resume') {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-white/[0.07] bg-[#0A1017] p-5">
        <div className="w-full max-w-[230px] rounded-xl border border-white/10 bg-[#151E29] p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <path d="M14 2v6h6" />
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-2 w-24 rounded-full bg-zinc-300/30" />
              <div className="h-1.5 w-16 rounded-full bg-zinc-600/60" />
            </div>
            <span className="text-emerald-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>
          </div>
          <div className="mt-5 space-y-2.5">
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
            <div className="h-1.5 w-11/12 rounded-full bg-white/10" />
            <div className="mt-4 flex gap-2">
              <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-[9px] text-cyan-300">Skills</span>
              <span className="rounded-md bg-violet-400/10 px-2 py-1 text-[9px] text-violet-300">Projects</span>
              <span className="rounded-md bg-blue-400/10 px-2 py-1 text-[9px] text-blue-300">Experience</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'role') {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-white/[0.07] bg-[#0A1017] p-5">
        <div className="grid w-full max-w-[260px] grid-cols-2 gap-2.5">
          {[
            { name: 'Frontend Dev', icon: 'code', active: true },
            { name: 'Backend Dev', icon: 'server', active: false },
            { name: 'Data Scientist', icon: 'chart', active: false },
            { name: 'Product Manager', icon: 'briefcase', active: false },
          ].map((role) => (
            <div
              key={role.name}
              className={`rounded-xl border p-3 transition-colors ${
                role.active
                  ? 'border-cyan-400/40 bg-cyan-400/[0.08]'
                  : 'border-white/[0.07] bg-white/[0.02]'
              }`}
            >
              <div className={`mb-3 text-lg ${role.active ? 'text-cyan-300' : 'text-zinc-500'}`}>
                {role.icon === 'code' ? '</>' : role.icon === 'server' ? '⌘' : role.icon === 'chart' ? '▥' : '◫'}
              </div>
              <p className={`text-[10px] font-semibold ${role.active ? 'text-cyan-200' : 'text-zinc-400'}`}>
                {role.name}
              </p>
              {role.active && (
                <div className="mt-2 flex items-center gap-1 text-[9px] text-cyan-300">
                  <span className="h-1 w-1 rounded-full bg-cyan-400" />
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'interview') {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-[#0A1017] p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(0,212,255,0.1)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
            <rect x="4" y="7" width="16" height="13" rx="4" />
            <path d="M12 3v4M9 13h.01M15 13h.01M9 17h6" />
          </svg>
        </div>
        <p className="mt-3 text-xs font-semibold text-white">AI Interviewer</p>
        <p className="mt-1 text-[10px] text-zinc-500">Listening to your response</p>
        <div className="mt-4 flex h-7 items-center gap-[3px]">
          {[10, 18, 25, 14, 29, 19, 32, 16, 24, 12, 20, 9].map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}px` }}
              className={`w-[3px] rounded-full ${index % 3 === 0 ? 'bg-blue-400' : 'bg-cyan-400'}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-48 flex-col justify-center rounded-xl border border-white/[0.07] bg-[#0A1017] p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold text-zinc-200">Your interview review</p>
        <span className="rounded-md bg-violet-400/10 px-2 py-1 text-[9px] text-violet-300">Feedback</span>
      </div>
      {[
        { label: 'Answer clarity', width: '85%' },
        { label: 'Communication', width: '72%' },
        { label: 'Answer structure', width: '90%' },
      ].map((item) => (
        <div key={item.label} className="mb-3">
          <div className="mb-1.5 flex justify-between text-[10px]">
            <span className="text-zinc-400">{item.label}</span>
            <span className="text-cyan-300">Review</span>
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
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.035] blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                Simple by design
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your next interview.
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Four steps closer.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              From setting up your profile to reviewing your performance,
              getting started with MockMate is straightforward.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-zinc-500 md:flex">
            <span>YOUR JOURNEY</span>
            <span className="h-px w-12 bg-cyan-400/40" />
            <span className="text-cyan-300">01 — 04</span>
          </div>
        </div>

        {/* Steps */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111820] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_15px_45px_rgba(0,212,255,0.05)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300 transition-colors group-hover:bg-cyan-400/[0.13]">
                  {step.icon}
                </div>
                <span className="font-mono text-sm text-zinc-600">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-3 min-h-[84px] text-sm leading-6 text-zinc-400">
                {step.description}
              </p>

              <StepVisual type={step.visual} />

              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-10 hidden h-px w-5 translate-x-full bg-gradient-to-r from-cyan-400/40 to-transparent xl:block" />
              )}
            </article>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-white">
              Ready to experience your first practice interview?
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Start preparing at your own pace with MockMate.
            </p>
          </div>
          <a
            href="/login"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-xs font-bold text-[#071017] transition-all hover:bg-cyan-300"
          >
            Get Started
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
