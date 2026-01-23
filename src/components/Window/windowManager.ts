import { createSignal } from 'solid-js';

/** Base z-index for windows */
const BASE_Z_INDEX = 50;

/**
 * Hook to manage z-index for a single window.
 * Uses a simple counter that resets when it gets too high.
 *
 * @example
 * ```tsx
 * const { zIndex, bringToFront } = useWindowZIndex();
 *
 * <Window
 *   zIndex={zIndex()}
 *   onFocus={bringToFront}
 *   ...
 * />
 * ```
 */
export function useWindowZIndex(initialZIndex: number = BASE_Z_INDEX) {
  const [zIndex, setZIndex] = createSignal(initialZIndex);
  const [counter, setCounter] = createSignal(0);

  const bringToFront = () => {
    setCounter((c) => c + 1);
    // Reset if counter gets too high (unlikely but safe)
    const newCounter = counter() > 1000 ? 1 : counter();
    setZIndex(BASE_Z_INDEX + newCounter);
  };

  return {
    zIndex,
    bringToFront,
  };
}

/**
 * Hook to manage multiple windows with automatic z-index ordering.
 *
 * Z-indexes are derived from window order in the stack:
 * - The window at the bottom has z-index = BASE_Z_INDEX
 * - Each window above has z-index = BASE_Z_INDEX + position
 * - The focused window is always at the top
 *
 * This ensures z-indexes stay bounded between BASE_Z_INDEX and BASE_Z_INDEX + windowCount.
 *
 * @example
 * ```tsx
 * const windows = useWindowManager();
 *
 * // Register windows
 * const window1 = windows.register('window1');
 * const window2 = windows.register('window2');
 *
 * <Window
 *   zIndex={window1.zIndex()}
 *   onFocus={window1.focus}
 *   ...
 * />
 * <Window
 *   zIndex={window2.zIndex()}
 *   onFocus={window2.focus}
 *   ...
 * />
 * ```
 */
export function useWindowManager() {
  // Ordered list of window IDs (last = top/focused)
  const [windowOrder, setWindowOrder] = createSignal<string[]>([]);

  /**
   * Get z-index for a window based on its position in the stack
   */
  const getZIndex = (id: string): number => {
    const order = windowOrder();
    const index = order.indexOf(id);
    if (index === -1) {
      return BASE_Z_INDEX;
    }
    return BASE_Z_INDEX + index;
  };

  /**
   * Bring a window to the front of the stack
   */
  const bringToFront = (id: string) => {
    setWindowOrder((order) => {
      const filtered = order.filter((wId) => wId !== id);
      return [...filtered, id];
    });
  };

  /**
   * Register a window and get its controls
   */
  const register = (id: string) => {
    // Add to order if not already present
    setWindowOrder((order) => {
      if (order.includes(id)) {
        return order;
      }
      return [...order, id];
    });

    const zIndex = () => getZIndex(id);

    const focus = () => bringToFront(id);

    const unregister = () => {
      setWindowOrder((order) => order.filter((wId) => wId !== id));
    };

    return {
      /** Current z-index based on stack position */
      zIndex,
      /** Bring this window to the front */
      focus,
      /** Remove this window from the manager */
      unregister,
    };
  };

  return {
    /** Register a new window */
    register,
    /** Get the current window order (for debugging) */
    getOrder: () => windowOrder(),
  };
}
