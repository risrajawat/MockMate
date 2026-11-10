
const fs = require('node:fs');
const path = require('node:path');

const ffmpegPath = path.join(
  process.cwd(),
  'node_modules',
  '@ffmpeg-installer',
  'linux-x64',
  'ffmpeg'
);

const result = {
  platform: process.platform,
  architecture: process.arch,
  path: ffmpegPath,
  exists: fs.existsSync(ffmpegPath),
};

if (result.exists) {
  const stats = fs.statSync(ffmpegPath);
  const fd = fs.openSync(ffmpegPath, 'r');

  try {
    const header = Buffer.alloc(4);
    fs.readSync(fd, header, 0, 4, 0);

    Object.assign(result, {
      size: stats.size,
      executable: Boolean(stats.mode & 0o111),
      fileHeader: header.toString('hex'),
    });
  } finally {
    fs.closeSync(fd);
  }
}

console.log(
  '[FFMPEG_BUILD_DIAGNOSTICS]',
  JSON.stringify(result)
);

if (!result.exists) {
  console.error('Linux FFmpeg binary missing during build');
  process.exit(1);
}

if (result.fileHeader !== '7f454c46') {
  console.error('FFmpeg binary is not an ELF Linux executable');
  process.exit(1);
}
