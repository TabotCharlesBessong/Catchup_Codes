
import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.100.37:5000",
});

export default client