import type { BaseComponentProps } from '../../types';

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
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface JsonNodeProps {
  keyName?: string;
  value: JsonValue;
  depth: number;
  initialExpandDepth: number;
  isLast: boolean;
}
