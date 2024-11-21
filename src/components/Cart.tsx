import { FunctionComponent, useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { getProductsFromCart } from "../services/cartsService";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  let [products, setProducts] = useState<any>([]);
  useEffect(() => {
    getProductsFromCart()
      .then((res: any) => {
        let products = res.map((item: any) => item.data);
        setProducts(products);
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      {products.length ? (
        products.map((p: any) => <p key={p.id}>{p.name}</p>)
      ) : (
        <p>No products in cart</p>
      )}
    </>
  );
};

export default Cart;
