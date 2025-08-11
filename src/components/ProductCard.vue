<template>
  <div
    class="w-full h-full rounded-xl overflow-hidden cursor-pointer relative border-slate-600 border-2 flex flex-col"
    @click="openProductPage(product.id)"
  >
    <div
      :style="`background-image: url('${product.images[0]}')`"
      class="h-[200px] w-full bg-center bg-cover bg-no-repeat"
    ></div>

    <Like
      class="absolute top-2 right-2"
      :isFavorite="product.isFavorite"
      @click.stop="favoritesStore.toggleFavorite(product)"
    />

    <div class="p-4 flex flex-col gap-4 justify-between flex-1">
      <div class="flex flex-col gap-3">
        <p class="text-xl font-bold text-slate-600">{{ product.price }}$</p>
        <div class="flex flex-col gap-1">
          <p class="text-lg font-medium text-slate-600">{{ product.title }}</p>
          <p class="text-xs truncate text-slate-400">
            {{ product.description }}
          </p>
        </div>
      </div>

      <Button class="w-full" @click.stop="cartStore.addToCart(product)"
        >Добавить в корзину</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { useFavoriteStore } from "@/store/favorite.store";
import { Product } from "@/types";
import { useRouter } from "vue-router";

defineProps<{
  product: Product;
}>();

const favoritesStore = useFavoriteStore();
const cartStore = useCartStore();

const router = useRouter();

const openProductPage = (id: number) => {
  router.push(`/product/${id}`);
};
</script>
