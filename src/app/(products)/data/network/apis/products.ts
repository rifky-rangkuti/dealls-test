import { BASE_API } from "^/constants/api";
import { encode } from "qss";
import { IProductsResponse } from "../../types/productsApiType";

export const getProductsURL = BASE_API + "/products";
export const getProducts = (): Promise<IProductsResponse> => {
  return fetch(getProductsURL + encode({ limit: 100 }, "?"), {
    method: "GET",
  }).then((res) => res.json());
};
