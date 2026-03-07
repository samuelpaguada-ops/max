const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu-grid');
const productButtons = document.querySelectorAll('.product-btn');
const selectedProduct = document.getElementById('selectedProduct');
const productForm = document.getElementById('productForm');
const productMessage = document.getElementById('productMessage');

let productChoice = '';

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });

    panels.forEach((panel) => {
      panel.classList.remove('active');
      panel.hidden = true;
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const target = document.getElementById(tab.dataset.target);
    target.classList.add('active');
    target.hidden = false;
  });
});

productButtons.forEach((button) => {
  button.addEventListener('click', () => {
    productChoice = button.dataset.producto;
    selectedProduct.textContent = `Producto seleccionado: ${productChoice}`;
    selectedProduct.classList.add('selected-ok');
    productMessage.className = 'form-message';
    productMessage.textContent = '';
  });
});

productForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  productMessage.className = 'form-message';

  const cliente = document.getElementById('cliente').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  if (!productChoice) {
    productMessage.textContent = 'Primero selecciona un producto o servicio.';
    productMessage.classList.add('error');
    return;
  }

  if (!cliente || !telefono) {
    productMessage.textContent = 'Completa nombre y teléfono para enviar la solicitud.';
    productMessage.classList.add('error');
    return;
  }

  if (!/^\d{9}$/.test(telefono)) {
    productMessage.textContent = 'El teléfono debe tener exactamente 9 dígitos.';
    productMessage.classList.add('error');
    return;
  }

  productMessage.textContent = `Solicitud enviada para ${productChoice}. Te contactaremos, ${cliente}.`;
  productMessage.classList.add('success');
  productForm.reset();
  productChoice = '';
  selectedProduct.textContent = 'Producto seleccionado: ninguno';
  selectedProduct.classList.remove('selected-ok');
});
