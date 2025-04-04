import { create } from "zustand";
export const usePageStore = create((set) => ({ currentPage: "home", setPage: (page) => set({ currentPage: page }) }));