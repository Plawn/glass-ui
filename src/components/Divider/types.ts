import type { JSX } from 'solid-js';

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

// Uses HTMLElement (not HTMLDivElement) because the root may render as
// <div> or <hr> depending on orientation/label. `ref` is omitted since the
// concrete element type is ambiguous across branches.
export interface DividerProps
  extends Omit<JSX.HTMLAttributes<HTMLElement>, 'ref'> {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Optional label/text in the middle of the divider */
  label?: string | JSX.Element;
  /** Position of the label */
  labelPosition?: DividerLabelPosition;
  /** Line style variant */
  variant?: DividerVariant;
}
