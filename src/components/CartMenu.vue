<template>
  <div
    class="fixed z-1 top-0 right-0 left-0 bottom-0 bg-black/20"
    @click="cartStore.closeModal"
  >
    <div
      @click.stop
      class="absolute right-4 top-[80px] bottom-4 bg-white p-3 rounded-3xl overflow-hidden flex flex-col gap-3 border-slate-600 border-2 max-[767px]:left-2 max-[767px]:right-2"
    >
      <div class="w-full flex justify-between items-center text-3xl">
        <p>Корзина: {{ cartStore.totalCount }}</p>
        <button @click="cartStore.closeModal" class="cursor-pointer">
          &times;
        </button>
      </div>

      <div class="flex flex-col gap-2 overflow-y-scroll h-full pb-2">
        <CartItem
          v-for="cartItem in cartStore.cart"
          :key="cartItem.product.id"
          :cartItem="cartItem"
        />
      </div>

      <div class="w-full flex flex-col gap-4">
        <div class="text-xl flex justify-between">
          <p>Итого:</p>
          <p>{{ cartStore.totalPrice }}$</p>
        </div>

        <Button class="w-full" @click="openCartPage">Оформить</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import CartItem from "./CartItem.vue";
import { useRouter } from "vue-router";

const cartStore = useCartStore();

const router = useRouter();

const openCartPage = () => {
  router.push("/cart");
  cartStore.closeModal();
};
</script>
