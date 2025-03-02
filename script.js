/* script.js */

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
