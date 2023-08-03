import { BASE_API } from "^/constants/api";
import { IUser } from "../../types/userType";

export const getSingleUserURL = BASE_API + "/users";
export const getSingleUser = (id?: number): Promise<IUser> => {
  return fetch(getSingleUserURL + "/" + id, {
    method: "GET",
  }).then((res) => res.json());
};
