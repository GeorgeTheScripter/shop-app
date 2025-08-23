import { Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFavoretesStore = defineStore("favorite", () => {
  const favorites = ref<Product[]>([]);
  const isModalOpen = ref<boolean>(false);

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

  const isFavoriteModalOpen = computed(
    () => isModalOpen.value && favorites.value.length > 0
  );

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const isProductFavorite = (product: Product) => {
    return favorites.value.some(
      (favorite: Product) => favorite.id === product.id
    );
  };

  return {
    favorites,
    toggleFavorite,
    isModalOpen,
    isFavoriteModalOpen,
    toggleModal,
    removeFromFavorite,
    closeModal,
    isProductFavorite,
  };
});
