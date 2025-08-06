<template>
  <div
    class="p-2 rounded-xl flex justify-between w-lg items-center bg-white border-slate-600 border-2"
  >
    <div class="flex gap-3 items-center">
      <div
        :style="`background-image: url('${cartItem.product.image}')`"
        class="h-[40px] w-[40px] bg-center bg-contain bg-no-repeat"
      ></div>
      <div class="max-w-[280px] flex-1 overflow-hidden">
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
        <button @click="decrementCount">-</button>
        {{ cartItem.quantity }}
        <button @click="incrementCount">+</button>
      </div>

      <Button @click="removeFromCart(cartItem.product)">Delete</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import { CartItem, Product } from "@/types";

const props = defineProps<{
  cartItem: CartItem;
}>();

const cartStore = useCartStore();

const removeFromCart = (product: Product) => {
  cartStore.removeFromCart(product);
};

const incrementCount = () => {
  cartStore.addToCart(props.cartItem.product);
};

const decrementCount = () => {
  if (props.cartItem.quantity > 1) {
    props.cartItem.quantity -= 1;
  } else {
    cartStore.removeFromCart(props.cartItem.product);
  }
};
</script>
