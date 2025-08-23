<template>
  <button
    class="bg-slate-200 text-slate-800 px-6 max-[980px]:px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-300 font-medium relative duration-300"
    :class="{ 'bg-slate-300': active }"
  >
    <slot></slot>
    <div
      v-if="isCountFavoriteVisible"
      class="absolute -top-2 -right-2 flex items-center justify-center rounded-4xl w-[24px] h-[24px] bg-red-500 text-white"
    >
      {{ favoriteStore.favorites.length }}
    </div>

    <div
      v-if="isCountCartVisible"
      class="absolute -top-2 -right-2 flex items-center justify-center rounded-4xl w-[24px] h-[24px] bg-red-500 text-white"
    >
      {{ cartStore.totalCount }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { useFavoretesStore } from "@/store/favorites.store";
import { computed } from "vue";

const props = defineProps<{
  isFavorite?: boolean;
  isCart?: boolean;
  active?: boolean;
}>();

defineOptions({
  name: "Button",
});

const favoriteStore = useFavoretesStore();
const cartStore = useCartStore();

const isCountFavoriteVisible = computed(
  () => props.isFavorite && favoriteStore.favorites.length > 0
);

const isCountCartVisible = computed(
  () => props.isCart && cartStore.cart.length > 0
);
</script>
