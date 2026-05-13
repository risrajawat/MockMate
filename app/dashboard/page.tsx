export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-10 w-full h-full flex flex-col items-center justify-center text-center">
      <span className="material-symbols-outlined text-[64px] text-cyan-400 mb-6">grid_view</span>
      <h1 className="text-3xl font-bold font-h2 mb-4">Your Dashboard</h1>
      <p className="text-zinc-400 max-w-md">
        Welcome to your Mockmate AI dashboard. Your upcoming interviews, recent activity, and overall statistics will appear here.
      </p>
    </div>
  );
}
