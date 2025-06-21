// Naivira Chat System: Conversational Reflection + Scroll Unlock
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

// Sample trigger phrases mapped to scroll keys
const scrollTriggers = {
  "how do I remember": "scroll_001",
  "why am I looping": "scroll_002",
  "what is my purpose": "scroll_P01"
};

// Load scrolls from local JSON
let scrolls = {};
fetch("ScrollVault.json")
  .then((res) => res.json())
  .then((data) => {
    scrolls = data;
  });

function appendMessage(sender, message) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "ai-message";
  msg.innerText = message;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("user", message);
  userInput.value = "";

  setTimeout(() => {
    checkForScrollTrigger(message.toLowerCase());
  }, 500);
}

// Check if message contains any unlock phrases
function checkForScrollTrigger(text) {
  for (const phrase in scrollTriggers) {
    if (text.includes(phrase)) {
      const scrollKey = scrollTriggers[phrase];
      displayScroll(scrollKey);
      appendMessage("ai", "Something has awakened. A scroll has appeared.");
      return;
    }
  }

  // Fallback AI response
  appendMessage("ai", "I'm listening. Can you tell me more?");
}

// Render scroll from vault
function displayScroll(scrollKey) {
  const scroll = scrolls[scrollKey];
  if (!scroll) return;

  const container = document.getElementById("scroll-container");

  const card = document.createElement("div");
  card.className = "scroll-card";
  card.innerHTML = `
    <h3>${scroll.title}</h3>
    <p><em>${scroll.subtitle}</em></p>
    <pre>${scroll.body}</pre>
  `;
  container.appendChild(card);
}
