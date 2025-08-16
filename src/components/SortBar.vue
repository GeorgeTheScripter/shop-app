<template>
  <div class="w-[1280px] mx-auto flex gap-4 justify-end">
    <Categories />

    <div class="flex gap-2">
      <Select v-model="sortType" :options="options" />
      <Input v-model="searchQuery" placeholder="Поиск..." />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/modules/productsModule";
import { storeToRefs } from "pinia";
import Categories from "./Categories.vue";

const { searchQuery, sortType, options } = storeToRefs(useProductStore());
</script>
