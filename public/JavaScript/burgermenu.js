document.addEventListener("DOMContentLoaded", () => {
    const burgerIcon = document.querySelector(".burger-icon");
    const burgerMenu = document.querySelector(".burger-slide");

    // Открыть/закрыть меню
    burgerIcon.addEventListener("click", () => {
        burgerMenu.classList.toggle("hidden");
        burgerMenu.classList.toggle("visible");
    });

    // Закрыть меню при клике вне меню
    document.addEventListener("click", (event) => {
        if (!burgerMenu.contains(event.target) && !burgerIcon.contains(event.target)) {
            burgerMenu.classList.add("hidden");
            burgerMenu.classList.remove("visible");
        }
    });
});
