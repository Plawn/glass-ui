import type { JSX } from 'solid-js';

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface JsonValueContext {
  /** Primitive type name or 'array' / 'object' */
  type: string;
  /** Key name of this value within its parent object */
  keyName?: string;
  /** Nesting depth of this value (root = 0) */
  depth: number;
  /** Full path from root to this value */
  path: (string | number)[];
}

export type JsonValueRenderer = (
  value: JsonValue,
  context: JsonValueContext,
) => JSX.Element | null | undefined | false;

export interface JsonViewerProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
  /** Key name of this node within its parent object */
  keyName?: string;
  /** The JSON value to render */
  value: JsonValue;
  /** Current nesting depth (root = 0) */
  depth: number;
  /** Depth up to which nodes are expanded on initial render */
  initialExpandDepth: number;
  /** Whether this node is the last sibling (controls trailing comma) */
  isLast: boolean;
  /** Custom value renderers forwarded from JsonViewerProps */
  valueRenderers?: JsonValueRenderer[];
  /** Full path from root to this node */
  path: (string | number)[];
}
