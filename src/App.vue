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
      <!-- <CartMenu v-if="isCartModalOpen" /> -->
    </FadeTransaction>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import FavoriteMenu from "@/components/FavoriteMenu.vue";
// import { useFavoriteStore } from "@/store/modules/favoritesModule";
import { computed } from "vue";
import CartMenu from "@/components/CartMenu.vue";
// import { useCartStore } from "@/store/modules/cartModule";
import FadeTransaction from "@/components/FadeTransaction.vue";
import Footer from "@/components/Footer.vue";
import { useFavoretesStore } from "./store/favorites.store";

// const favoriteStore = useFavoriteStore();
const favoriteStore = useFavoretesStore();
// const cartStore = useCartStore();

// const isFavoriteModalOpen = computed(
//   () => favoriteStore.isOpen && favoriteStore.favorites.length > 0
// );

// const isCartModalOpen = computed(
//   () => cartStore.isOpen && cartStore.cart.length > 0
// );
</script>
