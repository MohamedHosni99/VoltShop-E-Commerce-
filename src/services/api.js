import axios from "axios";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

// Products
export const getProducts = (limit = 40) =>
  api.get(`/products?limit=${limit}`).then(r => r.data);

export const getProductById = (id) =>
  api.get(`/products/${id}`).then(r => r.data);

export const getCategories = () =>
  api.get("/categories").then(r => r.data);

export default api;
