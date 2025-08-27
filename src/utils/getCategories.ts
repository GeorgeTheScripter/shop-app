import { Product } from "@/types";

export const getCategories = (products: Product[]) => {
  const categoriesSet = new Set<string>();

  products.forEach((product: Product) => {
    categoriesSet.add(product.category.name);
  });

  return Array.from(categoriesSet);
};
