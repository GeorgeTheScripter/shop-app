<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-black/20"
    @click="favoriteStore.closeModal"
  >
    <div
      @click.stop
      class="absolute right-4 top-[80px] bottom-4 bg-white p-3 rounded-3xl overflow-hidden flex flex-col gap-3 border-slate-600 border-2"
    >
      <div class="w-full flex justify-between items-center text-3xl">
        <p>Избранное: {{ favoriteStore.favorites.length }}</p>
        <button @click="favoriteStore.closeModal" class="cursor-pointer">
          &times;
        </button>
      </div>

      <div class="flex flex-col gap-2 overflow-y-scroll h-full pb-2">
        <FavoriteItem
          v-for="favorite in favoriteStore.favorites"
          :key="favorite.id"
          :favorite="favorite"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from "@/store/favorite.store";
import FavoriteItem from "./FavoriteItem.vue";

const favoriteStore = useFavoriteStore();
</script>
