// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2honZ977KzU8mG2rF1KifGoec9zwzpA4",
    authDomain: "saisanskarhostel-cbccc.firebaseapp.com",
    databaseURL: "https://saisanskarhostel-cbccc-default-rtdb.firebaseio.com",
    projectId: "saisanskarhostel-cbccc",
    storageBucket: "saisanskarhostel-cbccc.firebasestorage.app",
    messagingSenderId: "1445149479",
    appId: "1:1445149479:web:5eafa1bcdc5d77dcf50702",
    measurementId: "G-06QFV51LL6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref("Feedback"); // Ensure correct path

window.onload = function () {
    const userListUI = document.getElementById("userList");

    // Retrieve feedback data
    dbRef.on("child_added", snap => {
        let feedbackKey = snap.key; // e.g., "feedback_1742806064453"
        let feedbackData = snap.val();

        console.log("Retrieved feedback:", feedbackData); // Debugging

        // Create list item with only Name
        let listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${feedbackData.name}</strong>`;
        listItem.setAttribute("child-key", feedbackKey);
        listItem.addEventListener("click", userClicked);

        userListUI.appendChild(listItem);
    });

    function userClicked(e) {
        let userID = e.target.getAttribute("child-key");

        const userRef = dbRef.child(userID); // Fetch specific feedback
        const userDetailUI = document.getElementById("userDetail");

        userDetailUI.innerHTML = ""; // Clear previous details

        userRef.once("value", snap => {
            let feedbackDetail = snap.val();
            
            let details = `
                <p><strong>Name:</strong> ${feedbackDetail.name || "N/A"}</p>
                <p><strong>Email:</strong> ${feedbackDetail.email || "N/A"}</p>
                <p><strong>Message:</strong> ${feedbackDetail.message || "No message provided"}</p>
                <p><strong>Rating:</strong> ${feedbackDetail.rating || "N/A"}</p>
            `;

            userDetailUI.innerHTML = details;
        });
    }
};
