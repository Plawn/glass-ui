import { type Component, splitProps } from 'solid-js';
import { Popover } from '../Popover';
import type { DropdownProps } from './types';

/**
 * Dropdown component - a simplified wrapper around Popover
 *
 * For more advanced features like arrows or custom offsets, use Popover directly.
 */
export const Dropdown: Component<DropdownProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'trigger',
    'placement',
    'open',
    'onOpenChange',
    'class',
    'style',
    'contentClass',
    'scrollBehavior',
    'children',
  ]);
  return (
    <Popover
      {...rest}
      trigger={local.trigger}
      placement={local.placement ?? 'bottom-start'}
      open={local.open}
      onOpenChange={local.onOpenChange}
      class={local.class}
      style={local.style}
      contentClass={local.contentClass}
      offset={4}
      scrollBehavior={local.scrollBehavior}
    >
      {local.children}
    </Popover>
  );
};
