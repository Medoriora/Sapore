

// Получаем элементы нового модального окна
const productModal = document.getElementById("productModal");
const productModalImg = document.getElementById("productModalImg");
const productModalTitle = document.getElementById("productModalTitle");
const productModalDescription = document.getElementById("productModalDescription");
const productModalPrice = document.getElementById("productModalPrice");
const productModalWeight = document.getElementById("productModalWeight");
const productModalProtein = document.getElementById("productModalProtein");
const productModalFat = document.getElementById("productModalFat");
const productModalCarbs = document.getElementById("productModalCarbs");
const productModalCalories = document.getElementById("productModalCalories");
const productCloseBtn = document.querySelector(".product-close-btn");
const productAddToCartBtn = document.getElementById("productAddToCartBtn");



// Проверяем, есть ли товар в корзине
function isProductInCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.some((item) => item.id === productId);
}

// Обновляем текст кнопки
function updateCartButton(productId) {
  if (isProductInCart(productId)) {
    productAddToCartBtn.textContent = "В корзине";
    productAddToCartBtn.disabled = true; // Делаем кнопку неактивной
  } else {
    productAddToCartBtn.textContent = "Добавить в корзину";
    productAddToCartBtn.disabled = false;
  }
}

// Добавляем обработчики на карточки товаров
const productCards = document.querySelectorAll(".card-testimonial");
productCards.forEach((card, index) => {
  card.dataset.id = index + 1;

  card.addEventListener("click", () => {
    console.log("Клик по карточке, id:", card.dataset.id); // Добавь сюда

    const productId = parseInt(card.dataset.id, 10);
    const product = products.find((p) => p.id === productId);

    if (product) {
      // заполнение модалки и показ
      productModalImg.src = product.image;
      productModalTitle.textContent = product.name;
      productModalDescription.textContent = product.description;
      productModalPrice.textContent = `Цена: ${product.price} руб`;
      productModalWeight.textContent = `Вес: ${product.weight}`;
      productModalProtein.textContent = product.protein;
      productModalFat.textContent = product.fat;
      productModalCarbs.textContent = product.carbs;
      productModalCalories.textContent = product.calories;

      updateCartButton(productId);

      productModal.style.display = "flex";

      productAddToCartBtn.onclick = () => {
        addToCart(product);
        updateCartButton(productId);
      };
    }
  });
});

// Закрытие нового модального окна
productCloseBtn.addEventListener("click", () => {
  productModal.style.display = "none";
});

// Закрытие при клике вне модального контента
window.addEventListener("click", (event) => {
  if (event.target === productModal) {
    productModal.style.display = "none";
  }
});

// Функция для добавления товара в корзину
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Проверяем, есть ли уже товар в корзине
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // Увеличиваем количество
  } else {
    cart.push({
      id: product.id,
      name: product.title,
      price: product.price,
       image: product.image || product.img || '',
      quantity: 1,
    });
  }

  // Сохраняем корзину в localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

}

