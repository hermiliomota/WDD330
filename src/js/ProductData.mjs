
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(response) {
  if (response.ok) {
    return response.json();
  }

  throw new Error(`Bad Response: ${response.status}`);
}

export default class ProductData {
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${category}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(
      `${baseURL}product/${encodeURIComponent(id)}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }
}
