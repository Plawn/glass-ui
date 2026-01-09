import type { Component } from 'solid-js';
import { Checkbox } from '../../Input';
import type { BaseFieldProps } from '../types';

/**
 * Boolean field renderer
 * Renders a checkbox with schema title as label
 */
export const BooleanField: Component<BaseFieldProps> = (props) => {
  return (
    <Checkbox
      checked={props.value === true}
      onChange={(checked) => props.onChange(checked)}
      label={props.schema.title}
    />
  );
};
