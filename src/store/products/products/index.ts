import { Product } from "@/types";
import { ref } from "vue";
import { fetchProducts } from "./utils/fetchProducts";

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");

  const getProducts = async () =>
    await fetchProducts(isLoading, products, error);

  const getCurrentProduct = (id: number): Product | undefined => {
    return products.value.find((product: Product) => product.id === id);
  };

  return {
    products,
    isLoading,
    error,

    getProducts,
    getCurrentProduct,
  };
};
