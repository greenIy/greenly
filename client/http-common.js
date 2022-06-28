import axios from "axios";
import { router } from "./src/main"

let customAxios = axios.create({
  baseURL: "https://api.greenly.pt",
  headers: {
    "Content-type": "application/json"
  }
})

customAxios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
    router.push('/login')
 }
 return error;
});

export default customAxios;
