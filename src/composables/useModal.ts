import { Ref, ref } from "vue";

interface ModalComposable {
  isOpen: Ref<boolean>;
  open: () => void;
  close: () => void;
}

export const useModal = (initialState: boolean = false): ModalComposable => {
  const isOpen = ref<boolean>(initialState);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    open,
    close,
  };
};
