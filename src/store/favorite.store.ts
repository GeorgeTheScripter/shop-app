import { Product } from "@/types";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { useProductStore } from "./products.store";
import { useCartStore } from "./cart.store";
import { loadFromLocalStorage } from "@/utils/loadFromLocalStorage";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";

export const useFavoriteStore = defineStore("favorite", () => {
  const LOCAL_STORAGE_KEY = "favorites";
  // state
  const favorites = ref<Product[]>([]);
  const isModalOpen = ref<boolean>(false);
  const error = ref<string>("");

  const productsStore = useProductStore();
  const cartStore = useCartStore();

  const initialize = () => {
    favorites.value = loadFromLocalStorage(LOCAL_STORAGE_KEY, error);

    // Flags syncronize
    favorites.value.forEach((fav) => {
      const product = productsStore.products.find((p) => p.id === fav.id);
      if (product) {
        product.isFavorite = true;
      }
    });
  };

  initialize();

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
