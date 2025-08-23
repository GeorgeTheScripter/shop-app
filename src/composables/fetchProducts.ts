import { type Ref } from "vue";
import { Product } from "@/types";
import { ProductService } from "@/services/productService";

export const fetchProducts = async (
  isLoading: Ref<boolean>,
  products: Ref<Product[]>,
  error: Ref<string>
) => {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    products.value = await ProductService.getAll();
  } catch (err) {
    error.value = String(err);
  } finally {
    isLoading.value = false;
  }
};
