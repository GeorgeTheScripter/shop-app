import { Product } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductStore } from "./products.store";
import { useCartStore } from "./cart.store";

export const useFavoriteStore = defineStore("favorite", () => {
  // state
  const favorites = ref<Product[]>([]);
  const isModalOpen = ref<boolean>(false);

  const productsStore = useProductStore();
  const cartStore = useCartStore();

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
  };

  const toggleFavorite = (product: Product) =>
    product.isFavorite ? removeFromFavorite(product) : addToFavorite(product);

  // modal actions
  const openModal = () => {
    if (favorites.value.length > 0) {
      cartStore.isModalOpen = false;
      isModalOpen.value = true;
    }
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const toggleFavoriteModal = () =>
    isModalOpen.value ? closeModal() : openModal();

  return {
    // state
    favorites,
    isModalOpen,
    // actions
    addToFavorite,
    removeFromFavorite,
    openModal,
    closeModal,
    toggleFavoriteModal,
    toggleFavorite,
  };
});
