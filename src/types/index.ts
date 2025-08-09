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

export interface ApiClient {
  getProducts: () => Promise<Product[]>;
  getProductById: (id: number) => Promise<Product>;
}
