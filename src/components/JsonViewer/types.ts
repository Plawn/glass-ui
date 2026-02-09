import type { JSX } from 'solid-js';
import type { BaseComponentProps } from '../../types';

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface JsonValueContext {
  type: string;
  keyName?: string;
  depth: number;
  path: (string | number)[];
}

export type JsonValueRenderer = (
  value: JsonValue,
  context: JsonValueContext,
) => JSX.Element | null | undefined | false;

export interface JsonViewerProps extends BaseComponentProps {
  /** The JSON data to display */
  data: unknown;
  /** Maximum height of the viewer (default: '31.25rem') */
  maxHeight?: string;
  /** Initial expand depth (default: 2) */
  initialExpandDepth?: number;
  /** Label for the copy button (default: 'Copy') */
  copyLabel?: string;
  /** Label shown after copying (default: 'Copied') */
  copiedLabel?: string;
  /** Tooltip for expand all button (default: 'Expand all') */
  expandAllLabel?: string;
  /** Tooltip for collapse all button (default: 'Collapse all') */
  collapseAllLabel?: string;
  /** Custom value renderers tried in order; first non-null result wins */
  valueRenderers?: JsonValueRenderer[];
}

export interface JsonNodeProps {
  keyName?: string;
  value: JsonValue;
  depth: number;
  initialExpandDepth: number;
  isLast: boolean;
  valueRenderers?: JsonValueRenderer[];
  path: (string | number)[];
}
