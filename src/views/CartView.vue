<template>
  <div class="w-full px-4">
    <div class="max-w-[1280px] mx-auto mt-24">
      <div class="flex flex-col gap-12">
        <Crumbs :rootName="'Главная'" :currentName="'Корзина'" />
        <div class="mb-6">
          <h3 class="text-4xl text-slate-600">Оформление заказа</h3>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="flex flex-col gap-2 h-full w-2/3">
            <CartItem
              v-for="cartItem in cartStore.cart"
              :key="cartItem.product.id"
              :cartItem="cartItem"
            />
          </div>

          <div class="w-1/3">
            <form class="flex flex-col gap-2">
              <Input class="w-full" placeholder="Ваше имя" />
              <Input class="w-full" placeholder="Ваш номер" />
              <Input class="w-full" placeholder="Почта" />
              <Input class="w-full" placeholder="Адрес" />
              <div class="flex gap-1 items-start">
                <Input
                  type="checkbox"
                  placeholder="Адрес"
                  id="policy"
                  class="mt-0"
                />
                <label for="policy" class="text-[14px]/[100%]"
                  >Нажимая, я подтверждаю что ознакомлен с политикой
                  конфиденциальности</label
                >
              </div>

              <div class="text-xl flex justify-between">
                <p>Итого:</p>
                <p>{{ cartStore.totalPrice }}$</p>
              </div>

              <Button class="w-full">Оформить</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";
import CartItem from "@/components/CartItem.vue";

const cartStore = useCartStore();
</script>
