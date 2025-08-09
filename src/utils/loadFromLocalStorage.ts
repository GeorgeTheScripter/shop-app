import { Ref } from "vue";

export const loadFromLocalStorage = <T>(
  LOCAL_STORAGE_KEY: string,
  error: Ref<string>,
  defaultValue: T
): T => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    error.value = "Failed to load favorites: " + (err as Error).message;
    return defaultValue;
  }
};
