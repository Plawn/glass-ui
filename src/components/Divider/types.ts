import type { JSX } from 'solid-js';
import type { BaseComponentProps } from '../../types';

/**
 * Divider orientation
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Position of the label within the divider
 */
export type DividerLabelPosition = 'start' | 'center' | 'end';

/**
 * Line style variant
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends BaseComponentProps {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Optional label/text in the middle of the divider */
  label?: string | JSX.Element;
  /** Position of the label */
  labelPosition?: DividerLabelPosition;
  /** Line style variant */
  variant?: DividerVariant;
}
