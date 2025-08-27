<template>
  <div
    class="text-slate-600 w-[250px] border-slate-600 border-2 h-fit p-4 rounded-xl flex flex-col gap-2 sticky top-20"
  >
    <div>
      <Input
        class="w-full"
        placeholder="Найти"
        v-model="localState.searchQuery"
        @input="handleSearch"
      />
    </div>

    <div>
      <h4 class="">Категории:</h4>

      <div class="flex flex-col gap-0">
        <div class="flex gap-2" v-for="category in categories" :key="category">
          <input
            type="checkbox"
            :id="category"
            :value="category"
            :checked="localState.category.includes(category)"
            @change="handleChange(category, $event)"
          />
          <label :for="category">{{ category }}</label>
        </div>
      </div>
    </div>

    <div>
      <h4 class="">Цена:</h4>

      <div class="flex gap-2">
        <Input
          type="number"
          placeholder="От"
          class="w-full"
          v-model="localState.priceRange.min"
        />
        <Input
          type="number"
          placeholder="До"
          class="w-full"
          v-model="localState.priceRange.max"
        />
      </div>
    </div>

    <div class="flex gap-2">
      <h4 class="">Выводить по:</h4>

      <select>
        <option value="8">8</option>
        <option value="8">16</option>
        <option value="8">32</option>
      </select>
    </div>

    <div class="w-full flex flex-col items-center gap-2">
      <Button class="w-full" @click="applyFilters">Показать</Button>
      <Button class="w-full" @click="handleReset">Сбросить</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FiltersState, useFilterStore } from "@/store/filters.store";
import { computed, reactive } from "vue";
import { debounce } from "lodash";
import { useProductsStore } from "@/store/products.store";

const filterStore = useFilterStore();
const productStore = useProductsStore();

const categories = computed(() => productStore.categories);

const localState = reactive<FiltersState>({
  category: [] as string[],
  priceRange: { min: null, max: null },
  searchQuery: "",
  sortOrder: "asc",
});

Object.assign(localState, filterStore.state);

const handleSearch = debounce(() => {
  filterStore.updateFilters({ searchQuery: localState.searchQuery });
}, 500);

const applyFilters = () => {
  filterStore.updateFilters({ ...localState });
};

const handleReset = () => {
  filterStore.resetFilters();
  localState.searchQuery = "";
  localState.priceRange = { min: null, max: null };
  localState.category = [];
  localState.sortOrder = "asc";
};

const handleChange = (category: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target) return;

  if (target.checked) {
    if (!localState.category.includes(category)) {
      localState.category.push(category);
    }
  } else {
    const index = localState.category.indexOf(category);
    if (index > -1) {
      localState.category.splice(index, 1);
    }
  }
};
</script>
