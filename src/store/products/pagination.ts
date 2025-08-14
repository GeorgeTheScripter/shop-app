import { Product } from "@/types";
import { computed, Ref, ref } from "vue";

export const usePagination = () => {
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(8);

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const getPaginated = (
    sortedAndSearchedProducts: Ref<Product[]>
  ): Ref<Product[]> => {
    return computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;

      return sortedAndSearchedProducts.value.slice(start, end);
    });
  };

  return {
    currentPage,
    itemsPerPage,
    setPage,
    getPaginated,
  };
};
