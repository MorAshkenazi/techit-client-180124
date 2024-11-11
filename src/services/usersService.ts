import axios from "axios";
import { User } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

// login
export function checkUser(user: User) {
  return axios.get(`${api}?email=${user.email}&&password=${user.password}`);
}
