'use strict';

const PRODUCTS = {
  'masa-madre': { name: 'Pan de masa madre', category: 'Panes', description: 'Pan de corteza crujiente y miga suave, ideal para compartir en la mesa.', price: 12, unit: 'por unidad', image: 'assets/images/pan-masa-madre.svg', ingredients: 'Harina de trigo, agua, masa madre y sal.', allergens: 'Trigo/gluten.' },
  croissant: { name: 'Croissant de mantequilla', category: 'Panes', description: 'Masa laminada de textura ligera, pensada para acompañar el desayuno o una bebida.', price: 5, unit: 'por unidad', image: 'assets/images/croissant.svg', ingredients: 'Harina de trigo, mantequilla, leche, azúcar, levadura y sal.', allergens: 'Trigo/gluten y leche.' },
  'torta-chocolate': { name: 'Torta de chocolate', category: 'Tortas', description: 'Torta de chocolate para compartir en reuniones y ocasiones especiales.', price: 65, unit: 'por torta', image: 'assets/images/torta-chocolate.svg', ingredients: 'Harina de trigo, cacao, huevo, leche, azúcar y mantequilla.', allergens: 'Trigo/gluten, huevo y leche.' },
  'pie-limon': { name: 'Pie de limón', category: 'Postres', description: 'Postre con base de masa y relleno de limón, de sabor dulce y cítrico.', price: 30, unit: 'por pie', image: 'assets/images/pie-limon.svg', ingredients: 'Harina de trigo, mantequilla, huevo, leche condensada y limón.', allergens: 'Trigo/gluten, huevo y leche.' },
  alfajor: { name: 'Alfajor de maicena', category: 'Postres', description: 'Dos tapas suaves de maicena con relleno dulce.', price: 3, unit: 'por unidad', image: 'assets/images/alfajor.svg', ingredients: 'Maicena, harina de trigo, mantequilla, huevo y relleno de leche.', allergens: 'Trigo/gluten, huevo y leche.' },
  'caja-surtida': { name: 'Caja surtida de postres', category: 'Postres', description: 'Selección demostrativa de pequeños postres para compartir.', price: 25, unit: 'por caja', image: 'assets/images/caja-postres.svg', ingredients: 'Composición variable de ejemplo; puede incluir preparaciones con trigo, huevo y leche.', allergens: 'La composición exacta requeriría confirmación. Puede incluir trigo/gluten, huevo y leche.' }
};

const money = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
const searchInput = document.querySelector('#buscar-producto');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const cards = [...document.querySelectorAll('.product-card')];
const emptyState = document.querySelector('#empty-state');
const catalogStatus = document.querySelector('#catalog-status');
const form = document.querySelector('#request-form');
const productSelect = document.querySelector('#producto');
const quantityInput = document.querySelector('#cantidad');
const dateInput = document.querySelector('#fecha');
const confirmation = document.querySelector('#confirmation');
const dialog = document.querySelector('#product-dialog');
let activeCategory = 'todos';
let activeProductId = '';

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

dateInput.min = localDateString();

function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = 'Abrir menú';
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('is-open', willOpen);
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.querySelector('.sr-only').textContent = willOpen ? 'Cerrar menú' : 'Abrir menú';
  document.body.classList.toggle('menu-open', willOpen);
});

menu.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});

function normalizeText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function updateCatalog() {
  const query = normalizeText(searchInput.value);
  let visibleCount = 0;
  cards.forEach(card => {
    const categoryMatches = activeCategory === 'todos' || card.dataset.category === activeCategory;
    const searchMatches = normalizeText(card.dataset.search).includes(query);
    const visible = categoryMatches && searchMatches;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  emptyState.hidden = visibleCount !== 0;
  catalogStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'producto mostrado' : 'productos mostrados'}.`;
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    updateCatalog();
  });
});

searchInput.addEventListener('input', updateCatalog);
document.querySelector('#reset-products').addEventListener('click', () => {
  searchInput.value = '';
  activeCategory = 'todos';
  filterButtons.forEach(button => {
    const active = button.dataset.category === 'todos';
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  updateCatalog();
  searchInput.focus();
});

function openProductDialog(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;
  activeProductId = productId;
  document.querySelector('#dialog-category').textContent = product.category;
  document.querySelector('#dialog-title').textContent = product.name;
  document.querySelector('#dialog-description').textContent = product.description;
  document.querySelector('#dialog-price').innerHTML = `${money.format(product.price)} <span>${product.unit}</span>`;
  document.querySelector('#dialog-ingredients').textContent = product.ingredients;
  document.querySelector('#dialog-allergens').textContent = product.allergens;
  const image = document.querySelector('#dialog-image');
  image.src = product.image;
  image.alt = `Ilustración referencial de ${product.name.toLowerCase()}`;
  dialog.showModal();
}

document.querySelectorAll('.detail-button').forEach(button => {
  button.addEventListener('click', () => openProductDialog(button.dataset.product));
});

function selectProductAndGo(productId) {
  if (!PRODUCTS[productId]) return;
  productSelect.value = productId;
  clearFieldError(productSelect);
  document.querySelector('#solicitud').scrollIntoView({ behavior: 'smooth' });
  window.setTimeout(() => productSelect.focus({ preventScroll: true }), 350);
}

document.querySelectorAll('.request-button').forEach(button => {
  button.addEventListener('click', () => selectProductAndGo(button.dataset.product));
});

function closeDialog() {
  if (dialog.open) dialog.close();
}

document.querySelector('#dialog-close').addEventListener('click', closeDialog);
document.querySelector('#dialog-back').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {
  if (event.target === dialog) closeDialog();
});
document.querySelector('#dialog-request').addEventListener('click', () => {
  const selected = activeProductId;
  closeDialog();
  selectProductAndGo(selected);
});

function setFieldError(field, message) {
  field.setAttribute('aria-invalid', 'true');
  document.querySelector(`#${field.id}-error`).textContent = message;
}

function clearFieldError(field) {
  field.removeAttribute('aria-invalid');
  document.querySelector(`#${field.id}-error`).textContent = '';
}

[productSelect, quantityInput, dateInput].forEach(field => {
  field.addEventListener('change', () => clearFieldError(field));
  field.addEventListener('input', () => clearFieldError(field));
});

function validateForm() {
  const invalidFields = [];
  [productSelect, quantityInput, dateInput].forEach(clearFieldError);
  if (!PRODUCTS[productSelect.value]) {
    setFieldError(productSelect, 'Selecciona un producto');
    invalidFields.push(productSelect);
  }
  const quantity = Number(quantityInput.value);
  if (!Number.isInteger(quantity) || quantity < 1) {
    setFieldError(quantityInput, 'Ingresa una cantidad entera de al menos 1');
    invalidFields.push(quantityInput);
  }
  if (!dateInput.value) {
    setFieldError(dateInput, 'Selecciona una fecha deseada');
    invalidFields.push(dateInput);
  } else if (dateInput.value < localDateString()) {
    setFieldError(dateInput, 'La fecha no puede ser anterior a hoy');
    invalidFields.push(dateInput);
  }
  if (invalidFields.length) invalidFields[0].focus();
  return invalidFields.length === 0;
}

function formatChosenDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('es-PE', { dateStyle: 'long' }).format(new Date(year, month - 1, day));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validateForm()) return;
  const product = PRODUCTS[productSelect.value];
  const quantity = Number(quantityInput.value);
  const referenceDate = localDateString().replaceAll('-', '');
  const random = String(Math.floor(1000 + Math.random() * 9000));
  document.querySelector('#summary-reference').textContent = `DH-SIM-${referenceDate}-${random}`;
  document.querySelector('#summary-product').textContent = product.name;
  document.querySelector('#summary-quantity').textContent = String(quantity);
  document.querySelector('#summary-date').textContent = formatChosenDate(dateInput.value);
  document.querySelector('#summary-unit').textContent = money.format(product.price);
  document.querySelector('#summary-total').textContent = money.format(product.price * quantity);
  form.hidden = true;
  confirmation.hidden = false;
  confirmation.focus();
});

document.querySelector('#new-request').addEventListener('click', () => {
  form.reset();
  dateInput.min = localDateString();
  [productSelect, quantityInput, dateInput].forEach(clearFieldError);
  confirmation.hidden = true;
  form.hidden = false;
  productSelect.focus();
});
