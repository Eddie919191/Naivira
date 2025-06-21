// meditations.js — Naivira Audio Playback Engine

let currentVoice = null;
let backgroundLoop = null;
let loopTimeout = null;

function playMeditation({ voiceSrc, backgroundSrc, loopDuration }) {
  stopMeditation(); // Ensure clean reset

  // 🎙 Voice Playback (one-time)
  if (voiceSrc) {
    currentVoice = new Audio(voiceSrc);
    currentVoice.play();
  }

  // 🌊 Background Sound Loop
  if (backgroundSrc && loopDuration > 0) {
    backgroundLoop = new Audio(backgroundSrc);
    backgroundLoop.loop = true;
    backgroundLoop.volume = 0.3;
    backgroundLoop.play();

    // ⏱ Optional fadeout after loopDuration (in minutes)
    loopTimeout = setTimeout(() => {
      fadeOutAudio(backgroundLoop);
    }, loopDuration * 60 * 1000); // convert minutes to ms
  }
}

// 🧹 Cleanup and Stop
function stopMeditation() {
  if (currentVoice) {
    currentVoice.pause();
    currentVoice.currentTime = 0;
    currentVoice = null;
  }
  if (backgroundLoop) {
    backgroundLoop.pause();
    backgroundLoop.currentTime = 0;
    backgroundLoop = null;
  }
  if (loopTimeout) {
    clearTimeout(loopTimeout);
    loopTimeout = null;
  }
}

// 🌬 Smooth fade-out
function fadeOutAudio(audio) {
  let fade = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, 200);
}

// 🧪 Example invocation:
// playMeditation({
//   voiceSrc: "audio/voice1.mp3",
//   backgroundSrc: "audio/forest-loop.mp3",
//   loopDuration: 30 // minutes
// });
