export interface UseCopyToClipboardReturn {
    copied: () => boolean;
    copy: (text: string) => Promise<boolean>;
}
/**
 * Hook for copying text to clipboard with a "copied" state indicator.
 * The copied state resets to false after the specified duration.
 *
 * @param resetDelay - Time in ms before copied state resets (default: 2000)
 */
export declare function useCopyToClipboard(resetDelay?: number): UseCopyToClipboardReturn;
//# sourceMappingURL=useCopyToClipboard.d.ts.map