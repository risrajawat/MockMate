import { NextResponse } from 'next/server';

const generateSystemPrompt = (context: any) => {
  const role = context?.role || "software engineering";
  
  // Determine if it's a non-technical role to avoid asking DSA or coding questions
  const isNonTech = role.toLowerCase().includes("design") || 
                    role.toLowerCase().includes("hr") || 
                    role.toLowerCase().includes("product") || 
                    role.toLowerCase().includes("other");
                    
  const interviewerType = isNonTech ? "expert interviewer" : "expert technical interviewer";
  
  let skillsText = "";
  if (context?.skills && context.skills.length > 0 && !isNonTech) {
    skillsText = `The candidate has the following skills extracted from their resume: ${context.skills.join(", ")}.`;
  } else if (!isNonTech) {
    skillsText = "Assume the candidate has general software development skills.";
  } else {
    skillsText = `Assume the candidate has general skills relevant to a ${role}.`;
  }
  
  const phase2Task = (context?.skills && context.skills.length > 0 && !isNonTech)
    ? `Ask exactly ONE question about their experience with their listed skills (${context.skills.join(", ")}) or their past projects.`
    : `Ask exactly ONE question about a past project they worked on relevant to the ${role} role.`;
  
  const phase3Task = isNonTech 
    ? `Ask exactly ONE domain-specific scenario question relevant to a ${role}.`
    : `Ask exactly ONE Data Structures and Algorithms (DSA) question.`;

  return `
You are an ${interviewerType} for Mockmate AI. 
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

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const dynamicPrompt = generateSystemPrompt(context);

    // Prepend the system prompt to the messages
    const apiMessages = [
      { role: 'system', content: dynamicPrompt },
      ...messages
    ];

    const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing. Please add GROQ_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Fast, free-tier friendly model
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 250, // Keep responses relatively brief for voice
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch from Groq API' }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
