// Scroll Vault Renderer — adapted from Myceli infocards

const container = document.getElementById("scroll-container");

// Load all scrolls from the static vault
fetch("ScrollVault.json")
  .then((res) => res.json())
  .then((data) => {
    Object.keys(data).forEach((key) => {
      renderScrollCard(data[key]);
    });
  })
  .catch((err) => console.error("Vault loading failed:", err));

// Card renderer
function renderScrollCard(scroll) {
  const card = document.createElement("div");
  card.className = "scroll-card";

  card.innerHTML = `
    <div class="scroll-header">
      <h3>${scroll.title}</h3>
      <span class="scroll-subtitle">${scroll.subtitle || ""}</span>
    </div>
    <div class="scroll-body">
      <pre>${scroll.body}</pre>
    </div>
    ${scroll.options ? renderOptions(scroll.options) : ""}
  `;

  container.appendChild(card);
}

// Optional choice buttons
function renderOptions(options) {
  return `
    <div class="scroll-options">
      ${options
        .map(
          (opt, index) =>
            `<button onclick="handleScrollOption('${opt.action}')">${opt.label}</button>`
        )
        .join("")}
    </div>
  `;
}

// Example handler for future interactive scroll options
function handleScrollOption(action) {
  alert(`Option triggered: ${action}`);
  // You can later route actions to chat messages, scroll links, or sound triggers
}
