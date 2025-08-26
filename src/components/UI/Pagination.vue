<template>
  <div
    class="flex gap-2 justify-center max-[767px]:gap-1"
    v-if="productStore.totalPages > 1"
  >
    <Button
      v-for="page in productStore.totalPages"
      @click="productStore.setPage(page)"
      :class="{
        'bg-slate-300': page === productStore.currentPage,
      }"
      >{{ page }}</Button
    >
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "@/store/products.store";

defineOptions({
  name: "Pagination",
});

const productStore = useProductsStore();
</script>
