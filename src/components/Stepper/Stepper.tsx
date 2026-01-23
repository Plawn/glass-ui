import clsx from 'clsx';
import type { Component } from 'solid-js';
import { For, Show, createMemo } from 'solid-js';
import type { ComponentSize } from '../../types';
import { CheckIcon } from '../shared';
import type { StepperProps } from './types';

// =============================================================================
// STYLE CONSTANTS
// =============================================================================

const sizeStyles: Record<
  ComponentSize,
  {
    circle: string;
    circleSize: number;
    iconSize: number;
    label: string;
    description: string;
    connector: string;
    connectorThickness: string;
    gap: string;
  }
> = {
  sm: {
    circle: 'w-6 h-6 text-xs',
    circleSize: 24,
    iconSize: 14,
    label: 'text-xs font-medium',
    description: 'text-[0.625rem]',
    connector: 'top-3', // half of circle height
    connectorThickness: 'h-0.5',
    gap: 'gap-1',
  },
  md: {
    circle: 'w-8 h-8 text-sm',
    circleSize: 32,
    iconSize: 16,
    label: 'text-sm font-medium',
    description: 'text-xs',
    connector: 'top-4', // half of circle height
    connectorThickness: 'h-0.5',
    gap: 'gap-1.5',
  },
  lg: {
    circle: 'w-10 h-10 text-base',
    circleSize: 40,
    iconSize: 20,
    label: 'text-base font-medium',
    description: 'text-sm',
    connector: 'top-5', // half of circle height
    connectorThickness: 'h-1',
    gap: 'gap-2',
  },
};

const verticalConnectorStyles: Record<
  ComponentSize,
  { left: string; thickness: string }
> = {
  sm: { left: 'left-3', thickness: 'w-0.5' }, // half of circle width
  md: { left: 'left-4', thickness: 'w-0.5' },
  lg: { left: 'left-5', thickness: 'w-1' },
};

// =============================================================================
// COMPONENT
// =============================================================================

export const Stepper: Component<StepperProps> = (props) => {
  // --- Defaults ---
  const size = () => props.size ?? 'md';
  const orientation = () => props.orientation ?? 'horizontal';
  const allowClickPrevious = () => props.allowClickPrevious ?? false;

  const styles = () => sizeStyles[size()];
  const isVertical = () => orientation() === 'vertical';
  const verticalConnectorStyle = createMemo(() => ({
    top: `${styles().circleSize + 8}px`,
    bottom: '-8px',
  }));

  // --- Step state helpers ---
  const isCompleted = (index: number) => index < props.currentStep;
  const isCurrent = (index: number) => index === props.currentStep;

  const isClickable = (index: number) => {
    if (!props.onStepClick) return false;
    if (allowClickPrevious() && isCompleted(index)) return true;
    return false;
  };

  const handleStepClick = (index: number) => {
    if (isClickable(index)) {
      props.onStepClick?.(index);
    }
  };

  // --- Circle styles ---
  const getCircleClasses = (index: number) => {
    const base = clsx(
      'flex items-center justify-center rounded-full shrink-0 transition-all duration-200',
      styles().circle,
    );

    if (isCompleted(index)) {
      return clsx(base, 'bg-emerald-500 dark:bg-emerald-400 text-white');
    }

    if (isCurrent(index)) {
      return clsx(
        base,
        'bg-violet-500 dark:bg-violet-400 text-white',
        'ring-4 ring-violet-500/20 dark:ring-violet-400/20',
      );
    }

    // Pending
    return clsx(
      base,
      'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400',
    );
  };

  // --- Label styles ---
  const getLabelClasses = (index: number) => {
    const base = styles().label;

    if (isCompleted(index)) {
      return clsx(base, 'text-surface-700 dark:text-surface-300');
    }

    if (isCurrent(index)) {
      return clsx(base, 'text-surface-900 dark:text-surface-100');
    }

    // Pending
    return clsx(base, 'text-surface-500 dark:text-surface-400');
  };

  // --- Description styles ---
  const getDescriptionClasses = (index: number) => {
    const base = styles().description;

    if (isCurrent(index)) {
      return clsx(base, 'text-surface-600 dark:text-surface-400');
    }

    return clsx(base, 'text-surface-400 dark:text-surface-500');
  };

  // --- Connector styles ---
  const getConnectorClasses = (index: number) => {
    const base = 'transition-colors duration-200';

    if (isCompleted(index)) {
      return clsx(base, 'bg-emerald-500 dark:bg-emerald-400');
    }

    return clsx(base, 'bg-surface-200 dark:bg-surface-700');
  };

  // --- Render horizontal step ---
  const renderHorizontalStep = (
    step: (typeof props.steps)[0],
    index: number,
  ) => {
    const clickable = () => isClickable(index);

    return (
      <div
        class={clsx(
          'flex flex-col items-center relative',
          styles().gap,
          clickable() && 'cursor-pointer group',
        )}
        onClick={() => handleStepClick(index)}
        role={clickable() ? 'button' : undefined}
        tabIndex={clickable() ? 0 : undefined}
        onKeyDown={(e) => {
          if (clickable() && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleStepClick(index);
          }
        }}
      >
        {/* Circle with number or icon */}
        <div
          class={clsx(
            getCircleClasses(index),
            clickable() && 'group-hover:scale-110',
          )}
        >
          <Show
            when={isCompleted(index)}
            fallback={
              <Show when={step.icon} fallback={<span>{index + 1}</span>}>
                {step.icon}
              </Show>
            }
          >
            <CheckIcon size={styles().iconSize} />
          </Show>
        </div>

        {/* Label and description */}
        <div
          class={clsx('flex flex-col items-center text-center', styles().gap)}
        >
          <span class={getLabelClasses(index)}>{step.label}</span>
          <Show when={step.description}>
            <span class={getDescriptionClasses(index)}>{step.description}</span>
          </Show>
        </div>
      </div>
    );
  };

  // --- Render vertical step ---
  const renderVerticalStep = (step: (typeof props.steps)[0], index: number) => {
    const clickable = () => isClickable(index);
    const verticalStyles = () => verticalConnectorStyles[size()];
    const isLast = () => index === props.steps.length - 1;

    return (
      <div class="relative">
        {/* Connector line (for non-last items) */}
        <Show when={!isLast()}>
          <div
            class={clsx(
              'absolute',
              verticalStyles().left,
              verticalStyles().thickness,
              'top-10 bottom-0 -translate-x-1/2',
              getConnectorClasses(index),
            )}
            style={verticalConnectorStyle()}
          />
        </Show>

        <div
          class={clsx(
            'flex items-start gap-3',
            clickable() && 'cursor-pointer group',
            !isLast() && 'pb-6',
          )}
          onClick={() => handleStepClick(index)}
          role={clickable() ? 'button' : undefined}
          tabIndex={clickable() ? 0 : undefined}
          onKeyDown={(e) => {
            if (clickable() && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleStepClick(index);
            }
          }}
        >
          {/* Circle with number or icon */}
          <div
            class={clsx(
              getCircleClasses(index),
              'relative z-10',
              clickable() && 'group-hover:scale-110',
            )}
          >
            <Show
              when={isCompleted(index)}
              fallback={
                <Show when={step.icon} fallback={<span>{index + 1}</span>}>
                  {step.icon}
                </Show>
              }
            >
              <CheckIcon size={styles().iconSize} />
            </Show>
          </div>

          {/* Label and description */}
          <div class={clsx('flex flex-col pt-1', styles().gap)}>
            <span class={getLabelClasses(index)}>{step.label}</span>
            <Show when={step.description}>
              <span class={getDescriptionClasses(index)}>
                {step.description}
              </span>
            </Show>
          </div>
        </div>
      </div>
    );
  };

  // --- Main render ---
  return (
    <Show
      when={isVertical()}
      fallback={
        // Horizontal layout
        <div class={clsx('flex items-start', props.class)} style={props.style}>
          <For each={props.steps}>
            {(step, index) => (
              <>
                {renderHorizontalStep(step, index())}
                {/* Connector between steps */}
                <Show when={index() < props.steps.length - 1}>
                  <div
                    class={clsx(
                      'flex-1 mx-2 relative',
                      styles().connector,
                      styles().connectorThickness,
                      getConnectorClasses(index()),
                    )}
                    style={{ 'min-width': '2rem' }}
                  />
                </Show>
              </>
            )}
          </For>
        </div>
      }
    >
      {/* Vertical layout */}
      <div class={clsx('flex flex-col', props.class)} style={props.style}>
        <For each={props.steps}>
          {(step, index) => renderVerticalStep(step, index())}
        </For>
      </div>
    </Show>
  );
};
