import { create } from "zustand";

const useDataStore = create((set) => ({
  dataArray: [],
  setDataArray: (newDataArray) => set({ dataArray: newDataArray }),
}));

export default useDataStore;
