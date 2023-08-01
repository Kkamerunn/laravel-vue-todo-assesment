import { API_URL } from "../utils/constants";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axiosClient;
