document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".team-card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", function () {
            this.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.2)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        });
    });
});