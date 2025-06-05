const orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('customerName').value;
  const phone = document.getElementById('customerPhone').value;
  const email = document.getElementById('customerEmail').value;

  const items = JSON.parse(localStorage.getItem('cart')) || [];
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    const response = await fetch('http://localhost:5000/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, items, total })
    });

    const result = await response.json();
    alert(result.message);

    localStorage.removeItem('cart'); // Очищаем корзину
  } catch (error) {
    console.error("Ошибка отправки заказа:", error);
    alert("Ошибка оформления заказа. Попробуйте еще раз.");
  }
});