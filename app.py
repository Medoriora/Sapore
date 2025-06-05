# app.py

from flask import Flask, jsonify, request

app = Flask(__name__)

# Пример данных о блюдах
menu = [
    {
        "name": "Брускетта с томатами и базиликом", 
        "type": "Закуска", 
        "preferences": "Вегетарианское", 
        "mainIngredients": ["Томат"], 
        "spicy": False, 
        "price": 490,
        "kcal": 180,
        "weight": 150,
        "photo": "/static/images/Брускетта с томатами и базиликом.jpg"
    },
    {
        "name": "Капрезе", 
        "type": "Закуска", 
        "preferences": "Вегетарианское", 
        "mainVegetable": ["Томат", "Моцарелла"],
        "spicy": False, 
        "price": 675,
        "kcal": 250,
        "weight": 200,
        "photo": "/static/images/cap.jpg"
    },
    {
        "name": "Карпаччо из говядины с пармезаном", 
        "type": "Закуска", 
        "preferences": "Мясное", 
        "mainVegetable": ["Говядина"],
        "spicy": False, 
        "price": 645,
        "kcal": 310,
        "weight": 120,
        "photo": "/static/images/Карпаччо из говядины с пармезаном.jpeg"
    },
    {
        "name": "Артишоки на гриле", 
        "type": "Закуска", 
        "preferences": "Вегетарианское", 
        "mainVegetable": ["Артишок"],
        "spicy": False, 
        "price": 560,
        "kcal": 110,
        "weight": 120,
        "photo": "/static/images/Артишоки на гриле.jpg"
    },
    {
        "name": "Микс оливок", 
        "type": "Закуска", 
        "preferences": "Вегетарианское", 
        "mainVegetable": ["Оливки"],
        "spicy": False, 
        "price": 410,
        "kcal": 90,
        "weight": 100,
        "photo": "/static/images/Микс оливок.webp"
    },
    {
        "name": "Фритто-Мисто", 
        "type": "Закуска", 
        "preferences": "Мясное", 
        "mainVegetable": ["Морепродукты"],
        "spicy": False, 
        "price": 580,
        "kcal": 370,
        "weight": 250,
        "photo": "/static/images/Фритто-Мисто.jpg"
    },
    {
        "name": "Брускетта с грибами и пармезаном", 
        "type": "Закуска", 
        "preferences": "Вегетарианское", 
        "mainVegetable": ["Шампиньоны", "Пармезан"],
        "spicy": False, 
        "price": 420,
        "kcal": 280,
        "weight": 150,
        "photo": "/static/images/Брускетта с грибами и пармезаном.webp"
    },
    {
        "name": "Прошутто с инжиром", 
        "type": "Закуска", 
        "preferences": "Мясное", 
        "mainVegetable": ["Прошутто"],
        "spicy": False, 
        "price": 320,
        "kcal": 290,
        "weight": 180,
        "photo": "/static/images/Брускетта с грибами и пармезаном.webp"
    },
    
]


# Эндпоинт для фильтрации блюд
@app.route('/filter', methods=['GET'])
def filter_dishes():
    # Получаем параметры фильтра из запроса
    dish_type = request.args.get('type', '')
    preferences = request.args.get('preferences', '')
    ingredient = request.args.get('ingredient', '')  # Новый параметр для поиска по ингредиентам
    spicy = request.args.get('spicy', '')

    # Фильтруем блюда
    filtered_dishes = menu

    if dish_type:
        filtered_dishes = [dish for dish in filtered_dishes if dish['type'] == dish_type]

    if preferences:
        filtered_dishes = [dish for dish in filtered_dishes if dish['preferences'] == preferences]

    if ingredient:
        filtered_dishes = [dish for dish in filtered_dishes if ingredient in dish['mainIngredients']]

    if spicy:
        spicy = spicy == 'true'  # Преобразуем строку в boolean
        filtered_dishes = [dish for dish in filtered_dishes if dish['spicy'] == spicy]

    # Возвращаем отфильтрованные блюда в формате JSON
    return jsonify(filtered_dishes)
