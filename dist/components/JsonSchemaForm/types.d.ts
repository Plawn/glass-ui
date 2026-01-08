/**
 * JSON Schema type enumeration
 */
export type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';
/**
 * JSON Schema definition for form generation
 */
export interface Schema {
    type?: SchemaType;
    format?: string;
    title?: string;
    description?: string;
    default?: unknown;
    enum?: unknown[];
    const?: unknown;
    nullable?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
    items?: Schema;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    properties?: Record<string, Schema>;
    required?: string[];
    additionalProperties?: boolean | Schema;
    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    not?: Schema;
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
//# sourceMappingURL=types.d.ts.map