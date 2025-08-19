import { Product } from "@/types";
import { computed, Ref, ref } from "vue";
import { paginate } from "./utils/paginate";

export const usePagination = () => {
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(8);

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const getPaginated = (
    sortedAndSearchedProducts: Ref<Product[]>
  ): Ref<Product[]> =>
    computed(() =>
      paginate(sortedAndSearchedProducts, currentPage, itemsPerPage)
    );

  const resetPage = () => {
    currentPage.value = 1;
  };

  return {
    currentPage,
    itemsPerPage,
    setPage,
    getPaginated,
    resetPage,
  };
};
