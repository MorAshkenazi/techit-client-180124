import axios from "axios";

import { getProductById } from "./productsService";

const api: string = `${process.env.REACT_APP_API}/carts`;

export function createCart(userId: string) {
  return axios.post(api, { userId, products: [], active: true });
}

export async function getProductsFromCart() {
  try {
    // 1. get products array from user's cart
    let userId: string = JSON.parse(localStorage.getItem("userId") as string);

    let userCart: any = await axios.get(`${api}?userId=${userId}&&active=true`);

    // 2. create get request to get products full details
    let promises = [];
    for (let id of userCart.data[0].products) {
      promises.push(getProductById(id));
    }
    // 3. return all the responses
    return Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
}

export async function addToCart(productId: string) {
  try {
    // get user products in cart
    let userId: string = JSON.parse(localStorage.getItem("userId") as string);

    let userCart: any = await axios.get(`${api}?userId=${userId}&&active=true`);

    // push array
    userCart.data[0].products.push(productId);

    // patch to products array
    return axios.patch(`${api}/${userCart.data[0].id}`, {
      products: userCart.data[0].products,
    });
  } catch (error) {
    console.log(error);
  }
}
