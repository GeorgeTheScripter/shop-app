<template>
  <div
    class="p-2 rounded-xl flex justify-between w-lg items-center bg-white border-slate-600 border-2"
  >
    <div class="flex gap-3 items-center">
      <div
        :style="`background-image: url('${favorite.images[0]}')`"
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

    <Button @click="favoriteStore.removeFromFavorite(favorite)">Delete</Button>
  </div>
</template>

<script setup lang="ts">
import { Product } from "@/types";
import { useFavoriteStore } from "@/store/favorite.store";

defineProps<{
  favorite: Product;
}>();

const favoriteStore = useFavoriteStore();
</script>
