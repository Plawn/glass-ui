import { createContext, useContext } from 'solid-js';
import type { ContextMenuContextValue } from './types';

/**
 * Context for sharing state between ContextMenu components
 */
export const ContextMenuContext = createContext<ContextMenuContextValue>();

/**
 * Hook to access ContextMenu context
 * @throws Error if used outside of ContextMenu
 */
export function useContextMenuContext<
  T = unknown,
>(): ContextMenuContextValue<T> {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('ContextMenu components must be used within a ContextMenu');
  }
  return context as ContextMenuContextValue<T>;
}
