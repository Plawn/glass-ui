import {
  For,
  createEffect,
  createSignal,
  on,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import { TRANSITION_COLORS, TRANSITION_INDICATOR } from '../../constants';
import { useControlled } from '../../hooks';
import type { SegmentedControlProps } from './types';

export function SegmentedControl<T extends string | number>(
  props: SegmentedControlProps<T>,
) {
  const [local, rest] = splitProps(props, [
    'options',
    'value',
    'defaultValue',
    'onChange',
    'size',
    'orientation',
    'class',
  ]);
  const [indicatorStyle, setIndicatorStyle] = createSignal({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [isInitialized, setIsInitialized] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;
  const buttonRefs: Map<T, HTMLButtonElement> = new Map();

  const [value, setValue] = useControlled<T>({
    value: () => local.value,
    defaultValue: (local.defaultValue ?? local.options[0]?.value) as T,
    onChange: (v) => local.onChange?.(v),
  });

  const isVertical = () => local.orientation === 'vertical';

  const sizeClasses = () =>
    local.size === 'sm' ? 'px-2 py-1 text-[0.625rem]' : 'px-3 py-1.5 text-xs';

  const updateIndicator = () => {
    const activeButton = buttonRefs.get(value());
    if (activeButton && containerRef) {
      const containerRect = containerRef.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        top: buttonRect.top - containerRect.top,
        width: buttonRect.width,
        height: buttonRect.height,
      });
    }
  };

  const observer = new ResizeObserver(() => updateIndicator());

  onMount(() => {
    for (const btn of buttonRefs.values()) {
      observer.observe(btn);
    }
    requestAnimationFrame(() => {
      updateIndicator();
      requestAnimationFrame(() => setIsInitialized(true));
    });
  });

  onCleanup(() => observer.disconnect());

  createEffect(
    on(value, () => {
      if (isInitialized()) {
        updateIndicator();
      }
    }),
  );

  return (
    <div
      {...rest}
      ref={containerRef}
      role="group"
      class={`relative flex ${isVertical() ? 'flex-col' : 'items-center'} gap-1 p-1 bg-surface-200/80 dark:bg-surface-800/80 rounded-xl w-fit ${
        local.class ?? ''
      }`}
    >
      {/* Sliding indicator - iOS 26 style */}
      <div
        class={`absolute rounded-lg bg-white dark:bg-surface-600 shadow-sm ${
          isInitialized() ? TRANSITION_INDICATOR : ''
        }`}
        style={{
          left: `${indicatorStyle().left}px`,
          top: `${indicatorStyle().top}px`,
          width: `${indicatorStyle().width}px`,
          height: `${indicatorStyle().height}px`,
          'transition-timing-function': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
      <For each={local.options}>
        {(option) => (
          <button
            ref={(el) => buttonRefs.set(option.value, el)}
            type="button"
            onClick={() => !option.disabled && setValue(option.value)}
            disabled={option.disabled}
            class={`${sizeClasses()} font-bold rounded-lg ${TRANSITION_COLORS} relative z-10 ${
              value() === option.value
                ? 'text-surface-900 dark:text-surface-100'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
            } ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {option.label}
          </button>
        )}
      </For>
    </div>
  );
}
