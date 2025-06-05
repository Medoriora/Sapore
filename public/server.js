const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Статика из папки public

// Подключение к MongoDB
const MONGO_URI = "mongodb://127.0.0.1:27017/diplom";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Схема и модель заказа
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  items: [{ name: String, quantity: Number }],
  total: Number
});
const Order = mongoose.model('Order', orderSchema);

// Создание заказа (POST)
app.post('/orders/create', async (req, res) => {
  try {
    const { name, phone, email, items, total } = req.body;
    const newOrder = new Order({ name, phone, email, items, total });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Получение всех заказов (GET)
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
