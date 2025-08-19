<template>
  <select
    :value="modelValue"
    @change="handleChange"
    name="select"
    id="select"
    class="bg-slate-200 rounded-xl px-2 outline-0"
  >
    <option disabled>Сортировка по:</option>

    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { SortType, Option, DisplayCount } from "@/types";

defineOptions({
  name: "Select",
});

defineProps<{
  modelValue: SortType | number;
  options: Array<Option | DisplayCount>;
}>();

const emit = defineEmits<{ "update:modelValue": [value: SortType] }>();

const handleChange = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLSelectElement).value as SortType);
};
</script>
