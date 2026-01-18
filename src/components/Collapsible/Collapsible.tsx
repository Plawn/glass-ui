import type { Component } from 'solid-js';
import { createSignal, createMemo, createEffect } from 'solid-js';
import type { CollapsibleProps } from './types';

export const Collapsible: Component<CollapsibleProps> = (props) => {
  // Internal state for uncontrolled mode
  const [internalOpen, setInternalOpen] = createSignal(props.defaultOpen ?? false);

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
  const handleToggle = () => {
    if (props.disabled) return;
    const newValue = !isOpen();
    if (!isControlled()) {
      setInternalOpen(newValue);
    }
    props.onOpenChange?.(newValue);
  };

  // Unique ID for accessibility
  const id = `collapsible-${Math.random().toString(36).slice(2, 9)}`;

  const contentStyle = createMemo(() => ({
    'grid-template-rows': isOpen() ? '1fr' : '0fr',
  }));

  return (
    <div class={props.class ?? ''}>
      {/* Trigger wrapper */}
      <div
        role="button"
        tabIndex={props.disabled ? -1 : 0}
        aria-expanded={isOpen()}
        aria-controls={id}
        aria-disabled={props.disabled}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        class={props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      >
        {props.trigger}
      </div>

      {/* Content with CSS grid animation */}
      <div
        id={id}
        class="grid transition-grid-rows"
        style={contentStyle()}
      >
        <div class="overflow-hidden">
          {props.children}
        </div>
      </div>
    </div>
  );
};
