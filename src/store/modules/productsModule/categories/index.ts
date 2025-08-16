import { Product } from "@/types";
import { computed, ref } from "vue";
import { useProductStore } from "..";

export const useCategorySort = () => {
  const productStore = useProductStore();
  const selectedCategory = ref<string | null>(null);

  const categories = computed(() => {
    if (!productStore.products) return [];

    const categorySet = new Set<string>();

    productStore.products.forEach((product: Product) => {
      if (product.category.name) {
        categorySet.add(product.category.name);
      }
    });

    return Array.from(categorySet);
  });

  const filteredProducts = computed((): Product[] => {
    if (!selectedCategory.value) return productStore.products;

    return productStore.products.filter(
      (product) => product.category.name === selectedCategory.value
    );
  });

  const setCategory = (categoryName: string) => {
    selectedCategory.value = categoryName;
  };

  const resetCategory = () => {
    selectedCategory.value = null;
  };

  return {
    selectedCategory,
    categories,
    setCategory,
    filteredProducts,
    resetCategory,
  };
};
