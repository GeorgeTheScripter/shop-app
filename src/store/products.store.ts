import { ProductService } from "@/services/product.service";
import { Product } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { FiltersState, useFilterStore } from "./filters.store";

export const useProductsStore = defineStore("products", () => {
  const filterStore = useFilterStore();
  // State
  const products = ref<Product[]>([]);
  const displayedProducts = ref<Product[]>([]);
  const currentProduct = ref<Product | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const isInitialized = ref<boolean>(false);

  // Pagination
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(8);

  // Actions
  const loadProducts = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      products.value = await ProductService.getProducts();
      isInitialized.value = true;
      currentPage.value = 1;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Неизвестная ошибка";
      console.error("Ошибка при загрузке данных: ", err);
    } finally {
      isLoading.value = false;
    }
  };

  const loadProduct = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      currentProduct.value = await ProductService.getProductById(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Неизвестная ошибка";
      console.error("Ошибка при загрузке данных: ", err);
    } finally {
      isLoading.value = false;
    }
  };

  const initialize = async () => {
    if (!isInitialized.value) {
      await loadProducts();
    }
  };

  const getCurrentProduct = async (id: number) => {
    return await ProductService.getProductById(id);
  };

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  // Getters
  const filteredProducts = computed(() => {
    if (!products.value.length) return [];

    let filtered: Product[] = [...products.value];
    const filters: FiltersState = filterStore.state;

    // Поиск
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product: Product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
  });

  const paginatedProducts = computed(() => {
    const start: number = (currentPage.value - 1) * itemsPerPage.value;
    const end: number = start + itemsPerPage.value;
    return filteredProducts.value.length > 0
      ? filteredProducts.value.slice(start, end)
      : products.value.slice(start, end);
  });

  return {
    // State
    products,
    currentProduct,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    displayedProducts,

    // Actions
    initialize,
    loadProducts,
    loadProduct,
    getCurrentProduct,
    setPage,

    // Getters
    totalPages,
    paginatedProducts,
    filteredProducts,
  };
});
