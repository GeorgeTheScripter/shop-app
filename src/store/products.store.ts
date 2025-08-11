import { ProductService } from "@/services/product/productService";
import { Product } from "@/types";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFavoriteStore } from "./favorite.store";

export const useProductStore = defineStore("product", () => {
  const LOCAL_STORAGE_KEY = "products";

  // state
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");

  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(8);
  const totalProducts = ref<number>(0);

  // actions
  const fetchProducts = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      await loadFromAPI();
      syncFavorite();
    } catch (err) {
      error.value = String(err);
    } finally {
      isLoading.value = false;
    }
  };

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  // private methods
  const loadFromAPI = async () => {
    try {
      products.value = await ProductService.getAll();
      totalProducts.value = products.value.length;
      saveToLocalStorage(LOCAL_STORAGE_KEY, products.value);
    } catch (err) {
      error.value = String(err);
    }
  };

  // refactor later
  // const loadFromStorage = async (savedData: string) => {
  //   try {
  //     products.value = JSON.parse(savedData);
  //   } catch (err) {
  //     error.value = "Parsing Error";
  //     await loadFromAPI();
  //   }
  // };

  const syncFavorite = () => {
    const favoritesStore = useFavoriteStore();
    products.value = products.value.map((product) => ({
      ...product,
      isFavorite: favoritesStore.favorites.some(
        (favorite) => favorite.id === product.id
      ),
    }));
  };

  // getters
  const getCurrentProduct = (id: number): Product | undefined => {
    return products.value.find((product: Product) => product.id === id);
  };

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;

    return products.value.slice(start, end);
  });

  return {
    // state
    products,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    totalProducts,
    // actions
    fetchProducts,
    setPage,
    // getters
    getCurrentProduct,
    paginatedProducts,
  };
});
