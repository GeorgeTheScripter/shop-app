<script setup lang="ts">
import Header from "@/components/Header.vue";
import ProductsList from "./components/ProductsList.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="flex flex-col">
    <Header />

    <div class="w-[1280px] mx-auto mt-12 mb-6">
      <h3 class="text-4xl text-slate-600">Our products</h3>
    </div>

    <ProductsList />

    <div class="mt-24">
      <Footer />
    </div>
  </div>
</template>
