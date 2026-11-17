
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  const imagePath = product.Image.replace('../images/', '/images/');

  const fallbackImages = {
    '989CG': '/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg',
    '880RT': '/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg'
  };

  const finalImage = fallbackImages[product.Id] || imagePath;

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${encodeURIComponent(product.Id)}">
        <img src="${finalImage}" alt="${product.Name}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">
          $${product.FinalPrice.toFixed(2)}
        </p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData();
    this.renderList(this.products);
  }

  sortProducts(order) {
    const sortedProducts = [...this.products];

    if (order === 'price-low') {
      sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
    } else if (order === 'price-high') {
      sortedProducts.sort((a, b) => b.FinalPrice - a.FinalPrice);
    }

    this.renderList(sortedProducts);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true
    );
  }
}
