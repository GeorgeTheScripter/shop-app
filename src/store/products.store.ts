import { ProductService } from "@/services/product.service";
import { Product } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  // State
  const products = ref<Product[]>([]);
  const currentProduct = ref<Product | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const isInitialized = ref<boolean>(false);

  // Actions
  const loadProducts = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      products.value = await ProductService.getProducts();
      isInitialized.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Неизвестная ошибка";
      console.error("Ошибка при загрузке данных: ", err);
    } finally {
      isLoading.value = false;
    }
  };

  const loadProduct = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      currentProduct.value = await ProductService.getProductById(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Неизвестная ошибка";
      console.error("Ошибка при загрузке данных: ", err);
    } finally {
      isLoading.value = false;
    }
  };

  const initialize = async () => {
    if (!isInitialized.value) {
      await loadProducts();
    }
  };

  const getCurrentProduct = async (id: number) => {
    return await ProductService.getProductById(id);
  };

  return {
    // State
    products,
    currentProduct,
    isLoading,
    error,

    // Actions
    initialize,
    loadProducts,
    loadProduct,
    getCurrentProduct,
  };
});
