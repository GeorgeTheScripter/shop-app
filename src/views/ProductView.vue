<template>
  <div class="mt-24">
    <div class="w-[1280px] mx-auto flex flex-col gap-12" v-if="product">
      <Crumbs :rootName="'Главная'" :currentName="product.title" />
      <ProductInfo :product="product" />
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
import ProductInfo from "@/components/ProductInfo.vue";
import { computed } from "vue";

const props = defineProps<{
  id: number;
}>();

const productStore = useProductStore();

const product = computed(() => productStore.getCurrentProduct(props.id));
</script>
