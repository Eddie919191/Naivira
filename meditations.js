// meditations.js — Audio Layer Engine for Naivira 🌱

// DOM Audio Elements
const voiceAudio = new Audio();
const backgroundAudio = new Audio();
let fadeOutInterval = null;

// Core function to launch meditation session
function startMeditationSession(voiceSrc, bgSrc, durationMins = 30) {
  clearExistingAudio();

  // Set up voice audio (non-looping)
  voiceAudio.src = voiceSrc;
  voiceAudio.volume = 1;
  voiceAudio.loop = false;

  // Set up background loop
  backgroundAudio.src = bgSrc;
  backgroundAudio.volume = 0.6;
  backgroundAudio.loop = true;

  // Start both
  backgroundAudio.play();
  voiceAudio.play();

  // Begin fade out timer
  const fadeStart = (durationMins - 1) * 60 * 1000; // last minute
  setTimeout(() => beginFadeOut(), fadeStart);
}

// 🌀 Fade background gently over 60 seconds
function beginFadeOut() {
  const step = 0.01;
  const interval = 100; // ms
  fadeOutInterval = setInterval(() => {
    if (backgroundAudio.volume > step) {
      backgroundAudio.volume -= step;
    } else {
      backgroundAudio.volume = 0;
      backgroundAudio.pause();
      clearInterval(fadeOutInterval);
    }
  }, interval);
}

// 🧹 Stop all sounds and reset
function clearExistingAudio() {
  [voiceAudio, backgroundAudio].forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
  if (fadeOutInterval) {
    clearInterval(fadeOutInterval);
    fadeOutInterval = null;
  }
}

// 🌿 Triggered from UI panel selections
function startMeditationFromUI() {
  const voice = document.getElementById("voice-choice").value;
  const bg = document.getElementById("bg-choice").value;
  const duration = parseInt(document.getElementById("loop-duration").value, 10) || 30;

  startMeditationSession(`audio/${voice}`, `audio/${bg}`, duration);
}

// Optional manual stop button
function stopMeditation() {
  clearExistingAudio();
}
