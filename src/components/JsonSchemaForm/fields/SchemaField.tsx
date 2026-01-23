import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { JsonSchemaForm } from '../JsonSchemaForm';
import type { SchemaFieldProps } from '../types';

/**
 * SchemaField - Wraps JsonSchemaForm with field label and metadata
 * Used by ObjectField to render each property with its label
 */
export const SchemaField: Component<SchemaFieldProps> = (props) => {
  const schemaType = () => props.schema.type || 'string';
  const isComplexType = () =>
    schemaType() === 'object' || schemaType() === 'array';

  return (
    <div class="space-y-2">
      {/* Field label and metadata */}
      <div class="flex items-center gap-2">
        <span class="font-mono text-sm font-medium text-surface-900 dark:text-surface-100">
          {props.name}
        </span>
        <Show when={props.required}>
          <span class="text-rose-500 text-xs font-semibold">required</span>
        </Show>
        <span class="text-xs text-surface-400 dark:text-surface-500">
          {schemaType()}
        </span>
        <Show when={props.schema.format}>
          <span class="text-xs text-surface-400 dark:text-surface-500">
            ({props.schema.format})
          </span>
        </Show>
      </div>

      {/* Description */}
      <Show when={props.schema.description}>
        <p class="text-xs text-surface-400 dark:text-surface-500">
          {props.schema.description}
        </p>
      </Show>

      {/* Field input */}
      <Show
        when={isComplexType()}
        fallback={
          <div class="sm:max-w-xs">
            <JsonSchemaForm
              schema={props.schema}
              value={props.value}
              onChange={props.onChange}
              path={props.path}
            />
          </div>
        }
      >
        <JsonSchemaForm
          schema={props.schema}
          value={props.value}
          onChange={props.onChange}
          path={props.path}
        />
      </Show>
    </div>
  );
};
