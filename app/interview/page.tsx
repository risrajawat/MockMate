
"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useSyncExternalStore,
} from "react";
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

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <header className="px-6 py-4 flex justify-between items-center border-b border-white/5 relative z-10 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-h1 font-bold text-cyan-400">
            Mockmate AI
          </Link>

          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>

          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
            Interview Mode Active
          </span>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-full">
          <span className="material-symbols-outlined text-[16px] text-cyan-400">
            schedule
          </span>
          <span className="text-sm font-mono font-bold text-zinc-300">
            14:22
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-4xl mx-auto w-full">
        {!hasStarted ? (
          <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <div className="w-24 h-24 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-8 shadow-[0_0_50px_rgba(0,229,255,0.2)]">
              <span className="material-symbols-outlined text-[48px]">
                record_voice_over
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Ready to start?
            </h2>

            <p className="text-zinc-400 mb-10">
              Click the button below to begin your AI mock interview.
              Aria will introduce herself and ask you the first question.
            </p>

            <button
              type="button"
              onClick={startInterview}
              className="bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-[24px]">
                play_arrow
              </span>
              Start Interview Session
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-8 animate-[fadeIn_0.5s_ease-out]">
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-full border-2 p-1 mb-3 transition-colors ${isProcessing
                    ? "border-cyan-400"
                    : "border-cyan-400/30"
                    }`}
                >
                  <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden relative">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXS5x7f-Y0FmdLICUQZLMQ5JM45r-mMZ0wWhUMe19cv2WWhJgw2oa10APLL2bDztn-wI0dGpd8Y-PPbANL6-3eqUjRYIcMw61H3rkaXy5OSkM2_hh-P7EOasE9LAHzuraBDyI-7GKxBqofnQJFGHRS5W8TNONSvG5PhTrJnZg7FY0oC-OgLQ4_qBJ-Dn6gaRK4PpvaPIC-Fn6LwEE2u4ba4fMCF82itmwqVk6TjZ39pc-aDqjCss_Agam_OTTUm96dKUWItZwD0BE"
                      alt="Aria"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />

                    {(isProcessing || isSpeaking) && (
                      <div className="absolute inset-0 bg-cyan-400/20 mix-blend-overlay animate-pulse"></div>
                    )}
                  </div>
                </div>

                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-background rounded-full transition-colors ${isSpeaking
                    ? "bg-cyan-400 animate-pulse"
                    : isProcessing
                      ? "bg-yellow-400"
                      : "bg-emerald-500"
                    }`}
                ></div>
              </div>

              <div className="text-sm font-medium text-zinc-300">
                Aria - Senior Interviewer
              </div>
            </div>

            <div className="w-full bg-zinc-900/40 border border-cyan-500/20 rounded-2xl p-8 mb-16 shadow-[0_0_30px_rgba(0,229,255,0.05)] transition-all animate-[fadeIn_0.5s_ease-out]">
              <div className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">
                  forum
                </span>
                Current Question
              </div>

              <h2 className="text-xl md:text-2xl font-medium leading-relaxed min-h-[4rem]">
                {isProcessing ? (
                  <span className="text-zinc-500 italic animate-pulse">
                    Thinking...
                  </span>
                ) : (
                  <>“{currentQuestion}”</>
                )}
              </h2>
            </div>

            <div className="flex flex-col items-center w-full max-w-lg animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-center justify-center gap-1.5 h-12 mb-8 w-full">
                {isListening ? (
                  <>
                    <span className="text-white italic">
                      {remainingTime}s remaining
                    </span>

                    <div className="flex items-center justify-center gap-1.5 h-12 mb-8 w-full">
                      <div className="w-1.5 h-4 bg-cyan-400/80 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]" />
                      <div className="w-1.5 h-10 bg-cyan-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s]" />
                      <div className="w-1.5 h-14 bg-cyan-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.2s]" />
                      <div className="w-1.5 h-8 bg-cyan-400/90 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.3s]" />
                      <div className="w-1.5 h-12 bg-cyan-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s]" />
                      <div className="w-1.5 h-6 bg-cyan-400/80 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.5s]" />
                    </div>
                  </>
                ) : (
                  <div className="text-zinc-600 text-xs tracking-widest uppercase font-bold">
                    {isTranscribing
                      ? "Transcribing your answer..."
                      : isProcessing
                        ? "Processing your answer..."
                        : isSpeaking
                          ? "Aria is speaking..."
                          : "Ready"}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={toggleListen}
                disabled={isProcessing || isSpeaking || isTranscribing}
                aria-label={
                  isListening ? "Stop recording" : "Start recording"
                }
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isListening
                  ? "bg-red-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:scale-105"
                  : isProcessing || isSpeaking || isTranscribing
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-cyan-400 text-cyan-950 shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-105 animate-[pulse_2s_ease-in-out_infinite]"
                  }`}
              >
                <span className="material-symbols-outlined text-[32px]">
                  {isListening ? "stop" : "mic"}
                </span>
              </button>

              <div className="mt-6 text-sm text-center min-h-12 flex flex-col items-center gap-2">
                {isListening ? (
                  <span className="text-white italic">
                    Listening...
                  </span>
                ) : transcript && !isProcessing ? (
                  <span className="text-zinc-400 italic">
                    “{transcript}”
                  </span>
                ) : (
                  <span className="text-zinc-500 italic font-medium">
                    Press the mic to start recording. Press it again to stop,
                    or recording will stop automatically after 25 seconds.
                  </span>
                )}

                {errorMessage && (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="text-red-400 text-sm"
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="p-6 relative z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link
          href="/dashboard/feedback"
          className="bg-zinc-900 hover:bg-zinc-800 border border-red-500/20 text-red-400 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors font-medium"
        >
          <span className="material-symbols-outlined text-[20px]">
            cancel
          </span>
          End Session
        </Link>

        <div className="flex gap-4 w-full sm:w-auto">
          <button
            type="button"
            disabled
            title="Skipping questions is not currently supported"
            className="flex-1 sm:flex-none bg-zinc-900 border border-white/10 text-zinc-500 px-6 py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
          >
            <span className="material-symbols-outlined text-[20px]">
              skip_next
            </span>
            Skip unavailable
          </button>
        </div>
      </footer>
    </div>
  );
}
