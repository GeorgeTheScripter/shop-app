import { Ref, ref } from "vue";

interface ModalComposable {
  isOpen: Ref<boolean>;
  open: () => void;
  close: () => void;
}

export interface StorModalComposable extends ModalComposable {
  openModal: () => void;
  toggleModal: () => void;
}

interface ModalOtions {
  checkCondition: () => boolean;
  closeOtherStore: () => void;
}

const useModal = (initialState: boolean = false): ModalComposable => {
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

export const useStoreModal = (options: ModalOtions): StorModalComposable => {
  const { isOpen, open, close } = useModal();

  const openModal = () => {
    if (options.checkCondition()) {
      options.closeOtherStore();
      open();
    }
  };

  const toggleModal = () => {
    isOpen.value ? close() : openModal();
  };

  return {
    isOpen,
    open,
    close,
    openModal,
    toggleModal,
  };
};
