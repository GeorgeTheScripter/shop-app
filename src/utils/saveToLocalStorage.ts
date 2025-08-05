import { Product } from "@/types";

export const saveToLocalStorage = (
  LOCAL_STORAGE_KEY: string,
  products: Product[]
): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
};
