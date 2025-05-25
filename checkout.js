document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartSummary = document.getElementById("cart-summary");
  const totalPrice = document.getElementById("total-price");

  const finalTotal = total + shippingCost;

  if (cart.length === 0) {
    cartSummary.innerHTML = "<li>No hay productos en el carrito.</li>";
    totalPrice.textContent = "Total: S/ 0.00";
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.title} x${item.quantity} - S/ ${(item.price * item.quantity).toFixed(2)}`;
      cartSummary.appendChild(li);
      total += item.price * item.quantity;
    });
    totalPrice.textContent = `Total: S/ ${total.toFixed(2)}`;
  }

  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const shippingMethod = form.querySelector('input[name="shipping"]:checked').value;
    const shippingCost = shippingMethod === "express" ? 20 : 10;
    const finalTotal = total + shippingCost;

    alert(`Gracias por tu compra. Total a pagar: S/ ${finalTotal.toFixed(2)}`);

    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});

