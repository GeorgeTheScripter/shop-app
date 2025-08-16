<template>
  <div
    class="flex gap-2 justify-center max-[767px]:gap-1"
    v-if="totalPages > 1"
  >
    <Button
      v-for="page in totalPages"
      @click="productsStore.setPage(page)"
      :class="{
        'bg-slate-300': page === productsStore.currentPage,
      }"
      >{{ page }}</Button
    >
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/modules/productsModule";
import { computed } from "vue";

defineOptions({
  name: "Pagination",
});

const productsStore = useProductStore();

const totalPages = computed(() => {
  return Math.ceil(
    productsStore.filteredProducts.length / productsStore.itemsPerPage
  );
});
</script>
