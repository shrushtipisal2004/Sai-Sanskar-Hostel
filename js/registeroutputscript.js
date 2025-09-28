// Initialize Firebase
var firebaseConfig = {
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
const dbRef = firebase.database().ref("Registration"); // Reference to Registration node

const userListUI = document.getElementById("userList");
const userDetailUI = document.getElementById("userDetail");

// Fetch Data from Firebase
dbRef.on("child_added", (snapshot) => {
    let userKey = snapshot.key; // Unique user key
    let userData = snapshot.val(); // User data

    let li = document.createElement("li");
    li.textContent = userData.studentName || "studentName"; // Show student name
    li.setAttribute("data-key", userKey);
    li.addEventListener("click", showUserDetails);

    userListUI.appendChild(li);
});

// Function to show user details on click
function showUserDetails(event) {
    let userID = event.target.getAttribute("data-key");
    let userRef = dbRef.child(userID);

    userDetailUI.innerHTML = "<h3>User Details</h3>";

    userRef.once("value", (snapshot) => {
        let userData = snapshot.val();
        for (let key in userData) {
            let p = document.createElement("p");
            p.innerHTML = `<strong>${key}:</strong> ${userData[key]}`;
            userDetailUI.appendChild(p);
        }
    });
}
