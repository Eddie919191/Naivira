// saveReflection.js — Store reflections as scroll entries 🌱

// 📥 Accepts a reflection object and stores it to Firebase (or local array if offline mode)
async function saveReflection(reflection) {
  if (!reflection || !reflection.title || !reflection.body) {
    console.warn("Incomplete reflection. Skipping save.");
    return;
  }

  // Local save fallback (for offline prototype)
  const localReflections = JSON.parse(localStorage.getItem("userReflections") || "[]");
  localReflections.push(reflection);
  localStorage.setItem("userReflections", JSON.stringify(localReflections));

  // 🔄 Firebase optional (use if connected)
  if (typeof uploadScroll === "function") {
    try {
      await uploadScroll({
        title: reflection.title,
        body: reflection.body,
        toneClass: reflection.toneClass || "Reflection",
        createdAt: new Date().toISOString(),
        type: "user-generated"
      });
      console.log("Reflection uploaded successfully.");
    } catch (err) {
      console.error("Reflection upload failed:", err);
    }
  }
}
