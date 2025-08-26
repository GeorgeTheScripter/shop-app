<template>
  <div>
    <div v-if="store.isLoading">Загрузка...</div>

    <div v-else-if="store.products.length > 0" class="flex flex-col gap-4">
      <div
        class="max-w-[1280px] w-full m-auto grid grid-cols-4 gap-5 max-[1198px]:grid-cols-3 max-[980px]:grid-cols-2 max-[980px]:gap-2"
      >
        <ProductCard
          v-for="product in store.paginatedProducts"
          :product="product"
          :key="product.id"
        />
      </div>
    </div>

    <div v-else class="text-center py-8">Товары не найдены</div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from "./ProductCard.vue";
import { useProductsStore } from "@/store/products.store";

const store = useProductsStore();
</script>
