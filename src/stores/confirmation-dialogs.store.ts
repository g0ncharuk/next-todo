import { create } from "zustand";

type ConfirmationDialogOptions = {
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    allowMessage?: boolean;
    onConfirm?: (message?: string) => void;
};

type ConfirmationStore = {
    isOpen: boolean;
    options: ConfirmationDialogOptions;
    openDialog: (options: ConfirmationDialogOptions) => void;
    closeDialog: () => void;
    confirm: () => void;
};

export const useConfirmationDialogStore = create<ConfirmationStore>(
    (set, get) => ({
        isOpen: false,
        options: {},
        message: "",
        openDialog: (options) => set({ isOpen: true, options }),
        closeDialog: () => set({ isOpen: false, options: {} }),
        confirm: () => {
            const { options } = get();
            options.onConfirm?.();
            get().closeDialog();
        },
    })
);
