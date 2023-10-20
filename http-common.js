import axios from "axios";

export default axios.create({
  baseURL: "http://danzar_api.test/",
  headers: {
    "Content-type": "application/json"
  }
});