
const fs = require('node:fs');

const ffmpegPath = require('ffmpeg-static');

let result = {
  platform: process.platform,
  architecture: process.arch,
  path: ffmpegPath,
  exists: false,
};

if (ffmpegPath && fs.existsSync(ffmpegPath)) {
  const stats = fs.statSync(ffmpegPath);
  const fd = fs.openSync(ffmpegPath, 'r');

  try {
    const header = Buffer.alloc(4);
    fs.readSync(fd, header, 0, 4, 0);

    result = {
      ...result,
      exists: true,
      size: stats.size,
      executable: Boolean(stats.mode & 0o111),
      fileHeader: header.toString('hex'),
    };
  } finally {
    fs.closeSync(fd);
  }
}

console.log(
  '[FFMPEG_BUILD_DIAGNOSTICS]',
  JSON.stringify(result)
);

if (!result.exists) {
  console.error('FFmpeg binary missing during Vercel build');
  process.exit(1);
}
