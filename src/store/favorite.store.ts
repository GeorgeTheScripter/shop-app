import { Product } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useProductStore } from "@/store/products";
import { useCartStore } from "./cart.store";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { loadProducts } from "@/utils/storageUtils";
import { useModal } from "@/composables/useModal";

export const useFavoriteStore = defineStore("favorite", () => {
  const LOCAL_STORAGE_KEY = "favorites";

  // state
  const favorites = ref<Product[]>([]);
  const { isOpen, close, open } = useModal();
  const error = ref<string>("");

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
  // Можно упростить через вспомогательный композабл позже
  const openModal = () => {
    if (favorites.value.length > 0) {
      cartStore.isModalOpen = false;
      open();
    }
  };

  const toggleFavoriteModal = () => {
    isOpen.value ? close() : openModal();
  };

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
    isModalOpen: isOpen,
    // actions
    addToFavorite,
    removeFromFavorite,
    closeModal: close,
    toggleFavoriteModal,
    toggleFavorite,
  };
});
