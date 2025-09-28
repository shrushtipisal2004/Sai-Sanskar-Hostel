



document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Replace with your actual authentication logic
  if (username === "admin" && password === "12345") {
    // Successful login
    alert("Login successful!");
    // Redirect to admin console or perform other actions
    window.location.href = "adminpanel.html"; // Example: Redirect to a dashboard
  } else {
    // Failed login
    alert("Invalid username or password.");
  }
});