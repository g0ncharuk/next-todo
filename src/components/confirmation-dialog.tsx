"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useConfirmationDialogStore } from "@/stores/confirmation-dialogs.store";

export function ConfirmationDialog() {
    const { isOpen, options, closeDialog, confirm } =
        useConfirmationDialogStore();

    return (
        <AlertDialog open={isOpen} onOpenChange={closeDialog}>
            <AlertDialogContent className="max-w-[300px] md:max-w-[500px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {options.title || "Confirm Action"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-inherit">
                        {options.description ||
                            "Are you sure you want to proceed?"}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {options.cancelLabel || "Cancel"}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={confirm}>
                        {options.confirmLabel || "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
