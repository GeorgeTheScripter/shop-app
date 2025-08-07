<template>
  <div class="mt-24">
    <div class="w-[1280px] mx-auto mb-6">
      <h3 class="text-4xl text-slate-600">Популярное</h3>
    </div>

    <ProductsList />

    <div class="mt-24">
      <Footer />
    </div>

    <FadeTransaction>
      <FavoriteMenu v-if="isFavoriteModalOpen" />
    </FadeTransaction>

    <FadeTransaction>
      <CartMenu v-if="isCartModalOpen" />
    </FadeTransaction>
  </div>
</template>

<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import Footer from "@/components/Footer.vue";
import FavoriteMenu from "@/components/FavoriteMenu.vue";
import { useFavoriteStore } from "@/store/favorite.store";
import { computed } from "vue";
import CartMenu from "@/components/CartMenu.vue";
import { useCartStore } from "@/store/cart.store";
import FadeTransaction from "@/components/FadeTransaction.vue";

const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();

const isFavoriteModalOpen = computed(
  () => favoriteStore.isModalOpen && favoriteStore.favorites.length > 0
);

const isCartModalOpen = computed(
  () => cartStore.isModalOpen && cartStore.cart.length > 0
);
</script>
