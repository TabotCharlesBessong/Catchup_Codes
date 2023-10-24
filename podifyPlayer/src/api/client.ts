
import { getFromAsyncStorage, Keys } from "@utils/asyncStorage";
import axios, { CreateAxiosDefaults } from "axios";

const client = axios.create({
  baseURL: "http://192.168.1.185:5000",
  // baseURL: "http://192.168.101.225:5000"
});

const baseURL = "http://192.168.1.185:5000";
// const baseURL = "http://192.168.101.225:5000"

type headers = CreateAxiosDefaults<any>["headers"];

export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

  if (!token) return axios.create({ baseURL });

  const defaultHeaders = {
    Authorization: "Bearer " + token,
    ...headers,
  };

  return axios.create({ baseURL, headers: defaultHeaders });
};

export default client;


// baseURL: "http://192.168.1.185:5000",
//   // baseURL: "http://192.168.82.37:5000",
//   // baseURL: "http://192.168.1.153:5000",