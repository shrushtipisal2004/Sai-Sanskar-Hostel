document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const menuList = document.querySelector("#menu-list");
    const closeMenu = document.querySelector(".close-menu");
    const faqContainer = document.querySelector(".faq-container");

    // ✅ Toggle Menu and Hide FAQ
    function toggleMenu() {
        menuList.classList.toggle("active");
        faqContainer.classList.toggle("hidden"); // Hide/Show FAQ
    }

    menuIcon.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);

    // ✅ Close menu and show FAQ when clicking a menu link
    const navLinks = document.querySelectorAll("#menu-list a");
    navLinks.forEach(item => {
        item.addEventListener("click", function () {
            menuList.classList.remove("active");
            faqContainer.classList.remove("hidden"); // Show FAQ again
        });
    });
});





const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
   toggle.addEventListener("click", () => {
      // Find the closest parent with the 'faq' class
      const faq = toggle.closest(".faq");
      const answer = faq.querySelector(".faq-answer");

      // Toggle the 'active' class on the faq
      faq.classList.toggle("active");

      // Toggle the display of the answer
      if (faq.classList.contains("active")) {
         answer.style.display = "block";  // Show the answer
      } else {
         answer.style.display = "none";  // Hide the answer
      }
   });
});