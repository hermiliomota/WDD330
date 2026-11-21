
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const dataSource = new ProductData('tents');

const listElement = document.querySelector('.product-list');

const productList = new ProductList(
  'tents',
  dataSource,
  listElement
);

productList.init();

const sortSelect = document.querySelector('#sort-products');

if (sortSelect) {
  sortSelect.addEventListener('change', (event) => {
    productList.sortProducts(event.target.value);
  });
}
