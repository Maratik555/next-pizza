import { create } from 'zustand';

interface State {
    activeId: number;
    setActiveId: (activeId: number | undefined) => void;
}

export const useCategoryStore = create<State>((set) => ({
    activeId: 1,
    setActiveId: (activeId) => set({ activeId })
}));