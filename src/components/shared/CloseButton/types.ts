import type { JSX } from 'solid-js';
import type { ComponentSize } from '../../../types';

/**
 * Size variants for the CloseButton component.
 * Uses standard 3-tier scale:
 * - sm: Small close button (w-4 h-4 icon, p-1 padding)
 * - md: Medium close button (w-5 h-5 icon, p-1.5 padding) - default
 * - lg: Large close button (w-6 h-6 icon, p-2 padding)
 */
export type CloseButtonSize = ComponentSize;

export interface CloseButtonProps {
  /** Click handler called when the button is clicked */
  onClick: () => void;

  /** Optional additional CSS classes for positioning or customization */
  class?: string;

  /** Size variant of the close button. Defaults to 'md' */
  size?: CloseButtonSize;

  /** Custom aria-label for accessibility. Defaults to 'Close' */
  'aria-label'?: string;

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Optional custom icon. If not provided, uses the default close icon */
  icon?: JSX.Element;
}
