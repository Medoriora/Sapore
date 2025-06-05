const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Схема и модель для отзывов
const reviewSchema = new mongoose.Schema({
    name: String,
    text: String,
    cons: String,
    rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);

// Схема и модель для заказов
const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    items: [{ name: String, quantity: Number, price: Number }],
    total: Number,
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

// Маршруты для отзывов
app.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});

app.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: 'Review deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Обновлённый POST /reviews с обработкой ошибок
app.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid review data' });
  }
});

// Маршруты для заказов
app.post('/orders/create', async (req, res) => {
    try {
        const { name, phone, items, total } = req.body;
        const newOrder = new Order({ name, phone, items, total });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Отдача статических файлов
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));