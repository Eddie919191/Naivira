// analyzePathway.js — Scroll Unlock Detection Engine 🌱

// Sample keywords or phrases that signal soul-level reflection
const unlockTriggers = [
  "I finally understand",
  "this changed me",
  "I let go",
  "I forgive",
  "I remember who I am",
  "this pain made me wiser",
  "I choose love",
  "I felt it in my soul",
  "I saw the pattern",
  "this is why I came here"
];

// Function to check if a message may signal scroll readiness
export function isUnlockingMoment(message) {
  const lowerMsg = message.toLowerCase();
  return unlockTriggers.some(trigger =>
    lowerMsg.includes(trigger.toLowerCase())
  );
}

// Optional: extract tone or theme from message
export function detectToneClass(message) {
  if (message.includes("forgive") || message.includes("release")) {
    return "Closure";
  }
  if (message.includes("love") || message.includes("grateful")) {
    return "Heart";
  }
  if (message.includes("mission") || message.includes("why I’m here")) {
    return "Purpose";
  }
  return "Reflection"; // default fallback
}
