document.addEventListener("DOMContentLoaded", function() {
    // Toggle visibility of rules
    const sections = document.querySelectorAll(".rule-box h2");

    sections.forEach(section => {
        section.addEventListener("click", () => {
            let ruleList = section.nextElementSibling;
            ruleList.style.display = ruleList.style.display === "block" ? "none" : "block";
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        });
    });

    // Menu toggle for mobile devices
    const menuIcon = document.querySelector(".menu-icon");
    const menuList = document.getElementById("menu-list");
    const closeMenu = document.querySelector(".close-menu");

    function toggleMenu() {
        menuList.classList.toggle("active");
    }

    if (menuIcon) {
        menuIcon.addEventListener("click", toggleMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener("click", toggleMenu);
    }
});
