import { useFavoriteStore } from "@/store/favorite.store";
import { Product } from "@/types";
import { Ref } from "vue";

export const syncFavorite = (products: Ref<Product[]>) => {
  const favoritesStore = useFavoriteStore();

  products.value = products.value.map((product) => ({
    ...product,
    isFavorite: favoritesStore.favorites.some(
      (favorite: Product) => favorite.id === product.id
    ),
  }));
};
