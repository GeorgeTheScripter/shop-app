import { ProductService } from "@/services/product/productService";
import { Product } from "@/types";
import { ref } from "vue";
import { useFavoriteStore } from "../favorite.store";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";

export const useProducts = () => {
  const LOCAL_STORAGE_KEY = "products";
  // products:
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");

  // actions
  const fetchProducts = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      await loadFromAPI();
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
    products,
    isLoading,
    error,

    fetchProducts,
    getCurrentProduct,
  };
};
