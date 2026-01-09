import type { JSX } from 'solid-js';
import type { Direction, BaseComponentProps } from '../../types';

export interface TooltipProps extends BaseComponentProps {
  /** Tooltip content */
  content: string | JSX.Element;
  /** Trigger element */
  children: JSX.Element;
  /** Position relative to trigger */
  position?: Direction;
  /** Delay before showing (ms) */
  delay?: number;
}

// Re-export shared types for convenience
export type { Direction as TooltipPosition } from '../../types';
