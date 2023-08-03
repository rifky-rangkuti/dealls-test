import { BASE_API } from "^/constants/api";
import { encode } from "qss";
import { ICartResponse, ICartSingleResponse } from "../../types/cartApiType";

export const getCartsURL = BASE_API + "/carts";
export const getCarts = (): Promise<ICartResponse> => {
  return fetch(getCartsURL + encode({ limit: 100 }, "?"), {
    method: "GET",
  }).then((res) => res.json());
};
export const getCartURL = BASE_API + "/carts";
export const getCart = (id: string): Promise<ICartSingleResponse> => {
  return fetch(getCartsURL + "/" + id, {
    method: "GET",
  }).then((res) => res.json());
};
