import { ref } from "vue";
import { DisplayCount } from "@/types";

export const useDisplayedProducts = () => {
  const displayedProductValue = ref<number>(8);
  const displayedProductsCount = ref<DisplayCount[]>([
    { value: 8, name: "8" },
    { value: 16, name: "16" },
    { value: 32, name: "32" },
  ]);

  return {
    displayedProductValue,
    displayedProductsCount,
  };
};
