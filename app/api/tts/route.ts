import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.DEEPGRAM_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing. Please add DEEPGRAM_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.deepgram.com/v1/speak?model=aura-asteria-en', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Deepgram API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch from Deepgram API' }, { status: response.status });
    }

    // Return the binary audio data directly
    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

  } catch (error) {
    console.error('Error in TTS route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
