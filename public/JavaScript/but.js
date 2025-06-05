// Получаем кнопку
const scrollToTopButton = document.getElementById("scrollToTop");

// Показываем или скрываем кнопку в зависимости от прокрутки
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "block"; // Показываем кнопку
  } else {
    scrollToTopButton.style.display = "none"; // Скрываем кнопку
  }
});

// Добавляем обработчик события клика
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Плавная прокрутка
  });
});
