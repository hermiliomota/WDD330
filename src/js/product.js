
import ProductData from './ProductData.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

const dataSource = new ProductData('tents');
const params = new URLSearchParams(window.location.search);
const productId = params.get('product');

async function displayProduct() {
  if (!productId) {
    document.querySelector('.product-detail').textContent =
      'No product selected.';
    return;
  }

  try {
    const product = await dataSource.findProductById(productId);

    if (!product) {
      document.querySelector('.product-detail').textContent =
        'Product not found.';
      return;
    }

    const imagePath = product.Image.replace('../images/', '/images/');

    const fallbackImages = {
      '989CG': '/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg',
      '880RT': '/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg'
    };

    document.querySelector('#productName').textContent = product.Name;
    document.querySelector('#productImage').src =
      fallbackImages[product.Id] || imagePath;
    document.querySelector('#productImage').alt = product.Name;
    document.querySelector('#productBrand').textContent = product.Brand.Name;
    document.querySelector('#productDescription').textContent =
      product.DescriptionHtmlSimple.replace(/<[^>]*>/g, '');
    document.querySelector('#productPrice').textContent =
      `$${product.FinalPrice.toFixed(2)}`;

    document.querySelector('#addToCart').addEventListener('click', () => {
      const cart = getLocalStorage('so-cart') || [];
      cart.push(product);
      setLocalStorage('so-cart', cart);
      alert('Product added to cart!');
    });
  } catch (error) {
    console.error('Error loading product:', error);
    document.querySelector('.product-detail').textContent =
      'Unable to load product.';
  }
}

displayProduct();
