<template>
  <div class="w-[1280px] mx-auto flex justify-end">
    <div class="flex gap-2">
      <Select v-model="sortType" :options="options" />
      <Input v-model="searchQuery" placeholder="Поиск..." />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/products.store";
import { storeToRefs } from "pinia";

const { searchQuery, sortType, options } = storeToRefs(useProductStore());
</script>
