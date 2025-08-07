<template>
  <div class="mt-24">
    <div class="w-[1280px] mx-auto flex gap-2" v-if="product">
      <div>
        <div
          :style="`background-image: url('${product.image}')`"
          class="h-[400px] w-[400px] bg-center bg-size-[250px] bg-no-repeat block"
        ></div>
      </div>

      <div class="">
        <p class="text-2xl">{{ product.title }}</p>
        <p class="text-xl">{{ product.description }}</p>
      </div>
    </div>

    <div class="w-[1280px] mx-auto mt-24 mb-6">
      <h3 class="text-4xl text-slate-600">Вам может понравиться</h3>
    </div>
    <ProductsList />
  </div>
</template>

<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import { useProductStore } from "@/store/products.store";
import { computed } from "vue";

const props = defineProps<{
  id: number;
}>();
const productStore = useProductStore();
const product = computed(() => productStore.getCurrentProduct(props.id));
</script>
