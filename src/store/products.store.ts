import { ProductService } from "@/services/product/productService";
import { Product } from "@/types";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useFavoriteStore } from "./favorite.store";

export const useProductStore = defineStore("product", () => {
  const LOCAL_STORAGE_KEY = "products";

  // state
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");

  // actions
  const fetchProducts = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (savedData) {
        await loadFromStorage(savedData);
      } else {
        await loadFromAPI();
      }

      syncFavorite();
    } catch (err) {
      error.value = String(err);
    } finally {
      isLoading.value = false;
    }
  };

  // private methods
  const loadFromAPI = async () => {
    try {
      products.value = await ProductService.getAll();
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

  const syncFavorite = () => {
    const favoritesStore = useFavoriteStore();
    products.value = products.value.map((product) => ({
      ...product,
      isFavorite: favoritesStore.favorites.some(
        (favorite) => favorite.id === product.id
      ),
    }));
  };

  // getters
  const getCurrentProduct = (id: number): Product | undefined => {
    return products.value.find((product: Product) => product.id === id);
  };

  return {
    // state
    products,
    isLoading,
    error,
    // actions
    fetchProducts,
    // getters
    getCurrentProduct,
  };
});
