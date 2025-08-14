import { Product } from "@/types";
import { Ref } from "vue";

export const search = (
  result: Product[],
  searchQuery: Ref<string>
): Product[] => {
  if (searchQuery.value) {
    const query: string = searchQuery.value.toLocaleLowerCase();

    return result.filter((product: Product): boolean => {
      return (
        product.title.toLocaleLowerCase().includes(query) ||
        product.description.toLocaleLowerCase().includes(query)
      );
    });
  } else {
    return result;
  }
};
