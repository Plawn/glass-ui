import type { Component } from 'solid-js';
import { Match, Switch, createMemo } from 'solid-js';
// Direct imports to avoid circular dependency with barrel file
import { ArrayField } from './fields/ArrayField';
import { BooleanField } from './fields/BooleanField';
import { EnumField } from './fields/EnumField';
import { NumberField } from './fields/NumberField';
import { ObjectField } from './fields/ObjectField';
import { OneOfField } from './fields/OneOfField';
import { StringField } from './fields/StringField';
import type { JsonSchemaFormProps } from './types';

// Type guards for safe type narrowing
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

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
export const JsonSchemaForm: Component<JsonSchemaFormProps> = (props) => {
  const schemaType = createMemo(() => {
    const schema = props.schema;
    if (schema.enum && schema.enum.length > 0) {
      return 'enum';
    }
    if (schema.oneOf && schema.oneOf.length > 0) {
      return 'oneOf';
    }
    if (schema.anyOf && schema.anyOf.length > 0) {
      return 'anyOf';
    }
    return schema.type || 'string';
  });

  return (
    <Switch
      fallback={
        <StringField
          schema={props.schema}
          value={props.value}
          onChange={props.onChange}
        />
      }
    >
      <Match when={schemaType() === 'object'}>
        <ObjectField
          schema={props.schema}
          value={isRecord(props.value) ? props.value : undefined}
          onChange={props.onChange}
          path={props.path || []}
        />
      </Match>
      <Match when={schemaType() === 'array'}>
        <ArrayField
          schema={props.schema}
          value={isArray(props.value) ? props.value : undefined}
          onChange={props.onChange}
          path={props.path || []}
        />
      </Match>
      <Match when={schemaType() === 'enum'}>
        <EnumField
          schema={props.schema}
          value={props.value}
          onChange={props.onChange}
        />
      </Match>
      <Match when={schemaType() === 'boolean'}>
        <BooleanField
          schema={props.schema}
          value={props.value}
          onChange={props.onChange}
        />
      </Match>
      <Match when={schemaType() === 'number' || schemaType() === 'integer'}>
        <NumberField
          schema={props.schema}
          value={props.value}
          onChange={props.onChange}
        />
      </Match>
      <Match when={schemaType() === 'string'}>
        <StringField
          schema={props.schema}
          value={props.value}
          onChange={props.onChange}
        />
      </Match>
      <Match when={schemaType() === 'oneOf' || schemaType() === 'anyOf'}>
        <OneOfField
          schema={props.schema}
          value={props.value}
          onChange={props.onChange}
        />
      </Match>
    </Switch>
  );
};
