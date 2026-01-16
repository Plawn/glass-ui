import type { Component } from 'solid-js';
import { createMemo } from 'solid-js';
import { useControlled } from '../../hooks';
import type { CollapsibleProps } from './types';

export const Collapsible: Component<CollapsibleProps> = (props) => {
  // Controlled/uncontrolled state management
  const [isOpen, setIsOpen] = useControlled({
    value: () => props.open,
    defaultValue: props.defaultOpen ?? false,
    onChange: props.onOpenChange,
  });

  // Handle toggle
  const handleToggle = () => {
    if (props.disabled) return;
    setIsOpen(!isOpen());
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
        class="grid transition-[grid-template-rows] duration-200 ease-out"
        style={contentStyle()}
      >
        <div class="overflow-hidden">
          {props.children}
        </div>
      </div>
    </div>
  );
};
