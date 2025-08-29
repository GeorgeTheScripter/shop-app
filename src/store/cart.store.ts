import { LocalStorageService } from "@/services/localStorage.service";
import { CartItem, Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  // State
  const cart = ref<CartItem[]>(LocalStorageService.getItem("cart", []));
  const isModalOpen = ref<boolean>(false);

  // Watchers
  watch(
    cart,
    (newCart: CartItem[]) => {
      LocalStorageService.setItem("cart", newCart);
    },
    { deep: true }
  );

  // Actions
  const addToCart = (product: Product) => {
    const existingItem = cart.value.find(
      (item: CartItem) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({
        product: product,
        quantity: 1,
      });
    }
  };

  const removeFromCart = (product: Product) => {
    cart.value = cart.value.filter((item: CartItem) => {
      return item.product.id !== product.id;
    });
  };

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const incrementCount = (cartItem: CartItem) => {
    addToCart(cartItem.product);
  };

  const decrementCount = (cartItem: CartItem) => {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      removeFromCart(cartItem.product);
    }
  };

  // Getters
  const isCartModalOpen = computed(
    () => isModalOpen.value && cart.value.length > 0
  );

  const totalCount = computed(() => {
    return cart.value.reduce((sum: number, item: CartItem) => {
      return sum + item.quantity;
    }, 0);
  });

  const totalPrice = computed(() => {
    return cart.value
      .reduce((sum: number, item: CartItem) => {
        return sum + item.product.price * item.quantity;
      }, 0)
      .toFixed(2);
  });

  return {
    // State
    cart,
    isModalOpen,

    // Actions
    addToCart,
    removeFromCart,
    toggleModal,
    closeModal,
    incrementCount,
    decrementCount,

    // Getters
    isCartModalOpen,
    totalCount,
    totalPrice,
  };
});
