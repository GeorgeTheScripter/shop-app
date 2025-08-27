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
        <div class="flex gap-2">
          <input type="checkbox" id="cat_1" />
          <label for="cat_1">Обувь</label>
        </div>

        <div class="flex gap-2">
          <input type="checkbox" id="cat_2" />
          <label for="cat_2">Аксессуары</label>
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
import { reactive } from "vue";
import { debounce } from "lodash";

const filterStore = useFilterStore();

const localFilters = reactive({ ...filterStore.state });

const localState = reactive<FiltersState>({
  category: "",
  priceRange: { min: null, max: null },
  searchQuery: "",
  sortOrder: "asc",
});

const handleSearch = debounce(() => {
  filterStore.updateFilters({ searchQuery: localFilters.searchQuery });
}, 500);

const applyFilters = () => {
  localFilters.searchQuery = localState.searchQuery;
  localFilters.priceRange.min = localState.priceRange.min;
  localFilters.priceRange.max = localState.priceRange.max;
  filterStore.updateFilters(localFilters);
};

const handleReset = () => {
  filterStore.resetFilters();
  localState.searchQuery = "";
  Object.assign(localFilters, filterStore.state);
};
</script>
