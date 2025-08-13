<template>
  <div class="flex gap-6">
    <ProductSplide :images="product.images" />

    <div class="flex flex-col justify-between flex-1">
      <div>
        <p class="text-2xl text-slate-800 font-medium">{{ product.price }}$</p>
        <p class="text-2xl max-w-[500px] text-slate-800">
          {{ product.title }}
        </p>
        <p class="text-lg">{{ product.category.name }}</p>
        <p class="text-lg/snug text-slate-600">{{ product.description }}</p>
      </div>

      <div class="flex gap-2">
        <Like
          class="cursor-pointer"
          :isFavorite="product.isFavorite || false"
          @click="favoritesStore.toggleFavorite(product)"
        />
        <Button class="" @click="cartStore.addToCart(product)"
          >Добавить в корзину</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductSplide from "@/components/ProductSplide.vue";
import { useCartStore } from "@/store/cart.store";
import { useFavoriteStore } from "@/store/favorite.store";
import { Product } from "@/types";

defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const favoritesStore = useFavoriteStore();
</script>
