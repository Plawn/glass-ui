import type { Component } from 'solid-js';
import { For, Show } from 'solid-js';
import { Checkbox } from '../../Input';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from '../../shared/icons';
import type { ArrayFieldProps, BaseFieldProps, Schema } from '../types';
import { getDefaultValue, resolveSchemaType } from '../utils';

// Forward declaration - will import the main component
import { JsonSchemaForm } from '../JsonSchemaForm';

/**
 * Check if items schema uses oneOf with const values (multi-select enum pattern).
 * e.g. items: { oneOf: [{ const: 1, title: "Option A" }, { const: 2, title: "Option B" }] }
 */
function isConstEnumItems(items: Schema): boolean {
  if (!items.oneOf || items.oneOf.length === 0) {
    return false;
  }
  return items.oneOf.every((opt) => opt.const !== undefined);
}

/**
 * Primitive array item renderer - delegates to JsonSchemaForm for registry support
 */
const PrimitiveArrayItem: Component<BaseFieldProps & { path?: string[] }> = (
  props,
) => (
  <JsonSchemaForm
    schema={props.schema}
    value={props.value}
    onChange={props.onChange}
    path={props.path}
  />
);

/**
 * Array field renderer with add/remove/reorder functionality
 */
export const ArrayField: Component<ArrayFieldProps> = (props) => {
  const currentValue = () => props.value || [];
  const itemSchema = () => props.schema.items || { type: 'string' };

  const addItem = () => {
    const newItem = getDefaultValue(itemSchema());
    props.onChange([...currentValue(), newItem]);
  };

  const removeItem = (index: number) => {
    const newArray = currentValue().filter((_, i) => i !== index);
    props.onChange(newArray.length > 0 ? newArray : undefined);
  };

  const updateItem = (index: number, itemValue: unknown) => {
    const newArray = [...currentValue()];
    newArray[index] = itemValue;
    props.onChange(newArray);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= currentValue().length) {
      return;
    }
    const newArray = [...currentValue()];
    const [item] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, item);
    props.onChange(newArray);
  };

  const isPrimitive = () => {
    const type = resolveSchemaType(itemSchema());
    return (
      type === 'string' ||
      type === 'number' ||
      type === 'integer' ||
      type === 'boolean'
    );
  };

  /** Whether items use oneOf with const values (renders as checkbox group) */
  const isCheckboxGroup = () => isConstEnumItems(itemSchema());

  /** Get the const/title options for checkbox group rendering */
  const constOptions = () => {
    const items = itemSchema();
    if (!items.oneOf) {
      return [];
    }
    return items.oneOf.map((opt) => ({
      value: opt.const,
      label: opt.title || String(opt.const),
    }));
  };

  /** Toggle a const value in the array */
  const toggleValue = (value: unknown) => {
    const current = currentValue();
    const exists = current.some((v) => v === value);
    if (exists) {
      const newArray = current.filter((v) => v !== value);
      props.onChange(newArray.length > 0 ? newArray : undefined);
    } else {
      props.onChange([...current, value]);
    }
  };

  return (
    <div class="space-y-3">
      <Show
        when={!isCheckboxGroup()}
        fallback={
          /* Checkbox group for oneOf const pattern */
          <div class="space-y-1.5">
            <For each={constOptions()}>
              {(option) => (
                <Checkbox
                  checked={currentValue().some((v) => v === option.value)}
                  onChange={() => toggleValue(option.value)}
                  label={option.label}
                />
              )}
            </For>
          </div>
        }
      >
        {/* Array items */}
        <For each={currentValue()}>
          {(item, index) => (
            <div class="glass-card rounded-xl p-3 sm:p-4">
              {/* Item header with controls */}
              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-medium text-surface-500 dark:text-surface-400">
                    Item {index() + 1}
                  </span>
                  <Show when={resolveSchemaType(itemSchema())}>
                    <span class="text-xs text-surface-400 dark:text-surface-500">
                      ({resolveSchemaType(itemSchema())})
                    </span>
                  </Show>
                </div>
                <div class="flex items-center gap-1 self-end sm:self-auto">
                  {/* Move up button */}
                  <button
                    type="button"
                    onClick={() => moveItem(index(), index() - 1)}
                    disabled={index() === 0}
                    class="glass-icon-btn"
                    title="Move up"
                  >
                    <ChevronUpIcon class="w-4 h-4" />
                  </button>
                  {/* Move down button */}
                  <button
                    type="button"
                    onClick={() => moveItem(index(), index() + 1)}
                    disabled={index() === currentValue().length - 1}
                    class="glass-icon-btn"
                    title="Move down"
                  >
                    <ChevronDownIcon class="w-4 h-4" />
                  </button>
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeItem(index())}
                    class="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                    title="Remove item"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item content */}
              <Show
                when={isPrimitive()}
                fallback={
                  <JsonSchemaForm
                    schema={itemSchema()}
                    value={item}
                    onChange={(v) => updateItem(index(), v)}
                    path={[...props.path, String(index())]}
                  />
                }
              >
                <PrimitiveArrayItem
                  schema={itemSchema()}
                  value={item}
                  onChange={(v) => updateItem(index(), v)}
                  path={[...props.path, String(index())]}
                />
              </Show>
            </div>
          )}
        </For>

        {/* Add item button */}
        <button
          type="button"
          onClick={addItem}
          class="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 hover:border-surface-300 dark:hover:border-surface-600 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors flex items-center justify-center gap-2"
        >
          <PlusIcon class="w-4 h-4" />
          Add item
        </button>
      </Show>

      {/* Constraints hint */}
      <Show
        when={
          props.schema.minItems !== undefined ||
          props.schema.maxItems !== undefined
        }
      >
        <div class="text-xs text-surface-400 dark:text-surface-500">
          <Show when={props.schema.minItems !== undefined}>
            Min items: {props.schema.minItems}
          </Show>
          <Show
            when={
              props.schema.minItems !== undefined &&
              props.schema.maxItems !== undefined
            }
          >
            {' | '}
          </Show>
          <Show when={props.schema.maxItems !== undefined}>
            Max items: {props.schema.maxItems}
          </Show>
        </div>
      </Show>
    </div>
  );
};
