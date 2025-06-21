// firebase.js — Live Firebase Integration for Naivira Scroll Vault

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// 🔐 Firebase configuration (your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyAQ8Z_2uSd6YHQyNQJuGldiRfyA0UDtXPY",
  authDomain: "naivira.firebaseapp.com",
  projectId: "naivira",
  storageBucket: "naivira.firebasestorage.app",
  messagingSenderId: "1015182843050",
  appId: "1:1015182843050:web:654d54370b26a6c9b984d3"
};

// 🌱 Initialize Firebase + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🌿 Upload a scroll to the Vault
export async function uploadScroll(scrollData) {
  try {
    const docRef = await addDoc(collection(db, "scrolls"), scrollData);
    console.log("Scroll uploaded with ID:", docRef.id);
  } catch (error) {
    console.error("Error uploading scroll:", error);
  }
}

// 📜 Fetch all scrolls from Vault
export async function fetchScrolls() {
  try {
    const snapshot = await getDocs(collection(db, "scrolls"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching scrolls:", error);
    return [];
  }
}

// 🔁 Real-time updates (if needed)
export function subscribeToScrolls(callback) {
  return onSnapshot(collection(db, "scrolls"), (snapshot) => {
    const scrolls = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(scrolls);
  });
}
