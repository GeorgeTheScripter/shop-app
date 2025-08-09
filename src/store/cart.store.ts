import { CartItem, Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFavoriteStore } from "./favorite.store";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { loadFromLocalStorage } from "@/utils/loadFromLocalStorage";

export const useCartStore = defineStore("cart", () => {
  const LOCAL_STORAGE_KEY = "cart";
  // state
  const cart = ref<CartItem[]>([]);
  const isModalOpen = ref<boolean>(false);
  const favoritesStore = useFavoriteStore();
  const error = ref<string>("");

  const initialize = () => {
    cart.value = loadFromLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY, error, []);
  };

  initialize();
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
  const openModal = () => {
    if (cart.value.length > 0) {
      favoritesStore.isModalOpen = false;
      isModalOpen.value = true;
    }
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const toggleCartModal = () =>
    isModalOpen.value ? closeModal() : openModal();

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

  return {
    // state
    cart,
    isModalOpen,
    // actions
    addToCart,
    removeFromCart,
    openModal,
    closeModal,
    toggleCartModal,
    incrementCount,
    decrementCount,
    // getters
    getTotalPrice,
    getTotalCount,
  };
});
