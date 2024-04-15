// SharedStore.js
import { create } from "zustand";

export const useSharedStore = create((set) => ({
  Variable: null,
  Variety: null,
  Unit: null,
  Value: null,
  Message: null,
  updateVariable: (newValue) => set({ Variable: newValue }),
  updateVariety: (newValue) => set({ Variety: newValue }),
  updateUnit: (newValue) => set({ Unit: newValue }),
  updateValue: (newValue) => set({ Value: newValue }),
  updateMessage: (newValue) => set({ Message: newValue }),
}));

export default useSharedStore;
