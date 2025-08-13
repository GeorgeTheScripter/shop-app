<template>
  <div class="text-xl flex gap-2">
    <router-link to="/" class="text-slate-800">{{ rootName }}</router-link> /
    <p class="text-slate-400">{{ currentName }}</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Crumbs",
});

defineProps<{
  rootName: string;
  currentName: string;
}>();
</script>
