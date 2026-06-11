import type { Component } from 'solid-js';
import { For, Show, createMemo, splitProps } from 'solid-js';
import { TEXT_SIZES } from '../../constants';
import { useControlled } from '../../hooks';
import type { SliderProps, SliderSize } from './types';

const trackHeights: Record<SliderSize, string> = {
  sm: '4px',
  md: '8px',
  lg: '12px',
};

const thumbSizes: Record<SliderSize, string> = {
  sm: '12px',
  md: '16px',
  lg: '20px',
};

// Mark labels are intentionally smaller than standard text sizes
const markLabelSizes: Record<SliderSize, string> = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
};

export const Slider: Component<SliderProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'min',
    'max',
    'step',
    'showValue',
    'size',
    'marks',
    'id',
    'name',
    'disabled',
    'required',
    'label',
    'error',
    'ref',
    'class',
    'style',
  ]);
  const min = () => local.min ?? 0;
  const max = () => local.max ?? 100;
  const step = () => local.step ?? 1;
  const size = () => local.size ?? 'md';

  const [value, setValue] = useControlled({
    value: () => local.value,
    defaultValue: local.defaultValue ?? local.min ?? 0,
    onChange: (v) => local.onChange?.(v),
  });

  const percentage = () => {
    const range = max() - min();
    if (range === 0) {
      return 0;
    }
    return ((value() - min()) / range) * 100;
  };

  const sliderStyle = createMemo(() => ({
    '--slider-fill': `${percentage()}%`,
    '--slider-track-height': trackHeights[size()],
    '--slider-thumb-size': thumbSizes[size()],
  }));

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setValue(Number(target.value));
  };

  const getMarkPosition = (markValue: number) => {
    const range = max() - min();
    if (range === 0) {
      return 0;
    }
    return ((markValue - min()) / range) * 100;
  };

  return (
    <div {...rest} class={`w-full ${local.class ?? ''}`} style={local.style}>
      {/* Label and value display */}
      <Show when={local.label || local.showValue}>
        <div class="flex justify-between items-center mb-2">
          <Show when={local.label}>
            <label
              for={local.id}
              class={`font-medium text-surface-700 dark:text-surface-300 ${TEXT_SIZES[size()]}`}
            >
              {local.label}
              <Show when={local.required}>
                <span class="text-error-500 ml-0.5">*</span>
              </Show>
            </label>
          </Show>
          <Show when={local.showValue}>
            <span
              class={`font-medium text-surface-600 dark:text-surface-400 tabular-nums ${TEXT_SIZES[size()]}`}
            >
              {value()}
            </span>
          </Show>
        </div>
      </Show>

      {/* Native range input with CSS-based fill */}
      <input
        ref={local.ref}
        type="range"
        id={local.id}
        name={local.name}
        min={min()}
        max={max()}
        step={step()}
        value={value()}
        disabled={local.disabled}
        onInput={handleInput}
        class="slider-input w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
        style={sliderStyle()}
        aria-valuemin={min()}
        aria-valuemax={max()}
        aria-valuenow={value()}
        aria-label={local.label}
        aria-invalid={!!local.error}
        aria-describedby={
          local.error && local.id ? `${local.id}-error` : undefined
        }
      />

      {/* Marks */}
      <Show when={local.marks && local.marks.length > 0}>
        <div
          class="relative mt-1"
          style={{ height: local.marks?.some((m) => m.label) ? '20px' : '8px' }}
        >
          <For each={local.marks}>
            {(mark) => (
              <div
                class="absolute flex flex-col items-center"
                style={{
                  left: `${getMarkPosition(mark.value)}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Mark tick */}
                <div
                  class={`w-0.5 bg-surface-400 dark:bg-surface-500 rounded-full ${
                    size() === 'sm' ? 'h-1' : size() === 'md' ? 'h-1.5' : 'h-2'
                  }`}
                />
                {/* Mark label */}
                <Show when={mark.label}>
                  <span
                    class={`mt-0.5 text-surface-500 dark:text-surface-400 whitespace-nowrap ${markLabelSizes[size()]}`}
                  >
                    {mark.label}
                  </span>
                </Show>
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* Error message */}
      <Show when={local.error}>
        <p
          id={local.id ? `${local.id}-error` : undefined}
          class="mt-1.5 text-sm text-error-500 dark:text-error-400"
          role="alert"
        >
          {local.error}
        </p>
      </Show>
    </div>
  );
};
