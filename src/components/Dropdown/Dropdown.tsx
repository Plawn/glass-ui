import { type Component, omit } from 'solid-js';
import { Popover } from '../Popover';
import type { DropdownProps } from './types';

/**
 * Dropdown component - a simplified wrapper around Popover
 *
 * For more advanced features like arrows or custom offsets, use Popover directly.
 */
export const Dropdown: Component<DropdownProps> = (props) => {
  const rest = omit(
    props,
    'trigger',
    'placement',
    'open',
    'onOpenChange',
    'class',
    'style',
    'contentClass',
    'scrollBehavior',
    'children',
  );
  return (
    <Popover
      {...rest}
      trigger={props.trigger}
      placement={props.placement ?? 'bottom-start'}
      open={props.open}
      onOpenChange={props.onOpenChange}
      class={props.class}
      style={props.style}
      contentClass={props.contentClass}
      offset={4}
      scrollBehavior={props.scrollBehavior}
    >
      {props.children}
    </Popover>
  );
};
