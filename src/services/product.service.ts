import { Product } from "@/types";
import { client } from "./api/client";

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    const response = await client.get("/products");
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await client.get(`/products/${id}`);
    return response.data;
  },

  async getProductByPage(page: number, limit: number): Promise<Product[]> {
    const response = await client.get(
      `/products/?offset=${page}&limit=${limit}`
    );
    return response.data;
  },
};
