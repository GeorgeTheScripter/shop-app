import { ProductService } from "@/services/product/productService";
import { Product } from "@/types";
import { type Ref } from "vue";

export const loadFromAPI = async (
  products: Ref<Product[]>,
  error: Ref<string>
) => {
  try {
    products.value = await ProductService.getAll();
  } catch (err) {
    error.value = String(err);
  }
};
