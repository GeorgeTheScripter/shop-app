import { CartItem, Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFavoriteStore } from "./favorite.store";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { loadCartItems } from "@/utils/storageUtils";
import { useModal } from "@/composables/useModal";

export const useCartStore = defineStore("cart", () => {
  const LOCAL_STORAGE_KEY = "cart";
  // state
  const cart = ref<CartItem[]>([]);
  const { isOpen, close, open } = useModal();
  const error = ref<string>("");

  const favoritesStore = useFavoriteStore();

  // actions
  // cart actions
  const addToCart = (product: Product) => {
    const existingItem = cart.value.find(
      (p: CartItem) => p.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({ product, quantity: 1 });
    }
    saveToLocalStorage(LOCAL_STORAGE_KEY, cart.value);
  };

  const removeFromCart = (product: Product) => {
    cart.value = cart.value.filter(
      (p: CartItem) => p.product.id !== product.id
    );
    saveToLocalStorage(LOCAL_STORAGE_KEY, cart.value);
  };

  // modal actions
  // Можно упростить через вспомогательный композабл позже
  const openModal = () => {
    if (cart.value.length > 0) {
      favoritesStore.isModalOpen = false;
      open();
    }
  };

  const toggleCartModal = () => {
    isOpen.value ? close() : openModal();
  };

  // count actions
  const incrementCount = (item: CartItem) => {
    addToCart(item.product);
    saveToLocalStorage(LOCAL_STORAGE_KEY, cart.value);
  };

  const decrementCount = (item: CartItem) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(item.product);
    }
    saveToLocalStorage(LOCAL_STORAGE_KEY, cart.value);
  };

  // getters
  const getTotalPrice = computed((): number => {
    return cart.value.reduce((sum: number, el: CartItem) => {
      return sum + el.product.price * el.quantity;
    }, 0);
  });

  const getTotalCount = computed((): number => {
    return cart.value.reduce((sum: number, el: CartItem) => {
      return sum + el.quantity;
    }, 0);
  });

  // private methods
  const initialize = () => {
    cart.value = loadCartItems(LOCAL_STORAGE_KEY, error);
  };

  initialize();

  return {
    // state
    cart,
    isModalOpen: isOpen,
    // actions
    addToCart,
    removeFromCart,
    openModal,
    closeModal: close,
    toggleCartModal,
    incrementCount,
    decrementCount,
    // getters
    getTotalPrice,
    getTotalCount,
  };
});
