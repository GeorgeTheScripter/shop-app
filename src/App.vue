<script setup lang="ts">
import { onMounted } from "vue";
import { useProductStore } from "./store/productStore";
import Header from "@/components/Header.vue";
import ProductCard from "./components/ProductCard.vue";

const productsStore = useProductStore();
onMounted(async () => {
  productsStore.fetchProducts();
});
</script>

<template>
  <div class="flex flex-col gap-12">
    <Header />

    <!-- Создать лоадер -->
    <div v-if="productsStore.isLoading">Loading...</div>

    <div
      v-else-if="productsStore.products.length > 0"
      class="w-[1280px] m-auto grid grid-cols-4 gap-5"
    >
      <ProductCard
        v-for="product in productsStore.products"
        :product="product"
        :key="product.id"
      />
    </div>

    <!-- Создать оповещение -->
    <div v-else class="text-center py-8">No products found</div>
  </div>
</template>
