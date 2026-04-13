import { create } from "zustand";

const useSearchStore = create((set) => ({
  results: [],

  setResults: (results) => set({ results }),
}));

export default useSearchStore;