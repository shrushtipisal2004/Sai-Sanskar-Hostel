// Initialize Firebase
var config = {
    apiKey: "AIzaSyC2honZ977KzU8mG2rF1KifGoec9zwzpA4",
    authDomain: "saisanskarhostel-cbccc.firebaseapp.com",
    databaseURL: "https://saisanskarhostel-cbccc-default-rtdb.firebaseio.com",
    projectId: "saisanskarhostel-cbccc",
    storageBucket: "saisanskarhostel-cbccc.appspot.com", // Fixed storageBucket URL
    messagingSenderId: "1445149479",
    appId: "1:1445149479:web:5eafa1bcdc5d77dcf50702",
    measurementId: "G-06QFV51LL6"
};

firebase.initializeApp(config);

const dbRef = firebase.database().ref();

// Corrected database reference to fetch contact form data
const usersRef = dbRef.child('ContactForm');
const userListUI = document.getElementById("userList");

usersRef.on("child_added", snap => {
    let user = snap.val();

    if (!user) {
        console.log("No data found.");
        return;
    }

    console.log("User Data:", user); // Debugging log

    let $li = document.createElement("li");
    $li.innerHTML = user.name;

    $li.setAttribute("child-key", snap.key);
    $li.addEventListener("click", userClicked);
    userListUI.append($li);
});

function userClicked(e) {
    var userID = e.target.getAttribute("child-key");

    const userRef = dbRef.child('ContactForm/' + userID);
    const userDetailUI = document.getElementById("userDetail");

    userDetailUI.innerHTML = "";

    userRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val();
        userDetailUI.append($p);
    });
}
