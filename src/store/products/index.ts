import { defineStore } from "pinia";
import { useProducts } from "./products";
import { usePagination } from "./pagination";
import { useSearchAndFilter } from "./searchAndFilter";

export const useProductStore = defineStore("product", () => {
  // products:
  const { products, isLoading, error, fetchProducts, getCurrentProduct } =
    useProducts();
  // pagination:
  const { currentPage, getPaginated, setPage, itemsPerPage } = usePagination();
  // search and sort
  const { getSearchedAndSortedProducts, options, searchQuery, sortType } =
    useSearchAndFilter();

  const sortedAndSearchedProducts = getSearchedAndSortedProducts(products);

  const paginatedProducts = getPaginated(sortedAndSearchedProducts);

  return {
    // products:
    products,
    isLoading,
    error,
    fetchProducts,
    getCurrentProduct,
    // pagination:
    currentPage,
    setPage,
    itemsPerPage,
    paginatedProducts,
    // search and sort
    options,
    searchQuery,
    sortType,
  };
});
