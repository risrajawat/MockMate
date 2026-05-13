import Image from 'next/image';

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-h2 text-h2">Why Mockmate?</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Traditional interview prep is broken. We use advanced LLMs to simulate high-pressure scenarios tailored to your target company.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card p-8 rounded-[32px] overflow-hidden relative group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary-container">psychology</span>
            </div>
            <h3 className="font-h3 text-h3 mb-4">Hyper-Realistic Simulations</h3>
            <p className="text-on-surface-variant max-w-md">
              Our AI doesn't just read scripts. It reacts to your answers, asks follow-up questions, and pushes you to articulate your thoughts clearly.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full -z-0 opacity-20 group-hover:opacity-40 transition-opacity">
            <img
              className="w-full h-full object-cover"
              alt="Technical close-up of digital circuitry glowing with neon cyan light"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKkIozpWdlbO4l4xXyGV-Wt0HzeUek7M6OmPXGWvd8esWk08J3o6yFldW2nRw_45lKkWDT-dzBmjYysbOk0xcG1FRMYMb4S6gwHLqAAUNB99fCoW9aFa48vhk6I5MhJ_iebKids6f_b271jo9wRbff0PzDfEQO28pF2JfxUDVkKLnQQvRyi6pAP7GpstzXXCSJLo-XcEXdu99DaTg79QU1BL1hoAZIzYyNZjZv-JN6tfVZhwwwnoKycE-xUgnrlourKvhFZ7NzYtM"
            />
          </div>
        </div>
        <div className="glass-card p-8 rounded-[32px]">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-tertiary-fixed-dim">analytics</span>
          </div>
          <h3 className="font-h3 text-h3 mb-4">Instant Analysis</h3>
          <p className="text-on-surface-variant">
            Receive a detailed breakdown of your tone, body language, and answer quality seconds after you finish.
          </p>
        </div>
        <div className="glass-card p-8 rounded-[32px]">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-secondary">forum</span>
          </div>
          <h3 className="font-h3 text-h3 mb-4">Voice-First UI</h3>
          <p className="text-on-surface-variant">
            Speak naturally. Our low-latency voice engine makes it feel like you're talking to a real human recruiter.
          </p>
        </div>
        <div className="md:col-span-2 glass-card p-8 rounded-[32px] relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary-container">target</span>
              </div>
              <h3 className="font-h3 text-h3 mb-4">Company Specifics</h3>
              <p className="text-on-surface-variant">
                Upload a job description, and we'll generate questions based on that specific company's interview style and culture.
              </p>
            </div>
            <div className="bg-zinc-950/50 p-4 rounded-2xl border border-white/5">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <div className="w-6 h-6 rounded bg-zinc-700"></div>
                  <div className="h-2 w-24 bg-zinc-700 rounded"></div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-primary-container/10 border border-primary-container/20 rounded-lg">
                  <div className="w-6 h-6 rounded bg-primary-container/40"></div>
                  <div className="h-2 w-32 bg-primary-container/40 rounded"></div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <div className="w-6 h-6 rounded bg-zinc-700"></div>
                  <div className="h-2 w-20 bg-zinc-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
