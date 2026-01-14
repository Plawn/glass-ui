import { type Component, createSignal, createMemo } from 'solid-js';
import type { CollapsibleProps } from './types';

export const Collapsible: Component<CollapsibleProps> = (props) => {
  // Internal state for uncontrolled mode
  const [internalOpen, setInternalOpen] = createSignal(props.defaultOpen ?? false);

  // Determine if component is controlled
  const isControlled = () => props.open !== undefined;

  // Get current open state (controlled or uncontrolled)
  const isOpen = createMemo(() => (isControlled() ? props.open : internalOpen()));

  // Handle toggle
  const handleToggle = () => {
    if (props.disabled) return;

    const newState = !isOpen();

    if (!isControlled()) {
      setInternalOpen(newState);
    }

    props.onOpenChange?.(newState);
  };

  // Unique ID for accessibility
  const id = `collapsible-${Math.random().toString(36).slice(2, 9)}`;

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
        class="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{
          'grid-template-rows': isOpen() ? '1fr' : '0fr',
        }}
      >
        <div class="overflow-hidden">
          {props.children}
        </div>
      </div>
    </div>
  );
};
