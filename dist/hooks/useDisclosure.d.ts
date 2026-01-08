import { Accessor } from 'solid-js';
export interface UseDisclosureReturn {
    /** Whether the disclosure is currently open */
    isOpen: Accessor<boolean>;
    /** Open the disclosure */
    onOpen: () => void;
    /** Close the disclosure */
    onClose: () => void;
    /** Toggle the disclosure state */
    onToggle: () => void;
}
/**
 * Hook for managing open/close state of disclosures like modals, drawers, menus, etc.
 *
 * @param initialState - Initial open state (default: false)
 */
export declare function useDisclosure(initialState?: boolean): UseDisclosureReturn;
//# sourceMappingURL=useDisclosure.d.ts.map