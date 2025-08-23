<template>
  <header class="bg-slate-800 px-4 py-3 fixed w-full z-2">
    <div class="max-w-[1280px] w-full flex justify-between mx-auto">
      <div class="text-xl font-medium text-slate-300" @click="router.push('/')">
        Логотип
      </div>

      <div class="flex gap-2">
        <Button @click="openFavoriteModal" :isFavorite="true">Избранное</Button>
        <Button @click="openCartModal" :isCart="true">Корзина</Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { useFavoretesStore } from "@/store/favorites.store";
import { useRouter } from "vue-router";

const router = useRouter();

const favoriteStore = useFavoretesStore();
const cartStore = useCartStore();

const openFavoriteModal = () => {
  if (cartStore.isModalOpen) {
    cartStore.closeModal();
  }

  favoriteStore.toggleModal();
};

const openCartModal = () => {
  if (favoriteStore.isModalOpen) {
    favoriteStore.closeModal();
  }

  cartStore.toggleModal();
};
</script>
