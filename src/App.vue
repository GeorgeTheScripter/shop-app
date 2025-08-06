<template>
  <div class="flex flex-col">
    <Header />

    <div class="w-[1280px] mx-auto mt-24 mb-6">
      <h3 class="text-4xl text-slate-600">Our products</h3>
    </div>

    <ProductsList />

    <div class="mt-24">
      <Footer />
    </div>

    <FavoriteMenu v-if="isFavoriteModalOpen" />
    <CartMenu v-if="isCartModalOpen" />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import ProductsList from "@/components/ProductsList.vue";
import Footer from "@/components/Footer.vue";
import FavoriteMenu from "@/components/FavoriteMenu.vue";
import { useFavoriteStore } from "@/store/favorite.store";
import { computed } from "vue";
import CartMenu from "./components/CartMenu.vue";
import { useCartStore } from "./store/cart.store";

const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();

const isFavoriteModalOpen = computed(
  () => favoriteStore.isModalOpen && favoriteStore.favorites.length > 0
);

const isCartModalOpen = computed(
  () => cartStore.isModalOpen && cartStore.cart.length > 0
);
</script>
