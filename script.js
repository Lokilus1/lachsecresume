/* script.js */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQKkqoZS3QAun91O6NC5MK9K2t0xDeCLg",
  authDomain: "lachsecresume.firebaseapp.com",
  projectId: "lachsecresume",
  storageBucket: "lachsecresume.firebasestorage.app",
  messagingSenderId: "710211092788",
  appId: "1:710211092788:web:bc45f9369ca07e341e2561",
  measurementId: "G-5RFEK6QDJ5"
};

// Function to switch between tabs
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

// Optional: Highlight active tab
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add blog posts
async function addPost() {
    const postContent = document.getElementById("newPost").value;
    if (!postContent.trim()) return;
    
    await addDoc(collection(db, "blogPosts"), { content: postContent, timestamp: Date.now() });

    document.getElementById("newPost").value = "";
    displayPosts();
}

// Function to display posts
async function displayPosts() {
    const querySnapshot = await getDocs(collection(db, "blogPosts"));
    document.getElementById("posts").innerHTML = querySnapshot.docs.map(doc => `<p>${doc.data().content}</p>`).join("");
}

// Run function when page loads
window.onload = displayPosts;

// TODO: Expand with additional JavaScript functionality if needed.
