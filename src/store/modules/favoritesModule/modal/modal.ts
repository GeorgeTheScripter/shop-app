import { StorModalComposable, useStoreModal } from "@/composables/useModal";
import { useCartStore } from "../../cartModule";
import { useFavoriteStore } from "..";

export const useFavoritesModal = (): StorModalComposable => {
  const favoriteStore = useFavoriteStore();
  const cartStore = useCartStore();

  return useStoreModal({
    checkCondition: () => favoriteStore.favorites.length > 0,
    closeOtherStore: () => (cartStore.isOpen = false),
  });
};
