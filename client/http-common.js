import axios from "axios";

export default axios.create({
  baseURL: "http://35.187.171.33:4000",
  headers: {
    "Content-type": "application/json"
  }
});
