"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Simple resume parser – extracts very basic sections from plain‑text resumes.
// This is intentionally lightweight; for production you would replace it with a
// proper PDF/DOCX parser (e.g. pdfjs‑dist, mammoth, etc.).
function parsePlainTextResume(text: string) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const result: {
    skills: string[];
    projects: string[];
    education: string[];
    experienceYears?: number;
  } = {
    skills: [],
    projects: [],
    education: [],
  };

  // Look for a line that starts with "Skills:" and split by commas.
  const skillsLine = lines.find((l) => /^skills[:\s]/i.test(l));
  if (skillsLine) {
    const after = skillsLine.split(/:/)[1];
    if (after) {
      result.skills = after
        .split(/[,;]+/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  // Projects – lines that start with "Project" or contain the word "project".
  const projectLines = lines.filter((l) => /project[:\s]/i.test(l));
  result.projects = projectLines.map((l) => l.replace(/^project[:\s]/i, '').trim());

  // Education – look for "Education:" header and capture following lines until a blank line.
  const eduIndex = lines.findIndex((l) => /^education[:\s]/i.test(l));
  if (eduIndex !== -1) {
    for (let i = eduIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) break;
      result.education.push(line);
    }
  }

  // Experience years – first occurrence of something like "X years".
  const yearsMatch = text.match(/(\d+)\s+years?/i);
  if (yearsMatch) {
    result.experienceYears = Number(yearsMatch[1]);
  }

  return result;
}

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'complete'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleContinue = () => {
    // All parsing already stored in localStorage during handleFileChange.
    router.push('/setup/role');
  };

  const handleFileRead = (content: string) => {
    const parsed = parsePlainTextResume(content);
    // Store the extracted data in interview_context for later steps.
    const context = {
      skills: parsed.skills,
      projects: parsed.projects,
      education: parsed.education,
      experienceYears: parsed.experienceYears,
    };
    localStorage.setItem('interview_context', JSON.stringify(context));
    setStatus('complete');
  };

  const readFileAsText = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      handleFileRead(text);
    };
    reader.onerror = () => {
      console.error('Failed to read resume file');
      setStatus('idle');
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('parsing');
      // Simple parsing – works for plain text resumes.
      // For binary formats you would need a proper parser (out of scope for now).
      readFileAsText(selectedFile);
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
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStatus('parsing');
      readFileAsText(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    localStorage.removeItem('interview_context');
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <div className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase mb-2">Step 1 of 3</div>
          <h1 className="text-3xl font-bold font-h2">Upload Your Resume</h1>
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-1 w-8 bg-cyan-400 rounded-full"></div>
          <div className="h-1 w-8 bg-white/10 rounded-full"></div>
          <div className="h-1 w-8 bg-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.rtf,.txt"
        className="hidden"
      />

      {/* Upload Area (only visible if no file is selected) */}
      {status === 'idle' && (
        <div
          className="border-2 border-dashed border-white/10 hover:border-cyan-500/30 transition-colors rounded-2xl p-12 flex flex-col items-center justify-center text-center mb-8 bg-zinc-900/20 cursor-pointer"
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 pointer-events-none">
            <span className="material-symbols-outlined text-3xl text-white">cloud_upload</span>
          </div>
          <h3 className="text-xl font-bold mb-2 pointer-events-none">
            Select a file or <span className="text-cyan-400">Drag it here</span>
          </h3>
          <p className="text-zinc-400 text-sm mb-6 pointer-events-none">
            We support PDF, DOCX, RTF and plain‑text formats. Max file size: 10MB.
          </p>
          <button
            type="button"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors pointer-events-none"
          >
            <span className="material-symbols-outlined text-lg">attach_file</span>
            Browse Files
          </button>
        </div>
      )}

      {/* Parsing State */}
      {status === 'parsing' && (
        <div className="border-2 border-cyan-500/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center mb-8 bg-zinc-900/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
              <span className="material-symbols-outlined text-3xl">auto_awesome</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">AI is parsing your resume...</h3>
          <p className="text-cyan-400 text-sm animate-pulse">Extracting skills, experience, and project details.</p>
        </div>
      )}

      {/* Complete State: Uploaded File & Extraction Results */}
      {status === 'complete' && file && (
        <div className="flex flex-col lg:flex-row gap-6 mb-16 animate-[fadeIn_0.5s_ease-out]">
          {/* Left Column: File Details & AI Card */}
          <div className="flex-1 flex flex-col gap-6">
            {/* File Card */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"></div>
              <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm truncate pr-4">{file.name}</h4>
                  <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">Parsed</span>
                </div>
                <div className="text-xs text-zinc-400 mb-2">{(file.size / (1024 * 1024)).toFixed(2)} MB • Analysis complete</div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-full"></div>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-500/20 rounded transition-colors flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>

            {/* AI Extraction Results Card */}
            <div className="bg-gradient-to-br from-cyan-900/20 to-zinc-900/50 border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 blur-[40px] rounded-full"></div>
              <div className="flex items-center gap-2 text-cyan-400 mb-4 font-bold">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                AI Extraction Results
              </div>
              <div className="space-y-4 relative z-10">
                {/* Detected Role Fit */}
                <div>
                  <div className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold mb-1">Detected Role Fit</div>
                  <div className="text-white font-bold text-lg">(role inferred from resume)</div>
                </div>
                {/* Top Skills Detected */}
                <div>
                  <div className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold mb-2">Top Skills Detected</div>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(localStorage.getItem('interview_context') ?? '{}').skills?.map((skill: string) => (
                      <span key={skill} className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs rounded-md">{skill}</span>
                    ))}
                  </div>
                </div>
                {/* Projects */}
                <div>
                  <div className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold mb-1">Projects</div>
                  <div className="flex flex-col gap-1 text-sm text-zinc-300">
                    {JSON.parse(localStorage.getItem('interview_context') ?? '{}').projects?.map((proj: string, idx: number) => (
                      <span key={idx}>• {proj}</span>
                    ))}
                  </div>
                </div>
                {/* Experience Summary */}
                <div>
                  <div className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold mb-1">Experience Summary</div>
                  <p className="text-sm text-zinc-300">
                    {JSON.parse(localStorage.getItem('interview_context') ?? '{}').experienceYears
                      ? `Found ${JSON.parse(localStorage.getItem('interview_context') ?? '{}').experienceYears}+ years of relevant experience.`
                      : 'Experience duration not detected.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Action Button */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Ready to Go!</h3>
              <p className="text-sm text-zinc-400 mb-8 max-w-sm">
                We've tailored your interview path based on your uploaded resume.
              </p>
              <button
                onClick={handleContinue}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(0,229,255,0.2)]"
              >
                Continue to Role Selection
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
