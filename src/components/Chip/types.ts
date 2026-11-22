import type { JSX } from '@solidjs/web';

import type {
  ChipVariant,
  ComponentSize,
  DisableableProps,
  SemanticColor,
} from '../../types';

/**
 * Chip color - semantic colors without 'info'
 */
export type ChipColor = Exclude<SemanticColor, 'info'>;

export interface ChipProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    DisableableProps {
  /** Chip content */
  children: JSX.Element;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
  /** Visual variant */
  variant?: ChipVariant;
  /** Color theme */
  color?: ChipColor;
  /** Chip size */
  size?: ComponentSize;
}

// Re-export shared types for convenience
export type { ChipVariant, ComponentSize as ChipSize } from '../../types';
