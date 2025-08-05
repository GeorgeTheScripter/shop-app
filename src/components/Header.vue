<template>
  <header class="bg-slate-800 px-4 py-3 fixed w-full z-1">
    <div class="w-[1280px] flex justify-between m-auto">
      <div class="text-xl font-medium text-slate-300">Shop</div>

      <div class="flex gap-2">
        <Button @click="toggleFavoriteModal" :isFavorite="true"
          >Favorites</Button
        >
        <Button>Cart</Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useFavoriteStore } from "@/store/favorite.store";

const favoriteStore = useFavoriteStore();

const toggleFavoriteModal = () => {
  if (favoriteStore.isModalOpen) {
    favoriteStore.closeModal();
  } else {
    favoriteStore.openModal();
  }
};
</script>
