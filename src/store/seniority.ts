import { create } from "zustand";
import { Seniority } from "../types.ts";

interface SeniorityStore {
  senioritis: Seniority[];
  setSenioritis: (senioritis: Seniority[]) => void;
}

const useSeniorityStore = create<SeniorityStore>((set) => ({
  senioritis: [],
  setSenioritis: (senioritis) => set(() => ({ senioritis })),
}));

export const { getState, setState, subscribe } = useSeniorityStore;

export default useSeniorityStore;
