import { Product } from "@/types";
import { defineStore } from "pinia";
import { ref, toRefs } from "vue";
import { useProductStore } from "@/store/modules/productsModule";
import { loadProducts } from "@/utils/storageUtils";
import { useFavoritesModal } from "./utils/modal";
import { useAddAndRemove } from "./utils/actions";

export const useFavoriteStore = defineStore("favorite", () => {
  const LOCAL_STORAGE_KEY = "favorites";

  // state
  const favorites = ref<Product[]>([]);
  const favoritesModal = useFavoritesModal();
  const favoriteActions = useAddAndRemove();
  const error = ref<string>("");
  const productsStore = useProductStore();

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
    ...favoritesModal,
    ...favoriteActions,
  };
});
