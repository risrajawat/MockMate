"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function InterviewSession() {
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("Hello! I'm Aria, your technical interviewer today. To get us started, could you please introduce yourself and tell me a bit about your background?");
  
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [transcript, setTranscript] = useState("");
  
  const transcriptRef = useRef("");
  const messagesRef = useRef<Message[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false; 
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          if (transcriptRef.current.trim()) {
            handleUserSubmit(transcriptRef.current);
          }
        };
      }
    }
  }, []);

  const startInterview = () => {
    setHasStarted(true);
    setMessages([{ role: 'assistant', content: currentQuestion }]);
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleUserSubmit = async (finalText: string) => {
    if (!finalText.trim()) return;

    const newMessages = [...messagesRef.current, { role: 'user' as const, content: finalText }];
    setMessages(newMessages);
    setTranscript("");
    setIsProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      const aiReply = data.reply;

      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
      setCurrentQuestion(aiReply);
      
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setCurrentQuestion("Sorry, I had trouble processing that. Please check if your API key is in the .env.local file and restart the server.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <header className="px-6 py-4 flex justify-between items-center border-b border-white/5 relative z-10 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-h1 font-bold text-cyan-400">Mockmate AI</Link>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">Interview Mode Active</span>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-full">
          <span className="material-symbols-outlined text-[16px] text-cyan-400">schedule</span>
          <span className="text-sm font-mono font-bold text-zinc-300">14:22</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-4xl mx-auto w-full">
        {!hasStarted ? (
          <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
             <div className="w-24 h-24 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-8 shadow-[0_0_50px_rgba(0,229,255,0.2)]">
                <span className="material-symbols-outlined text-[48px]">record_voice_over</span>
             </div>
             <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
             <p className="text-zinc-400 mb-10">
               Click the button below to begin your AI mock interview. Aria will introduce herself and ask you the first question.
             </p>
             <button 
               onClick={startInterview}
               className="bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-3"
             >
               <span className="material-symbols-outlined text-[24px]">play_arrow</span>
               Start Interview Session
             </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-8 animate-[fadeIn_0.5s_ease-out]">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full border-2 p-1 mb-3 transition-colors ${isProcessing ? 'border-cyan-400' : 'border-cyan-400/30'}`}>
                  <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden relative">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXS5x7f-Y0FmdLICUQZLMQ5JM45r-mMZ0wWhUMe19cv2WWhJgw2oa10APLL2bDztn-wI0dGpd8Y-PPbANL6-3eqUjRYIcMw61H3rkaXy5OSkM2_hh-P7EOasE9LAHzuraBDyI-7GKxBqofnQJFGHRS5W8TNONSvG5PhTrJnZg7FY0oC-OgLQ4_qBJ-Dn6gaRK4PpvaPIC-Fn6LwEE2u4ba4fMCF82itmwqVk6TjZ39pc-aDqjCss_Agam_OTTUm96dKUWItZwD0BE" 
                      alt="Aria" 
                      className="w-full h-full object-cover"
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-cyan-400/20 mix-blend-overlay animate-pulse"></div>
                    )}
                  </div>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-background rounded-full transition-colors ${isProcessing ? 'bg-cyan-400' : 'bg-emerald-500'}`}></div>
              </div>
              <div className="text-sm font-medium text-zinc-300">Aria - Senior Tech Lead</div>
            </div>

            <div className="w-full bg-zinc-900/40 border border-cyan-500/20 rounded-2xl p-8 mb-16 shadow-[0_0_30px_rgba(0,229,255,0.05)] transition-all animate-[fadeIn_0.5s_ease-out]">
              <div className="text-[10px] tracking-widest text-cyan-400 font-bold uppercase mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">forum</span>
                Current Question
              </div>
              <h2 className="text-xl md:text-2xl font-medium leading-relaxed min-h-[4rem]">
                {isProcessing ? (
                  <span className="text-zinc-500 italic animate-pulse">Thinking...</span>
                ) : (
                  `"${currentQuestion}"`
                )}
              </h2>
            </div>

            <div className="flex flex-col items-center w-full max-w-lg animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-center justify-center gap-1.5 h-12 mb-8 w-full">
                {isListening ? (
                  <>
                    <div className="w-1.5 h-4 bg-cyan-400/80 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]"></div>
                    <div className="w-1.5 h-10 bg-cyan-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s]"></div>
                    <div className="w-1.5 h-14 bg-cyan-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.2s]"></div>
                    <div className="w-1.5 h-8 bg-cyan-400/90 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.3s]"></div>
                    <div className="w-1.5 h-12 bg-cyan-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s]"></div>
                    <div className="w-1.5 h-6 bg-cyan-400/80 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.5s]"></div>
                  </>
                ) : (
                  <div className="text-zinc-600 text-xs tracking-widest uppercase font-bold">
                    {isProcessing ? 'Processing your answer...' : 'Ready'}
                  </div>
                )}
              </div>

              <button 
                onClick={toggleListen}
                disabled={isProcessing}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:scale-105' 
                    : isProcessing
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-cyan-400 text-cyan-950 shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-105 animate-[pulse_2s_ease-in-out_infinite]'
                }`}
              >
                <span className="material-symbols-outlined text-[32px]">
                  {isListening ? 'stop' : 'mic'}
                </span>
              </button>
              
              <div className="mt-6 text-sm text-center h-12">
                {isListening ? (
                  <span className="text-white italic">{transcript || "Listening..."}</span>
                ) : transcript && !isProcessing ? (
                  <span className="text-zinc-400 italic">"{transcript}"</span>
                ) : (
                  <span className="text-zinc-500 italic font-medium">Click the mic to speak. It will auto-send when you pause.</span>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="p-6 relative z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/dashboard/feedback" className="bg-zinc-900 hover:bg-zinc-800 border border-red-500/20 text-red-400 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors font-medium">
          <span className="material-symbols-outlined text-[20px]">cancel</span>
          End Session
        </Link>
        
        <div className="flex gap-4 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium">
            <span className="material-symbols-outlined text-[20px]">skip_next</span>
            Skip
          </button>
        </div>
      </footer>
    </div>
  );
}
