import axios from "axios";
import { Product } from "../interfaces/Product";

const api: string = `${process.env.REACT_APP_API}/products`;

// get all products
export function getAllProducts() {
  return axios.get(api);
}

// get product by id
export function getProductById(id: string) {
  return axios.get(`${api}/${id}`);
}

// add new product
export function addProduct(product: Product) {
  return axios.post(api, product);
}

// update product
export function updateProduct(product: Product) {
  return axios.put(`${api}/${product.id}`, product);
}

// delete product
export function deleteProduct(id: string) {
  return axios.delete(`${api}/${id}`);
}
