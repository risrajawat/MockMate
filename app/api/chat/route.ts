
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
  const role = context.role?.trim() || "Software Engineer";
  const normalizedRole = role.toLowerCase();

  const skills = context.skills ?? [];
  const projects = context.projects ?? [];
  const education = context.education ?? [];

  let interviewTrack: string;

  if (
    normalizedRole.includes("frontend") ||
    normalizedRole.includes("front-end")
  ) {
    interviewTrack = `
FRONTEND DEVELOPER INTERVIEW TRACK:

1. Introduction and background.
2. Discussion of a frontend project from the candidate's resume.
3. JavaScript fundamentals: closures, promises, event loop, scope, etc.
4. React concepts: hooks, state, props, rendering, component lifecycle.
5. HTML, CSS, responsive design, browser fundamentals and performance.
6. Practical frontend engineering scenario or coding problem.
7. Deeper follow-up questions based on the candidate's answers.

Focus on frontend engineering. Do not jump to generic DSA questions.
Only ask a DSA question if it is directly relevant to frontend development
or the candidate explicitly requests it.
`;
  } else if (
    normalizedRole.includes("data scientist") ||
    normalizedRole.includes("data science")
  ) {
    interviewTrack = `
DATA SCIENTIST INTERVIEW TRACK:

1. Introduction and background.
2. Discussion of a data science or machine learning project from the resume.
3. Statistics and probability fundamentals.
4. Machine learning algorithms and their working principles.
5. Data preprocessing, feature engineering and model evaluation.
6. Practical data science scenarios and analytical problem-solving.
7. Deeper follow-up questions based on the candidate's answers.

Focus on statistics, Python, NumPy, Pandas, machine learning,
data analysis and model evaluation.

Do not ask generic DSA questions about arrays, linked lists,
trees or graphs as the default interview progression.
`;
  } else if (
    normalizedRole.includes("backend") ||
    normalizedRole.includes("back-end")
  ) {
    interviewTrack = `
BACKEND DEVELOPER INTERVIEW TRACK:

1. Introduction and background.
2. Discussion of backend projects from the resume.
3. Programming language and backend fundamentals.
4. REST APIs, HTTP, authentication and authorization.
5. Databases, SQL/NoSQL, indexing and transactions.
6. System design, scalability and practical backend scenarios.
7. Deeper follow-up questions based on candidate answers.

Prioritize backend engineering rather than generic DSA.
`;
  } else if (
    normalizedRole.includes("hr") ||
    normalizedRole.includes("human resource")
  ) {
    interviewTrack = `
HR INTERVIEW TRACK:

1. Introduction and background.
2. Career goals and motivation.
3. Behavioral questions.
4. Teamwork, communication and conflict resolution.
5. Situational and workplace scenarios.
6. Deeper follow-up questions based on candidate answers.
`;
  } else if (
    normalizedRole.includes("product manager")
  ) {
    interviewTrack = `
PRODUCT MANAGER INTERVIEW TRACK:

1. Introduction and background.
2. Product experience and projects.
3. Product strategy and prioritization.
4. Metrics, analytics and decision-making.
5. Product design and user experience scenarios.
6. Stakeholder management and execution.
7. Deeper follow-up questions.
`;
  } else if (
    normalizedRole.includes("ui/ux") ||
    normalizedRole.includes("designer")
  ) {
    interviewTrack = `
UI/UX DESIGNER INTERVIEW TRACK:

1. Introduction and background.
2. Portfolio and project discussion.
3. User research and usability.
4. Wireframing, prototyping and design systems.
5. Accessibility and design decisions.
6. Practical design scenarios.
7. Deeper follow-up questions.
`;
  } else {
    interviewTrack = `
CUSTOM ROLE INTERVIEW TRACK:

1. Introduction and background.
2. Relevant project discussion.
3. Core concepts of ${role}.
4. Important tools, technologies and methodologies relevant to ${role}.
5. Practical role-specific scenarios.
6. Problem-solving and deeper follow-up questions.

Use the candidate's listed skills and resume to identify relevant topics.
Do not default to generic DSA.
`;
  }

  const resumeContext = `
CANDIDATE RESUME CONTEXT:

Skills: ${skills.length ? skills.join(", ") : "Not available"}

Projects:
${projects.length ? projects.map((p, i) => `${i + 1}. ${p}`).join("\n") : "Not available"}

Education:
${education.length ? education.join("; ") : "Not available"}

Experience: ${
    context.experienceYears !== undefined
      ? `${context.experienceYears} years`
      : "Not specified"
  }
`;

  return `
You are MockMate AI, a professional and experienced interviewer.

You are interviewing a candidate for the role of "${role}".

${resumeContext}

YOUR INTERVIEW STRUCTURE:

${interviewTrack}

INTERVIEW RULES:

1. Conduct a natural, conversational interview.
2. Ask exactly ONE question at a time.
3. Use the previous conversation history to determine what has already been asked.
4. Never restart the interview or repeat an already answered question.
5. Start with an introduction only if the candidate has not introduced themselves.
6. After the introduction, explore a relevant project from their resume.
7. Continue through the selected role's technical or domain-specific topics.
8. Ask follow-up questions based on the candidate's actual answers.
9. Adjust difficulty based on the candidate's demonstrated knowledge.
10. If the candidate gives an incomplete answer, ask a relevant follow-up instead of immediately changing topics.
11. Acknowledge answers briefly and naturally.
12. Never reveal the expected answer or solve the question for the candidate.

IMPORTANT ROLE RESTRICTIONS:

- Stay focused on the selected role throughout the interview.
- Do not randomly switch to another technical domain.
- Do not ask frontend questions in a Data Scientist interview.
- Do not ask Data Science questions in a Frontend Developer interview.
- Do not make DSA a mandatory phase for every technical role.
- Only introduce DSA when it is relevant to the selected role.
- Never mention internal phase numbers or interview stages to the candidate.

CONVERSATION STYLE:

Sound like a real human interviewer, not a scripted chatbot.
Avoid robotic phrases and repetitive acknowledgements.
Keep questions clear, specific and professional.
Do not ask multiple unrelated questions in one response.

After a sufficient number of questions covering the selected role,
conclude naturally by thanking the candidate and indicating that
the interview session is complete.
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
      ? context.skills.filter((skill): skill is string => typeof skill === 'string')
      : [],
    projects: Array.isArray(context.projects)
      ? context.projects.filter((proj): proj is string => typeof proj === 'string')
      : [],
    education: Array.isArray(context.education)
      ? context.education.filter((edu): edu is string => typeof edu === 'string')
      : [],
    experienceYears: typeof context.experienceYears === 'number' ? context.experienceYears : undefined,
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
