import axios from "axios";
import { User } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

// login
export function checkUser(user: User) {
  return axios.get(`${api}?email=${user.email}&&password=${user.password}`);
}

// register
export function addUser(user: User) {
  return axios.post(api, user);
}

// profile
export function getUserById() {
  const id = JSON.parse(localStorage.getItem("userId") as string);
  return axios.get(api + "/" + id);
}

// export async function checkIfAdmin() {
//   try {
//     // 1. check if user already logged in
//     if (localStorage.getItem("userId") != null) {
//       let user = await getUserById();
//       console.log(user.data.isAdmin);
//       // 2. check if admin
//       return user.data.isAdmin;
//     }
//     return false;
//   } catch (error) {
//     console.log(error);
//   }
// }
