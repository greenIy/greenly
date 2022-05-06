import axios from "axios";

export default axios.create({
  baseURL: "http://dev.greenly.pt",
  headers: {
    "Content-type": "application/json"
  }
});