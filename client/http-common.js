import axios from "axios";

export default axios.create({
  baseURL: "http://api.greenly.pt:4000",
  headers: {
    "Content-type": "application/json"
  }
});
