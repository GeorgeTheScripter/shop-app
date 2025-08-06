import { Product } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductStore } from "./products.store";

export const useFavoriteStore = defineStore("favorite", () => {
  const favorites = ref<Product[]>([]);
  const products = useProductStore();
  const isModalOpen = ref<boolean>(false);

  const addToFavorite = (product: Product) => {
    if (
      favorites.value.some((favorite: Product) => favorite.id === product.id)
    ) {
      return;
    }
    product.isFavorite = true;
    favorites.value.push({ ...product, isFavorite: true });
  };

  const removeFromFavorite = (product: Product) => {
    const currentProduct = products.products.find(
      (pr: Product) => pr.id === product.id
    );

    if (currentProduct) {
      currentProduct.isFavorite = false;
    }

    favorites.value = favorites.value.filter(
      (favorite: Product) => favorite.id !== product.id
    );
  };

  const openModal = () => {
    if (favorites.value.length > 0) {
      isModalOpen.value = true;
    }
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const toggleFavoriteModal = () => {
    if (isModalOpen.value) {
      closeModal();
    } else {
      openModal();
    }
  };

  return {
    favorites,
    addToFavorite,
    removeFromFavorite,
    isModalOpen,
    openModal,
    closeModal,
    toggleFavoriteModal,
  };
});
