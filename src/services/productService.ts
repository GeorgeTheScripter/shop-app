import { Product } from "@/types";
import { apiClient } from "./apiClient";

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    return await apiClient.getProducts();
  },

  getCurrent: async (id: number): Promise<Product> => {
    return await apiClient.getProductById(id);
  },

  getByPage: async (page: number, limit: number): Promise<Product[]> => {
    return await apiClient.getProductByPage(page, limit);
  },
};
