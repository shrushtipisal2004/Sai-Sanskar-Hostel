// Initialize Firebase
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", async () => {
    const updatesContainer = document.getElementById("updates-container");
    updatesContainer.innerHTML = "Loading updates...";
    
    try {
        const querySnapshot = await db.collection("updates").orderBy("timestamp", "desc").get();
        
        if (!querySnapshot.empty) {
            updatesContainer.innerHTML = "";
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const updateElement = document.createElement("div");
                updateElement.classList.add("update-item");
                updateElement.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.content}</p>
                    ${data.imageUrl ? `<img src="${data.imageUrl}" alt="Update Image" />` : ""}
                    <span class="update-date">${new Date(data.timestamp.toDate()).toLocaleString()}</span>
                `;
                updatesContainer.appendChild(updateElement);
            });
        } else {
            updatesContainer.innerHTML = "No updates available.";
        }
    } catch (error) {
        console.error("Error fetching updates:", error);
        updatesContainer.innerHTML = "Failed to load updates. Please try again later.";
    }
});
