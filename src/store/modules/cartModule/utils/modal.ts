import { StorModalComposable, useStoreModal } from "@/composables/useModal";
import { useCartStore } from "..";
import { useFavoriteStore } from "../../favoritesModule";

export const useCartModal = (): StorModalComposable => {
  const favoriteStore = useFavoriteStore();
  const cartStore = useCartStore();

  return useStoreModal({
    checkCondition: () => cartStore.cart.length > 0,
    closeOtherStore: () => (favoriteStore.isOpen = false),
  });
};
