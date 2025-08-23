import { LocalStorageService } from "@/services/localStorage.service";
import { Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useFavoretesStore = defineStore("favorite", () => {
  // State
  const favorites = ref<Product[]>(
    LocalStorageService.getItem("favorites", [])
  );
  const isModalOpen = ref<boolean>(false);

  // Watchers
  watch(
    favorites,
    (newFavorites: Product[]) => {
      LocalStorageService.setItem("favorites", newFavorites);
    },
    { deep: true }
  );

  // Getters
  const isFavoriteModalOpen = computed(
    () => isModalOpen.value && favorites.value.length > 0
  );

  const favoritesCount = computed(() => favorites.value.length);

  // Actions
  const addToFavorite = (product: Product) => {
    if (
      !favorites.value.some((favorite: Product) => favorite.id === product.id)
    ) {
      favorites.value.push(product);
    }
  };

  const removeFromFavorite = (product: Product) => {
    favorites.value = favorites.value.filter(
      (favorite: Product) => favorite.id !== product.id
    );
  };

  const toggleFavorite = (product: Product) => {
    if (
      favorites.value.some((favorite: Product) => favorite.id === product.id)
    ) {
      removeFromFavorite(product);
    } else {
      addToFavorite(product);
    }
  };

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  // Helper functions
  const isProductFavorite = (product: Product) => {
    return favorites.value.some(
      (favorite: Product) => favorite.id === product.id
    );
  };

  return {
    // State
    favorites,
    isModalOpen,

    // Getters
    isFavoriteModalOpen,
    favoritesCount,

    // Actions
    removeFromFavorite,
    toggleFavorite,
    toggleModal,
    closeModal,
    isProductFavorite,
  };
});
