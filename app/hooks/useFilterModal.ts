import { create } from 'zustand';

interface FilterModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useFilterModal = create<FilterModalState>(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useFilterModal;
