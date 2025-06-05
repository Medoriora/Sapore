// script.js

document.getElementById('preferences').addEventListener('change', () => {
    const preferences = document.getElementById('preferences').value;
    const dynamicFilters = document.getElementById('dynamicFilters');

    dynamicFilters.innerHTML = ''; // Очищаем динамические фильтры

    if (preferences) {
        dynamicFilters.innerHTML = `
            <label>Основные ингредиенты (через запятую):</label>
            <input type="text" id="mainIngredients" placeholder="Введите ингредиенты">
        `;
    }
});

document.getElementById('searchButton').addEventListener('click', async () => {
    const type = document.getElementById('type').value;
    const preferences = document.getElementById('preferences').value;
    const spicy = document.getElementById('spicy').value;

    let url = `http://127.0.0.1:5000/filter?type=${type}&preferences=${preferences}&spicy=${spicy}`;

    const mainIngredientsInput = document.getElementById('mainIngredients');
    if (mainIngredientsInput) {
        const mainIngredients = mainIngredientsInput.value.split(',').map(ing => ing.trim());
        url += `&mainIngredients=${encodeURIComponent(mainIngredients.join(','))}`;
    }

    const response = await fetch(url);
    const dishes = await response.json();

    let output = '';
    if (dishes.length > 0) {
        dishes.forEach(dish => {
            const ingredients = dish.mainIngredients ? dish.mainIngredients.join(', ') : 'Не указано';
            output += `
                <div class="dish">
                    <img src="${dish.photo}" alt="${dish.name}">
                    <div class="dish-info">
                        <h3>${dish.name}</h3>
                        <p>Тип: ${dish.type}</p>
                        <p>Предпочтения: ${dish.preferences}</p>
                        <p>Основные ингредиенты: ${ingredients}</p>
                        <p>Калории: ${dish.kcal} ккал</p>
                        <p>Вес: ${dish.weight} г</p>
                        <p>Цена: ${dish.price} ₽</p>
                    </div>
                </div>
            `;
        });
    } else {
        output = `<p>Ничего не найдено</p>`;
    }

    document.getElementById('dishes').innerHTML = output;
});

