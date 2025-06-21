// firebase.js — Core Firebase setup for Naivira Scroll Vault

// 🚨 Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "000000000000",
  appId: "YOUR_APP_ID_HERE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🌿 Upload a scroll to the Vault
async function uploadScroll(scrollData) {
  try {
    const docRef = await db.collection("scrolls").add(scrollData);
    console.log("Scroll uploaded with ID:", docRef.id);
  } catch (error) {
    console.error("Error uploading scroll:", error);
  }
}

// 📜 Fetch all scrolls
async function fetchScrolls() {
  try {
    const snapshot = await db.collection("scrolls").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching scrolls:", error);
    return [];
  }
}

// 🔁 Optional: Listen for updates in real-time
function subscribeToScrolls(callback) {
  return db.collection("scrolls").onSnapshot(snapshot => {
    const scrolls = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(scrolls);
  });
}
