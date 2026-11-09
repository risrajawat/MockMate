# MockMate — AI-Powered Mock Interview Platform

> Practice smarter. Speak confidently. Get better with every interview.

MockMate is an AI-powered mock interview platform designed to help students and job seekers prepare for technical and behavioral interviews through realistic, voice-based interview sessions.

Instead of simply presenting a list of interview questions, MockMate creates an interactive interview experience where an AI interviewer asks questions, listens to spoken answers, understands responses, and generates relevant follow-up questions based on the candidate's selected role and resume.

---

## 1. The Problem

Preparing for interviews is often difficult, especially for students and early-career developers.

Candidates commonly face these challenges:

- **Limited interview practice:** Not everyone has access to experienced interviewers who can conduct realistic mock interviews.
- **Lack of personalized preparation:** Generic interview questions don't account for an individual's resume, projects, skills, or target role.
- **Communication anxiety:** Candidates may understand technical concepts but struggle to explain them confidently during an actual interview.
- **No realistic interview environment:** Reading questions or solving coding problems alone doesn't fully prepare someone for a real conversation.
- **Insufficient feedback:** Candidates often don't know whether their answers are clear, structured, relevant, or technically accurate.

As a result, many candidates enter interviews without enough practical experience or confidence.

## 2. Our Solution

MockMate provides an interactive AI interviewer that simulates a real interview experience using voice interaction and personalized questioning.

The platform combines Large Language Models, Speech-to-Text (STT), and Text-to-Speech (TTS) technologies to create a conversational interview workflow.

Candidates can:

1. Upload their resume.
2. Allow MockMate to extract relevant information, including skills, projects, and education.
3. Select their target interview role.
4. Start a voice-based mock interview with an AI interviewer named **Aria**.
5. Listen to questions spoken by the AI interviewer.
6. Answer naturally using their microphone.
7. Receive relevant follow-up questions based on their responses.
8. Review interview feedback and identify areas for improvement.

The goal is to make interview preparation more personalized, accessible, interactive, and practical.

---

## 3. Key Features

### Resume Analysis

- Upload resumes in supported formats such as PDF and DOCX, with TXT and RTF also presented in the upload interface.
- Extract text from uploaded documents.
- Identify candidate information, skills, projects, and education.
- Use extracted resume context to personalize interview questions.

### Role-Based Interview Preparation

Candidates can select from different interview tracks:

- Frontend Developer
- Backend Developer
- Data Scientist
- HR Interview
- Product Manager
- UI/UX Designer
- Other Role

Each track has a different interview focus.

For example, a Frontend Developer interview focuses on JavaScript, React, CSS, frontend architecture, performance, and relevant projects rather than following the same generic question sequence for every candidate.

### AI Voice Interviewer — Aria

Aria is the AI interviewer responsible for conducting the interview.

The experience includes:

- AI-generated interview questions.
- Spoken questions using text-to-speech.
- Microphone-based candidate responses.
- Speech transcription.
- Context-aware follow-up questions.
- A conversational interview flow.

### AI-Powered Question Generation

MockMate uses Groq's API with the `openai/gpt-oss-120b` model to generate interview questions and follow-ups.

The AI receives the selected role, available resume context, and previous conversation messages to maintain continuity throughout the interview.

### Interview Feedback

The feedback interface is designed to help candidates review areas such as:

- Overall interview performance.
- Confidence.
- Clarity.
- STAR response structure.
- Actionable improvement suggestions.

Database-backed feedback generation and persistent interview history are planned for a future development phase.

### Dashboard

The dashboard provides the interface for viewing interview activity, performance metrics, and preparation progress.

Persistent, user-specific dashboard analytics will be implemented as part of the authentication and database integration.

---

## 4. How the AI Voice Interview Works

One of MockMate's core capabilities is its voice-based interview pipeline.

It integrates three AI services:

| Technology | Purpose |
|---|---|
| Groq + GPT-OSS 120B | Generates interview questions and follow-ups |
| Gnani Prisma V3.0 | Speech-to-Text (STT) |
| Gnani Timbre V2.5 | Text-to-Speech (TTS) |

### A. Question Generation — Groq

Groq powers the conversational intelligence behind MockMate.

The backend sends:
- Selected interview role.
- Candidate's available resume context.
- Previous conversation messages.

The model generates the next interview question while maintaining conversational context.

**API route:** `POST /api/chat`

**Model:** `openai/gpt-oss-120b`

### B. Text-to-Speech — Gnani Timbre V2.5

MockMate uses Gnani AI's Timbre V2.5 model to convert AI-generated text into natural-sounding speech.

When Aria generates a question:

1. The frontend sends the question text to the Next.js backend.
2. The backend forwards the text to Gnani's Timbre API.
3. Timbre generates speech audio.
4. The backend returns WAV audio.
5. The frontend plays the generated audio for the candidate.

**API endpoint:**

`https://api.vachana.ai/api/v1/tts/inference`

**Current configuration:**
- Model: `timbre-v2.5`
- Voice: `Nalini`
- Language: `en-IN`
- Speed: `1.0`
- Audio format: WAV / linear PCM
- Sample rate: 48 kHz

**Backend routes:**
- `POST /api/tts`
- `POST /api/voice/speak`

### C. Speech-to-Text — Gnani Prisma V3.0

MockMate uses Gnani AI's Prisma V3.0 model to convert the candidate's spoken response into text.

The workflow:

1. The browser records the candidate's voice using the MediaRecorder API.
2. Recorded audio is sent to the Next.js backend.
3. The backend validates the audio and converts it into WAV format when required.
4. FFmpeg and FFprobe are used for audio conversion and duration validation.
5. The backend sends the audio to Gnani Prisma.
6. Prisma returns the transcribed text and detected language.
7. The transcript is used as the candidate's response in the interview conversation.

**API endpoint:**

`https://api.vachana.ai/stt/v3`

**Current configuration:**
- Model: `prisma-v3.0`
- Language detection: `indic-auto`
- Maximum audio duration: 30 seconds
- Audio format sent to the model: WAV

**Backend route:**

`POST /api/voice/transcribe`

### D. Complete Voice Interview Pipeline

```text
              CANDIDATE
                  |
                  |
          Select Interview Role
                  |
                  v
          GROQ — GPT-OSS 120B
                  |
                  |
          Generate Question
                  |
                  v
          GNANI TIMBRE V2.5
              (TTS)
                  |
                  |
          Play AI Interviewer's
                 Voice
                  |
                  v
          CANDIDATE SPEAKS
                  |
                  |
          MediaRecorder API
                  |
                  v
          Audio Sent to Backend
                  |
                  v
          FFmpeg / FFprobe
                  |
                  v
          GNANI PRISMA V3.0
               (STT)
                  |
                  |
           Generate Transcript
                  |
                  v
          Send Response to Groq
                  |
                  v
          Generate Follow-up
                  |
                  |
             NEXT QUESTION
```

This pipeline enables a continuous conversational interview experience instead of a traditional text-only question-and-answer interface.

---

## 5. Technology Stack

### Frontend

| Technology | Usage |
|---|---|
| Next.js 16 | Full-stack React framework |
| React 19 | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS v4 | Styling and responsive layouts |
| MediaRecorder API | Recording candidate responses |
| Browser Audio API | Playing generated speech |

### Backend and AI

| Technology | Usage |
|---|---|
| Next.js App Router | Backend API routes |
| Groq API | AI question generation |
| OpenAI GPT-OSS 120B | Interview conversation model |
| Gnani Prisma V3.0 | Speech-to-Text |
| Gnani Timbre V2.5 | Text-to-Speech |
| FFmpeg | Audio conversion |
| FFprobe | Audio metadata and duration validation |

### Resume Processing

| Technology | Usage |
|---|---|
| PDF.js (`pdfjs-dist`) | PDF text extraction |
| Mammoth | DOCX text extraction |

### Planned Backend Infrastructure

The following technologies are part of the next development phase and are not yet integrated:

| Technology | Planned Usage |
|---|---|
| PostgreSQL | Persistent relational database |
| Prisma ORM | Database schema, queries, and migrations |
| Auth.js | Authentication and session management |

---

## 6. System Architecture

MockMate follows a full-stack architecture built around the Next.js App Router.

```text
                  MOCKMATE
                      |
          +-----------+-----------+
          |                       |
       FRONTEND                BACKEND
          |                       |
     React / Next.js          API Routes
          |                       |
          |             +---------+---------+
          |             |         |         |
          |           /chat   /transcribe  /tts
          |             |         |         |
          |           GROQ      GNANI      GNANI
          |                     PRISMA     TIMBRE
          |                       |
          +-----------+-----------+
                      |
             INTERVIEW EXPERIENCE
                      |
               [PLANNED LAYER]
                      |
             Auth.js + Prisma ORM
                      |
                 PostgreSQL
```

The architecture is intended to evolve into a persistent multi-user platform.

Once authentication and database integration are complete, each user will have their own resumes, interview sessions, conversation history, and feedback reports.

---

## 7. Project Folder Structure

The following is a representative structure of the current application, highlighting the main routes and components.

```text
MockMate/
│
├── app/
│   │
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts
│   │   │
│   │   ├── tts/
│   │   │   └── route.ts
│   │   │
│   │   └── voice/
│   │       ├── speak/
│   │       │   └── route.ts
│   │       │
│   │       └── transcribe/
│   │           └── route.ts
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── feedback/
│   │       └── page.tsx
│   │
│   ├── interview/
│   │   └── page.tsx
│   │
│   ├── setup/
│   │   ├── resume/
│   │   │   └── page.tsx
│   │   │
│   │   └── role/
│   │       └── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── signup/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Header.tsx
│   ├── HeaderWrapper.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Icon.tsx
│
├── public/
│   └── pdf.worker.min.mjs
│
├── tmp/
│   └── (temporary audio files)
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

This is a representative overview, not an exhaustive listing of every file. The authentication and database directories will be added when those features are implemented.

---

## 8. Getting Started

### Prerequisites

Install the following before running the project:

- Node.js compatible with Next.js 16.
- npm.
- FFmpeg and FFprobe.
- A Groq API key.
- A Gnani AI API key.

### Clone the Repository

```bash
git clone https://github.com/risrajawat/MockMate.git

cd MockMate
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root.

```env
GROQ_API_KEY=your_groq_api_key

GNANI_API_KEY=your_gnani_api_key
```

Keep API keys on the server. Never expose them through client-side environment variables or commit them to GitHub.

### Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 9. Current Implementation Status

MockMate is being developed incrementally. The distinction between implemented and planned functionality is important.

### Implemented

- [x] Next.js and React application.
- [x] Dark premium SaaS user interface.
- [x] Resume upload interface.
- [x] PDF and DOCX text extraction.
- [x] Resume information extraction for skills, projects, and education.
- [x] Role-based interview selection.
- [x] Context-aware interview question generation using Groq.
- [x] Gnani Timbre V2.5 text-to-speech integration.
- [x] Gnani Prisma V3.0 speech-to-text integration.
- [x] Browser-based voice recording.
- [x] Audio conversion and duration validation.
- [x] Conversational follow-up question flow.
- [x] Interview feedback interface.
- [x] Dashboard interface.

### In Progress / Planned

- [ ] Auth.js authentication integration.
- [ ] User registration and login connected to real authentication.
- [ ] PostgreSQL database setup.
- [ ] Prisma ORM integration and database migrations.
- [ ] Persistent user profiles.
- [ ] Persistent resume storage and ownership.
- [ ] Persistent interview sessions and conversation history.
- [ ] Database-backed interview feedback.
- [ ] Real dashboard analytics based on completed sessions.
- [ ] Protected routes and server-side authorization.
- [ ] Production deployment and monitoring improvements.

**Current limitation:** Authentication screens and dashboard interfaces exist, but real user authentication and persistent database-backed records have not yet been implemented. Interview setup context currently uses browser local storage.

---

## 10. Future Development Roadmap

### Phase 1 — Authentication and Database Foundation

- Integrate PostgreSQL.
- Configure Prisma ORM.
- Design relational database models.
- Integrate Auth.js.
- Implement registration, login, logout, and session management.
- Associate application data with authenticated users.

### Phase 2 — Persistent Interview System

- Save interview sessions.
- Store questions and candidate transcripts.
- Track session status and duration.
- Allow users to revisit previous interviews.
- Associate uploaded resumes with interview sessions.

### Phase 3 — AI Feedback and Analytics

- Generate structured feedback from interview conversations.
- Evaluate answer clarity, relevance, confidence, and structure.
- Save feedback reports.
- Calculate performance trends across sessions.
- Populate the dashboard using actual database records.

### Phase 4 — Production Readiness

- Secure protected routes and APIs.
- Validate user ownership for every database operation.
- Improve error handling and logging.
- Add deployment configuration.
- Optimize audio and AI API workflows.
- Improve reliability and performance.

---

## 11. Security Considerations

MockMate handles user resumes, interview conversations, and API credentials. Security will be an important part of the backend implementation.

Planned security measures include:

- Keep Groq and Gnani API keys server-side.
- Hash passwords before storing them if credentials-based authentication is implemented.
- Use secure authentication sessions.
- Restrict users to their own resumes, interviews, and feedback.
- Validate uploaded files and request payloads.
- Avoid storing unnecessary sensitive information.
- Avoid committing `.env.local` or other secret files.

---

## 12. Project Vision

MockMate aims to make realistic interview preparation accessible to everyone.

By combining conversational AI, multilingual speech technologies, resume-aware question generation, and performance analytics, the platform aims to move beyond static interview preparation tools.

The long-term vision is to build a personalized AI interview coach that understands each candidate's background, simulates realistic interview conversations, identifies improvement areas, and helps candidates become more confident with every practice session.

---

## 13. Acknowledgements

MockMate uses the following technologies and services:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Groq](https://groq.com/)
- [Gnani AI](https://gnani.ai/)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Mammoth](https://github.com/mwilliamson/mammoth)
- [FFmpeg](https://ffmpeg.org/)

---

**Built with the goal of helping candidates show up with confidence.**