document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  // Ya no hace falta este evento aquí para mostrar toast,
  // porque showToast se llama dentro de addToCart directamente.
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

function addToCart(title, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ title, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  showToast("Libro agregado al carrito");
}

function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const cartDiv = document.getElementById("cart");

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = item.title;

    const priceSpan = document.createElement("span");
    priceSpan.textContent = `S/ ${item.price.toFixed(2)}`;
    priceSpan.style.fontWeight = "600";
    priceSpan.style.color = "#b36a70";

    li.appendChild(titleSpan);
    li.appendChild(priceSpan);
    cartItems.appendChild(li);

    total += item.price;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);

  cartDiv.style.display = cart.length > 0 ? "block" : "none";
}

function emptyCart() {
  localStorage.removeItem("cart");
  updateCartUI();
}

function goToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  window.location.href = "checkout.html";
}

// --- Este bloque solo se usa en checkout.html ---
if (window.location.pathname.includes("checkout.html")) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemsContainer = document.getElementById("checkout-items");
  const totalContainer = document.getElementById("checkout-total");

  let total = 0;
  cart.forEach(product => {
    const div = document.createElement("div");
    div.className = "producto";
    div.textContent = `${product.title} - S/ ${product.price.toFixed(2)}`;
    itemsContainer.appendChild(div);
    total += product.price;
  });

  totalContainer.textContent = `Total a pagar: S/ ${total.toFixed(2)}`;

  window.finalizarPago = function (event) {
    event.preventDefault();
    const direccion = document.querySelector("input[placeholder='Dirección']").value.trim();
    const ciudad = document.querySelector("input[placeholder='Ciudad']").value.trim();
    const telefono = document.querySelector("input[placeholder='Teléfono']").value.trim();

    if (!/^\d{7,15}$/.test(telefono)) {
      alert("El teléfono debe contener solo números (7 a 15 dígitos).");
      return;
    }

    const productosList = cart.map(p => `- ${p.title} (S/ ${p.price.toFixed(2)})`).join('\n');
    alert(`Gracias por tu compra. Estos son tus productos:\n${productosList}\n\nTe contactaremos pronto.`);

    localStorage.removeItem("cart");
    window.location.href = "index.html";
  };
}


