<template>
  <div class="flex flex-col">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>
