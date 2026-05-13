import Image from 'next/image';

export default function HowItWorks() {
  return (
    <section className="bg-surface-container-low py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="font-h2 text-h2 mb-6">From Nervous to Noticed in 3 Steps</h2>
            <p className="text-on-surface-variant font-body-lg">
              We've streamlined the practice loop so you can focus on building muscle memory for high-stakes interviews.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-all">
              <span className="material-symbols-outlined">west</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-primary-container flex items-center justify-center bg-primary-container/10 text-primary-container cursor-pointer">
              <span className="material-symbols-outlined">east</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="text-6xl font-black text-white/5 font-h1">01</div>
            <h4 className="text-xl font-bold text-primary-container">Choose Your Path</h4>
            <p className="text-on-surface-variant">
              Select your industry, role, and experience level. Upload your CV for a truly personalized experience.
            </p>
            <div className="h-48 rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale opacity-50"
                alt="High-angle shot of a desk with professional tools and a laptop representing career planning"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChuvclll8bFLCL1IEJhCyzFA0fVTtg5mwaXrSMluBRE43sNbtFp_-yy5AgR-A5ZIKkefyzH4RqpD7KGY7zsWkJ9iSgNa_a7UohiBBigJGYXOpeeLYk6xxLXCw9h_ceLCZhbVbgkrBIpJB87Tut3Kt-1xJn2P6p7har0mq6j3jAISw8NdC_n94ta3T1PWhNGyZFIH1Z3nvNpoWGuuGPNtYIod8M5LaU6hElCa9IUYI5bHRLiq-ZuBBUvRIc0q-q35Khah4u9EL5AY4"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-6xl font-black text-white/5 font-h1">02</div>
            <h4 className="text-xl font-bold text-primary-container">Practice Session</h4>
            <p className="text-on-surface-variant">
              Engage in a full-length, voice-interactive interview with our AI agent. No scripted paths—just real conversation.
            </p>
            <div className="h-48 rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Close up of a professional studio microphone in a dark setting with blue accent lighting"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACfk1hEVRjGi7vQSxFMhIIEG86dHRMBwhPPF-s4maQ3rvaDICmMJUDN9nhAiBmOCUf-52xbJX7cwEIepmljKP6--X_9SFnBaq1btxk_jT0W3-SvMmHaTo62RJfBirZ1crdJAfHbsPNMZrKSl045fP9XqXOxsN93mWxo5lc88zPiuDlerEzToJQLqTALdEXK_hsNpuHx-A7VT2o3UScWvD_cZAkZxLuAEU5u4ju6nNoB750UxoN0MFDaxdYP-NGObITY5DxKOuXVrM"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-6xl font-black text-white/5 font-h1">03</div>
            <h4 className="text-xl font-bold text-primary-container">Review &amp; Refine</h4>
            <p className="text-on-surface-variant">
              Get a comprehensive score, feedback on every answer, and actionable tips to sound more confident.
            </p>
            <div className="h-48 rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Financial and performance charts on a dark computer screen with glowing data points"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADcVmS6C3XDQc1wwkY6K11pDfDZkjYBZT3913hfDUi0QIvTY8jz3XVnGumTT3nhH_GiHJ4V7-zhUDsyXYw4Cg5dn8AWGNQGPA-YXJYqiIjFmZfaQ6lgmzMJerGYXlAs49UrpUAncO4UHz2JxKTjVPFCnA11oTVsU8zW3hueTbKC4tQaVDLcUyf8C9i6gvP59DJ1MPONrEeHIXpPg0_NXBbyAQKecQzSi-454gDXfC7_Rgy2By9lYNtmns-tTobq_ZiL18AVCq3QXI"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
