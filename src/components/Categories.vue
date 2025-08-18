<template>
  <div class="flex gap-2 flex-wrap justify-end">
    <Button
      v-for="category in producStore.categories"
      @click="producStore.toggleCategory(category)"
      :active="producStore.selectedCategories.includes(category)"
      >{{ category }}</Button
    >

    <Button @click="producStore.clearSelected()">All</Button>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/modules/productsModule";

const producStore = useProductStore();
</script>
