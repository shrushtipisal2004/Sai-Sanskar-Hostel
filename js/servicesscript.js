document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const menuList = document.querySelector("#menu-list");
    const closeMenu = document.querySelector(".close-menu");
    const navLinks = document.querySelectorAll("#menu-list a");

    // ✅ Toggle Menu on Mobile
    function toggleMenu() {
        menuList.classList.toggle("active");
    }

    menuIcon.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);

    // ✅ Close Menu on Link Click (for internal and external links)
    navLinks.forEach(item => {
        item.addEventListener("click", function (event) {
            menuList.classList.remove("active");
            
            // ✅ Handle smooth scroll for internal links only
            const targetSection = document.querySelector(item.getAttribute("href"));
            if (targetSection) {
                event.preventDefault(); // Prevent default only for internal links
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });
});

// ✅ Service Filtering
function filterServices(category) {
    const items = document.querySelectorAll('.service-item');

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}