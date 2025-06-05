// Загружаем корзину из localStorage
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const checkoutButton = document.getElementById("checkoutButton");

// Функция для загрузки корзины
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = ""; // Очищаем контейнер

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Ваша корзина пуста</p>";
    cartTotalPrice.textContent = "0 руб";
    return;
  }

  let totalPrice = 0;

  cart.forEach((item) => {
    const itemPrice = item.price * item.quantity;
    totalPrice += itemPrice;

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Цена: ${item.price} руб</p>
        <div class="quantity-controls">
          <button class="decrease-quantity" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-quantity" data-id="${item.id}">+</button>
        </div>
        <p>Сумма: <span class="item-sum">${itemPrice}</span> руб</p>
      </div>
      <div class="cart-item-actions">
        <button class="remove-from-cart" data-id="${item.id}">Удалить</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemElement);
  });

  cartTotalPrice.textContent = `${totalPrice} руб`;
}

function updateCart(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity += change;

    // Удаляем товар, если количество стало 0
    if (product.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }

    // Сохраняем изменения в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Перезагружаем корзину
  }
}

cartItemsContainer.addEventListener("click", (event) => {
  const button = event.target;
  if (button.classList.contains("increase-quantity")) {
    const productId = parseInt(button.dataset.id, 10);
    updateCart(productId, 1);
  }

  if (button.classList.contains("decrease-quantity")) {
    const productId = parseInt(button.dataset.id, 10);
    updateCart(productId, -1);
  }

  if (button.classList.contains("remove-from-cart")) {
    const productId = parseInt(button.dataset.id, 10);
    updateCart(productId, -1 * Number.MAX_SAFE_INTEGER); // Удаление
  }
});



function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Удаляем товар из корзины
  cart = cart.filter((item) => item.id !== productId);

  // Обновляем localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Перезагружаем корзину
  loadCart();
}

// Оформление заказа (пока просто очищает корзину)
checkoutButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Предотвращает стандартное поведение кнопки

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Обогащаем корзину названиями блюд из массива products
  const enrichedCart = cart.map(cartItem => {
    const dish = products.find(p => p.id === cartItem.id);
    return {
      id: cartItem.id,
      name: dish ? dish.name : `Блюдо ${cartItem.id}`,
      price: cartItem.price,
      quantity: cartItem.quantity,
      // Можете добавить другие поля если нужно
      weight: dish ? dish.weight : '',
      type: dish ? dish.type : ''
    };
  });
  
  const total = enrichedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const customerName = document.getElementById("customerName").value;
  const customerPhone = document.getElementById("customerPhone").value;

  if (!customerName || !customerPhone) {
    alert("Пожалуйста, заполните все поля формы.");
    return;
  }

  const order = {
    name: customerName,
    phone: customerPhone,
    items: enrichedCart, // Теперь отправляем enrichedCart вместо cart
    total,
  };

  try {
    const response = await fetch("http://localhost:3000/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message); // Показываем сообщение об успешной отправке
      localStorage.removeItem("cart"); // Очищаем корзину
      loadCart(); // Обновляем интерфейс
    } else {
      alert("Ошибка при оформлении заказа. Попробуйте снова.");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка. Попробуйте позже.");
  }
});

// Загружаем корзину при загрузке страницы
document.addEventListener("DOMContentLoaded", loadCart);

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

console.log("Путь к картинке:", item.image);