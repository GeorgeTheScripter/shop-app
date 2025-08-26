import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export interface FiltersState {
  searchQuery: string;
  category: string | null;
  sortOrder: "asc" | "desc";
}

export const useFilterStore = defineStore("filter", () => {
  // State
  const state: FiltersState = reactive<FiltersState>({
    searchQuery: "",
    category: null,
    sortOrder: "asc",
  });

  // Getters
  const hasActiveFilters = computed(() => {
    return state.searchQuery !== "" || state.category !== null;
  });

  // Actions
  const updateFilters = (newFilters: Partial<FiltersState>) => {
    Object.assign(state, newFilters);
  };

  const resetFilters = () => {
    state.searchQuery = "";
    state.category = null;
    state.sortOrder = "asc";
  };

  return {
    // State
    state,

    // Getters
    hasActiveFilters,

    // Actions
    updateFilters,
    resetFilters,
  };
});
