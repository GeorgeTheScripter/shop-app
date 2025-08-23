<template>
  <div
    class="w-full h-full rounded-2xl overflow-hidden cursor-pointer relative border-slate-600 border-2 flex flex-col"
    @click="openProductPage"
  >
    <div
      :style="`background-image: url('${product.images[0]}')`"
      class="h-[200px] max-[767px]:h-[140px] w-full bg-center bg-cover bg-no-repeat"
    ></div>

    <Like
      class="absolute top-2 right-2"
      :isFavorite="favoritesStore.isProductFavorite(product)"
      @click.stop="favoritesStore.toggleFavorite(product)"
    />

    <div class="p-4 max-[767px]:p-2 flex flex-col gap-4 justify-between flex-1">
      <div class="flex flex-col gap-3">
        <p class="text-xl font-bold text-slate-600">{{ product.price }}$</p>
        <div class="flex flex-col gap-1">
          <p
            class="text-lg font-medium text-slate-600 max-[767px]:text-base/[110%]"
          >
            {{ product.title }}
          </p>
          <p class="text-xs truncate text-slate-400">
            {{ product.description }}
          </p>
        </div>
      </div>

      <!-- <Button class="w-full" @click.stop="cartStore.addToCart(product)">
        <span class="max-[767px]:hidden">Добавить в корзину</span>
        <span class="min-[768px]:hidden">Вкорзину</span>
      </Button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useCartStore } from "@/store/modules/cartModule";
import { useFavoretesStore } from "@/store/favorites.store";
import { Product } from "@/types";
import { useRouter } from "vue-router";

const props = defineProps<{
  product: Product;
}>();

const favoritesStore = useFavoretesStore();
// const cartStore = useCartStore();
const router = useRouter();

const openProductPage = () => {
  router.push(`/product/${props.product.id}`);
};

// const isProductFavorite = computed(() =>
//   favoritesStore.favorites.some(
//     (favorite: Product) => favorite.id === props.product.id
//   )
// );
</script>
