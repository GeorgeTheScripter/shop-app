<template>
  <input
    type="text"
    :value="modelValue"
    @input="updateInput"
    class="bg-slate-200 w-fit p-2 outline-0 rounded-xl"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: "Input",
});

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
