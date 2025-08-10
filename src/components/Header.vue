<template>
  <header class="bg-slate-800 px-4 py-3 fixed w-full z-2">
    <div class="w-[1280px] flex justify-between m-auto">
      <div class="text-xl font-medium text-slate-300" @click="router.push('/')">
        Логотип
      </div>

      <div class="flex gap-2">
        <Button @click="favoriteStore.toggleFavoriteModal" :isFavorite="true"
          >Избранное</Button
        >
        <Button @click="cartStore.toggleCartModal" :isCart="true"
          >Корзина</Button
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { useFavoriteStore } from "@/store/favorite.store";
import { useRouter } from "vue-router";

const router = useRouter();

const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();
</script>
