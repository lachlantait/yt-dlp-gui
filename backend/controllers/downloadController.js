import { spawn } from 'child_process';
import { FFMPEG_LOCATION } from '../../config.js';
import path from 'path';

function getDownloadPath(downloadLocation, folderName) {
  // downloadLocation: Trim whitespace and remove quotation marks ("") if present
  const cleanedDownloadLocation = downloadLocation.trim().replace(/^"(.*)"$/, '$1');

  // folderName: Trim whitespace
  const cleanedFolderName = folderName.trim();

  // Normalise/join the path
  const downloadPath = path.join(cleanedDownloadLocation, cleanedFolderName);

  return downloadPath;
}

export async function download(request, response) {
    console.log('HTTP request to /api/download');

  // Get request data
  const {
    url,
    downloadLocation, // e.g. C:\Users\username\Downloads
    folderName, // Name of containing folder of files to be downloaded
    extractAudio = false,
    writeLink = false,
    writeThumbnail = false,
    writeDescription = false,
    writeInfoJson = false,
    writeComments = false,
    // TODO: Format and quality?
    // TODO: Subs?
    // TODO: Embed chapters?
  } = request.body;

  // Build up args array to pass to yt-dlp process
  const args = [];

  const path = getDownloadPath(downloadLocation, folderName);
  args.push('-P', path);

  // Options from select dropdowns
  if (extractAudio !== 'true') {
    // Downloading video
    args.push('--merge-output-format', 'mp4');
  } else {
    // Downloading audio only
    args.push('--extract-audio');
    args.push('--audio-format', 'mp3'); // always mp3. TODO: Allow specifying other formats?
  }

  // Options from checkboxes
  if (writeLink)
    args.push('--write-link');
  if (writeThumbnail)
    args.push('--write-thumbnail');
  if (writeDescription)
    args.push('--write-description');
  if (writeInfoJson)
    args.push('--write-info-json');
  if (writeComments)
    args.push('--write-comments');

  args.push('--embed-thumbnail'); // Always enabled

  args.push('--ffmpeg-location', FFMPEG_LOCATION);

  args.push('--newline'); // Outputs progress bar updates as new lines

  args.push(url);

  // Start yt-dlp process
  console.log('Starting yt-dlp');
  console.log(`yt-dlp ${args.join(' ')}`);
  const ytDlpProcess = spawn('yt-dlp', args);
  
  // Output yt-dlp stdout to console
  ytDlpProcess.stdout.on('data', (data) => {
    // console.log not used to avoid newlines in between each output line
    process.stdout.write(`[yt-dlp stdout] ${data}`);
  });
  // Output yt-dlp stderr to console
  ytDlpProcess.stderr.on('data', (data) => {
    // console.log not used to avoid newlines in between each output line
    process.stderr.write(`[yt-dlp stderr] ${data}`);
  });

  // Handle process finishing
  ytDlpProcess.on('close', (code) => {
    console.log(`yt-dlp exited with code ${code}`);
    
    if (code === 0) {
      console.log('Download successful');
      response.json({ ok: true });
      console.log('Sent HTTP response with status code 200');
    } else {
      console.log('Download failed');
      response.status(500).json({ error: 'Download failed' });
      console.log('Sent HTTP response with status code 500');
    }
  });
}
