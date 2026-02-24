import type { Component } from 'solid-js';
import type { BaseFieldProps } from '../types';
import { resolveSchemaType, toDisplayString } from '../utils';

/**
 * Number/Integer field renderer
 * Handles parsing and validation of numeric input.
 * Applies min/max/step constraints from the schema.
 */
export const NumberField: Component<BaseFieldProps> = (props) => {
  const stringValue = () => toDisplayString(props.value);
  const isInteger = () => resolveSchemaType(props.schema) === 'integer';

  const handleChange = (strValue: string) => {
    if (strValue === '') {
      props.onChange(undefined);
      return;
    }
    const num = Number(strValue);
    if (!Number.isNaN(num)) {
      props.onChange(isInteger() ? Math.round(num) : num);
    }
  };

  const step = () => {
    if (props.schema.multipleOf !== undefined) {
      return props.schema.multipleOf;
    }
    if (isInteger()) {
      return 1;
    }
    return undefined;
  };

  const min = () => props.schema.minimum ?? props.schema.exclusiveMinimum;
  const max = () => props.schema.maximum ?? props.schema.exclusiveMaximum;

  return (
    <input
      type="number"
      class="w-full px-3 py-2 sm:py-2.5 glass-input text-sm text-surface-900 dark:text-surface-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      value={stringValue()}
      placeholder={props.schema.default?.toString() || '0'}
      min={min()}
      max={max()}
      step={step()}
      onInput={(e) => handleChange(e.currentTarget.value)}
    />
  );
};
