
import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.1.153:5000",
  // baseURL: "http://192.168.82.37:5000",
  // baseURL: "http://192.168.232.37:5000",
  // baseURL: "http://192.168.37.37:5000",
  // baseURL: "http://192.168.79.37:5000",
});

export default client