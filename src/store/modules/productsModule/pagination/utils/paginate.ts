import { Product } from "@/types";
import { type Ref } from "vue";

export const paginate = (
  products: Ref<Product[]>,
  currentPage: Ref<number>,
  itemsPerPage: Ref<number>
): Product[] => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return products.value.slice(start, end);
};
