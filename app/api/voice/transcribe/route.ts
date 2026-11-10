
import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { randomUUID } from 'node:crypto';
import os from 'node:os';

export const runtime = 'nodejs';

const execFileAsync = promisify(execFile);

const MAX_AUDIO_DURATION = 30;
const FETCH_TIMEOUT = 60000;

function getErrorDetails(error: unknown): {
  name?: string;
  code?: string;
  message: string;
} {
  if (error instanceof Error) {
    const nodeError = error as NodeJS.ErrnoException;

    return {
      name: error.name,
      code: nodeError.code,
      message: error.message,
    };
  }

  return {
    message: String(error),
  };
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number,
  retries = 2
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
      });
    } catch (error: unknown) {
      const details = getErrorDetails(error);

      const transient =
        details.name === 'AbortError' ||
        details.code === 'ECONNRESET' ||
        details.code === 'ETIMEDOUT';

      if (attempt < retries && transient) {
        console.warn(
          `Transient fetch error (${details.message}), retry ${attempt + 1
          }/${retries}`
        );
        continue;
      }

      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw new Error('Unexpected fetch retry exhaustion');
}

export async function POST(req: Request) {
  let originalPath: string | null = null;
  let wavPath: string | null = null;

  try {
    // 1. Parse incoming multipart form
    const form = await req.formData();
    const audio = form.get('audio');

    if (!(audio instanceof File)) {
      return NextResponse.json(
        { error: 'Audio file missing' },
        { status: 400 }
      );
    }

    // 2. Validate API key
    const apiKey = process.env.GNANI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GNANI_API_KEY missing' },
        { status: 500 }
      );
    }

    // 3. Create temporary directory and save uploaded audio
    // 3. Create temporary directory and save uploaded audio
    const tmpDir = path.join(os.tmpdir(), 'mockmate-audio');

    await fs.mkdir(tmpDir, { recursive: true });

    const fileId = randomUUID();
    const extension = path.extname(audio.name).toLowerCase() || '.webm';

    originalPath = path.join(tmpDir, `${fileId}${extension}`);

    const arrayBuffer = await audio.arrayBuffer();
    await fs.writeFile(originalPath, Buffer.from(arrayBuffer));

    // 4. Convert audio to WAV if necessary
    wavPath = originalPath;

    if (extension !== '.wav') {
      wavPath = path.join(tmpDir, `${fileId}.wav`);

      try {
        await execFileAsync('ffmpeg', [
          '-y',
          '-i',
          originalPath,
          '-ar',
          '16000',
          '-ac',
          '1',
          '-c:a',
          'pcm_s16le',
          wavPath,
        ]);
      } catch (error: unknown) {
        const details = getErrorDetails(error);

        console.error('FFmpeg conversion error:', details.message);

        throw new Error(`Audio conversion failed: ${details.message}`);
      }
    }

    // 5. Validate audio duration using ffprobe
    let durationStr: string;

    try {
      const result = await execFileAsync('ffprobe', [
        '-v',
        'error',
        '-show_entries',
        'format=duration',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        wavPath,
      ]);

      durationStr = result.stdout.trim();
    } catch (error: unknown) {
      const details = getErrorDetails(error);

      console.error('ffprobe error:', details.message);

      throw new Error(`Audio duration validation failed: ${details.message}`);
    }

    const durationSec = Number.parseFloat(durationStr);

    if (!Number.isFinite(durationSec)) {
      return NextResponse.json(
        { error: 'Unable to determine audio duration' },
        { status: 400 }
      );
    }

    if (durationSec > MAX_AUDIO_DURATION) {
      return NextResponse.json(
        {
          error: 'Audio duration exceeds 30 seconds limit',
          max_seconds: MAX_AUDIO_DURATION,
          actual_seconds: durationSec,
        },
        { status: 400 }
      );
    }

    // 6. Prepare Gnani Prisma request
    const gnaniUrl = 'https://api.vachana.ai/stt/v3';

    const formData = new FormData();

    const fileBuffer = await fs.readFile(wavPath);
    const audioFile = new File(
      [new Uint8Array(fileBuffer)],
      'audio.wav',
      { type: 'audio/wav' }
    );

    formData.append('audio_file', audioFile);
    formData.append('model', 'prisma-v3.0');
    formData.append('language_code', 'indic-auto');

    // 7. Send audio to Gnani with timeout and retries
    const gnaniRes = await fetchWithTimeout(
      gnaniUrl,
      {
        method: 'POST',
        headers: {
          'X-API-Key-ID': apiKey,
        },
        body: formData,
      },
      FETCH_TIMEOUT,
      2
    );

    // 8. Handle Gnani API errors
    if (!gnaniRes.ok) {
      const errorText = await gnaniRes.text();

      console.error('Gnani Prisma error response:', errorText);

      return NextResponse.json(
        {
          error: 'Gnani Prisma failed',
          details: errorText,
        },
        { status: gnaniRes.status }
      );
    }

    // 9. Parse Gnani response safely
    const responseData: unknown = await gnaniRes.json();

    if (
      typeof responseData !== 'object' ||
      responseData === null
    ) {
      throw new Error('Invalid response received from Gnani');
    }

    const gnaniJson = responseData as Record<string, unknown>;

    return NextResponse.json({
      transcript: gnaniJson.transcript,
      language: gnaniJson.detected_language_code,
      model: gnaniJson.model,
      request_id: gnaniJson.request_id,
    });
  } catch (error: unknown) {
    const details = getErrorDetails(error);

    console.error('Transcribe route error:', details);

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: details.message,
      },
      { status: 500 }
    );
  } finally {
    // 10. Always clean up temporary audio files
    if (originalPath) {
      await fs.unlink(originalPath).catch(() => { });
    }

    if (wavPath && wavPath !== originalPath) {
      await fs.unlink(wavPath).catch(() => { });
    }
  }
}
