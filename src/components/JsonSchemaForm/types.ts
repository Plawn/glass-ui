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
  /** JSON Schema data type(s) for this field */
  type?: SchemaType | SchemaType[];
  /** String format hint (e.g. 'date-time', 'email', 'uri') */
  format?: string;
  /** Human-readable label for the field */
  title?: string;
  /** Longer human-readable description of the field */
  description?: string;
  /** Default value used when the field is absent */
  default?: unknown;
  /** Enumerated set of allowed values */
  enum?: unknown[];
  /** Single allowed constant value */
  const?: unknown;
  /** Whether the field may be null (OpenAPI extension) */
  nullable?: boolean;

  // String constraints
  /** Minimum number of characters for string values */
  minLength?: number;
  /** Maximum number of characters for string values */
  maxLength?: number;
  /** Regular expression the string value must match */
  pattern?: string;

  // Number constraints
  /** Inclusive minimum for numeric values */
  minimum?: number;
  /** Inclusive maximum for numeric values */
  maximum?: number;
  /** Exclusive minimum for numeric values */
  exclusiveMinimum?: number;
  /** Exclusive maximum for numeric values */
  exclusiveMaximum?: number;
  /** Value must be a multiple of this number */
  multipleOf?: number;

  // Array constraints
  /** Schema for each element of an array value */
  items?: Schema;
  /** Minimum number of items in an array value */
  minItems?: number;
  /** Maximum number of items in an array value */
  maxItems?: number;
  /** Whether array items must be unique */
  uniqueItems?: boolean;

  // Object constraints
  /** Schemas for named properties of an object value */
  properties?: Record<string, Schema>;
  /** List of property names that are required */
  required?: string[];
  /** Whether or what schema additional properties must conform to */
  additionalProperties?: boolean | Schema;

  // Composition
  /** Value must be valid against all of the given schemas */
  allOf?: Schema[];
  /** Value must be valid against at least one of the given schemas */
  anyOf?: Schema[];
  /** Value must be valid against exactly one of the given schemas */
  oneOf?: Schema[];
  /** Value must NOT be valid against this schema */
  not?: Schema;

  // Reference (resolved internally)
  /** JSON Schema $ref pointer, resolved internally before rendering */
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
  /** Custom field registry for overriding or extending field rendering */
  fields?: import('./registry').FieldRegistryConfig;
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
