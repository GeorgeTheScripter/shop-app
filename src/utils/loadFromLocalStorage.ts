import { Product } from "@/types";
import { Ref } from "vue";

export const loadFromLocalStorage = (
  LOCAL_STORAGE_KEY: string,
  error: Ref<string>
): Product[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    error.value = "Failed to load favorites: " + (err as Error).message;
    return [];
  }
};
