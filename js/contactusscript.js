document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const menuList = document.querySelector("#menu-list");
    const closeMenu = document.querySelector(".close-menu");

    // Toggle Menu on Mobile
    function toggleMenu() {
        menuList.classList.toggle("active");
    }

    menuIcon.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);

    // Firebase Configuration
    var config = {
        apiKey: "AIzaSyC2honZ977KzU8mG2rF1KifGoec9zwzpA4",
        authDomain: "saisanskarhostel-cbccc.firebaseapp.com",
        databaseURL: "https://saisanskarhostel-cbccc-default-rtdb.firebaseio.com",
        projectId: "saisanskarhostel-cbccc",
        storageBucket: "saisanskarhostel-cbccc.firebasestorage.app",
        messagingSenderId: "1445149479",
        appId: "1:1445149479:web:5eafa1bcdc5d77dcf50702",
        measurementId: "G-06QFV51LL6"
    };
    firebase.initializeApp(config);
    var messagesRef = firebase.database().ref('ContactForm');

    // Contact Form Handling
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate Form Inputs
        if (name === "" || email === "" || phone === "" || message === "") {
            showModal("❌ Please fill out all fields before submitting.");
            return;
        }
        if (!validateEmail(email)) {
            showModal("❌ Please enter a valid email address.");
            return;
        }
        if (!validatePhone(phone)) {
            showModal("❌ Please enter a valid 10-digit phone number.");
            return;
        }

        // Save message to Firebase
        saveMessage(name, email, phone, message);

        // Show success modal
        showModal(`✅ Thank you for contacting us, <strong>${name}</strong>! We will get back to you soon.`);

        // Reset form
        contactForm.reset();
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validatePhone(phone) {
        const phonePattern = /^[6-9]\d{9}$/;
        return phonePattern.test(phone);
    }

    function saveMessage(name, email, phone, message) {
        var newMessageRef = messagesRef.push();
        newMessageRef.set({
            name: name,
            email: email,
            phone: phone,
            message: message
        });
    }

    function showModal(message) {
        // Remove any existing modal before adding a new one
        if (document.querySelector(".modal-overlay")) {
            document.querySelector(".modal-overlay").remove();
        }

        const modal = document.createElement("div");
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <p>${message}</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.querySelector(".close-modal").addEventListener("click", function () {
            modal.remove();
        });

        setTimeout(() => {
            modal.remove();
        }, 4000);
    }
});
