import axios from "axios";

export const API_CONFIG = axios.create({
  baseURL: "http://localhost:5000",
});
