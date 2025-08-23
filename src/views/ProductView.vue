<template>
  <div class="mt-24 px-4">
    <div
      class="max-w-[1280px] mx-auto flex flex-col gap-12"
      v-if="productStore.currentProduct"
    >
      <Crumbs
        :rootName="'Главная'"
        :currentName="productStore.currentProduct.title"
      />
      <ProductInfo :product="productStore.currentProduct" />
    </div>

    <div class="max-w-[1280px] mx-auto mt-24 mb-6">
      <h3 class="text-4xl text-slate-600">Вам может понравиться</h3>
    </div>
    <ProductsList />
  </div>
</template>

<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
import ProductInfo from "@/components/ProductInfo.vue";
import { useProductsStore } from "@/store/products.store";
import { onMounted, onUnmounted, watchEffect } from "vue";

const props = defineProps<{
  id: number;
}>();

const productStore = useProductsStore();

onMounted(() => {
  productStore.loadProduct(props.id);
});

onUnmounted(() => {
  productStore.currentProduct = null;
});

watchEffect(() => {
  productStore.loadProduct(props.id);
});
</script>
