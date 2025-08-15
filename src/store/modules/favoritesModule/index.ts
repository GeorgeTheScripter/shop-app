import { Product } from "@/types";
import { defineStore } from "pinia";
import { ref, toRefs } from "vue";
import { useProductStore } from "@/store/modules/productsModule";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { loadProducts } from "@/utils/storageUtils";
import { useFavoritesModal } from "./modal/modal";

export const useFavoriteStore = defineStore("favorite", () => {
  const LOCAL_STORAGE_KEY = "favorites";

  // state
  const favorites = ref<Product[]>([]);
  const favoritesModal = useFavoritesModal();
  const error = ref<string>("");

  const productsStore = useProductStore();

  // actions
  // favorite actions
  const addToFavorite = (product: Product) => {
    if (
      favorites.value.some((favorite: Product) => favorite.id === product.id)
    ) {
      return;
    }
    product.isFavorite = true;
    favorites.value.push({ ...product, isFavorite: true });

    saveToLocalStorage(LOCAL_STORAGE_KEY, favorites.value);
  };

  const removeFromFavorite = (product: Product) => {
    const currentProduct = productsStore.products.find(
      (pr: Product) => pr.id === product.id
    );

    if (currentProduct) {
      currentProduct.isFavorite = false;
    }

    favorites.value = favorites.value.filter(
      (favorite: Product) => favorite.id !== product.id
    );

    saveToLocalStorage(LOCAL_STORAGE_KEY, favorites.value);
  };

  const toggleFavorite = (product: Product) =>
    product.isFavorite ? removeFromFavorite(product) : addToFavorite(product);

  // prvate methods
  const initialize = () => {
    favorites.value = loadProducts(LOCAL_STORAGE_KEY, error);

    // Flags syncronize
    favorites.value.forEach((fav) => {
      const product = productsStore.products.find((p) => p.id === fav.id);
      if (product) {
        product.isFavorite = true;
      }
    });
  };

  initialize();

  return {
    // state
    favorites,
    ...toRefs(favoritesModal),
    // actions
    addToFavorite,
    removeFromFavorite,
    toggleFavorite,
  };
});
