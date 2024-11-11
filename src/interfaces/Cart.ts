import { Product } from "./Product";

export interface Cart {
  userId: string;
  products: Product[];
  active: boolean;
}
