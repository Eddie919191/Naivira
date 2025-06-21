// reflections.js — User Reflection Capture 🌿

let reflectionQueue = [];

// Called when unlocking moment detected
function showReflectionPrompt(message) {
  const container = document.getElementById("reflection-panel");
  container.innerHTML = `
    <div class="reflection-card">
      <h3>Something moved in you...</h3>
      <p>"${message}"</p>
      <input type="text" id="reflection-title" placeholder="Name this reflection (optional)" />
      <button onclick="saveReflection('${encodeURIComponent(message)}')">Save</button>
    </div>
  `;
  container.style.display = "block";
}

// Save reflection (eventually to Firebase or local array)
function saveReflection(rawMessage) {
  const decodedMessage = decodeURIComponent(rawMessage);
  const title = document.getElementById("reflection-title").value || "Untitled Insight";

  const reflection = {
    title,
    message: decodedMessage,
    timestamp: new Date().toISOString()
  };

  // Store locally for now
  reflectionQueue.push(reflection);

  // Optionally, render as a card below
  appendReflectionCard(reflection);

  // Hide panel
  document.getElementById("reflection-panel").style.display = "none";
}

// Append saved reflection card to UI
function appendReflectionCard(reflection) {
  const feed = document.getElementById("reflection-feed");
  const card = document.createElement("div");
  card.className = "reflection-feed-card";

  card.innerHTML = `
    <h4>${reflection.title}</h4>
    <p>${reflection.message}</p>
    <small>${new Date(reflection.timestamp).toLocaleString()}</small>
  `;

  feed.appendChild(card);
}
