import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { Input, Textarea } from '../../Input';
import type { BaseFieldProps } from '../types';
import { toDisplayString } from '../utils';

/** Map JSON Schema format to HTML input type */
const FORMAT_TO_INPUT_TYPE: Record<string, string> = {
  email: 'email',
  'idn-email': 'email',
  uri: 'url',
  'uri-reference': 'url',
  password: 'password',
  tel: 'tel',
};

/**
 * String field renderer
 * Renders either a text input or textarea based on format/maxLength.
 * Maps schema format to HTML input types and applies string constraints.
 */
export const StringField: Component<BaseFieldProps> = (props) => {
  const stringValue = () => toDisplayString(props.value);

  const isMultiline = () => {
    const format = props.schema.format;
    return (
      format === 'textarea' ||
      (props.schema.maxLength && props.schema.maxLength > 200)
    );
  };

  const inputType = () => {
    const format = props.schema.format;
    if (!format) {
      return 'text';
    }
    return FORMAT_TO_INPUT_TYPE[format] || 'text';
  };

  return (
    <Show
      when={isMultiline()}
      fallback={
        <Input
          value={stringValue()}
          onInput={(v) => props.onChange(v || undefined)}
          placeholder={props.schema.default?.toString() || ''}
          type={inputType() as 'text' | 'email' | 'url' | 'password' | 'tel'}
        />
      }
    >
      <Textarea
        value={stringValue()}
        onInput={(v) => props.onChange(v || undefined)}
        placeholder={props.schema.default?.toString() || ''}
        class="h-24"
      />
    </Show>
  );
};
