import type { Schema, SchemaType } from './types';

/**
 * Resolve the primary (non-null) type from a schema.
 * Handles both `type: "string"` and `type: ["string", "null"]`.
 */
export function resolveSchemaType(schema: Schema): SchemaType | undefined {
  const type = schema.type;
  if (!type) {
    return undefined;
  }
  if (Array.isArray(type)) {
    return type.find((t) => t !== 'null') as SchemaType | undefined;
  }
  return type;
}

/**
 * Check if a schema allows null values.
 * True when `type` includes `"null"` or `nullable` is true.
 */
export function isNullable(schema: Schema): boolean {
  if (schema.nullable) {
    return true;
  }
  if (Array.isArray(schema.type)) {
    return schema.type.includes('null');
  }
  return false;
}

/**
 * Convert a value to a display string, handling null/undefined.
 * Useful for form inputs that need string values.
 */
export function toDisplayString(value: unknown): string {
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
}

/**
 * Convert a value to a display string, with JSON formatting for objects.
 * Useful for complex form inputs.
 */
export function toDisplayStringJson(value: unknown, indent = 2): string {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, indent);
  }
  return String(value);
}

/**
 * Get default value for a schema type
 */
export function getDefaultValue(schema: Schema): unknown {
  if (schema.default !== undefined) {
    return schema.default;
  }

  const type = resolveSchemaType(schema) || 'string';
  switch (type) {
    case 'string':
      return '';
    case 'number':
    case 'integer':
      return 0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      if (schema.properties) {
        const obj: Record<string, unknown> = {};
        const required = schema.required || [];
        for (const [key, propSchema] of Object.entries(schema.properties)) {
          if (required.includes(key)) {
            obj[key] = getDefaultValue(propSchema);
          }
        }
        return obj;
      }
      return {};
    default:
      return undefined;
  }
}
