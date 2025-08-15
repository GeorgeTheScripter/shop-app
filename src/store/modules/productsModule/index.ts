import { defineStore } from "pinia";
import { usePagination } from "./pagination";
import { useSearchAndFilter } from "./searchAndFilter";
import { useProducts } from "./products";

export const useProductStore = defineStore("product", () => {
  const productsModule = useProducts();
  const paginationModule = usePagination();
  const searchAndSortModule = useSearchAndFilter();

  const paginatedProducts = paginationModule.getPaginated(
    searchAndSortModule.getSearchedAndSortedProducts(productsModule.products)
  );

  return {
    ...productsModule,
    ...paginationModule,
    ...searchAndSortModule,
    paginatedProducts,
  };
});
