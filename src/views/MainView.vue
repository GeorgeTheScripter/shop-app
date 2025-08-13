<template>
  <div class="mt-24">
    <div class="w-[1280px] mx-auto mb-6">
      <h3 class="text-4xl text-slate-600">Популярное</h3>
    </div>

    <div class="flex flex-col gap-4">
      <div class="w-[1280px] mx-auto flex justify-end">
        <div class="flex gap-2">
          <Input v-model="inputState" />
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
import { ref } from "vue";

const inputState = ref<string>();
</script>
