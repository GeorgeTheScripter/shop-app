import { fetchProducts } from "@/composables/fetchProducts";
import { Product } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");
  const isInitialized = ref<boolean>(false);

  const getProducts = async () =>
    await fetchProducts(isLoading, products, error);

  const getCurrentProduct = (id: number): Product | undefined => {
    return products.value.find((product: Product) => product.id === id);
  };

  const initialize = () => {
    if (!isInitialized.value) {
      getProducts();
    }
  };

  return {
    products,
    isLoading,
    error,

    getProducts,
    getCurrentProduct,
    initialize,
  };
});
