import { Component } from 'solid-js';
import { JsonSchemaFormProps } from './types';
/**
 * JsonSchemaForm - A recursive JSON Schema form renderer for SolidJS
 *
 * Supports:
 * - Primitive types: string, number, integer, boolean
 * - Complex types: object, array
 * - Enums
 * - Union types (oneOf, anyOf)
 * - Required fields validation
 * - Nested objects and arrays
 *
 * @example
 * ```tsx
 * <JsonSchemaForm
 *   schema={{ type: 'object', properties: { name: { type: 'string' } } }}
 *   value={formData()}
 *   onChange={setFormData}
 * />
 * ```
 */
export declare const JsonSchemaForm: Component<JsonSchemaFormProps>;
//# sourceMappingURL=JsonSchemaForm.d.ts.map