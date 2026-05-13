import Link from 'next/link';

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="relative rounded-[40px] bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-12 lg:p-24 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent)]"></div>
        <div className="relative z-10 space-y-8">
          <h2 className="font-h1 text-h1 max-w-3xl mx-auto">
            Ready to Crush Your Next Big Interview?
          </h2>
          <p className="text-on-surface-variant font-body-lg max-w-xl mx-auto">
            Join thousands of successful candidates who used Mockmate to secure offers at Google, Meta, and Stripe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Link href="/login" className="bg-primary-container text-on-primary-container px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all">
              Start Mock Interview
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
