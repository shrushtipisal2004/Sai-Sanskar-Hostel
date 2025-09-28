document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const menuList = document.querySelector("#menu-list");
    const closeMenu = document.querySelector(".close-menu");
    const navLinks = document.querySelectorAll("#menu-list a");
    const heroSection = document.querySelector(".hero");
    const overlay = document.querySelector(".overlay");

    // ✅ Toggle Menu on Mobile
    function toggleMenu() {
        menuList.classList.toggle("active");
    }

    menuIcon.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);

    // ✅ Hide Hero Section & Close Menu on Link Click
    navLinks.forEach(item => {
        item.addEventListener("click", function () {
            menuList.classList.remove("active");
            
            // ✅ Smooth Scroll to Section
            const targetSection = document.querySelector(item.getAttribute("href"));
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });
});


function openLightbox(src) {
    let lightbox = document.querySelector('.lightbox');
    let lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
    } else {
        console.error("Lightbox element not found!");
    }
}

function closeLightbox() {
    let lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}
