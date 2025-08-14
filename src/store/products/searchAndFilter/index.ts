import { SortType, Option, Product } from "@/types";
import { computed, type Ref, ref } from "vue";
import { search } from "./utils/search";
import { sort } from "./utils/sort";

export const useSearchAndFilter = () => {
  const searchQuery = ref<string>("");
  const sortType = ref<SortType>(SortType.DESCENDING);
  const options = ref<Option[]>([
    { value: SortType.ASCENDING, name: "Возрастанию цены" },
    { value: SortType.DESCENDING, name: "Убыванию цены" },
  ]);

  const getSearchedAndSortedProducts = (
    products: Ref<Product[]>
  ): Ref<Product[]> => {
    return computed((): Product[] =>
      sort(search([...products.value], searchQuery), sortType)
    );
  };

  return {
    searchQuery,
    sortType,
    options,

    getSearchedAndSortedProducts,
  };
};
