import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
// UUID generation replaced with timestamp-based unique ID

export const runtime = 'nodejs'; // ensure Node runtime for fs & child_process

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const audio = form.get('audio') as File | null;
    if (!audio) {
      return NextResponse.json({ error: 'Audio file missing' }, { status: 400 });
    }

    const apiKey = process.env.GNANI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GNANI_API_KEY missing' }, { status: 500 });
    }

    // Save incoming file to a temporary location
    const tmpDir = path.join(process.cwd(), 'tmp');
    await fs.mkdir(tmpDir, { recursive: true });
    const originalPath = path.join(tmpDir, `${Date.now()}_${audio.name}`);
    const arrayBuffer = await audio.arrayBuffer();
    await fs.writeFile(originalPath, Buffer.from(arrayBuffer));

    // Determine if conversion is needed (WebM is not supported by Gnani)
    const ext = path.extname(originalPath).toLowerCase();
    let wavPath = originalPath;
    if (ext !== '.wav') {
      // Convert to WAV using ffmpeg (must be installed on the system)
      const wavTemp = path.join(tmpDir, `${Date.now()}.wav`);
      const { exec } = await import('child_process');
      const cmd = `ffmpeg -y -i "${originalPath}" -ar 16000 -ac 1 -c:a pcm_s16le "${wavTemp}"`;
      await new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            console.error('FFmpeg conversion error:', stderr);
            reject(error);
          } else {
            resolve(null);
          }
        });
      });
      wavPath = wavTemp;
    }

    // Prepare multipart/form-data for Gnani Prisma endpoint
    const gnaniUrl = 'https://api.vachana.ai/stt/v3';
    const formData = new FormData();
    // Use File to satisfy FormData requirements in Node
    const fileBuffer = await fs.readFile(wavPath);
    const file = new File([fileBuffer], 'audio.wav', { type: 'audio/wav' });
    formData.append('audio_file', file);

    formData.append('model', 'prisma-v3.0');
    formData.append('language_code', 'indic-auto');
    // format optional
    // formData.append('format', 'transcribe');

    const gnaniRes = await fetch(gnaniUrl, {
      method: 'POST',
      headers: {
        'X-API-Key-ID': apiKey,
      },
      body: formData as any, // Node fetch accepts FormData
    });

    // Clean up temp files
    await fs.unlink(originalPath).catch(() => {});
    if (wavPath !== originalPath) {
      await fs.unlink(wavPath).catch(() => {});
    }

    if (!gnaniRes.ok) {
      const errText = await gnaniRes.text();
      console.error('Gnani Prisma error response (non‑JSON):', errText);
      return NextResponse.json({ error: 'Gnani Prisma failed', details: errText }, { status: gnaniRes.status });
    }

    const gnaniJson = await gnaniRes.json();
    // Expected fields: transcript, detected_language_code, etc.
    return NextResponse.json({
      transcript: gnaniJson.transcript,
      language: gnaniJson.detected_language_code,
      model: gnaniJson.model,
      request_id: gnaniJson.request_id,
    });
  } catch (e) {
    console.error('Transcribe route error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

