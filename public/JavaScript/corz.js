document.addEventListener("DOMContentLoaded", () => {
    const addToCartBtn = document.getElementById("productAddToCartBtn");
  
    addToCartBtn.addEventListener("click", () => {
      if (addToCartBtn.classList.contains("in-cart")) {
        // Если уже в корзине, можно вернуть в начальное состояние
        addToCartBtn.classList.remove("in-cart");
        addToCartBtn.textContent = "Добавить в корзину";
        addToCartBtn.style.backgroundColor = ""; // Вернуть цвет по умолчанию
      } else {
        // Добавить в корзину
        addToCartBtn.classList.add("in-cart");
        addToCartBtn.textContent = "В корзине";
      }
    });
  });