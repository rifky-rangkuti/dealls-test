import { ICart } from "./cartTableType";
import { ICartProduct } from "../../[cartId]/data/types/cartProductType";

export interface ICartResponse {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
}
export interface ICartSingleResponse {
  id: number;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  products: ICartProduct[];
}
