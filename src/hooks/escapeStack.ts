/**
 * Global stack of active Escape handlers.
 *
 * Overlays (Modal, Dialog, Drawer, Sheet, Popover, ContextMenu, Window, ...)
 * register a handler while they are open. When Escape is pressed only the
 * top-most (most recently registered) handler runs, so a Dialog opened from a
 * Drawer closes the Dialog without also closing the Drawer.
 */

export interface EscapeKeyEventLike {
  key: string;
  defaultPrevented?: boolean;
  isComposing?: boolean;
}

interface EscapeEntry {
  id: number;
  onEscape: () => void;
}

const stack: EscapeEntry[] = [];
let nextId = 0;
let listening = false;

/**
 * Runs the top-most Escape handler for the given keyboard event.
 * Returns true when a handler ran.
 *
 * Events already handled by a descendant (`defaultPrevented`, e.g. an
 * Autocomplete closing its listbox) and IME composition are ignored.
 */
export function dispatchEscape(event: EscapeKeyEventLike): boolean {
  if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) {
    return false;
  }
  const top = stack[stack.length - 1];
  if (!top) {
    return false;
  }
  top.onEscape();
  return true;
}

const handleKeyDown = (e: KeyboardEvent) => {
  dispatchEscape(e);
};

function syncListener(): void {
  if (typeof document === 'undefined') {
    return;
  }
  if (stack.length > 0 && !listening) {
    document.addEventListener('keydown', handleKeyDown);
    listening = true;
  } else if (stack.length === 0 && listening) {
    document.removeEventListener('keydown', handleKeyDown);
    listening = false;
  }
}

/**
 * Pushes an Escape handler on top of the stack.
 * Returns a function removing it (wherever it is in the stack).
 */
export function pushEscapeHandler(onEscape: () => void): () => void {
  const id = nextId++;
  stack.push({ id, onEscape });
  syncListener();
  return () => {
    const index = stack.findIndex((entry) => entry.id === id);
    if (index !== -1) {
      stack.splice(index, 1);
    }
    syncListener();
  };
}

/** Number of registered Escape handlers (mainly for tests). */
export function escapeStackSize(): number {
  return stack.length;
}
