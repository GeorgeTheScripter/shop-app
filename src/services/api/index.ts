import axios from "axios";
import type { ApiClient, Product } from "@/types";

const API_BASE = "https://api.escuelajs.co/api/v1/";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 1000,
});

export const apiClient: ApiClient = {
  getProducts: async (): Promise<Product[]> => {
    const response = await client.get("/products");
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await client.get(`/products/${id}`);
    return response.data;
  },
};
