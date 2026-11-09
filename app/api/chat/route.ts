
import { NextResponse } from 'next/server';

interface InterviewContext {
  role?: string;
  skills?: string[];
  projects?: string[];
  experienceYears?: number;
  education?: string[];
}
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  context?: InterviewContext;
}

interface GroqResponse {
  choices?: {
    message?: {
      content?: string | null;
    };
  }[];
}

const generateSystemPrompt = (context: InterviewContext = {}): string => {
  const role = context.role?.trim() || 'software engineering';
  const skills = context.skills ?? [];

  // Determine whether this is a non-technical role.
  const normalizedRole = role.toLowerCase();

  const isNonTech =
    normalizedRole.includes('design') ||
    normalizedRole.includes('hr') ||
    normalizedRole.includes('product') ||
    normalizedRole.includes('other');

  const interviewerType = isNonTech
    ? 'expert interviewer'
    : 'expert technical interviewer';

  let skillsText = '';

  if (skills.length > 0 && !isNonTech) {
    skillsText = `The candidate has the following skills extracted from their resume: ${skills.join(', ')}.`;
  } else if (!isNonTech) {
    skillsText = 'Assume the candidate has general software development skills.';
  } else {
    skillsText = `Assume the candidate has general skills relevant to a ${role}.`;
  }

  const phase2Task =
    skills.length > 0 && !isNonTech
      ? `Ask exactly ONE question about their experience with their listed skills (${skills.join(', ')}) or their past projects.`
      : `Ask exactly ONE question about a past project they worked on relevant to the ${role} role.`;

  const phase3Task = isNonTech
    ? `Ask exactly ONE domain-specific scenario question relevant to a ${role}.`
    : 'Ask exactly ONE Data Structures and Algorithms (DSA) question.';

  return `
You are an ${interviewerType} for MockMate AI.
You are conducting a sequential interview for a ${role} candidate.
${skillsText}

You MUST follow this exact 3-phase sequence:
1. PHASE 1: Introduce yourself and ask the candidate to give a brief introduction.
2. PHASE 2: ${phase2Task}
3. PHASE 3: ${phase3Task}

CRITICAL RULES:
- Never ask multiple questions at once. Wait for the user to answer before moving to the next phase.
- Be concise, professional, and conversational.
- Do not provide the answers.
- If the user answers a question, briefly acknowledge their answer, then proceed to the next phase.
- After Phase 3 is answered, conclude the interview and say "Thank you, the session is complete. You may end the session now."
`;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const message = value as Record<string, unknown>;

  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string'
  );
}

function parseInterviewContext(value: unknown): InterviewContext {
  if (typeof value !== 'object' || value === null) {
    return {};
  }

  const context = value as Record<string, unknown>;

  return {
    role: typeof context.role === 'string' ? context.role : undefined,
    skills: Array.isArray(context.skills)
      ? context.skills.filter(
          (skill): skill is string => typeof skill === 'string'
        )
      : [],
  };
}

export async function POST(req: Request) {
  try {
    // Parse and validate incoming request.
    const body: unknown = await req.json();

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const requestBody = body as Record<string, unknown>;

    if (
      !Array.isArray(requestBody.messages) ||
      !requestBody.messages.every(isChatMessage)
    ) {
      return NextResponse.json(
        { error: 'Invalid or missing messages' },
        { status: 400 }
      );
    }

    const chatRequest: ChatRequest = {
      messages: requestBody.messages,
      context: parseInterviewContext(requestBody.context),
    };

    const dynamicPrompt = generateSystemPrompt(chatRequest.context);

    // Add the server-controlled system prompt.
    const apiMessages = [
      { role: 'system', content: dynamicPrompt },
      ...chatRequest.messages,
    ];

    // Keep the API key server-side.
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing. Please add GROQ_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    // Send request to Groq.
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 250,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();

      console.error('Groq API Error:', errorData);

      return NextResponse.json(
        { error: 'Failed to fetch from Groq API' },
        { status: response.status }
      );
    }

    // Safely extract the model response.
    const data: GroqResponse = await response.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      "I'm sorry, I couldn't process that.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error('Error in chat route:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
