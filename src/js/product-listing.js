
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const categoryNames = {
  tents: 'Tents',
  backpacks: 'Backpacks',
  'sleeping-bags': 'Sleeping Bags',
  hammocks: 'Hammocks'
};

const requestedCategory = getParam('category');

const category = Object.hasOwn(categoryNames, requestedCategory)
  ? requestedCategory
  : 'tents';

const title = document.querySelector('#category-title');

title.textContent = `Top Products: ${categoryNames[category]}`;

document.title = `Sleep Outside | ${categoryNames[category]}`;

const dataSource = new ProductData();

const listElement = document.querySelector('.product-list');

const productList = new ProductList(
  category,
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
