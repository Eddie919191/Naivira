// scrollVault.js — Naivira Scroll Card Loader 🌱
async function loadScrolls() {
  try {
    const response = await fetch('ScrollVault.json');
    const scrolls = await response.json();
    renderScrolls(scrolls);
  } catch (error) {
    console.error("Failed to load scrolls:", error);
  }
}

function renderScrolls(scrolls) {
  const container = document.getElementById('scroll-container');
  container.innerHTML = ''; // Clear old content

  scrolls.forEach(scroll => {
    const card = document.createElement('div');
    card.className = 'scroll-card';

    card.innerHTML = `
      <h2>${scroll.title}</h2>
      <p class="tone">${scroll.toneClass}</p>
      <div class="body">${scroll.body}</div>
      <div class="footer">
        <span>${scroll.code || ''}</span>
        ${scroll.choicePrompt ? `<button onclick="handleScrollChoice('${scroll.id}')">${scroll.choicePrompt}</button>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}

function handleScrollChoice(scrollId) {
  // This is where we can later unlock next scrolls or trigger reflection
  console.log("Choice made on scroll:", scrollId);
  alert(`You’ve responded to Scroll ${scrollId}. Reflection mode not yet enabled.`);
}

// Trigger loading when tab is activated or page loads
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('scroll-container')) {
    loadScrolls();
  }
});
