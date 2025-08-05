export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isFavorite?: boolean;
};

export interface ApiClient {
  getProducts: () => Promise<Product[]>;
  getProductById: (id: number) => Promise<Product>;
}
