import { CartItem, Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  // state
  const cart = ref<CartItem[]>([]);
  const isModalOpen = ref<boolean>(false);

  // actions
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

  const openModal = () => {
    if (cart.value.length > 0) {
      isModalOpen.value = true;
    }
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const toggleCartModal = () => {
    if (isModalOpen.value) {
      closeModal();
    } else {
      openModal();
    }
  };

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
    cart,
    addToCart,
    removeFromCart,
    isModalOpen,
    openModal,
    closeModal,
    getTotalPrice,
    getTotalCount,
    toggleCartModal,
  };
});
