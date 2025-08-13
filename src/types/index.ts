import { Ref } from "vue";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    name: string;
  };
  images: string[];
  isFavorite?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export enum SortType {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export interface ApiClient {
  getProducts: () => Promise<Product[]>;
  getProductById: (id: number) => Promise<Product>;
  getProductByPage: (page: number, limit: number) => Promise<Product[]>;
}

export interface SearchAndSortComposable {
  searchQuery: Ref<string>;
  sortType: Ref<SortType>;
  options: Ref<Option[]>;
}

export interface Option {
  value: SortType;
  name: string;
}
