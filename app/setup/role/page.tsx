
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ROLES = [
  {
    id: "Frontend Developer",
    title: "Frontend Developer",
    icon: "code",
    category: "ENGINEERING",
    description:
      "React, Vue, component architecture, performance optimization, and modern UI engineering.",
  },
  {
    id: "Backend Developer",
    title: "Backend Developer",
    icon: "server",
    category: "ENGINEERING",
    description:
      "System design, REST APIs, databases, authentication, and scalable backend architecture.",
  },
  {
    id: "Data Scientist",
    title: "Data Scientist",
    icon: "chart",
    category: "DATA & AI",
    description:
      "Machine learning, statistics, Python, data analysis, and real-world modeling scenarios.",
  },
  {
    id: "HR Interview",
    title: "HR Interview",
    icon: "users",
    category: "BEHAVIORAL",
    description:
      "Behavioral questions, communication, workplace situations, and culture-fit evaluation.",
  },
  {
    id: "Product Manager",
    title: "Product Manager",
    icon: "target",
    category: "PRODUCT",
    description:
      "Product strategy, roadmapping, prioritization, stakeholder management, and product thinking.",
  },
  {
    id: "Designer",
    title: "UI/UX Designer",
    icon: "design",
    category: "DESIGN",
    description:
      "User research, wireframing, prototyping, design systems, and user-centered design.",
  },
];

function RoleIcon({ name }: { name: string }) {
  const common = {
    width: 25,
    height: 25,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "code":
      return (
        <svg {...common}>
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
        </svg>
      );

    case "server":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="8" rx="2" />
          <rect x="3" y="13" width="18" height="8" rx="2" />
          <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
        </svg>
      );

    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 3 2 6-7" />
          <path d="M16 5h4v4" />
        </svg>
      );

    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" />
          <path d="m16 8 5-5M17 3h4v4" />
        </svg>
      );

    case "design":
      return (
        <svg {...common}>
          <path d="m15 5 4 4M4 20l4-.8L19 8a2.12 2.12 0 0 0-3-3L5 16l-1 4Z" />
          <path d="m13 7 4 4" />
        </svg>
      );

    default:
      return null;
  }
}

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const router = useRouter();

  const handleStart = () => {
    try {
      const existingContextStr = localStorage.getItem("interview_context");
      const context = existingContextStr
        ? JSON.parse(existingContextStr)
        : {};

      context.role = selectedRole;

      localStorage.setItem("interview_context", JSON.stringify(context));
    } catch (error) {
      console.error("Error saving interview context:", error);

      localStorage.setItem(
        "interview_context",
        JSON.stringify({ role: selectedRole })
      );
    }

    router.push("/interview");
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-36 pt-10 sm:px-8 lg:pt-14">

      {/* Page heading */}
      <section className="mb-12">
        <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-cyan-300">
            INTERVIEW SETUP
          </span>
          <span className="text-xs text-zinc-500">STEP 02 / 03</span>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
              Choose your next{" "}
              <span className="text-cyan-400">challenge.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              Select the role you're preparing for. MockMate will tailor your
              interview questions, follow-ups, and feedback to your career path.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/[0.07] bg-[#111820] px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <RoleIcon name="target" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-200">
                Personalized practice
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                Built around your target role
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role selection */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-200">
              Available interview tracks
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Choose one to personalize your session
            </p>
          </div>

          <span className="text-xs text-zinc-500">
            {ROLES.length} roles available
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                aria-pressed={isSelected}
                className={`group relative flex min-h-[225px] flex-col overflow-hidden rounded-2xl border p-6 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-cyan-400/70 bg-cyan-400/[0.055] shadow-[0_0_28px_rgba(0,212,255,0.07)]"
                    : "border-white/[0.07] bg-[#111820] hover:-translate-y-1 hover:border-white/20 hover:bg-[#151e28]"
                }`}
              >
                {/* Selected accent */}
                {isSelected && (
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
                )}

                <div className="relative z-10 flex w-full items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
                      isSelected
                        ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
                        : "border-white/[0.07] bg-white/[0.035] text-zinc-400 group-hover:text-cyan-300"
                    }`}
                  >
                    <RoleIcon name={role.icon} />
                  </div>

                  {isSelected ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-[#06151a]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-semibold tracking-wider text-zinc-500">
                      {role.category}
                    </span>
                  )}
                </div>

                <div className="relative z-10 mt-6">
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      isSelected ? "text-white" : "text-zinc-200"
                    }`}
                  >
                    {role.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-zinc-400">
                    {role.description}
                  </p>
                </div>

                <div
                  className={`relative z-10 mt-auto flex items-center gap-2 pt-5 text-xs font-semibold ${
                    isSelected
                      ? "text-cyan-300"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {isSelected ? "Selected track" : "Select this role"}
                  <span aria-hidden="true">→</span>
                </div>
              </button>
            );
          })}

          {/* Other role */}
          <button
            type="button"
            onClick={() => setSelectedRole("Other Role")}
            aria-pressed={selectedRole === "Other Role"}
            className={`group flex min-h-[225px] flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition-all duration-200 ${
              selectedRole === "Other Role"
                ? "border-cyan-400/70 bg-cyan-400/[0.055]"
                : "border-white/15 bg-white/[0.015] hover:border-cyan-400/40 hover:bg-cyan-400/[0.025]"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${
                selectedRole === "Other Role"
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 group-hover:text-cyan-300"
              }`}
            >
              {selectedRole === "Other Role" ? (
                <RoleIcon name="code" />
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              )}
            </div>

            <h3
              className={`mt-5 text-lg font-bold ${
                selectedRole === "Other Role"
                  ? "text-cyan-300"
                  : "text-zinc-200"
              }`}
            >
              Other Role
            </h3>

            <p className="mt-2 max-w-[220px] text-xs leading-5 text-zinc-500">
              Preparing for a different career path?
            </p>

            <span className="mt-4 text-xs font-semibold text-cyan-300">
              {selectedRole === "Other Role" ? "Selected" : "Choose this role"}
            </span>
          </button>
        </div>
      </section>

      {/* Selected role action bar */}
      <div className="fixed bottom-5 left-4 right-4 z-50 md:left-[calc(16rem+2rem)] md:right-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-white/10 bg-[#151b23]/95 p-4 shadow-[0_12px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <RoleIcon
                name={
                  ROLES.find((role) => role.id === selectedRole)?.icon ??
                  "code"
                }
              />
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                Your selected track
              </p>
              <h3 className="mt-1 text-base font-bold text-white">
                {selectedRole}
              </h3>
              <p className="mt-1 text-[11px] text-zinc-500">
                Estimated session duration: 25 minutes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-bold text-[#06202a] shadow-[0_0_25px_rgba(0,212,255,0.16)] transition-all hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] sm:w-auto sm:min-w-[230px]"
          >
            Start Interview
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
