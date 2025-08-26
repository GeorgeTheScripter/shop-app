<template>
  <div class="w-full px-4">
    <div class="max-w-[1280px] mx-auto mt-24">
      <div class="mb-6">
        <h3 class="text-4xl text-slate-600">Популярное</h3>
      </div>

      <div class="flex gap-4">
        <!-- <SortBar /> -->
        <Filters />
        <div class="flex flex-col gap-4">
          <ProductsList />
          <Pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import Filters from "@/components/Filters.vue";
// import SortBar from "@/components/SortBar.vue";
</script>
