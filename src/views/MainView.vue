<template>
  <div class="w-full px-4">
    <div class="max-w-[1280px] mx-auto mt-24">
      <div class="mb-6">
        <h3 class="text-4xl text-slate-600">Популярное</h3>
      </div>

      <div class="flex flex-col gap-4">
        <SortBar />
        <ProductsList />
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import SortBar from "@/components/SortBar.vue";
</script>
