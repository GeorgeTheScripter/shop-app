import { Product } from "@/types";
import { apiClient } from "../api";

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    return apiClient.getProducts();
  },

  getCurrent: async (id: number): Promise<Product> => {
    return apiClient.getProductById(id);
  },

  getByPage: async (page: number, limit: number): Promise<Product[]> => {
    return apiClient.getProductByPage(page, limit);
  },
};
