import type { Component } from 'solid-js';
import { splitProps } from 'solid-js';
import { SEMANTIC_COLORS_FILLED, getFilledClasses } from '../../constants';
import type { BadgeProps, BadgeSize } from './types';

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[0.625rem]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

export const Badge: Component<BadgeProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'variant',
    'size',
    'class',
    'children',
  ]);
  const variant = () => local.variant ?? 'default';
  const size = () => local.size ?? 'md';

  const variantStyle = () =>
    getFilledClasses(SEMANTIC_COLORS_FILLED[variant()]);

  return (
    <span
      {...rest}
      class={`inline-flex items-center font-semibold rounded-md ${sizeStyles[size()]} ${variantStyle()} ${local.class ?? ''}`}
    >
      {local.children}
    </span>
  );
};
