import { create } from "zustand";
import { Developer } from "../types.ts";

interface DevelopersStore {
  developers: Developer[];
  setDeveloper: (developer: Developer[]) => void;
}

const useDeveloperStore = create<DevelopersStore>((set) => ({
  developers: [],
  setDeveloper: (developers) => set(() => ({ developers })),
}));

export const { getState, setState, subscribe } = useDeveloperStore;

export default useDeveloperStore;
