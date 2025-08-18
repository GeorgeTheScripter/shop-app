import { Product } from "@/types";
import { computed, ref } from "vue";
import { useProductStore } from "..";
import { getCategories } from "./utils/getCategories";

export const useCategorySort = () => {
  const productStore = useProductStore();
  const categories = getCategories();
  const selectedCategories = ref<string[]>([]);

  const toggleCategory = (category: string) => {
    if (category === "all") {
      selectedCategories.value = selectedCategories.value.includes("all")
        ? []
        : ["all"];
      return;
    }

    if (selectedCategories.value.includes("all")) {
      selectedCategories.value = [category];
      return;
    }

    const index = selectedCategories.value.indexOf(category);
    if (index === -1) {
      selectedCategories.value.push(category);
    } else {
      selectedCategories.value.splice(index, 1);
    }
  };

  const filteredProducts = computed((): Product[] => {
    if (!productStore.products) return [];

    if (
      selectedCategories.value.includes("all") ||
      selectedCategories.value.length === 0
    ) {
      return productStore.products;
    }

    const productsMap = new Map<number, Product>();

    selectedCategories.value.forEach((category: string) => {
      productStore.products.forEach((product: Product) => {
        if (product.category.name === category) {
          productsMap.set(product.id, product);
        }
      });
    });

    return Array.from(productsMap.values());
  });

  const clearSelected = () => {
    selectedCategories.value = [];
  };

  return {
    categories,
    filteredProducts,
    selectedCategories,
    toggleCategory,
    clearSelected,
  };
};
