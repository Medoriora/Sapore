const { MongoClient } = require('mongodb');

async function getOrdersFromDatabase() {
    const url = 'mongodb://localhost:27017'; // URL для подключения к вашей БД
    const dbName = 'diplom1';
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('orders');
        const orders = await collection.find({}).toArray(); // Получите все заказы
        return orders;
    } finally {
        client.close(); // Закройте соединение
    }
}

module.exports = { getOrdersFromDatabase };