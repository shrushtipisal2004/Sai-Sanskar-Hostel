// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Firebase Configuration
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
    var registrationRef = firebase.database().ref("Registration");

    // Handle Form Submission
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get Form Values
        var studentName = document.getElementById("studentName").value.trim();
        var parentName = document.getElementById("parentName").value.trim();
        var guardianName = document.getElementById("guardianName").value.trim();
        var parentOccupation = document.getElementById("parentOccupation").value.trim();
        var parentPhone = document.getElementById("parentPhone").value.trim();
        var address = document.getElementById("address").value.trim();
        var aadhaar = document.getElementById("aadhaar").value.trim();
        var email = document.getElementById("email").value.trim();
        var studentPhone = document.getElementById("studentPhone").value.trim();
        var localAddress = document.getElementById("localAddress").value.trim();
        var dob = document.getElementById("dob").value;
        var birthPlace = document.getElementById("birthPlace").value.trim();
        var areaType = document.getElementById("areaType").value;
        var caste = document.getElementById("caste").value.trim();
        var lastQualification = document.getElementById("lastQualification").value.trim();
        var collegeName = document.getElementById("collegeName").value.trim();
        var hostelEntryDate = document.getElementById("hostelEntryDate").value;
        var collegeBranch = document.getElementById("collegeBranch").value.trim();
        var guardianContact = document.getElementById("guardianContact").value.trim();

        // Validate Fields
        if (
            studentName === "" || parentName === "" || guardianName === "" ||
            parentOccupation === "" || parentPhone === "" || address === "" ||
            aadhaar === "" || email === "" || studentPhone === "" || localAddress === "" ||
            dob === "" || birthPlace === "" || caste === "" || lastQualification === "" ||
            collegeName === "" || hostelEntryDate === "" || collegeBranch === "" || guardianContact === ""
        ) {
            showModal("❌ Please fill in all required fields.");
            return;
        }

        if (!validateEmail(email)) {
            showModal("❌ Please enter a valid email address.");
            return;
        }

        if (!validatePhone(parentPhone) || !validatePhone(studentPhone)) {
            showModal("❌ Please enter a valid 10-digit mobile number.");
            return;
        }

        // Save Data to Firebase
        var newRegistration = registrationRef.push();
        newRegistration.set({
            studentName: studentName,
            parentName: parentName,
            guardianName: guardianName,
            parentOccupation: parentOccupation,
            parentPhone: parentPhone,
            address: address,
            aadhaar: aadhaar,
            email: email,
            studentPhone: studentPhone,
            localAddress: localAddress,
            dob: dob,
            birthPlace: birthPlace,
            areaType: areaType,
            caste: caste,
            lastQualification: lastQualification,
            collegeName: collegeName,
            hostelEntryDate: hostelEntryDate,
            collegeBranch: collegeBranch,
            guardianContact: guardianContact
        });

        // Show Success Message
        showModal(`✅ Registration Successful! Welcome, <strong>${studentName}</strong>.`);

        // Reset Form
        document.getElementById("registrationForm").reset();
    });

    // Email Validation
    function validateEmail(email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Phone Validation
    function validatePhone(phone) {
        var phonePattern = /^[6-9]\d{9}$/;
        return phonePattern.test(phone);
    }

    // Show Modal Function
    function showModal(message) {
        if (document.querySelector(".modal-overlay")) {
            document.querySelector(".modal-overlay").remove();
        }

        var modal = document.createElement("div");
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
