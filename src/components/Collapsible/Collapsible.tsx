import type { Component } from 'solid-js';
import { Show, createEffect, createSignal } from 'solid-js';
import type { CollapsibleProps } from './types';

export const Collapsible: Component<CollapsibleProps> = (props) => {
  // Internal state for uncontrolled mode
  const [internalOpen, setInternalOpen] = createSignal(
    props.defaultOpen ?? false,
  );

  // Determine if controlled
  const isControlled = () => props.open !== undefined;

  // Current open state
  const isOpen = () => (isControlled() ? props.open! : internalOpen());

  // Sync internal state when controlled value changes
  createEffect(() => {
    if (isControlled() && props.open !== undefined) {
      setInternalOpen(props.open);
    }
  });

  // Handle toggle
  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (props.disabled) {
      return;
    }
    const newValue = !isOpen();
    if (!isControlled()) {
      setInternalOpen(newValue);
    }
    props.onOpenChange?.(newValue);
  };

  // Unique ID for accessibility
  const id = `collapsible-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div class={props.class ?? ''}>
      {/* Trigger wrapper - using native button for better event handling */}
      <button
        type="button"
        tabIndex={props.disabled ? -1 : 0}
        aria-expanded={isOpen()}
        aria-controls={id}
        disabled={props.disabled}
        onClick={handleToggle}
        class={`w-full text-left ${props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        {props.trigger}
      </button>

      {/* Content */}
      <Show when={isOpen()}>
        <div
          id={id}
          class="animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
};
