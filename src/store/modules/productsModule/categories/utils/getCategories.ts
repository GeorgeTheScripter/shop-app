import { Product } from "@/types";
import { computed } from "vue";
import { useProductStore } from "../..";

export const getCategories = () => {
  return computed(() => {
    const productStore = useProductStore();
    if (!productStore.products) return [];

    const categorySet = new Set<string>();

    productStore.products.forEach((product: Product) => {
      if (product.category.name) {
        categorySet.add(product.category.name);
      }
    });

    return Array.from(categorySet);
  });
};
