
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener('click', callback);
}

// Render a list using a template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// Render a single template
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

// Load an external HTML template
export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }

  return response.text();
}

// Load the shared header and footer
export async function loadHeaderFooter() {
  const [headerTemplate, footerTemplate] = await Promise.all([
    loadTemplate('/partials/header.html'),
    loadTemplate('/partials/footer.html')
  ]);

  const headerElement = qs('#main-header');
  const footerElement = qs('#main-footer');

  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  }

  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  }
}
// Retrieve a parameter from the current URL
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}