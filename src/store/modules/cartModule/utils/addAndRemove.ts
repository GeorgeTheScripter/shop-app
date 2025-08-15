import { CartItem, Product } from "@/types";
import { useCartStore } from "..";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";

export const useAddAndRemove = () => {
  const LOCAL_STORAGE_KEY = import.meta.env.VITE_LS_FAVORITES_KEY;

  const cartStore = useCartStore();

  const addToCart = (product: Product) => {
    const existingItem = cartStore.cart.find(
      (p: CartItem) => p.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartStore.cart.push({ product, quantity: 1 });
    }
    saveToLocalStorage(LOCAL_STORAGE_KEY, cartStore.cart);
  };

  const removeFromCart = (product: Product) => {
    cartStore.cart = cartStore.cart.filter(
      (p: CartItem) => p.product.id !== product.id
    );
    saveToLocalStorage(LOCAL_STORAGE_KEY, cartStore.cart);
  };

  const incrementCount = (item: CartItem) => {
    addToCart(item.product);
    saveToLocalStorage(LOCAL_STORAGE_KEY, cartStore.cart);
  };

  const decrementCount = (item: CartItem) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(item.product);
    }
    saveToLocalStorage(LOCAL_STORAGE_KEY, cartStore.cart);
  };

  return {
    addToCart,
    removeFromCart,
    incrementCount,
    decrementCount,
  };
};
