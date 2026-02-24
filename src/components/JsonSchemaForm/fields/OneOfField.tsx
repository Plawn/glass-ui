import type { Component } from 'solid-js';
import { For, Show } from 'solid-js';
import { Textarea } from '../../Input';
import type { BaseFieldProps } from '../types';
import { toDisplayStringJson } from '../utils';

/**
 * Check if all oneOf entries use the const+title pattern (enum-like select).
 */
function isConstEnum(
  schemas: BaseFieldProps['schema']['oneOf'],
): schemas is NonNullable<BaseFieldProps['schema']['oneOf']> {
  if (!schemas || schemas.length === 0) {
    return false;
  }
  return schemas.every((s) => s.const !== undefined);
}

/**
 * Union field renderer (oneOf/anyOf)
 * - Renders a select dropdown when all variants use { const, title }
 * - Falls back to JSON textarea for complex union types
 */
export const OneOfField: Component<BaseFieldProps> = (props) => {
  const variants = () => props.schema.oneOf || props.schema.anyOf || [];

  const constMode = () => isConstEnum(variants());

  // --- const/title select mode ---
  const options = () =>
    variants().map((v) => ({
      value: v.const,
      label: v.title || String(v.const),
    }));

  const selectedIndex = () => {
    const opts = options();
    const idx = opts.findIndex((o) => o.value === props.value);
    return idx >= 0 ? String(idx) : '';
  };

  const handleSelectChange = (indexStr: string) => {
    if (indexStr === '') {
      props.onChange(undefined);
      return;
    }
    const idx = Number.parseInt(indexStr, 10);
    const opt = options()[idx];
    if (opt) {
      props.onChange(opt.value);
    }
  };

  // --- JSON textarea fallback ---
  const stringValue = () => toDisplayStringJson(props.value);

  const handleTextareaChange = (strValue: string) => {
    if (strValue === '') {
      props.onChange(undefined);
      return;
    }
    try {
      props.onChange(JSON.parse(strValue));
    } catch {
      props.onChange(strValue);
    }
  };

  return (
    <Show
      when={constMode()}
      fallback={
        <Textarea
          value={stringValue()}
          onInput={handleTextareaChange}
          placeholder="{}"
          class="h-24 font-mono text-sm"
        />
      }
    >
      <div class="relative overflow-hidden">
        <select
          class="w-full px-3 py-2 sm:py-2.5 glass-input text-sm text-surface-800 dark:text-surface-200 font-medium focus:outline-none cursor-pointer appearance-none pr-9"
          value={selectedIndex()}
          onChange={(e) => handleSelectChange(e.currentTarget.value)}
        >
          <option value="">-- Select --</option>
          <For each={options()}>
            {(opt, index) => <option value={index()}>{opt.label}</option>}
          </For>
        </select>
      </div>
    </Show>
  );
};
