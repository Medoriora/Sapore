const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    items: { type: Array, required: true }, // Список товаров в заказе
    total: { type: Number, required: true } // Общая сумма заказа
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;