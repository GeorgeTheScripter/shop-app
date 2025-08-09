import { CartItem, Product } from "@/types";
import { Ref } from "vue";
import { loadFromLocalStorage } from "./loadFromLocalStorage";

export const loadProducts = (
  LOCAL_STORAGE_KEY: string,
  error: Ref<string>
): Product[] => {
  return loadFromLocalStorage<Product[]>(LOCAL_STORAGE_KEY, error, []);
};

export const loadCartItems = (
  LOCAL_STORAGE_KEY: string,
  error: Ref<string>
): CartItem[] => {
  return loadFromLocalStorage(LOCAL_STORAGE_KEY, error, []);
};
