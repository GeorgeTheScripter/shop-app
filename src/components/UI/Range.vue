<template>
  <div class="flex flex-col gap-1">
    <p>Цена:</p>

    <div class="flex gap-2">
      <Input
        type="number"
        class="w-[100px]!"
        :placeholder="`От ${minPrice}$`"
        :min="minPrice"
        :max="maxPrice"
      />
      <Input
        type="number"
        class="w-[100px]!"
        :placeholder="`До ${maxPrice}$`"
        :max="maxPrice"
        :min="minPrice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/store/modules/productsModule";
import { Product } from "@/types";
import { ref, watch } from "vue";

defineOptions({
  name: "Range",
});

const store = useProductStore();

const maxPrice = ref<number | null>(null);
const minPrice = ref<number | null>(null);

watch(
  () => store.filteredProducts,
  (newProducts) => {
    const allPrices: number[] = [];

    newProducts.forEach((product: Product) => {
      allPrices.push(product.price);
    });

    minPrice.value = Math.min(...allPrices);
    maxPrice.value = Math.max(...allPrices);
  }
);
</script>
