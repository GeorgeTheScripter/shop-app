import { ProductService } from "@/services/product/productService";
import { Product } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");

  const fetchProducts = async () => {
    isLoading.value = true;

    try {
      products.value = await ProductService.getAll();
    } catch (err: unknown) {
      error.value = String(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
  };
});
