import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary-container/10 blur-[120px] rounded-full -z-10"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="text-label-sm font-label-sm text-primary uppercase tracking-widest">
              Next-Gen Interview Prep
            </span>
          </div>
          <h1 className="font-h1 text-h1 text-on-surface max-w-xl">
            Practice Interviews with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-fixed-dim to-primary-container">
              AI Confidence
            </span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Master your next interview with real-time AI feedback and voice interaction. Train with the world's most advanced behavioral coach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/login" className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all group">
              Start Mock Interview
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
            <button className="glass-card px-8 py-4 rounded-xl font-semibold text-on-surface flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <span className="material-symbols-outlined">play_circle</span>
              View Demo
            </button>
          </div>
          <div className="flex items-center gap-6 pt-8">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Portrait of a young professional woman in a business setting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ACA6VVWckvG8ium8ybBw08_mXefueXNJuRhrsvucoDx7Bh4AD5BiSv6SYoAo_ikgXoNVxjrSKbHdGQwZtMQeZwOoWwLYj9tnk8CDktppkvxdlkFm-KTZuOqCClhuilUTAYvKISCiVumPCSnj3CaAqGsiUHdrD3_yLUKsKxsS1SbfquuF2lS540qoPWg3ykjM3q3-v6k6tzVc7KLiqWS1pnii70OQYr1amryfamCW2-cknp8eBVfvwIZ4z496a-HQYl4X6VC6UC0"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Portrait of a confident businessman smiling in a modern office"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXS5x7f-Y0FmdLICUQZLMQ5JM45r-mMZ0wWhUMe19cv2WWhJgw2oa10APLL2bDztn-wI0dGpd8Y-PPbANL6-3eqUjRYIcMw61H3rkaXy5OSkM2_hh-P7EOasE9LAHzuraBDyI-7GKxBqofnQJFGHRS5W8TNONSvG5PhTrJnZg7FY0oC-OgLQ4_qBJ-Dn6gaRK4PpvaPIC-Fn6LwEE2u4ba4fMCF82itmwqVk6TjZ39pc-aDqjCss_Agam_OTTUm96dKUWItZwD0BE"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Professional woman looking thoughtfully during a video conference"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKm9dxgVTIBEiWbdAUyCnzIejEtQ-Xn2B2Dzw9_cfJY2-SvmcrzdVJc9S7APJo8GFHG8ig3eD_9_dk2aqvfnwNF4u1RY8jMDZDt-le0kfG22sM-2TrVs5cQRmqO3U840mYjBoMl6xcaJWqCo9HVFI6BexOLla26SPZCQZ1UNFfJ0M9USPXAwnD8GGcv1cw1YmsbyPqxdY3idaeE_6mBo-kB5jQnqptLdDBHasSBeRrU6SSaPsU9F3ibjR5tEIKjTyFhX-VLT2YAJs"
                />
              </div>
            </div>
            <p className="text-label-sm font-label-sm text-zinc-500">JOIN 10,000+ CANDIDATES LANDING DREAM JOBS</p>
          </div>
        </div>
        <div className="relative">
          <div className="glass-card p-4 rounded-3xl neon-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                LIVE SESSION
              </div>
            </div>
            <img
              className="rounded-2xl w-full aspect-video object-cover"
              alt="Abstract 3D visualization of a glowing digital neural network or AI brain with blue and cyan pulses of light"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLBnPHS4BdI2HLZ4DeSFJJN2Supv21axhyVAnggRT5t1xiPHmcZ3bzNtmcq60X5bBy2KG9lXSrfnw_UIOMaAY9o-QNJPkZo1nA2jIF4rbawiokWZ_-iElwxZ6_iS05OK4Md0m2KJ6QF9AeJoHKWL9FkC8YElr5E75Yf7YVaGd0BBYYws3JMOhkUBwJ5tm9g1ioQLL8BGdmausc-MfkrMhDjTwIaqkQ6kIQWHkbRzFvCWF8sLt9wGTpMzeCfGIAeiAi3Dpq8Gcmhcc"
            />
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed-dim/20 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      mic
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">AI Interviewer</div>
                    <div className="text-xs text-zinc-500">"Tell me about a difficult project..."</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-1 bg-primary-container rounded-full animate-pulse"></div>
                  <div className="w-8 h-1 bg-primary-container/40 rounded-full"></div>
                  <div className="w-8 h-1 bg-primary-container/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl hidden md:block">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black text-primary-container">94%</div>
              <div className="text-xs font-medium text-zinc-400 leading-tight">
                IMPROVEMENT
                <br />
                IN CONFIDENCE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
