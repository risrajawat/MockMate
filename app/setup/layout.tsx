
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Interviews", href: "/dashboard/feedback", icon: "interviews" },
  { label: "Resume", href: "/setup/resume", icon: "resume" },
  { label: "Resources", href: "/dashboard/resources", icon: "resources" },
  { label: "Insights", href: "/dashboard/insights", icon: "insights" },
];

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      );

    case "interviews":
      return (
        <svg {...props}>
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
          <path d="M8 12h8M8 9h5" />
        </svg>
      );

    case "resume":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6M8 13h8M8 17h8" />
        </svg>
      );

    case "resources":
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
          <path d="M8 7h8M8 11h8" />
        </svg>
      );

    case "insights":
      return (
        <svg {...props}>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 4 4 6-7" />
        </svg>
      );

    case "plus":
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case "bot":
      return (
        <svg {...props}>
          <rect x="4" y="7" width="16" height="13" rx="4" />
          <path d="M12 3v4M9 13h.01M15 13h.01M9 17h6" />
        </svg>
      );

    default:
      return null;
  }
}

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F14] text-white">

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0D131B] md:flex">

        {/* Brand */}
        <div className="border-b border-white/[0.06] px-6 py-7">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300 transition-colors group-hover:bg-cyan-400/[0.14]">
              <Icon name="bot" className="h-6 w-6" />
            </div>

            <div>
              <p className="font-display text-lg font-bold tracking-tight">
                Mock<span className="text-cyan-400">Mate</span>
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                Interview workspace
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="px-4 pt-8">
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
            Workspace
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-300"
                      : "border-transparent text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                  }`}
                >
                  {active && (
                    <span className="absolute -left-[1px] top-2.5 h-6 w-[2px] rounded-full bg-cyan-400" />
                  )}

                  <Icon
                    name={item.icon}
                    className={`h-[19px] w-[19px] ${
                      active
                        ? "text-cyan-300"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  />

                  {item.label}

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* New session */}
        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.09] to-blue-500/[0.025] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <Icon name="plus" />
            </div>

            <p className="text-sm font-semibold text-white">
              Ready to practice?
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Start a fresh personalized interview session.
            </p>

            <Link
              href="/setup/role"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-3 py-3 text-xs font-bold text-[#071017] transition-all hover:bg-cyan-300"
            >
              New Session
              <Icon name="plus" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 border-t border-white/[0.06] pt-4 text-center">
            <p className="text-[10px] text-zinc-600">
              © {new Date().getFullYear()} MockMate
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Top navigation */}
        <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0B0F14]/90 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center justify-between gap-4">

            <Link href="/" className="flex items-center gap-2 md:hidden">
              <Icon name="bot" className="h-6 w-6 text-cyan-400" />
              <span className="font-display text-base font-bold">
                Mock<span className="text-cyan-400">Mate</span>
              </span>
            </Link>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-zinc-200">
                {navItems.find((item) => isActive(item.href))?.label ?? "Workspace"}
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-500">
                Your personal interview preparation space
              </p>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-[10px] font-semibold text-emerald-300 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Workspace active
              </span>

              <Link
                href="/setup/role"
                className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-bold text-[#071017] transition-colors hover:bg-cyan-300 md:hidden"
              >
                <Icon name="plus" className="h-4 w-4" />
                New Session
              </Link>
            </div>
          </div>

          {/* Mobile navigation */}
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${
                    active
                      ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                      : "border-white/[0.07] bg-white/[0.02] text-zinc-500"
                  }`}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        {/* Page content */}
        <main className="min-h-0 flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] px-6 py-5 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} MockMate. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-600">
            Built to help you show up with confidence.
          </p>
        </footer>
      </div>
    </div>
  );
}
