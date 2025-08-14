import { Product, SortType } from "@/types";
import { type Ref } from "vue";

export const sort = (result: Product[], type: Ref<string>): Product[] => {
  switch (type.value.trim()) {
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
};
