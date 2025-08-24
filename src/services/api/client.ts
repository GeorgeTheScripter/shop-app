import axios, { AxiosInstance } from "axios";

const API_BASE = "https://api.escuelajs.co/api/v1/";

export const client: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});
