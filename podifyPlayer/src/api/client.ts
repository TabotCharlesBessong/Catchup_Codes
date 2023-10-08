
import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.1.153:5000",
});

export default client