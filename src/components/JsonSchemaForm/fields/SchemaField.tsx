import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { JsonSchemaForm } from '../JsonSchemaForm';
import type { SchemaFieldProps } from '../types';
import { isNullable, resolveSchemaType } from '../utils';

/**
 * SchemaField - Wraps JsonSchemaForm with field label and metadata
 * Used by ObjectField to render each property with its label
 */
export const SchemaField: Component<SchemaFieldProps> = (props) => {
  const schemaType = () => resolveSchemaType(props.schema) || 'string';
  const nullable = () => isNullable(props.schema);
  const isComplexType = () =>
    schemaType() === 'object' || schemaType() === 'array';
  const isNull = () => props.value === null;

  return (
    <div class="space-y-2">
      {/* Field label and metadata */}
      <div class="flex items-center gap-2 flex-wrap">
        <Show
          when={props.schema.title}
          fallback={
            <span class="font-mono text-sm font-medium text-surface-900 dark:text-surface-100">
              {props.name}
            </span>
          }
        >
          <span class="text-sm font-medium text-surface-900 dark:text-surface-100">
            {props.schema.title}
          </span>
          <span class="font-mono text-xs text-surface-400 dark:text-surface-500">
            {props.name}
          </span>
        </Show>
        <Show when={props.required}>
          <span class="text-rose-500 text-xs font-semibold">required</span>
        </Show>
        <span class="text-xs text-surface-400 dark:text-surface-500">
          {schemaType()}
          {nullable() ? ' | null' : ''}
        </span>
        <Show when={props.schema.format}>
          <span class="text-xs text-surface-400 dark:text-surface-500">
            ({props.schema.format})
          </span>
        </Show>
        {/* Nullable toggle */}
        <Show when={nullable()}>
          <button
            type="button"
            class={`text-xs px-1.5 py-0.5 rounded transition-colors ${
              isNull()
                ? 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-200 font-medium'
                : 'text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300'
            }`}
            onClick={() => {
              if (isNull()) {
                props.onChange(undefined);
              } else {
                props.onChange(null);
              }
            }}
          >
            {isNull() ? 'null ✕' : 'set null'}
          </button>
        </Show>
      </div>

      {/* Description */}
      <Show when={props.schema.description}>
        <p class="text-xs text-surface-400 dark:text-surface-500">
          {props.schema.description}
        </p>
      </Show>

      {/* Field input - hidden when value is null */}
      <Show when={!isNull()}>
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
      </Show>
    </div>
  );
};
