<template>
  <div
    class="w-full mx-auto flex gap-4 justify-end items-center max-[1198px]:flex-col max-[1198px]:items-end"
  >
    <Categories />

    <Range />

    <div
      class="flex gap-2 max-[1198px]:order-first max-[380px]:flex-col max-[380px]:w-full"
    >
      <Select
        v-model="store.sortType"
        :options="store.options"
        class="max-[380px]:py-2"
      />
      <Select
        v-model="store.displayedProductValue"
        :options="store.displayedProductsCount"
        class="max-[380px]:py-2"
      />
      <Input
        v-model="store.searchQuery"
        placeholder="Поиск..."
        class="max-[380px]:w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/modules/productsModule";
import Categories from "./Categories.vue";

const store = useProductStore();
</script>
