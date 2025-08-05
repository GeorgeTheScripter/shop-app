import { ProductService } from "@/services/product/productService";
import { Product } from "@/types";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const LOCAL_STORAGE_KEY = "products";

  // ===== State =====
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");

  // ===== Action =====
  const fetchProducts = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
      await loadFromStorage(savedData);
    } else {
      await loadFromAPI();
    }

    isLoading.value = false;
  };

  // ===== Private methods =====
  const loadFromAPI = async () => {
    try {
      products.value = await ProductService.getAll();
      products.value = products.value.map((product: Product) => {
        return { ...product, isFavorite: false };
      });
      saveToLocalStorage(LOCAL_STORAGE_KEY, products.value);
    } catch (err) {
      error.value = String(err);
    }
  };

  const loadFromStorage = async (savedData: string) => {
    try {
      products.value = JSON.parse(savedData);
    } catch (err) {
      error.value = "Parsing Error";
      await loadFromAPI();
    }
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
  };
});
