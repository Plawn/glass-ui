/**
 * JSON Schema type enumeration
 */
export type SchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'array'
  | 'object'
  | 'null';

/**
 * JSON Schema definition for form generation
 */
export interface Schema {
  type?: SchemaType | SchemaType[];
  format?: string;
  title?: string;
  description?: string;
  default?: unknown;
  enum?: unknown[];
  const?: unknown;
  nullable?: boolean;

  // String constraints
  minLength?: number;
  maxLength?: number;
  pattern?: string;

  // Number constraints
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;

  // Array constraints
  items?: Schema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;

  // Object constraints
  properties?: Record<string, Schema>;
  required?: string[];
  additionalProperties?: boolean | Schema;

  // Composition
  allOf?: Schema[];
  anyOf?: Schema[];
  oneOf?: Schema[];
  not?: Schema;

  // Reference (resolved internally)
  $ref?: string;
}

/**
 * Props for the JsonSchemaForm component
 */
export interface JsonSchemaFormProps {
  /** The JSON Schema to render */
  schema: Schema;
  /** Current value */
  value: unknown;
  /** Callback when value changes */
  onChange: (value: unknown) => void;
  /** Whether this field is required */
  required?: boolean;
  /** Path to this field (for nested forms) */
  path?: string[];
}

/**
 * Base props for field components
 */
export interface BaseFieldProps {
  /** The JSON Schema for this field */
  schema: Schema;
  /** Current value */
  value: unknown;
  /** Callback when value changes */
  onChange: (value: unknown) => void;
}

/**
 * Props for object field component
 */
export interface ObjectFieldProps {
  /** The JSON Schema for this object */
  schema: Schema;
  /** Current value */
  value: Record<string, unknown> | undefined;
  /** Callback when value changes */
  onChange: (value: unknown) => void;
  /** Path to this field (for nested forms) */
  path: string[];
}

/**
 * Props for array field component
 */
export interface ArrayFieldProps {
  /** The JSON Schema for this array */
  schema: Schema;
  /** Current value */
  value: unknown[] | undefined;
  /** Callback when value changes */
  onChange: (value: unknown) => void;
  /** Path to this field (for nested forms) */
  path: string[];
}

/**
 * Props for schema field wrapper component
 */
export interface SchemaFieldProps {
  /** Field name */
  name: string;
  /** The JSON Schema for this field */
  schema: Schema;
  /** Current value */
  value: unknown;
  /** Whether this field is required */
  required?: boolean;
  /** Callback when value changes */
  onChange: (value: unknown) => void;
  /** Path to this field (for nested forms) */
  path: string[];
}
