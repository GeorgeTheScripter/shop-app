<template>
  <div class="mt-24">
    <div class="w-[1280px] mx-auto text-xl flex gap-2">
      <router-link to="/" class="text-slate-800">Главная</router-link> /
      <p class="text-slate-400">{{ product?.title }}</p>
    </div>

    <div class="w-[1280px] mx-auto flex gap-12 mt-12" v-if="product">
      <div class="border-slate-600 border-2 rounded-xl overflow-hidden">
        <div
          :style="`background-image: url('${product.images[0]}')`"
          class="h-[400px] w-[400px] bg-center bg-cover bg-no-repeat block"
        ></div>
      </div>

      <div class="flex flex-col justify-between flex-1">
        <div>
          <p class="text-2xl text-slate-800 font-medium">
            {{ product.price }}$
          </p>
          <p class="text-2xl max-w-[500px] text-slate-800">
            {{ product.title }}
          </p>
          <p class="text-lg">{{ product.category.name }}</p>
          <p class="text-lg/snug text-slate-600">{{ product.description }}</p>
        </div>

        <div class="flex gap-2">
          <Like
            class="cursor-pointer"
            :isFavorite="product.isFavorite"
            @click="favoritesStore.toggleFavorite(product)"
          />
          <Button class="" @click="cartStore.addToCart(product)"
            >Добавить в корзину</Button
          >
        </div>
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
import { useCartStore } from "@/store/cart.store";
import { useFavoriteStore } from "@/store/favorite.store";
import { useProductStore } from "@/store/products.store";
import { computed } from "vue";

const props = defineProps<{
  id: number;
}>();

const productStore = useProductStore();
const cartStore = useCartStore();
const favoritesStore = useFavoriteStore();

const product = computed(() => productStore.getCurrentProduct(props.id));

console.log(product.value?.isFavorite);
</script>
