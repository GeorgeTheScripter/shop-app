<template>
  <div
    class="p-2 rounded-xl flex justify-between w-lg max-[767px]:w-full items-center bg-white border-slate-600 border-2"
  >
    <div class="flex gap-3 items-center">
      <div
        :style="`background-image: url('${cartItem.product.images[0]}')`"
        class="h-[40px] w-[40px] bg-center bg-contain bg-no-repeat"
      ></div>
      <div
        class="max-w-[280px] max-[767px]:max-w-[160px] flex-1 overflow-hidden"
      >
        <p class="text-lg">{{ cartItem.product.price }}$</p>
        <p
          class="text-xl whitespace-nowrap text-ellipsis overflow-hidden truncate"
        >
          {{ cartItem.product.title }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div>
        <button @click="cartStore.decrementCount(cartItem)">-</button>
        {{ cartItem.quantity }}
        <button @click="cartStore.incrementCount(cartItem)">+</button>
      </div>

      <Button @click="cartStore.removeFromCart(cartItem.product)"
        >Delete</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/modules/cartModule";
import { CartItem } from "@/types";

defineProps<{
  cartItem: CartItem;
}>();

const cartStore = useCartStore();
</script>
