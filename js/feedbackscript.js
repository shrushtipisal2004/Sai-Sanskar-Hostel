document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const menuList = document.querySelector("#menu-list");
    const closeMenu = document.querySelector(".close-menu");
    const navLinks = document.querySelectorAll("#menu-list a");
    const overlay = document.createElement("div");

    // ✅ Toggle Menu on Mobile
    function toggleMenu() {
        menuList.classList.toggle("active");
    }

    menuIcon.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);

    // ✅ Close menu when clicking a link
    navLinks.forEach(item => {
        item.addEventListener("click", () => {
            menuList.classList.remove("active");

            const targetSection = document.querySelector(item.getAttribute("href"));
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });

    // ⭐ Handle Feedback Form
    const form = document.getElementById("feedback-form");
    const thankYouMessage = document.getElementById("thank-you");
    const stars = document.querySelectorAll(".star");
    let rating = 0;

    // ⭐ Star Rating System
    stars.forEach(star => {
        star.addEventListener("click", () => {
            const value = parseInt(star.getAttribute("data-value"));
            rating = rating === value ? 0 : value;

            stars.forEach((s, index) => {
                s.classList.toggle("active", index < rating);
            });
        });
    });

    // ✅ Handle Form Submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please provide a rating before submitting.");
            return;
        }

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
            rating: rating
        };

        console.log("Feedback Submitted:", formData);

        // Save to Firebase
        saveMessage(formData);

        form.style.display = "none";
        thankYouMessage.style.display = "block";

        form.reset();
        rating = 0;
        stars.forEach(star => star.classList.remove("active"));
    });

    // ✅ Firebase Configuration
    var config = {
        apiKey: "AIzaSyC2honZ977KzU8mG2rF1KifGoec9zwzpA4",
        authDomain: "saisanskarhostel-cbccc.firebaseapp.com",
        databaseURL: "https://saisanskarhostel-cbccc-default-rtdb.firebaseio.com",
        projectId: "saisanskarhostel-cbccc",
        storageBucket: "saisanskarhostel-cbccc.appspot.com",
        messagingSenderId: "1445149479",
        appId: "1:1445149479:web:5eafa1bcdc5d77dcf50702",
        measurementId: "G-06QFV51LL6"
    };
    firebase.initializeApp(config);

    // Reference Feedback Collection
    var messagesRef = firebase.database().ref("Feedback");

    // ✅ Save Message to Firebase
    function saveMessage(data) {
        const customId = `feedback_${Date.now()}`; // Unique ID
        messagesRef.child(customId).set(data);
    }
});
