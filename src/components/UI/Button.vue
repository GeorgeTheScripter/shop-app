<template>
  <button
    class="bg-slate-200 text-slate-800 px-6 py-2 rounded-xl cursor-pointer hover:bg-slate-300 font-medium relative"
  >
    <slot></slot>
    <div
      v-if="isCountFavoriteVisible"
      class="absolute -top-2 -right-2 flex items-center justify-center rounded-4xl w-[24px] h-[24px] bg-red-500 text-white"
    >
      {{ favoriteStore.favorites.length }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { useFavoriteStore } from "@/store/favorite.store";
import { computed } from "vue";

const props = defineProps<{
  isFavorite?: boolean;
}>();

defineOptions({
  name: "Button",
});

const favoriteStore = useFavoriteStore();
const isCountFavoriteVisible = computed(
  () => props.isFavorite && favoriteStore.favorites.length > 0
);
</script>
