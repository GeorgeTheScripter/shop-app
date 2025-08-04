<template>
  <button
    class="bg-slate-200 text-slate-800 px-6 py-2 rounded-xl cursor-pointer hover:bg-slate-300 font-medium"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: "Button",
});
</script>
