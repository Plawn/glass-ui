import type { Component } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import {
  GAP_SIZES,
  ICON_SIZES_SMALL,
  INLINE_PADDING,
  SEMANTIC_COLORS_FILLED,
  SEMANTIC_COLORS_OUTLINED,
  type SemanticColor,
  TEXT_SIZES,
  getFilledClasses,
  getOutlinedClasses,
} from '../../constants';
import { CloseIcon } from '../shared/icons';
import type { ChipColor, ChipProps, ChipSize } from './types';

const sizeStyles: Record<ChipSize, { container: string; icon: string }> = {
  sm: {
    container: `${INLINE_PADDING.sm} ${TEXT_SIZES.sm} gap-1`,
    icon: ICON_SIZES_SMALL.sm,
  },
  md: {
    container: `${INLINE_PADDING.md} ${TEXT_SIZES.md} ${GAP_SIZES.sm}`,
    icon: ICON_SIZES_SMALL.md,
  },
  lg: {
    container: `${INLINE_PADDING.lg} ${TEXT_SIZES.lg} ${GAP_SIZES.md}`,
    icon: ICON_SIZES_SMALL.lg,
  },
};

/** Map chip colors to semantic color keys */
const chipColorToSemantic: Record<ChipColor, SemanticColor> = {
  default: 'default',
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export const Chip: Component<ChipProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'variant',
    'color',
    'size',
    'disabled',
    'onRemove',
    'children',
    'class',
  ]);
  const variant = () => local.variant ?? 'filled';
  const color = () => local.color ?? 'default';
  const size = () => local.size ?? 'md';
  const styles = () => sizeStyles[size()];

  const getColorStyle = () => {
    // Default color uses special glass-button class for filled variant
    if (color() === 'default' && variant() === 'filled') {
      return 'glass-button';
    }

    const semanticColor = chipColorToSemantic[color()];
    if (variant() === 'filled') {
      return getFilledClasses(SEMANTIC_COLORS_FILLED[semanticColor], true);
    }
    return getOutlinedClasses(SEMANTIC_COLORS_OUTLINED[semanticColor]);
  };

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    local.onRemove?.();
  };

  return (
    <span
      {...rest}
      class={`inline-flex items-center rounded-full font-medium transition-all ${styles().container} ${getColorStyle()} ${local.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${local.class ?? ''}`}
    >
      {local.children}
      <Show when={local.onRemove && !local.disabled}>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors -mr-0.5"
          onClick={handleRemove}
          aria-label="Remove"
        >
          <CloseIcon class={styles().icon} />
        </button>
      </Show>
    </span>
  );
};
