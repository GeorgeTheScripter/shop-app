<template>
  <div class="flex flex-col">
    <Header />

    <router-view class="w-full"></router-view>

    <div class="mt-24">
      <Footer />
    </div>

    <FadeTransaction>
      <FavoriteMenu v-if="favoriteStore.isFavoriteModalOpen" />
    </FadeTransaction>

    <FadeTransaction>
      <CartMenu v-if="cartStore.isCartModalOpen" />
    </FadeTransaction>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import FavoriteMenu from "@/components/FavoriteMenu.vue";
import CartMenu from "@/components/CartMenu.vue";
import FadeTransaction from "@/components/FadeTransaction.vue";
import Footer from "@/components/Footer.vue";
import { useFavoretesStore } from "./store/favorites.store";
import { useCartStore } from "./store/cart.store";

const favoriteStore = useFavoretesStore();
const cartStore = useCartStore();
</script>
