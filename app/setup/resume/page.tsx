"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Resume parsing utilities
// ---------------------------------------------------------------------------
/**
 * Parses plain‑text resume sections. This is used after we have extracted raw
 * text from TXT, PDF or DOCX files.
 */
function parsePlainTextResume(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const result: {
    name?: string;
    skills: string[];
    projects: string[];
    education: string[];
    experienceYears?: number;
  } = {
    skills: [],
    projects: [],
    education: [],
  };

  // Recognize common resume section headings.
  const sectionPatterns: Record<string, RegExp> = {
    skills: /^(technical\s+skills|skills|core\s+competencies|technologies|tech\s+stack|areas\s+of\s+expertise)$/i,
    projects: /^(projects|personal\s+projects|academic\s+projects|key\s+projects|project\s+experience)$/i,
    education: /^(education|academic\s+background|educational\s+qualifications|academics)$/i,
    experience: /^(work\s+experience|professional\s+experience|employment\s+history|work\s+history|experience|internships?)$/i,
  };

  const sections: Record<string, string[]> = {
    skills: [],
    projects: [],
    education: [],
    experience: [],
  };

  let currentSection = "";

  for (const line of lines) {
    const normalized = line
      .replace(/[:|]+$/, "")
      .replace(/^[•●▪◦*-]\s*/, "")
      .trim();

    const matchedSection = Object.entries(sectionPatterns).find(
      ([, pattern]) => pattern.test(normalized)
    );

    if (matchedSection) {
      currentSection = matchedSection[0];
      continue;
    }

    // Also support headings such as "TECHNICAL SKILLS: React, Node.js".
    const inlineHeading = line.match(
      /^(technical\s+skills|skills|core\s+competencies|technologies|tech\s+stack|projects|personal\s+projects|academic\s+projects|education|academic\s+background|work\s+experience|professional\s+experience|employment\s+history)\s*:\s*(.+)$/i
    );

    if (inlineHeading) {
      const heading = inlineHeading[1].toLowerCase();

      if (/skill|technolog|competenc|stack/.test(heading)) {
        currentSection = "skills";
      } else if (/project/.test(heading)) {
        currentSection = "projects";
      } else if (/education|academic/.test(heading)) {
        currentSection = "education";
      } else {
        currentSection = "experience";
      }

      sections[currentSection].push(inlineHeading[2].trim());
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(line);
    }
  }

  // Candidate name: inspect only the introductory lines before resume sections.
  const firstSectionIndex = lines.findIndex((line) =>
    Object.values(sectionPatterns).some((pattern) => pattern.test(line.replace(/[:|]+$/, "").trim()))
  );

  const introLines = lines.slice(
    0,
    firstSectionIndex === -1 ? Math.min(lines.length, 5) : firstSectionIndex
  );

  const nameCandidate = introLines.find((line) => {
    const hasEmail = /@/.test(line);
    const hasPhone = /(\+?\d[\d\s()-]{8,}\d)/.test(line);
    const looksLikeUrl = /(https?:\/\/|linkedin|github\.com)/i.test(line);
    const isTooLong = line.length > 55;

    return !hasEmail && !hasPhone && !looksLikeUrl && !isTooLong;
  });

  if (nameCandidate) {
    result.name = nameCandidate.replace(/[|•]+$/, "").trim();
  }

  // Extract skills from comma, bullet, pipe or semicolon-separated content.
  result.skills = [
    ...new Set(
      sections.skills
        .join(",")
        .split(/[,;|•●▪◦]+/)
        .map((item) => item.replace(/^[\s*-]+/, "").trim())
        .filter((item) => item.length > 1 && item.length < 45)
    ),
  ];

  // Keep project descriptions as separate entries.
  result.projects = [
    ...new Set(
      sections.projects
        .map((item) => item.replace(/^[•●▪◦*-]\s*/, "").trim())
        .filter((item) => item.length > 3)
    ),
  ];

  result.education = [
    ...new Set(
      sections.education
        .map((item) => item.replace(/^[•●▪◦*-]\s*/, "").trim())
        .filter((item) => item.length > 3)
    ),
  ];

  // Only accept an explicitly stated experience duration.
  const yearsMatch = text.match(
    /(\d+(?:\.\d+)?)\s*\+?\s*years?\s+(?:of\s+)?(?:professional\s+)?experience/i
  );

  if (yearsMatch) {
    result.experienceYears = Number(yearsMatch[1]);
  }

  return result;
}

// ---------------------------------------------------------------------------
// File‑type specific extraction helpers (client side)
// ---------------------------------------------------------------------------
/** Extract text from a PDF file using pdfjs‑dist (legacy build). */

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf");

  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjs.getDocument({
    data: arrayBuffer,
  }).promise;

  const extractedPages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();



type PdfTextItem = {
  str: string;
  transform: number[];
  width?: number;
};

// Explicitly tell TypeScript that the original items are unknown.
const rawItems: unknown[] = content.items;

const items = rawItems
  .filter((item): item is PdfTextItem => {
    if (!item || typeof item !== "object") return false;

    const candidate = item as Record<string, unknown>;

    return (
      typeof candidate.str === "string" &&
      Array.isArray(candidate.transform) &&
      typeof candidate.transform[4] === "number" &&
      typeof candidate.transform[5] === "number" &&
      (candidate.width === undefined ||
        typeof candidate.width === "number")
    );
  })
  .map((item: PdfTextItem) => ({
    text: item.str.trim(),
    x: item.transform[4],
    y: item.transform[5],
    width: item.width ?? 0,
  }))
  .filter((item) => item.text.length > 0)
  .sort((a, b) => {
    if (Math.abs(b.y - a.y) > 3) {
      return b.y - a.y;
    }
    return a.x - b.x;
  });

    const rows: typeof items[] = [];

    for (const item of items) {
      let row = rows.find(
        (existingRow) => Math.abs(existingRow[0].y - item.y) <= 3
      );

      if (!row) {
        row = [];
        rows.push(row);
      }

      row.push(item);
    }

    const pageLines = rows.map((row) => {
      row.sort((a, b) => a.x - b.x);

      let line = "";
      let previousEnd = 0;

      for (const item of row) {
        const gap = item.x - previousEnd;

        if (line && gap > 2) {
          line += " ";
        }

        line += item.text;
        previousEnd = item.x + item.width;
      }

      return line.trim();
    });

    extractedPages.push(pageLines.filter(Boolean).join("\n"));
  }

  return extractedPages.join("\n\n");
}


/** Extract plain text from a DOCX file using mammoth. */
async function extractDocxText(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const { value } = await mammoth.convertToText({ arrayBuffer });
  return value;
}

/** Wrapper that selects the appropriate extractor based on MIME/extension. */
async function extractTextFromFile(file: File): Promise<string> {
  const lower = file.name.toLowerCase();
  if (file.type === "application/pdf" || lower.endsWith(".pdf")) {
    return await extractPdfText(file);
  }
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lower.endsWith(".docx")
  ) {
    return await extractDocxText(file);
  }
  if (file.type === "text/plain" || lower.endsWith(".txt") || lower.endsWith(".rtf")) {
    // Plain‑text or RTF – read directly.
    const txt = await file.text();
    return txt;
  }
  throw new Error("Unsupported file format");
}

// ---------------------------------------------------------------------------
// UI Component
// ---------------------------------------------------------------------------
export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "parsing" | "complete" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleContinue = () => {
    // Context already stored during successful parsing.
    router.push("/setup/role");
  };

  /** Consolidates parsing and validation, then stores the result. */
  const handleParsedText = (text: string) => {
    const parsed = parsePlainTextResume(text);
    const hasData =
      parsed.name ||
      parsed.skills.length ||
      parsed.projects.length ||
      parsed.education.length ||
      parsed.experienceYears;
    if (!hasData) {
      setErrorMessage(
        "No recognizable resume information was found. Please upload a different file."
      );
      setStatus("error");
      return;
    }
    const context = {
      name: parsed.name,
      skills: parsed.skills,
      projects: parsed.projects,
      education: parsed.education,
      experienceYears: parsed.experienceYears,
    };
    localStorage.setItem("interview_context", JSON.stringify(context));
    setStatus("complete");
  };

  /** Orchestrates extraction based on file type and handles errors. */
  const processFile = async (selectedFile: File) => {
    setErrorMessage(null);
    setStatus("parsing");
    try {
      const text = await extractTextFromFile(selectedFile);
      if (!text || !text.trim()) {
        throw new Error("Extracted document is empty");
      }
      handleParsedText(text);
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : "Failed to extract resume data";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      void processFile(selected);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      void processFile(dropped);
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus("idle");
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    localStorage.removeItem("interview_context");
  };


  return (
    <main className="relative min-h-full overflow-hidden bg-[#0B0F14] px-5 py-10 text-white sm:px-8 lg:px-12">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-500/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Progress header */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                Your interview journey
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Let's get to know you.
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              Upload your resume and let MockMate understand your skills,
              experience and projects before your interview.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#111820] px-5 py-4">
            <div className="mb-3 flex items-center justify-between gap-8">
              <span className="text-xs font-semibold text-zinc-300">
                Setup progress
              </span>
              <span className="text-xs font-bold text-cyan-300">01 / 03</span>
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-10 rounded-full bg-cyan-400" />
              <div className="h-1.5 w-10 rounded-full bg-white/10" />
              <div className="h-1.5 w-10 rounded-full bg-white/10" />
            </div>
            <p className="mt-2 text-[10px] text-zinc-500">
              Resume <span className="mx-1">·</span> Role <span className="mx-1">·</span> Interview
            </p>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.rtf,.txt"
          className="hidden"
        />

        {/* Upload instructions */}
        {status !== "complete" && (
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {[
              { number: "01", title: "Upload resume", description: "Share your existing CV" },
              { number: "02", title: "AI extraction", description: "We identify your profile" },
              { number: "03", title: "Personalized prep", description: "Get role-specific questions" },
            ].map((item) => (
              <div
                key={item.number}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#111820]/70 p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.07] font-mono text-xs font-bold text-cyan-300">
                  {item.number}
                </span>
                <div>
                  <p className="text-xs font-semibold text-zinc-200">{item.title}</p>
                  <p className="mt-1 text-[10px] text-zinc-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Idle upload state */}
        {status === "idle" && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Choose or drop your resume file"
            onClick={triggerFileInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerFileInput();
              }
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="group relative flex min-h-[340px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-cyan-400/25 bg-[#111820]/70 px-6 py-12 text-center transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/[0.025] sm:min-h-[380px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.055),transparent_65%)] opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300 shadow-[0_0_35px_rgba(0,212,255,0.07)] transition-transform duration-300 group-hover:-translate-y-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9">
                <path d="M12 16V4m-5 5 5-5 5 5" />
                <path d="M20 16.5v2A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-2" />
              </svg>
            </div>

            <h2 className="relative text-xl font-bold text-white sm:text-2xl">
              Drop your resume here
            </h2>
            <p className="relative mt-3 max-w-md text-sm leading-6 text-zinc-400">
              Drag and drop your file or browse your device to upload your
              resume.
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
              className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-[#071017] shadow-[0_0_25px_rgba(0,212,255,0.12)] transition-all hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path d="M12 16V4m-5 5 5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
              </svg>
              Browse files
            </button>

            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-2">
              {["PDF", "DOCX", "TXT", "RTF"].map((format) => (
                <span
                  key={format}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold tracking-wider text-zinc-400"
                >
                  {format}
                </span>
              ))}
            </div>
            <p className="relative mt-3 text-[11px] text-zinc-600">
              Maximum file size: 10 MB
            </p>
          </div>
        )}

        {/* Parsing state */}
        {status === "parsing" && (
          <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-cyan-400/20 bg-[#111820] px-6 py-12 text-center">
            <div className="relative mb-7 flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-cyan-300">
                <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">
              Analyzing your resume
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
              Extracting your skills, projects, education and experience.
              This may take a moment.
            </p>
            {file && (
              <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0B1119] px-4 py-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 text-cyan-300">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 2v6h6" />
                </svg>
                <span className="max-w-[220px] truncate text-xs text-zinc-300">
                  {file.name}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Error state */}
        {status === "error" && errorMessage && (
          <div
            className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-6 sm:p-8"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5m0 3h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-300">We couldn't process your resume</h3>
                <p className="mt-2 text-sm leading-6 text-red-200/70">{errorMessage}</p>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="mt-5 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-xs font-semibold text-red-200 transition-colors hover:bg-red-400/20"
                >
                  Try another file
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Completed state */}
        {status === "complete" && file && (
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">

            {/* Extracted information */}
            <div className="space-y-5">

              {/* File card */}
              <div className="flex items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.045] p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6m-11 4 2 2 4-4" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{file.name}</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB · Successfully analyzed
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Parsed
                </span>
                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove uploaded resume"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-red-400/10 hover:text-red-400"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6" />
                  </svg>
                </button>
              </div>

              {/* AI results */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#111820] p-6 sm:p-7">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
                      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Resume insights</h2>
                    <p className="mt-1 text-xs text-zinc-500">Information extracted from your document</p>
                  </div>
                </div>

                {(() => {
                  const ctx = JSON.parse(localStorage.getItem("interview_context") ?? "{}");
                  const sections = [
                    {
                      title: "Candidate",
                      content: ctx.name,
                    },
                    {
                      title: "Skills detected",
                      content: ctx.skills,
                      isArray: true,
                    },
                    {
                      title: "Projects",
                      content: ctx.projects,
                      isArray: true,
                    },
                    {
                      title: "Education",
                      content: ctx.education,
                      isArray: true,
                    },
                    {
                      title: "Experience",
                      content: ctx.experienceYears
                        ? `Found ${ctx.experienceYears}+ years of relevant experience.`
                        : "Experience duration not detected.",
                    },
                  ];

                  return (
                    <div className="space-y-6">
                      {sections.map((section) => {
                        const hasContent = section.isArray
                          ? Array.isArray(section.content) && section.content.length > 0
                          : Boolean(section.content);

                        return (
                          <div key={section.title}>
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                              {section.title}
                            </p>
                            {hasContent && section.isArray ? (
                              <div className="flex flex-wrap gap-2">
                                {section.content.map((item: string, index: number) => (
                                  <span
                                    key={`${item}-${index}`}
                                    className="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1.5 text-xs text-cyan-200"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm leading-6 text-zinc-300">
                                {hasContent ? section.content : "Not detected"}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Continue panel */}
            <div className="flex flex-col justify-center rounded-2xl border border-cyan-400/15 bg-[#111820] p-7 text-center sm:p-9">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-white">
                You're all set!
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Your resume has been analyzed. Next, choose the role you want
                to prepare for and build your personalized interview.
              </p>

              <button
                type="button"
                onClick={handleContinue}
                className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 px-5 py-4 text-sm font-bold text-[#071017] shadow-[0_0_25px_rgba(0,212,255,0.12)] transition-all hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Continue to role selection
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Privacy note */}
        {status !== "complete" && (
          <div className="mt-7 flex items-center justify-center gap-2 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 text-zinc-600">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-[11px] text-zinc-600">
              Your resume is used to personalize your interview preparation.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
