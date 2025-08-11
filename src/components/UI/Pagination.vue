<template>
  <div class="flex gap-2 justify-center">
    <Button
      v-for="pageNumber in productsStore.totalPages"
      :class="{
        'bg-slate-400': pageNumber === productsStore.page,
      }"
      @click="productsStore.changePage(pageNumber)"
      >{{ pageNumber }}</Button
    >
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/products.store";

defineOptions({
  name: "Pagination",
});

const productsStore = useProductStore();
</script>
