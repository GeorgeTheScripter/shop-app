export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  image: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export interface ApiClient {
  getProducts: () => Promise<Product[]>;
  getProductById: (id: number) => Promise<Product>;
}
