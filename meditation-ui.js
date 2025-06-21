// meditation-ui.js — Handles Meditation Topic Logic for Naivira

const topics = {
  "Calm & Stillness": ["Ocean Breath", "Moonlit Forest", "Floating"],
  "Energy & Strength": ["Fire Within", "Root Awakening"],
  "Grief & Healing": ["Tears of Light", "Sanctuary of Grace"]
};

function renderMeditationTopics() {
  const container = document.getElementById("meditation-topics");
  container.innerHTML = "";

  Object.entries(topics).forEach(([main, subs]) => {
    const mainDiv = document.createElement("div");
    mainDiv.className = "main-topic";

    const mainTitle = document.createElement("h3");
    mainTitle.textContent = main;
    mainTitle.onclick = () => {
      subList.classList.toggle("hidden");
    };

    const subList = document.createElement("ul");
    subList.className = "subtopic-list hidden";

    subs.forEach(sub => {
      const li = document.createElement("li");
      li.textContent = sub;
      li.onclick = () => openMeditationPlayer(main, sub);
      subList.appendChild(li);
    });

    mainDiv.appendChild(mainTitle);
    mainDiv.appendChild(subList);
    container.appendChild(mainDiv);
  });
}

function openMeditationPlayer(mainTopic, subTopic) {
  const player = document.getElementById("playback-panel");
  player.classList.remove("hidden");
  document.getElementById("selected-topic").textContent = `${mainTopic} → ${subTopic}`;
}

// Auto-run
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("meditation-topics")) {
    renderMeditationTopics();
  }
});
