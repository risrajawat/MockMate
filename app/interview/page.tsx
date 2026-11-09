
"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface InterviewContext {
  role?: string;
  skills?: string[];
  projects?: string[];
  education?: string[];
  experienceYears?: number;
}

interface TranscriptionResponse {
  error?: string;
  transcript?: string;
}

interface ChatResponse {
  reply?: string;
  error?: string;
}

function subscribeToInterviewContext(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("interview-context-updated", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("interview-context-updated", onChange);
  };
}

function getInterviewContextSnapshot() {
  return window.localStorage.getItem("interview_context");
}

function getServerInterviewContextSnapshot() {
  return null;
}


function parseInterviewContext(
  savedContext: string | null
): InterviewContext | null {
  if (!savedContext) return null;

  try {
    const parsed: unknown = JSON.parse(savedContext);

    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }

    const value = parsed as Record<string, unknown>;

    return {
      role:
        typeof value.role === "string"
          ? value.role
          : undefined,

      skills: Array.isArray(value.skills)
        ? value.skills.filter(
            (skill): skill is string => typeof skill === "string"
          )
        : [],

      projects: Array.isArray(value.projects)
        ? value.projects.filter(
            (project): project is string => typeof project === "string"
          )
        : [],

      education: Array.isArray(value.education)
        ? value.education.filter(
            (item): item is string => typeof item === "string"
          )
        : [],

      experienceYears:
        typeof value.experienceYears === "number"
          ? value.experienceYears
          : undefined,
    };
  } catch {
    console.error("Failed to parse interview context");
    return null;
  }
}


function getInitialQuestion(context: InterviewContext | null): string {
  const role = context?.role?.trim();

  if (!role) {
    return "Hello! I'm Aria, your technical interviewer today. To get us started, could you please introduce yourself and tell me a bit about your background?";
  }

  const normalizedRole = role.toLowerCase();

  const isNonTech =
    normalizedRole.includes("design") ||
    normalizedRole.includes("hr") ||
    normalizedRole.includes("product") ||
    normalizedRole.includes("other");

  const interviewerType = isNonTech
    ? "interviewer"
    : "technical interviewer";

  return `Hello! I'm Aria, your ${interviewerType} today. I see you're applying for the ${role} position. To get us started, could you please introduce yourself and tell me a bit about your background?`;
}

type IconName = "mic" | "stop" | "play" | "clock" | "message" | "check" | "spark" | "x" | "arrow" | "headphones";

function UiIcon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  const paths: Record<IconName, ReactNode> = {
    mic: <><rect x="9" y="2.8" width="6" height="12" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.2M9 21.2h6" /></>,
    stop: <><rect x="6" y="6" width="12" height="12" rx="2.5" /></>,
    play: <><path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3.1A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8.5 11.5h7M8.5 14.5h4.5" /></>,
    check: <><path d="m5 12.5 4.2 4.2L19 7" /></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    headphones: <><path d="M3.5 13v-1a8.5 8.5 0 0 1 17 0v1" /><path d="M3.5 13h3v6h-1a2 2 0 0 1-2-2v-4ZM20.5 13h-3v6h1a2 2 0 0 0 2-2v-4Z" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function InterviewSession() {
  // Interview state
  const [hasStarted, setHasStarted] = useState(false);
  // const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(
    "Hello! I'm Aria, your technical interviewer today. To get us started, could you please introduce yourself and tell me a bit about your background?"
  );

  // Recording and processing state
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const messagesRef = useRef<Message[]>([]);

  const recordingIntervalRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  const autoStopTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read interview context from localStorage safely.
  const savedContextJson = useSyncExternalStore(
    subscribeToInterviewContext,
    getInterviewContextSnapshot,
    getServerInterviewContextSnapshot
  );

  const context = useMemo(
    () => parseInterviewContext(savedContextJson),
    [savedContextJson]
  );

  // Clear recording timers.
  const clearRecordingTimers = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current);
      autoStopTimeoutRef.current = null;
    }
  };

  // Release microphone resources.
  const stopMicrophone = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  // Clean up resources when the component unmounts.

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }

      if (autoStopTimeoutRef.current) {
        clearTimeout(autoStopTimeoutRef.current);
        autoStopTimeoutRef.current = null;
      }

      const recorder = mediaRecorderRef.current;

      if (recorder && recorder.state !== "inactive") {
        recorder.stop();
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (currentAudioRef.current) {
        currentAudioRef.current.onended = null;
        currentAudioRef.current.onerror = null;
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
    };
  }, []);


  // Start microphone recording.
  const startRecording = async () => {
    if (isSpeaking || isTranscribing || isProcessing || isListening) {
      return;
    }

    let stream: MediaStream | null = null;

    try {
      setErrorMessage(null);
      setTranscript("");

      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        clearRecordingTimers();

        stopMicrophone();

        setRemainingTime(0);
        setIsListening(false);
        setIsTranscribing(true);
        setErrorMessage(null);

        try {
          const blob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          if (blob.size === 0) {
            throw new Error(
              "No audio was recorded. Please try again."
            );
          }

          const form = new FormData();
          form.append("audio", blob, "recording.webm");

          const response = await fetch("/api/voice/transcribe", {
            method: "POST",
            body: form,
          });

          const data: TranscriptionResponse = await response.json();

          if (!response.ok) {
            throw new Error(
              data.error || "Transcription failed. Please try again."
            );
          }

          const transcriptText =
            typeof data.transcript === "string"
              ? data.transcript.trim()
              : "";

          if (!transcriptText) {
            throw new Error(
              "No speech was detected. Please try again."
            );
          }

          setTranscript(transcriptText);
          setErrorMessage(null);

          await handleUserSubmit(transcriptText);
        } catch (error: unknown) {
          console.error("Transcription error:", error);

          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Transcription failed. Please try again."
          );
        } finally {
          setIsTranscribing(false);
          audioChunksRef.current = [];
        }
      };

      recorder.start();

      setIsListening(true);

      const maxSeconds = 25;
      setRemainingTime(maxSeconds);

      recordingIntervalRef.current = setInterval(() => {
        setRemainingTime((previous) =>
          previous <= 1 ? 0 : previous - 1
        );
      }, 1000);

      autoStopTimeoutRef.current = setTimeout(() => {
        stopRecording();
      }, maxSeconds * 1000);
    } catch (error: unknown) {
      console.error("Microphone recording error:", error);

      stream?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      clearRecordingTimers();

      setIsListening(false);
      setRemainingTime(0);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to start recording. Please check your microphone permissions."
      );
    }
  };

  // Stop microphone recording.
  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
  };

  // Start the interview.
  const startInterview = () => {
    const firstQuestion = getInitialQuestion(context);

    setHasStarted(true);
    setCurrentQuestion(firstQuestion);

    const initialMessages: Message[] = [
      {
        role: "assistant",
        content: firstQuestion,
      },
    ];

    messagesRef.current = initialMessages;

    setErrorMessage(null);
    playAudio(firstQuestion);
  };

  // Toggle microphone recording.
  const toggleListen = () => {
    if (isSpeaking || isProcessing || isTranscribing) {
      return;
    }

    if (isListening) {
      stopRecording();
    } else {
      void startRecording();
    }
  };

  // Send the candidate's answer to the Groq-powered chat API.
  const handleUserSubmit = async (finalText: string) => {
    if (!finalText.trim()) return;

    const newMessages: Message[] = [
      ...messagesRef.current,
      {
        role: "user",
        content: finalText.trim(),
      },
    ];

    messagesRef.current = newMessages;
    setTranscript("");
    setIsProcessing(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          context,
        }),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate the next question.");
      }

      const aiReply =
        typeof data.reply === "string" ? data.reply.trim() : "";

      if (!aiReply) {
        throw new Error("The interviewer returned an empty response.");
      }

      const updatedMessages: Message[] = [
        ...newMessages,
        {
          role: "assistant",
          content: aiReply,
        },
      ];

      messagesRef.current = updatedMessages;
      setCurrentQuestion(aiReply);

      await playAudio(aiReply);
    } catch (error: unknown) {
      console.error("Error fetching AI response:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Sorry, I had trouble processing your answer. Please try again."
      );

      setCurrentQuestion(
        "Sorry, I had trouble processing your answer. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate and play interviewer speech using the TTS API.
  const playAudio = async (text: string) => {
    setIsSpeaking(true);

    let audioUrl: string | null = null;
    let audio: HTMLAudioElement | null = null;

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate interviewer speech.");
      }

      const audioBlob = await response.blob();

      if (audioBlob.size === 0) {
        throw new Error("The generated audio is empty.");
      }

      // Stop and clean up any previous audio.
      if (currentAudioRef.current) {
        currentAudioRef.current.onended = null;
        currentAudioRef.current.onerror = null;
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }

      // Create the new audio.
      audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;

      audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      const cleanup = () => {
        if (audioUrlRef.current === audioUrl) {
          if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
          }
          audioUrlRef.current = null;
        }

        if (currentAudioRef.current === audio) {
          currentAudioRef.current = null;
          setIsSpeaking(false);
        }
      };

      audio.onended = cleanup;
      audio.onerror = cleanup;

      await audio.play();
    } catch (error: unknown) {
      console.error("Error playing interviewer audio:", error);

      if (audio) {
        audio.onended = null;
        audio.onerror = null;
        audio.pause();
      }

      if (audioUrl && audioUrlRef.current === audioUrl) {
        URL.revokeObjectURL(audioUrl);
        audioUrlRef.current = null;
      }

      if (currentAudioRef.current === audio) {
        currentAudioRef.current = null;
        setIsSpeaking(false);
      } else if (!audio) {
        setIsSpeaking(false);
      }
    }
  };

  const roleLabel = context?.role?.trim() || "General Interview";
  const statusLabel = isListening
    ? "Listening to you"
    : isTranscribing
      ? "Transcribing your answer"
      : isProcessing
        ? "Aria is thinking"
        : isSpeaking
          ? "Aria is speaking"
          : hasStarted
            ? "Ready for your answer"
            : "Ready when you are";

  const isBusy = isSpeaking || isProcessing || isTranscribing;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080d12] text-white selection:bg-cyan-400/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(0,190,220,0.09),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />

      <header className="relative z-10 flex items-center justify-between border-b border-white/[0.07] bg-[#0b1118]/85 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="shrink-0 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Mock<span className="text-cyan-400">Mate</span>
          </Link>
          <span className="hidden h-6 w-px bg-white/10 sm:block" />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-xs font-semibold text-zinc-200">Interview room</p>
            <p className="truncate text-[11px] text-zinc-500">{roleLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-emerald-300">{hasStarted ? "SESSION ACTIVE" : "READY TO START"}</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-8 sm:py-10">
        {!hasStarted ? (
          <section className="my-auto grid items-center gap-10 rounded-[2rem] border border-white/[0.08] bg-[#101820]/75 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                <UiIcon name="spark" className="h-3.5 w-3.5" />
                Your personal AI interviewer
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
                Your next interview starts <span className="text-cyan-400">here.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-zinc-400">
                Settle in, speak naturally, and treat this like a real interview. Aria will guide the conversation and ask questions tailored to your preparation track.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2"><UiIcon name="mic" className="h-4 w-4 text-cyan-400" /> Voice-based practice</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2"><UiIcon name="message" className="h-4 w-4 text-cyan-400" /> Adaptive questions</span>
              </div>

              <button
                type="button"
                onClick={startInterview}
                className="mt-9 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 px-7 py-4 text-sm font-bold text-[#03202a] shadow-[0_10px_35px_rgba(0,210,235,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_14px_40px_rgba(0,210,235,0.28)] focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#101820] sm:w-auto"
              >
                <UiIcon name="play" className="h-4 w-4" />
                Start interview
                <UiIcon name="arrow" className="h-4 w-4" />
              </button>
              <p className="mt-4 text-xs text-zinc-600">Make sure your microphone is connected before starting.</p>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-8 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1219] p-5 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Meet your interviewer</p>
                    <p className="mt-1 text-sm font-semibold text-white">Aria</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[10px] font-semibold text-emerald-300">ONLINE</span>
                </div>
                <div className="relative mx-auto aspect-[4/4.5] max-w-[260px] overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#17232c] shadow-[0_0_45px_rgba(0,210,235,0.10)]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXS5x7f-Y0FmdLICUQZLMQ5JM45r-mMZ0wWhUMe19cv2WWhJgw2oa10APLL2bDztn-wI0dGpd8Y-PPbANL6-3eqUjRYIcMw61H3rkaXy5OSkM2_hh-P7EOasE9LAHzuraBDyI-7GKxBqofnQJFGHRS5W8TNONSvG5PhTrJnZg7FY0oC-OgLQ4_qBJ-Dn6gaRK4PpvaPIC-Fn6LwEE2u4ba4fMCF82itmwqVk6TjZ39pc-aDqjCss_Agam_OTTUm96dKUWItZwD0BE"
                    alt="Aria, your AI interviewer"
                    width={520}
                    height={585}
                    priority
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05090d]/95 via-[#05090d]/35 to-transparent p-5 pt-16">
                    <p className="text-lg font-bold text-white">Aria</p>
                    <p className="mt-1 text-xs text-zinc-300">Your AI interview partner</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300"><UiIcon name="headphones" className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-zinc-200">Voice conversation</p>
                    <p className="mt-0.5 text-[11px] text-zinc-500">Listen · Respond · Improve</p>
                  </div>
                  <div className="flex h-7 items-center gap-1">
                    {[10, 18, 13, 24, 15, 21, 11, 18].map((height, index) => <span key={index} className="w-1 rounded-full bg-cyan-400/80" style={{ height }} />)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="my-auto grid w-full items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Live interview</p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">You’re speaking with Aria</h1>
                  <p className="mt-1 text-sm text-zinc-500">{roleLabel}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-400">
                  <UiIcon name="clock" className="h-4 w-4 text-cyan-400" />
                  <span>Recording limit: 25 seconds</span>
                </div>
              </div>

              <div className={`relative overflow-hidden rounded-[1.75rem] border bg-[#101820] p-5 transition-colors duration-300 sm:p-7 ${isSpeaking ? "border-cyan-400/40 shadow-[0_0_45px_rgba(0,210,235,0.08)]" : isListening ? "border-rose-400/30" : "border-white/[0.08]"}`}>
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-400/[0.06] blur-3xl" />
                <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                  <div className={`relative h-32 w-32 shrink-0 rounded-2xl border p-1.5 transition-all duration-500 sm:h-40 sm:w-40 ${isSpeaking ? "border-cyan-300/70 shadow-[0_0_35px_rgba(0,210,235,0.22)]" : "border-white/10"}`}>
                    {isSpeaking && <span className="absolute -inset-2 animate-pulse rounded-[1.35rem] border border-cyan-300/30" />}
                    <div className="h-full w-full overflow-hidden rounded-xl bg-[#17232c]">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXS5x7f-Y0FmdLICUQZLMQ5JM45r-mMZ0wWhUMe19cv2WWhJgw2oa10APLL2bDztn-wI0dGpd8Y-PPbANL6-3eqUjRYIcMw61H3rkaXy5OSkM2_hh-P7EOasE9LAHzuraBDyI-7GKxBqofnQJFGHRS5W8TNONSvG5PhTrJnZg7FY0oC-OgLQ4_qBJ-Dn6gaRK4PpvaPIC-Fn6LwEE2u4ba4fMCF82itmwqVk6TjZ39pc-aDqjCss_Agam_OTTUm96dKUWItZwD0BE"
                        alt="Aria"
                        width={320}
                        height={320}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className={`absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-[3px] border-[#101820] ${isSpeaking ? "animate-pulse bg-cyan-300" : isProcessing || isTranscribing ? "bg-amber-400" : isListening ? "animate-pulse bg-rose-400" : "bg-emerald-400"}`} />
                  </div>

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                      <h2 className="text-xl font-bold text-white">Aria</h2>
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">AI interviewer</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">Your interview partner for this {roleLabel.toLowerCase()} practice session.</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/20 px-3 py-2">
                      <span className={`h-2 w-2 rounded-full ${isListening ? "bg-rose-400" : isBusy ? "bg-amber-300" : "bg-emerald-400"}`} />
                      <span className="text-xs font-medium text-zinc-300">{statusLabel}</span>
                    </div>
                    <div className="mt-5 flex h-8 items-center justify-center gap-1 sm:justify-start">
                      {(isSpeaking ? [9, 18, 26, 14, 23, 30, 16, 25, 12, 20, 9] : isListening ? [15, 25, 12, 29, 18, 25, 11, 21, 14, 27, 10] : [7, 10, 13, 9, 15, 11, 8, 13, 9, 11, 7]).map((height, index) => (
                        <span key={index} className={`w-1 rounded-full transition-all duration-300 ${isSpeaking ? "bg-cyan-300 animate-pulse" : isListening ? "bg-rose-300 animate-pulse" : "bg-cyan-400/40"}`} style={{ height: `${height}px`, animationDelay: `${index * 70}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/[0.08] bg-[#101820]/90 p-5 shadow-xl sm:p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                    <UiIcon name="message" className="h-4 w-4" />
                    Current question
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-zinc-500">{isProcessing ? "Generating" : isSpeaking ? "Read aloud" : "Interview prompt"}</span>
                </div>
                <h2 aria-live="polite" className="min-h-24 text-lg font-medium leading-8 text-zinc-100 sm:text-xl sm:leading-9">
                  {isProcessing ? <span className="animate-pulse text-zinc-500">Aria is thinking about your response…</span> : `“${currentQuestion}”`}
                </h2>
              </div>
            </div>

            <aside className="rounded-[1.5rem] border border-white/[0.08] bg-[#101820]/90 p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">Your response</p>
              <div className="mt-5 flex flex-col items-center text-center">
                <div className={`mb-4 flex h-24 w-24 items-center justify-center rounded-full border transition-all duration-300 ${isListening ? "border-rose-300/50 bg-rose-400/10 shadow-[0_0_35px_rgba(251,113,133,0.16)]" : isBusy ? "border-white/10 bg-white/[0.04]" : "border-cyan-300/30 bg-cyan-400/[0.08] shadow-[0_0_35px_rgba(0,210,235,0.10)]"}`}>
                  <button
                    type="button"
                    onClick={toggleListen}
                    disabled={isBusy}
                    aria-label={isListening ? "Stop recording" : "Start recording"}
                    className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-4 focus:ring-offset-[#101820] ${isListening ? "bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.3)] hover:bg-rose-400" : isBusy ? "cursor-not-allowed bg-zinc-800 text-zinc-500" : "bg-cyan-400 text-[#03202a] shadow-[0_0_25px_rgba(0,210,235,0.25)] hover:scale-105 hover:bg-cyan-300"}`}
                  >
                    <UiIcon name={isListening ? "stop" : "mic"} className="h-7 w-7" />
                  </button>
                </div>

                <p className="text-sm font-semibold text-white">{isListening ? "Recording your answer" : isTranscribing ? "Transcribing audio" : isProcessing ? "Preparing next question" : isSpeaking ? "Please listen to Aria" : "Ready for your answer"}</p>
                <p className="mt-2 min-h-10 text-xs leading-5 text-zinc-500">{isListening ? "Speak clearly. Tap the button again to finish." : isBusy ? "The microphone will be available when Aria finishes." : "Tap the microphone and answer naturally."}</p>

                {isListening && (
                  <div className="mt-4 w-full rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-3">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-rose-300">Recording</span>
                      <span className="font-mono font-semibold tabular-nums text-white">00:{String(remainingTime).padStart(2, "0")}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-rose-400 transition-all duration-1000" style={{ width: `${Math.max(0, (remainingTime / 25) * 100)}%` }} />
                    </div>
                  </div>
                )}

                {transcript && !isProcessing && !isListening && (
                  <div className="mt-4 w-full rounded-xl border border-white/[0.08] bg-black/20 p-3 text-left">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Your last response</p>
                    <p className="text-xs leading-5 text-zinc-300">“{transcript}”</p>
                  </div>
                )}

                {errorMessage && (
                  <div role="alert" aria-live="assertive" className="mt-4 w-full rounded-xl border border-rose-400/20 bg-rose-400/[0.07] p-3 text-left text-xs leading-5 text-rose-300">
                    <div className="mb-1 flex items-center gap-2 font-semibold"><UiIcon name="x" className="h-3.5 w-3.5" /> Something went wrong</div>
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="mt-5 border-t border-white/[0.07] pt-4 text-center text-[11px] leading-5 text-zinc-600">
                Your recording stops automatically after 25 seconds. You can also tap the microphone to stop earlier.
              </div>
            </aside>
          </section>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] bg-[#0b1118]/80 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <Link
            href="/dashboard/feedback"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/[0.05] px-5 py-3 text-sm font-semibold text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-400/10 sm:w-auto"
          >
            <UiIcon name="x" className="h-4 w-4" />
            End session
          </Link>

          <div className="flex items-center gap-2 text-[11px] text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            MockMate voice interview
          </div>

          <button
            type="button"
            disabled
            title="Skipping questions is not currently supported"
            className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-3 text-sm font-medium text-zinc-600 opacity-70 sm:w-auto"
          >
            Skip unavailable
            <UiIcon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
