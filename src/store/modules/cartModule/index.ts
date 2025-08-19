import { CartItem, Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref, toRefs } from "vue";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { loadCartItems } from "@/utils/storageUtils";
import { useCartModal } from "./utils/modal";

export const useCartStore = defineStore("cart", () => {
  const LOCAL_STORAGE_KEY = import.meta.env.VITE_LS_CART_KEY;
  // state
  const cart = ref<CartItem[]>([]);
  const error = ref<string>("");
  const cartModal = useCartModal();
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

  cart.value.forEach((item) => {
    console.log(item.quantity);
  });

  const getTotalCount = computed((): number => {
    return cart.value.reduce((sum: number, el: CartItem) => {
      console.log(el.quantity);
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
    ...cartModal,
    // actions
    addToCart,
    removeFromCart,
    closeModal: close,
    incrementCount,
    decrementCount,
    // getters
    getTotalPrice,
    getTotalCount,
  };
});
