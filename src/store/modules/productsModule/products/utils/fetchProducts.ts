import { type Ref } from "vue";
import { loadFromAPI } from "./loadFromApi";
import { syncFavorite } from "./syncFavorite";
import { Product } from "@/types";

export const fetchProducts = async (
  isLoading: Ref<boolean>,
  products: Ref<Product[]>,
  error: Ref<string>
) => {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    await loadFromAPI(products, error);
    syncFavorite(products);
  } catch (err) {
    error.value = String(err);
  } finally {
    isLoading.value = false;
  }
};
