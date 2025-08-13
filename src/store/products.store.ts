import { ProductService } from "@/services/product/productService";
import { Product, SortType, Option } from "@/types";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFavoriteStore } from "./favorite.store";

export const useProductStore = defineStore("product", () => {
  const LOCAL_STORAGE_KEY = "products";

  // state
  // products:
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");
  // pagination:
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(8);
  const totalProducts = ref<number>(0);
  // search and filter
  const searchQuery = ref<string>("");
  const sortType = ref<SortType>(SortType.DESCENDING);
  const options = ref<Option[]>([
    { value: SortType.ASCENDING, name: "Возрастанию цены" },
    { value: SortType.DESCENDING, name: "Убыванию цены" },
  ]);

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

  const sortedAndSearchedProducts = computed((): Product[] => {
    let result: Product[] = [...products.value];

    // Search
    if (searchQuery.value) {
      const query: string = searchQuery.value.toLocaleLowerCase();

      result = result.filter((product: Product): boolean => {
        return (
          product.title.toLocaleLowerCase().includes(query) ||
          product.description.toLocaleLowerCase().includes(query)
        );
      });
    }

    // Sort
    switch (sortType.value.trim()) {
      case SortType.ASCENDING:
        return [...result].sort(
          (a: Product, b: Product): number => a.price - b.price
        );
      case SortType.DESCENDING:
        return [...result].sort(
          (a: Product, b: Product): number => b.price - a.price
        );
      default:
        return result;
    }
  });

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

    return sortedAndSearchedProducts.value.slice(start, end);
  });

  return {
    // state
    products,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    totalProducts,
    searchQuery,
    sortType,
    options,
    sortedAndSearchedProducts,
    // actions
    fetchProducts,
    setPage,
    // getters
    getCurrentProduct,
    paginatedProducts,
  };
});
