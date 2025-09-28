// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2honZ977KzU8mG2rF1KifGoec9zwzpA4",
    authDomain: "saisanskarhostel-cbccc.firebaseapp.com",
    databaseURL: "https://saisanskarhostel-cbccc-default-rtdb.firebaseio.com",
    projectId: "saisanskarhostel-cbccc",
    storageBucket: "saisanskarhostel-cbccc.appspot.com",
    messagingSenderId: "1445149479",
    appId: "1:1445149479:web:5eafa1bcdc5d77dcf50702",
    measurementId: "G-06QFV51LL6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

// Form Submission Handler
document.getElementById("updateForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const section = document.getElementById("section").value;
    const content = document.getElementById("content").value.trim();
    const imageFile = document.getElementById("imageUpload").files[0];
    const updateStatus = document.getElementById("updateStatus");

    // Validate input
    if (!section || (!content && !imageFile)) {
        updateStatus.textContent = "Please select a section and provide content or an image.";
        updateStatus.style.color = "red";
        return;
    }

    try {
        let imageUrl = "";

        // Upload image if provided
        if (imageFile) {
            const storageRef = storage.ref(`images/${section}/${imageFile.name}`);
            const snapshot = await storageRef.put(imageFile);
            imageUrl = await snapshot.ref.getDownloadURL();
        }

        // Prepare data object
        const updateData = {
            content: content || "", 
            imageUrl: imageUrl || "", // Store image URL if uploaded
            updatedAt: new Date().toISOString()
        };

        // Use push() instead of set() to keep previous data
        await database.ref(`updates/${section}`).push(updateData);

        // Success Message
        updateStatus.textContent = "Content updated successfully!";
        updateStatus.style.color = "green";

        // Reset Form
        document.getElementById("updateForm").reset();

    } catch (error) {
        updateStatus.textContent = "Error updating content: " + error.message;
        updateStatus.style.color = "red";
    }
});
