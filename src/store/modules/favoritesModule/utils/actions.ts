import { Product } from "@/types";
import { useFavoriteStore } from "..";
import { saveToLocalStorage } from "@/utils/saveToLocalStorage";
import { useProductStore } from "../../productsModule";

export const useAddAndRemove = () => {
  const favoritesLsKey = import.meta.env.VITE_LS_CART_KEY;
  const favoritesStore = useFavoriteStore();
  const productsStore = useProductStore();

  const addToFavorite = (product: Product) => {
    if (
      favoritesStore.favorites.some(
        (favorite: Product) => favorite.id === product.id
      )
    ) {
      return;
    }
    product.isFavorite = true;
    favoritesStore.favorites.push({ ...product, isFavorite: true });

    saveToLocalStorage(favoritesLsKey, favoritesStore.favorites);
  };

  const removeFromFavorite = (product: Product) => {
    const currentProduct = productsStore.products.find(
      (pr: Product) => pr.id === product.id
    );

    if (currentProduct) {
      currentProduct.isFavorite = false;
    }

    favoritesStore.favorites = favoritesStore.favorites.filter(
      (favorite: Product) => favorite.id !== product.id
    );

    saveToLocalStorage(favoritesLsKey, favoritesStore.favorites);
  };

  const toggleFavorite = (product: Product) =>
    product.isFavorite ? removeFromFavorite(product) : addToFavorite(product);

  return {
    addToFavorite,
    removeFromFavorite,
    toggleFavorite,
  };
};
