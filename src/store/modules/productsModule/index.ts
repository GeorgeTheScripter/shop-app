import { defineStore } from "pinia";
import { usePagination } from "./pagination";
import { useSearchAndFilter } from "./searchAndFilter";
import { useProducts } from "./products";
import { useCategorySort } from "./categories";
import { useDisplayedProducts } from "./displayedProducts";
import { computed, onMounted, watch } from "vue";

export const useProductStore = defineStore("product", () => {
  const productsModule = useProducts();
  const paginationModule = usePagination();
  const searchAndSortModule = useSearchAndFilter();
  const categoriesModule = useCategorySort();
  const displayedProductsModule = useDisplayedProducts();

  const paginatedProducts = paginationModule.getPaginated(
    searchAndSortModule.getSearchedAndSortedProducts(
      categoriesModule.filteredProducts
    )
  );

  watch(
    () => displayedProductsModule.displayedProductValue.value,
    (newValue) => {
      paginationModule.itemsPerPage.value = newValue;
      paginationModule.resetPage();
    }
  );

  const totalPages = computed(() => {
    return Math.ceil(
      categoriesModule.filteredProducts.value.length /
        paginationModule.itemsPerPage.value
    );
  });

  onMounted(async () => {
    await productsModule.getProducts();
  });

  return {
    ...productsModule,
    ...paginationModule,
    ...searchAndSortModule,
    ...categoriesModule,
    ...displayedProductsModule,
    paginatedProducts,
    totalPages,
  };
});
