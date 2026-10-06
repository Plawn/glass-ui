import {
  For,
  type JSX,
  createEffect,
  createSignal,
  on,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import { TRANSITION_COLORS, TRANSITION_INDICATOR } from '../../constants';
import { useControlled } from '../../hooks';
import { nextRadioIndex } from './keyboard';
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
    'onKeyDown',
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

  // `sm` keeps a 24px minimum target height (WCAG 2.5.8)
  const sizeClasses = () =>
    local.size === 'sm'
      ? 'min-h-6 px-2 py-1 text-[0.625rem]'
      : 'px-3 py-1.5 text-xs';

  const enabledOptions = () => local.options.filter((o) => !o.disabled);

  /**
   * Roving tabindex: only one radio is in the tab order — the selected one,
   * or the first enabled option when the selection is missing/disabled.
   */
  const tabStopValue = (): T | undefined => {
    const enabled = enabledOptions();
    return enabled.find((o) => o.value === value())?.value ?? enabled[0]?.value;
  };

  const selectAndFocus = (next: T) => {
    setValue(next);
    buttonRefs.get(next)?.focus();
  };

  // Radiogroup keyboard pattern: arrows move and select (wrapping),
  // Home/End jump to the first/last enabled option.
  const handleKeyDown: JSX.EventHandler<HTMLDivElement, KeyboardEvent> = (
    e,
  ) => {
    const callerHandler = local.onKeyDown;
    if (typeof callerHandler === 'function') {
      callerHandler(e);
    } else if (callerHandler) {
      callerHandler[0](callerHandler[1], e);
    }
    if (e.defaultPrevented) {
      return;
    }
    const enabled = enabledOptions();
    const current = enabled.findIndex((o) => o.value === value());
    const nextIndex = nextRadioIndex(e.key, current, enabled.length);
    if (nextIndex === undefined) {
      return;
    }
    e.preventDefault();
    selectAndFocus(enabled[nextIndex].value);
  };

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
      role="radiogroup"
      onKeyDown={handleKeyDown}
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
            role="radio"
            aria-checked={value() === option.value}
            tabIndex={tabStopValue() === option.value ? 0 : -1}
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
