import { Schema } from './types';
/**
 * Convert a value to a display string, handling null/undefined.
 * Useful for form inputs that need string values.
 */
export declare function toDisplayString(value: unknown): string;
/**
 * Convert a value to a display string, with JSON formatting for objects.
 * Useful for complex form inputs.
 */
export declare function toDisplayStringJson(value: unknown, indent?: number): string;
/**
 * Get default value for a schema type
 */
export declare function getDefaultValue(schema: Schema): unknown;
//# sourceMappingURL=utils.d.ts.map