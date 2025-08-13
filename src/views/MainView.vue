<template>
  <div class="mt-24">
    <div class="w-[1280px] mx-auto mb-6">
      <h3 class="text-4xl text-slate-600">Популярное</h3>
    </div>

    <div class="flex flex-col gap-4">
      <div class="w-[1280px] mx-auto flex justify-end">
        <div class="flex gap-2">
          <select v-model="sortType" name="select" id="selet">
            <option disabled>Сортировка по:</option>
            <option
              v-for="option in options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.name }}
            </option>
          </select>
          <Input v-model="searchQuery" />

          <Button>Поиск</Button>
        </div>
      </div>

      <ProductsList />
      <Pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import { useProductStore } from "@/store/products.store";
import { storeToRefs } from "pinia";

const { searchQuery, sortType, options } = storeToRefs(useProductStore());
</script>
