import axios from "axios";

export default axios.create({
  baseURL: "http://api.greenly.pt/",
  headers: {
    "Content-type": "application/json"
  }
});
