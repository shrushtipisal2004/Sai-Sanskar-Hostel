const toggle = document.getElementById("toggle");
const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.getElementById("modal");

function closeNavbar(e) {
  if (
    document.body.classList.contains("show-nav") &&
    e.target !== toggle &&
    !toggle.contains(e.target) &&
    e.target !== navbar &&
    !navbar.contains(e.target)
  ) {
    document.body.classList.toggle("show-nav");
    document.body.removeEventListener("click", closeNavbar);
  } else if (!document.body.classList.contains("show-nav")) {
    document.body.removeEventListener("click", closeNavbar);
  }
}

// Menu Slider
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
  document.body.addEventListener("click", closeNavbar);
});

// Logout function
function logout() {
    // Redirect to admin login page
    window.location.href = "adminlogin.html";
}

// Adding event listener to logout button
document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("open");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});
