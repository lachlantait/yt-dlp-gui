# yt-dlp gui

Web-based frontend + backend for yt-dlp (https://github.com/yt-dlp/yt-dlp).

Only works on Windows (tested with Windows 10).

This is just a simple wrapper for yt-dlp. The frontend is just local web files with plain HTML and JavaScript (no framework). In terms of CSS, Bootstrap and Sass are used. The frontend interacts with a Node/Express backend that runs yt-dlp. The app can thus be used to download video/audio to a specified location on your device.

## How to use

### Requirements
-  This app is just a wrapper for yt-dlp, and requires that you separately install yt-dlp, alongside ffmpeg ideally. Follow any installation and setup instructions at https://github.com/yt-dlp/yt-dlp.
-  This app also requires that Node and NPM are installed.

### Initial setup
- Open a terminal and run "npm i -y".
- If you have ffmpeg installed and wish to use it, open "config.js", and change the value of FFMPEG_LOCATION to the full Windows path where the ffmpeg binary is located.

### To use
- Open "frontend/index.html" (or run "start-frontend.bat", which just opens the index.html file).
- Run "start-backend.bat", which should open a terminal window running the backend.
- Enter your desired options into the frontend and click "Download", you should then see the yt-dlp output via the backend terminal window.

## Screenshots
### Fullscreen
<img width="1920" height="924" alt="screenshot fullscreen" src="https://github.com/user-attachments/assets/62e73274-fb1c-44fe-93b6-4b22a0a65e5d" />

### Side-by-side with terminal window running the backend (output after clicking Download)
<img width="1920" height="1049" alt="screenshot side by side with terminal with details" src="https://github.com/user-attachments/assets/196e169a-28a7-4495-b4d9-0aa57a884d3c" />
<img width="1920" height="1045" alt="screenshot side by side with terminal with details" src="https://github.com/user-attachments/assets/6762efab-8988-4a7a-8fd8-2356f9eb30bd" />
