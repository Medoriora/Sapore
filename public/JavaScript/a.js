const ingredientsByType = {
  Закуска: ["Помидоры", "Моцарелла", "Базилик", "Шампиньоны", "Лимон", "Бекон", "Авокадо", "Креветки", "Телятина", "Пармезан"],
  "Основное блюдо": ["Спагетти", "Лосось", "Тесто", "Бекон", "Шампиньоны", "Томатный соус", "Рис", "Морепродукты", "Тальятелле", "Пармезан"],
  Десерт: ["Маскарпоне", "Кофе", "Шоколад", "Ягоды", "Печенье Савоярди", "Канноли", "Сливки", "Ваниль", "Панеттоне", "Миндаль"]
};

let currentQuestion = 0;
let userAnswers = [];

const startQuizButton = document.getElementById("startQuiz");
const quizModal = document.getElementById("quizModal");
const closeQuizModalButton = document.getElementById("closeModal");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");

const questions = [
  {
    text: "Выберите тип блюда:",
    options: ["Закуска", "Основное блюдо", "Десерт"],
    onSelect: (answer) => {
      questions[1].options = ingredientsByType[answer]; // Настроим ингредиенты по типу блюда
      questions[2].options = ingredientsByType[answer]; // Для второго ингредиента
      if (answer === "Закуска") {
        questions[3] = {
          text: "Какую температуру блюда вы предпочитаете?",
          options: ["холодное", "теплое", "горячее"],
        };
      } else if (answer === "Основное блюдо") {
        questions[3] = {
          text: "Какой вкус вы хотите почувствовать?",
          options: ["соленое", "кислое", "сладкое", "умами"],
        };
      } else if (answer === "Десерт") {
        questions[3] = {
          text: "Какой вкус десерта вы предпочитаете?",
          options: ["шоколадное", "ягодное", "сливочное", "ореховое", "кремовое"],
        };
      }
    },
  },
  {
    text: "Выберите первый основной продукт:",
    options: [], // Ингредиенты для первого продукта
  },
  {
    text: "Выберите второй основной продукт:",
    options: [], // Ингредиенты для второго продукта
  },
  // Этот вопрос будет для температуры или вкуса
  {
    text: "",
    options: [],
  },
];

startQuizButton.addEventListener("click", () => {
  quizModal.style.display = "flex";
  resetQuiz();
  showQuestion();
});

closeQuizModalButton.addEventListener("click", closeQuiz);

window.addEventListener("click", (event) => {
  if (event.target === quizModal) {
    closeQuiz();
  }
});

function closeQuiz() {
  quizModal.style.display = "none";
  resetQuiz();
}

function showQuestion() {
  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion];
    questionElement.textContent = question.text;
    optionsElement.innerHTML = "";

    question.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => handleAnswer(option);
      optionsElement.appendChild(button);
    });
  } else {
    showResult();
  }
}

function handleAnswer(answer) {
  userAnswers.push(answer);

  if (questions[currentQuestion].onSelect) {
    questions[currentQuestion].onSelect(answer);
  }

  currentQuestion++;
  showQuestion();
}

function resetQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  resultElement.innerHTML = "";
  document.getElementById("quiz").style.display = "block";
  resultElement.style.display = "none";
}

function showResult() {
  resultElement.style.display = "flex";
  const selectedType = userAnswers[0];
  const selectedIngredients = userAnswers.slice(1, 3);
  const selectedTasteOrTemp = userAnswers[3];

  // Ищем точные совпадения
  let matchingDishes = products.filter(dish => {
    if (dish.type !== selectedType) return false;

    const hasIngredients = selectedIngredients.every(ingredient =>
      dish.ingredients.some(dishIng => dishIng.toLowerCase() === ingredient.toLowerCase())
    );

    if (selectedType === "Закуска" || selectedType === "Основное блюдо") {
      if (dish.temperature !== selectedTasteOrTemp) return false;
    }

    return hasIngredients;

    
  }).slice(0, 3);  // Ограничиваем максимум 3 блюда

document.getElementById("quiz").style.display = "none";
  // Если нет точных совпадений — ищем альтернативы
  if (matchingDishes.length === 0) {
    matchingDishes = products.filter(dish => {
      if (dish.type !== selectedType) return false;

      // Альтернатива: хотя бы один ингредиент совпадает
      const hasAnyIngredient = selectedIngredients.some(ingredient =>
        dish.ingredients.some(dishIng => dishIng.toLowerCase() === ingredient.toLowerCase())
      );

      return hasAnyIngredient;
    }).slice(0, 3);  // Тоже ограничиваем 3 блюда

    if (matchingDishes.length > 0) {
      resultElement.innerHTML = matchingDishes.map(dish => `
        <div class="dish-card" data-dish-id="${dish.id}">
          <h4>${dish.name}</h4>
          <img src="${dish.image}" alt="${dish.name}">
          <div class="dish-info-row">
            <span class="dish-price">${dish.price} руб</span>
            <div class="dish-tags">
              <span class="dish-tag1">${dish.weight}</span>
              <span class="dish-tag2">${dish.calories}</span>
            </div>
          </div>
          <p class="dish-description">Состав: ${dish.description}</p>
        </div>
      `).join("");
      attachDishCardEvents();
      return;
    }
  }

  // Если нет ни точных, ни альтернатив — показываем сообщение
  if (matchingDishes.length === 0) {
    resultElement.innerHTML = "<p>К сожалению, подходящих блюд не найдено.</p>";
  } else {
    // Показываем точные совпадения
    resultElement.innerHTML = matchingDishes.map(dish => `
      <div class="dish-card" data-dish-id="${dish.id}">
        <h4>${dish.name}</h4>
        <img src="${dish.image}" alt="${dish.name}">
        <div class="dish-info-row">
          <span class="dish-price">${dish.price} руб</span>
          <div class="dish-tags">
            <span class="dish-tag1">${dish.weight}</span>
            <span class="dish-tag2">${dish.calories}</span>
          </div>
        </div>
        <p class="dish-description">Состав: ${dish.description}</p>
      </div>
    `).join("");
    attachDishCardEvents();
  }

  document.getElementById("quiz").style.display = "none";
}


// Добавляем клики к карточкам из результатов
function attachDishCardEvents() {
  const dishCards = document.querySelectorAll(".dish-card");
  dishCards.forEach(card => {
    card.addEventListener("click", () => {
      const dishId = parseInt(card.getAttribute("data-dish-id"), 10);
      openDishModal(dishId);
    });
  });
}

// --- Modal (Модалка деталей блюда) ---

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

// Открыть модалку блюда по ID
function openDishModal(dishId) {
  const dish = products.find(d => d.id === dishId);
  if (!dish) return;

  productModalImg.src = dish.image || "";
  productModalTitle.textContent = dish.name || "Без названия";
  productModalDescription.textContent = dish.description || "Без описания";
  productModalPrice.textContent = `Цена: ${dish.price} руб`;
  productModalWeight.textContent = `Вес: ${dish.weight}`;
  productModalProtein.textContent = dish.protein;
  productModalFat.textContent = dish.fat;
  productModalCarbs.textContent = dish.carbs;
  productModalCalories.textContent = dish.calories;

  updateCartButton(dish.id);

  productAddToCartBtn.onclick = () => {
    addToCart(dish);
    updateCartButton(dish.id);
  };

  productModal.style.display = "flex";
}

productCloseBtn.addEventListener("click", () => {
  productModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === productModal) {
    productModal.style.display = "none";
  }
});

// --- Корзина ---

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || '',
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function isProductInCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.some(item => item.id === productId);
}

function updateCartButton(productId) {
  if (isProductInCart(productId)) {
    productAddToCartBtn.textContent = "В корзине";
    productAddToCartBtn.disabled = true;
  } else {
    productAddToCartBtn.textContent = "Добавить в корзину";
    productAddToCartBtn.disabled = false;
  }
}

// --- Карточки продуктов (если они есть на странице) ---
// Подключаем клики на карточки, чтобы открывать модалку

const productCards = document.querySelectorAll(".card-testimonial");
productCards.forEach((card, index) => {
  card.dataset.id = index + 1;
  card.addEventListener("click", () => {
    const productId = parseInt(card.dataset.id, 10);
    const product = products.find(p => p.id === productId);
    if (product) openDishModal(product.id);
  });
});