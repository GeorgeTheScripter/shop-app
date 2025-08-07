import { CartItem, Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFavoriteStore } from "./favorite.store";

export const useCartStore = defineStore("cart", () => {
  // state
  const cart = ref<CartItem[]>([]);
  const isModalOpen = ref<boolean>(false);
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
  };

  const removeFromCart = (product: Product) => {
    cart.value = cart.value.filter(
      (p: CartItem) => p.product.id !== product.id
    );
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
  };

  const decrementCount = (item: CartItem) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(item.product);
    }
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
