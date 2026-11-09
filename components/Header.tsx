
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Setup", href: "/setup/resume" },
  { label: "Interview", href: "/interview" },
];

export const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    if (href === "/interview") return pathname.startsWith("/interview");
    return pathname.startsWith("/setup");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0B0F14]/90 px-5 py-4 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6">

        {/* Brand */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300 transition-all group-hover:bg-cyan-400/[0.15] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.12)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <rect x="4" y="7" width="16" height="13" rx="4" />
              <path d="M12 3v4M9 13h.01M15 13h.01M9 17h6" />
            </svg>
          </div>

          <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            Mock<span className="text-cyan-400">Mate</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-3">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lg px-3 py-2.5 text-xs font-semibold transition-all sm:px-4 sm:text-sm ${
                  active
                    ? "bg-cyan-400/[0.08] text-cyan-300"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
