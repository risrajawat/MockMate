import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // Expect JSON body: { text }
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.GNANI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GNANI_API_KEY missing. Add it to .env.local' },
        { status: 500 }
      );
    }

    const gnaniUrl = 'https://api.vachana.ai/api/v1/tts/inference';
    const body = {
      text,
      model: 'timbre-v2.5',
      voice: 'Nalini', // default voice; adjust if needed
      language: 'en-IN',
      speed: 1.0,
      audio_config: {
        sample_rate: 48000,
        num_channels: 1,
        sample_width: 2,
        encoding: 'linear_pcm',
        container: 'wav',
      },
    };

    const gnaniRes = await fetch(gnaniUrl, {
      method: 'POST',
      headers: {
        'X-API-Key-ID': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!gnaniRes.ok) {
      const errorText = await gnaniRes.text();
      console.error('Gnani Timbre error:', errorText);
      return NextResponse.json(
        { error: 'Gnani Timbre failed', details: errorText },
        { status: gnaniRes.status }
      );
    }

    const audioBuffer = await gnaniRes.arrayBuffer();
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: { 'Content-Type': 'audio/wav' },
    });
  } catch (e) {
    console.error('TTS route error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
