import { defineStore } from "pinia";
import { computed, reactive } from "vue";

interface PriceRange {
  min: number | null;
  max: number | null;
}
export interface FiltersState {
  searchQuery: string;
  category: string | null;
  priceRange: PriceRange;
  sortOrder: "asc" | "desc";
}

export const useFilterStore = defineStore("filter", () => {
  // State
  const state: FiltersState = reactive<FiltersState>({
    searchQuery: "",
    priceRange: { min: null, max: null },
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
    state.priceRange = { min: null, max: null };
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
