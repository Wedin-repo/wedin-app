import { create } from 'zustand';

interface RegisterModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useRegisterModal = create<RegisterModalState>(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useRegisterModal;
