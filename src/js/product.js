
import ProductData from './ProductData.mjs';
import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  getParam
} from './utils.mjs';

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam('product');

async function displayProduct() {
  const productDetail = document.querySelector('.product-detail');

  if (!productId) {
    productDetail.textContent = 'No product selected.';
    return;
  }

  try {
    const product = await dataSource.findProductById(productId);

    if (!product) {
      productDetail.textContent = 'Product not found.';
      return;
    }

    document.querySelector('#productName').textContent =
      product.Name;

    document.querySelector('#productImage').src =
      product.Images.PrimaryLarge;

    document.querySelector('#productImage').alt =
      product.Name;

    document.querySelector('#productBrand').textContent =
      product.Brand.Name;

    document.querySelector('#productDescription').textContent =
      product.DescriptionHtmlSimple.replace(/<[^>]*>/g, '');

    document.querySelector('#productPrice').textContent =
      `$${product.FinalPrice.toFixed(2)}`;

    document.title = `Sleep Outside | ${product.Name}`;

    document.querySelector('#addToCart').addEventListener('click', () => {
      const cart = getLocalStorage('so-cart') || [];

      cart.push(product);

      setLocalStorage('so-cart', cart);

      alert('Product added to cart!');
    });

  } catch (error) {
    productDetail.textContent =
      `Unable to load product: ${error.message}`;
  }
}

displayProduct();
