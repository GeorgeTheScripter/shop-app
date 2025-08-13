<template>
  <div>
    <div v-if="productsStore.isLoading">Загрузка...</div>

    <div
      v-else-if="productsStore.paginatedProducts.length > 0"
      class="flex flex-col gap-4"
    >
      <div class="w-[1280px] m-auto grid grid-cols-4 gap-5">
        <ProductCard
          v-for="product in productsStore.paginatedProducts"
          :product="product"
          :key="product.id"
        />
      </div>
    </div>

    <div v-else class="text-center py-8">Товары не найдены</div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/products.store";
import { onMounted } from "vue";
import ProductCard from "./ProductCard.vue";

const productsStore = useProductStore();

onMounted(async () => {
  await productsStore.fetchProducts();
});
</script>
