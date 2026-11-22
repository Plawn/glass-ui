import type { Component } from 'solid-js';
import { omit } from 'solid-js';
import { SEMANTIC_COLORS_FILLED, getFilledClasses } from '../../constants';
import type { BadgeProps, BadgeSize } from './types';

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[0.625rem]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

export const Badge: Component<BadgeProps> = (props) => {
  const rest = omit(props, 'variant', 'size', 'class', 'children');
  const variant = () => props.variant ?? 'default';
  const size = () => props.size ?? 'md';

  const variantStyle = () =>
    getFilledClasses(SEMANTIC_COLORS_FILLED[variant()]);

  return (
    <span
      {...rest}
      class={`inline-flex items-center font-semibold rounded-md ${sizeStyles[size()]} ${variantStyle()} ${props.class ?? ''}`}
    >
      {props.children}
    </span>
  );
};
