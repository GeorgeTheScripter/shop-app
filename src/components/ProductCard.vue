<template>
  <div
    class="w-full h-full rounded-xl overflow-hidden cursor-pointer relative border-slate-600 border-2"
  >
    <div
      :style="`background-image: url('${product.image}')`"
      class="h-[200px] w-full bg-center bg-size-[120px] bg-no-repeat"
    ></div>
    <!-- <img :src="product.images[0]" alt="" /> -->

    <Like
      class="absolute top-2 right-2"
      :isFavorite="product.isFavorite"
      @click="toggleFavorite(product)"
    />

    <div class="p-4 flex flex-col gap-4 h-auto">
      <div class="flex flex-col gap-3">
        <p class="text-xl font-bold text-slate-600">{{ product.price }}$</p>
        <div class="flex flex-col gap-1">
          <p class="text-lg font-medium text-slate-600">{{ product.title }}</p>
          <p class="text-xs truncate text-slate-400">
            {{ product.description }}
          </p>
        </div>
      </div>

      <Button class="w-full" @click="addToCart(product)">Add to cart</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { useFavoriteStore } from "@/store/favorite.store";
import { Product } from "@/types";

const props = defineProps<{
  product: Product;
}>();

const favoritesStore = useFavoriteStore();
const cartStore = useCartStore();

const toggleFavorite = (product: Product) => {
  if (product.isFavorite) {
    favoritesStore.removeFromFavorite(product);
  } else {
    favoritesStore.addToFavorite(product);
  }
};

const addToCart = (product: Product) => {
  cartStore.addToCart(product);
};
</script>
