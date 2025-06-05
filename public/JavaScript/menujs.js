
    // Ингредиенты по типам блюд
    const ingredientsByType = {
      
        Закуска: ["Помидоры", "Моцарелла", "Базилик", "Шампиньоны", "Лимон", "Бекон", "Авокадо", "Креветки", "Телятина", "Пармезан"],
        "Основное блюдо": ["Спагетти", "Лосось", "Тесто", "Бекон", "Шампиньоны", "Томатный соус", "Рис", "Морепродукты", "Тальятелле", "Пармезан"],
        Десерт: ["Маскарпоне", "Кофе", "Шоколад", "Ягоды", "Печенье Савоярди", "Канноли", "Сливки", "Ваниль", "Панеттоне", "Миндаль"]
      
    };

    let currentQuestion = 0;
    let userAnswers = [];

    const startQuizButton = document.getElementById("startQuiz");
    const quizModal = document.getElementById("quizModal");
    const closeModalButton = document.getElementById("closeModal");
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
      quizModal.style.display = "flex"; // Показываем модальное окно
      resetQuiz(); // Сбрасываем состояние перед началом
      showQuestion(); // Показываем первый вопрос
    });

    closeModalButton.addEventListener("click", closeModal);

    window.addEventListener("click", (event) => {
      if (event.target === quizModal) {
        closeModal();
      }
    });

    function closeModal() {
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

  // Переходим к следующему вопросу, если это не последний.
  showQuestion();
}

    function adjustModalWidth(cardCount) {
      const baseWidth = 300; // Минимальная ширина (если нет карточек)
      const cardWidth = 280; // Ширина одной карточки
      const maxWidth = 1200; // Максимальная ширина окна
    
      // Рассчитываем новую ширину
      const newWidth = Math.min(baseWidth + cardCount * cardWidth, maxWidth);
    
      // Применяем ширину к .modal-content
      const modalContent = document.getElementById("modalContent");
      if (modalContent) {
        modalContent.style.width = `${newWidth}px`;
      }
    }

// Функция привязки событий для карточек
function attachDishCardEvents() {
  const dishCards = document.querySelectorAll(".dish-card");

  dishCards.forEach((card) => {
    card.addEventListener("click", () => {
      const dishId = card.getAttribute("data-dish-id"); // Получаем id блюда из data-атрибута
      openDishModal(dishId); // Передаем ID блюда
    });
  });
}

// Функция открытия модального окна
function openDishModal(dishId) {
  const dish = products.find((d) => d.id == dishId);
  if (!dish) return;

  const productModal = document.getElementById("productModal");
  const productModalImg = document.getElementById("productModalImg");
  const productModalTitle = document.getElementById("productModalTitle");
  const productModalDescription = document.getElementById("productModalDescription");
  const productModalPrice = document.getElementById("productModalPrice");
  const productModalWeight = document.getElementById("productModalWeight");
  const productModalCalories = document.getElementById("productModalCalories");
  const productModalProtein = document.getElementById("productModalProtein");
  const productModalFat = document.getElementById("productModalFat");
  const productModalCarbs = document.getElementById("productModalCarbs");

  // Устанавливаем данные блюда в модальное окно
  productModalImg.src = dish.image || "";
  productModalTitle.textContent = dish.name || "Нет названия";
  productModalDescription.textContent = dish.description || "Нет описания";
  productModalPrice.textContent = `Цена: ${dish.price} руб` || "Не указана цена";
  productModalWeight.textContent = `Вес: ${dish.weight}` || "Не указан вес";
  productModalCalories.textContent = dish.calories || "Не указаны калории";
  productModalProtein.textContent = dish.protein || "Не указаны белки";
  productModalFat.textContent = dish.fat || "Не указаны жиры";
  productModalCarbs.textContent = dish.carbs || "Не указаны углеводы";

  // Добавляем кнопку "Добавить в корзину"
  const productAddToCartBtn = document.getElementById("productAddToCartBtn");
  updateAddToCartButton(productAddToCartBtn, dish.id);

  productAddToCartBtn.onclick = () => {
    addToCart(dish);
    updateAddToCartButton(productAddToCartBtn, dish.id);
  };

  // Показываем модальное окно
  productModal.style.display = "flex";
}


// Добавляем обработчики на карточки товаров
const productCards = document.querySelectorAll(".card-testimonial");
productCards.forEach((card, index) => {
  card.dataset.id = index + 1; // Привязываем ID к каждой карточке

  card.addEventListener("click", () => {
    const productId = parseInt(card.dataset.id, 10);
    const product = products.find((p) => p.id === productId);

    if (product) {
      // Заполняем модальное окно данными из массива
      productModalImg.src = product.img;
      productModalTitle.textContent = product.title;
      productModalDescription.textContent = product.description;
      productModalPrice.textContent = `Цена: ${product.price} руб`;
      productModalWeight.textContent = `Вес: ${product.weight}`;
      productModalProtein.textContent = product.kbju.protein;
      productModalFat.textContent = product.kbju.fat;
      productModalCarbs.textContent = product.kbju.carbs;
      productModalCalories.textContent = product.kbju.calories;


      
           // Обновляем текст кнопки
      updateCartButton(productId);

      // Показываем модальное окно
      productModal.style.display = "flex";

      // Добавляем событие на кнопку "Добавить в корзину"
      productAddToCartBtn.onclick = () => {
        addToCart(product);
        updateCartButton(productId);
      };
    }
    
  });
});


// Проверка, есть ли товар в корзине
function isProductInCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.some((item) => item.id === productId);
}



// Добавление товара в корзину
function addToCart(dish) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === dish.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // Увеличиваем количество
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: parseInt(dish.price, 10),
       image: dish.image || dish.img || '',
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Обновление состояния кнопки "Добавить в корзину"
function updateAddToCartButton(button, productId) {
  if (isProductInCart(productId)) {
    button.textContent = "В корзине";
    button.disabled = true; // Делаем кнопку неактивной
  } else {
    button.textContent = "Добавить в корзину";
    button.disabled = false;
  }
}


// Закрытие модального окна
document.querySelector(".product-close-btn").addEventListener("click", () => {
  document.getElementById("productModal").style.display = "none";
});

function showResult() {
  resultElement.style.display = "flex";
  const selectedType = userAnswers[0];
  const selectedIngredients = userAnswers.slice(1);

  const selectedTemperature = userAnswers[3]; // Ответ на вопрос о температуре
  const selectedTaste = userAnswers[4]; // Ответ на вопрос о вкусе

  const matchingDishes = products.filter(
  dish =>
    dish.type === selectedType &&
    selectedIngredients.every(ingredient =>
      dish.ingredients.some(dishIngredient =>
        dishIngredient.toLowerCase() === ingredient.toLowerCase()
      )
    ) &&
    dish.taste.includes(selectedTaste) // Используем русское слово для фильтрации
);
      
        let displayedDishes = matchingDishes;

        if (matchingDishes.length > 0) {
          resultElement.innerHTML = `
       
      <div class="result-carousel">
        <div class="result-dishes">
          ${matchingDishes.map((dish, index) => `
            <div class="dish-card" id="dish-${index}" data-dish-id="${dish.id}">
              <h4>${dish.name}</h4>
                    <img src="${dish.image}" alt="${dish.name}">
                    <div class="dish-info-row">
                      <span class="dish-price">${dish.price}</span>
                      <div class="dish-tags">
                        <span class="dish-tag1">${dish.weight}</span>
                        <span class="dish-tag2">${dish.calories}</span>
                      </div>
                    </div>
                    <p class="dish-description">Состав: ${dish.description}</p>
                  </div>
                `).join("")}
              </div>
            </div>
          `;

          
      
          adjustModalWidth(matchingDishes.length); // Устанавливаем ширину окна
          attachDishCardEvents(); // Привязываем события кликов к карточкам
        } else {
          const alternativeDishes = products
            .filter(
              dish =>
                dish.type === selectedType &&
                selectedIngredients.some(ingredient =>
                  dish.ingredients.some(dishIngredient =>
                    dishIngredient.toLowerCase() === ingredient.toLowerCase()
                  )
                )
            )
            .slice(0, 3); // Ограничиваем до 3 блюд
      
          if (alternativeDishes.length > 0) {
            resultElement.innerHTML = `
              <div class="result-carousel">
        <div class="result-dishes">
          ${alternativeDishes.map((dish, index) => `
            <div class="dish-card" id="dish-alt-${index}" data-dish-id="${dish.id}">
                      <h4>${dish.name}</h4>
                      <img src="${dish.image}" alt="${dish.name}">
                      <div class="dish-info-row">
                        <span class="dish-price">${dish.price}</span>
                        <div class="dish-tags">
                          <span class="dish-tag1">${dish.weight}</span>
                          <span class="dish-tag2">${dish.calories}</span>
                        </div>
                      </div>
                      <p class="dish-description">Состав: ${dish.description}</p>
                    </div>
                  `).join("")}
                </div>
              </div>
            `;
      
            adjustModalWidth(alternativeDishes.length); // Устанавливаем ширину окна
            attachDishCardEvents(); // Привязываем события кликов к карточкам
          } else {
            resultElement.innerHTML = "<p>К сожалению, подходящих блюд не найдено.</p>";
            adjustModalWidth(1); // Минимальная ширина
          }
        }
      
        document.getElementById("quiz").style.display = "none";
        resultElement.style.display = "flex";
      }
        
function resetQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  resultElement.innerHTML = "";
  document.getElementById("quiz").style.display = "block";
}
       
console.log(dish);
addToCart(dish);