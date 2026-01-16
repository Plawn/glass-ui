import { For, createSignal, createEffect, onMount, on } from 'solid-js';
import type { SegmentedControlProps } from './types';

export function SegmentedControl<T extends string | number>(props: SegmentedControlProps<T>) {
  const [indicatorStyle, setIndicatorStyle] = createSignal({ left: 0, top: 0, width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;
  const buttonRefs: Map<T, HTMLButtonElement> = new Map();

  const isVertical = () => props.orientation === 'vertical';

  const sizeClasses = () =>
    props.size === 'sm' ? 'px-2 py-1 text-[0.625rem]' : 'px-3 py-1.5 text-xs';

  const updateIndicator = () => {
    const activeButton = buttonRefs.get(props.value);
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

  onMount(() => {
    // Initial position without animation
    updateIndicator();
    // Enable animations after first render
    requestAnimationFrame(() => setIsInitialized(true));
  });

  createEffect(
    on(
      () => props.value,
      () => {
        if (isInitialized()) {
          updateIndicator();
        }
      }
    )
  );

  return (
    // biome-ignore lint/a11y/useSemanticElements: fieldset has browser styling that breaks the design
    <div
      ref={containerRef}
      role="group"
      aria-label={props['aria-label']}
      class={`relative flex ${isVertical() ? 'flex-col' : 'items-center'} gap-1 p-1 bg-surface-200/80 dark:bg-surface-800/80 rounded-xl w-fit ${
        props.class ?? ''
      }`}
    >
      {/* Sliding indicator - iOS 26 style */}
      <div
        class={`absolute rounded-lg bg-white dark:bg-surface-600 shadow-sm ${
          isInitialized() ? 'transition-all duration-300' : ''
        }`}
        style={{
          left: `${indicatorStyle().left}px`,
          top: `${indicatorStyle().top}px`,
          width: `${indicatorStyle().width}px`,
          height: `${indicatorStyle().height}px`,
          'transition-timing-function': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
      <For each={props.options}>
        {(option) => (
          <button
            ref={(el) => buttonRefs.set(option.value, el)}
            type="button"
            onClick={() => !option.disabled && props.onChange(option.value)}
            disabled={option.disabled}
            class={`${sizeClasses()} font-bold rounded-lg transition-colors duration-200 relative z-10 ${
              props.value === option.value
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
