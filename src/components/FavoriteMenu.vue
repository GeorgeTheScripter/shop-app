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
        <p>Favorites: {{ favoriteStore.favorites.length }}</p>
        <button @click="favoriteStore.closeModal" class="cursor-pointer">
          &times;
        </button>
      </div>

      <div class="flex flex-col gap-2 overflow-y-scroll h-full pb-2">
        <div
          v-for="favorite in favoriteStore.favorites"
          :key="favorite.id"
          class="p-2 rounded-xl flex justify-between w-lg items-center bg-white border-slate-600 border-2"
        >
          <div class="flex gap-3 items-center">
            <div
              :style="`background-image: url('${favorite.image}')`"
              class="h-[40px] w-[40px] bg-center bg-contain bg-no-repeat"
            ></div>
            <div class="max-w-[300px] flex-1 overflow-hidden">
              <p class="text-lg">{{ favorite.price }}$</p>
              <p
                class="text-xl whitespace-nowrap text-ellipsis overflow-hidden truncate"
              >
                {{ favorite.title }}
              </p>
            </div>
          </div>

          <Button @click="removeFromFavorite(favorite)">Delete</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from "@/store/favorite.store";
import { Product } from "@/types";

const favoriteStore = useFavoriteStore();

const removeFromFavorite = (product: Product) => {
  favoriteStore.removeFromFavorite(product);
};
</script>
