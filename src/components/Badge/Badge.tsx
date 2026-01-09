import type { Component } from 'solid-js';
import {
  SEMANTIC_COLORS_FILLED,
  HTTP_METHOD_COLORS,
  getFilledClasses,
  type SemanticColor,
  type HttpMethodColor,
} from '../../constants';
import type { BadgeProps, BadgeSize, BadgeVariant } from './types';

/** Map badge variants to semantic color keys */
const variantToColor: Record<Exclude<BadgeVariant, 'method'>, SemanticColor> = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[0.625rem]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

export const Badge: Component<BadgeProps> = (props) => {
  const variant = () => props.variant ?? 'default';
  const size = () => props.size ?? 'md';

  const getVariantStyle = () => {
    if (variant() === 'method' && props.method) {
      const methodColor = HTTP_METHOD_COLORS[props.method as HttpMethodColor];
      return getFilledClasses(methodColor);
    }
    const colorKey = variantToColor[variant() as Exclude<BadgeVariant, 'method'>];
    return getFilledClasses(SEMANTIC_COLORS_FILLED[colorKey]);
  };

  return (
    <span
      class={`inline-flex items-center font-semibold rounded-md ${sizeStyles[size()]} ${getVariantStyle()} ${props.class ?? ''}`}
    >
      {props.children}
    </span>
  );
};
