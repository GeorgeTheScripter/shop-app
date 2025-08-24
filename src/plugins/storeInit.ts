import { useProductsStore } from "@/store/products.store";
import { createPinia, type Pinia } from "pinia";

export function initializedStores(): Pinia {
  const pinia = createPinia();

  const productStore = useProductsStore(pinia);
  productStore.initialize();

  return pinia;
}
