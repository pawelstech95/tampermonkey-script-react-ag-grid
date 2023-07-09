import { create } from "zustand";
import { Person } from "../types.ts";

interface PeopleStore {
  people: Person[];
  setPeople: (people: Person[]) => void;
}

const usePeopleStore = create<PeopleStore>((set) => ({
  people: [],
  setPeople: (people) => set(() => ({ people })),
}));

export const { getState, setState, subscribe } = usePeopleStore;

export default usePeopleStore;
