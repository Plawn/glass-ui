import type { JSX } from 'solid-js';
import type {
  BaseComponentProps,
  ChipVariant,
  ComponentSize,
  DisableableProps,
  SemanticColor,
} from '../../types';

/**
 * Chip color - semantic colors without 'info'
 */
export type ChipColor = Exclude<SemanticColor, 'info'>;

export interface ChipProps extends BaseComponentProps, DisableableProps {
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
