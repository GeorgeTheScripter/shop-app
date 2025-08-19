import { Product } from "@/types";
import { type Ref } from "vue";

export const paginate = (
  products: Ref<Product[]>,
  currentPage: Ref<number>,
  itemsPerPage: Ref<number>
): Product[] => {
  const start: number = (currentPage.value - 1) * itemsPerPage.value;
  // WTF??? Почему TS пропустил itemsPerPage.value если он приходит строкой. Узнать!
  const end: number = start + Number(itemsPerPage.value);

  return products.value.slice(start, end);
};
