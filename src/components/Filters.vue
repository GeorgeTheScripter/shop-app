<template>
  <div
    class="text-slate-600 w-[250px] border-slate-600 border-2 h-fit p-4 rounded-xl flex flex-col gap-2 sticky top-20"
  >
    <div>
      <Input
        class="w-full"
        placeholder="Найти"
        v-model="localFilters.searchQuery"
        @input="handleSearch"
      />
    </div>

    <div>
      <h4 class="">Категории:</h4>

      <div class="flex gap-2">
        <input type="checkbox" id="cat_1" />
        <label for="cat_1">Обувь</label>
      </div>

      <div class="flex gap-2">
        <input type="checkbox" id="cat_2" />
        <label for="cat_2">Аксессуары</label>
      </div>
    </div>

    <div>
      <h4 class="">Цена:</h4>

      <div class="flex gap-2">
        <!-- <Input type="number" placeholder="От" class="w-full" />
        <Input type="number" placeholder="До" class="w-full" /> -->
      </div>
    </div>

    <div>
      <h4 class="">Выводить по:</h4>

      <select>
        <option value="8">8</option>
        <option value="8">16</option>
        <option value="8">32</option>
      </select>
    </div>

    <div class="w-full flex flex-col items-center">
      <Button class="w-full" @click="applyFilters">Показать</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from "@/store/filters.store";
import { reactive } from "vue";
import { debounce } from "lodash";

const filterStore = useFilterStore();

const localFilters = reactive({ ...filterStore.state });

const handleSearch = debounce(() => {
  filterStore.updateFilters({ searchQuery: localFilters.searchQuery });
}, 500);

const applyFilters = () => {
  filterStore.updateFilters(localFilters);
};

const handleReset = () => {
  filterStore.resetFilters();
  Object.assign(localFilters, filterStore.state);
};
</script>
