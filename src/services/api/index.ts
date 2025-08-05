import axios from "axios";
import type { ApiClient, Product } from "@/types";

const API_BASE = "https://fakestoreapi.com";

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
