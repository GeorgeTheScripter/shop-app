<template>
  <div class="w-[400px] rounded-xl overflow-hidden border-slate-600 border-2">
    <Splide :options="{ rewind: true }" aria-label="product images">
      <SplideSlide v-for="image in images" :key="image">
        <img :src="image" alt="Sample 1" />
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  images: string[];
}>();
</script>
