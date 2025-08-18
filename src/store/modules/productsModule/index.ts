import { defineStore } from "pinia";
import { usePagination } from "./pagination";
import { useSearchAndFilter } from "./searchAndFilter";
import { useProducts } from "./products";
import { useCategorySort } from "./categories";

export const useProductStore = defineStore("product", () => {
  const productsModule = useProducts();
  const paginationModule = usePagination();
  const searchAndSortModule = useSearchAndFilter();
  const categoriesModule = useCategorySort();

  const paginatedProducts = paginationModule.getPaginated(
    searchAndSortModule.getSearchedAndSortedProducts(
      categoriesModule.filteredProducts
      // productsModule.products
    )
  );

  return {
    ...productsModule,
    ...paginationModule,
    ...searchAndSortModule,
    ...categoriesModule,
    paginatedProducts,
  };
});
