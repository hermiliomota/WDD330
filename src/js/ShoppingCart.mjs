
import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate
} from './utils.mjs';

function cartItemTemplate(item, index) {
  const image =
    item.Images?.PrimarySmall ||
    item.Images?.PrimaryMedium ||
    item.Image?.replace('../images/', '/images/') ||
    '';

  const color = item.Colors?.[0]?.ColorName || 'Not specified';

  const productUrl =
    `/product_pages/index.html?product=${encodeURIComponent(item.Id)}`;

  return `
    <li class="cart-card divider">
      <a href="${productUrl}" class="cart-card__image">
        <img src="${image}" alt="${item.Name}" />
      </a>

      <a href="${productUrl}">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${color}</p>

      <p class="cart-card__quantity">qty: 1</p>

      <p class="cart-card__price">
        $${item.FinalPrice.toFixed(2)}
      </p>

      <button
        type="button"
        class="remove-item"
        data-index="${index}"
      >
        Remove
      </button>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
    this.cartItems = [];
  }

  init() {
    this.cartItems = getLocalStorage(this.key) || [];

    this.listElement.addEventListener('click', (event) => {
      const button = event.target.closest('.remove-item');

      if (button) {
        this.removeItem(Number(button.dataset.index));
      }
    });

    this.renderCart();
  }

  removeItem(index) {
    if (index < 0 || index >= this.cartItems.length) {
      return;
    }

    this.cartItems.splice(index, 1);

    setLocalStorage(this.key, this.cartItems);

    this.renderCart();
  }

  calculateTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.FinalPrice,
      0
    );
  }

  updateTotal() {
    const totalElement = document.querySelector('#cart-total');
    const countElement = document.querySelector('#cart-count');

    totalElement.textContent =
      `$${this.calculateTotal().toFixed(2)}`;

    countElement.textContent = this.cartItems.length;
  }

  renderCart() {
    if (this.cartItems.length === 0) {
      this.listElement.innerHTML =
        '<li>Your cart is empty.</li>';
    } else {
      this.renderList(this.cartItems);
    }

    this.updateTotal();
  }

  renderList(list) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      list,
      'afterbegin',
      true
    );
  }
}
