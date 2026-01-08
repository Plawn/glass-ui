import { Accessor } from 'solid-js';
export interface UseDialogStateOptions {
    open: Accessor<boolean>;
    onClose: () => void;
    closeOnEscape?: Accessor<boolean>;
    closeOnBackdrop?: Accessor<boolean>;
}
export interface UseDialogStateReturn {
    /** Whether clicking backdrop should close the dialog */
    shouldCloseOnBackdrop: Accessor<boolean>;
    /** Handler for backdrop click events */
    handleBackdropClick: (e: MouseEvent, targetCheck?: (e: MouseEvent) => boolean) => void;
}
/**
 * Shared dialog state management for Modal and Drawer components.
 * Handles escape key, body scroll prevention, and backdrop clicks.
 */
export declare function useDialogState(options: UseDialogStateOptions): UseDialogStateReturn;
//# sourceMappingURL=useDialogState.d.ts.map