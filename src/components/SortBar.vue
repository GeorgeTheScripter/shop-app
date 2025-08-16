<template>
  <div
    class="w-full mx-auto flex gap-4 justify-end items-center max-[1198px]:flex-col items-end"
  >
    <Categories />

    <div
      class="flex gap-2 max-[1198px]:order-first max-[380px]:flex-col max-[380px]:w-full"
    >
      <Select v-model="sortType" :options="options" class="max-[380px]:py-2" />
      <Input
        v-model="searchQuery"
        placeholder="Поиск..."
        class="max-[380px]:w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/modules/productsModule";
import { storeToRefs } from "pinia";
import Categories from "./Categories.vue";

const { searchQuery, sortType, options } = storeToRefs(useProductStore());
</script>
