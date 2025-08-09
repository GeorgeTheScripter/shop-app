import { CartItem, Product } from "@/types";

export const saveToLocalStorage = (
  LOCAL_STORAGE_KEY: string,
  products: Product[] | CartItem[]
): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
};
