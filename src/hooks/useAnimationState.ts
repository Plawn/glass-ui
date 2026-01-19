import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js';

export interface UseAnimationStateOptions {
  /** The open state accessor from the parent component */
  open: Accessor<boolean>;
  /** Animation duration in milliseconds. Must be an accessor for reactivity. */
  duration: Accessor<number>;
}

export interface UseAnimationStateReturn {
  /** Whether the element should be visible in the DOM */
  visible: Accessor<boolean>;
  /** Whether the closing animation is in progress */
  isClosing: Accessor<boolean>;
}

/**
 * Manages enter/exit animation state for components that need to stay
 * in the DOM during their exit animation before being removed.
 *
 * When `open` changes from true to false, instead of immediately hiding
 * the element, `isClosing` becomes true and the element stays visible.
 * After the animation duration, both `visible` and `isClosing` become false.
 *
 * @example
 * ```tsx
 * const { visible, isClosing } = useAnimationState({
 *   open: () => props.open,
 *   duration: 200,
 * });
 *
 * const animationClass = () =>
 *   isClosing() ? 'animate-out fade-out' : 'animate-in fade-in';
 *
 * return (
 *   <Show when={visible()}>
 *     <div class={animationClass()}>Content</div>
 *   </Show>
 * );
 * ```
 */
export function useAnimationState(options: UseAnimationStateOptions): UseAnimationStateReturn {
  // Track visibility separately from open state for exit animation
  const [visible, setVisible] = createSignal(false);
  const [isClosing, setIsClosing] = createSignal(false);

  // Handle open/close transitions
  createEffect(() => {
    if (options.open()) {
      // Opening: immediately show and clear closing state
      setIsClosing(false);
      setVisible(true);
    } else if (visible()) {
      // Closing: start exit animation, then hide after duration
      setIsClosing(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setIsClosing(false);
      }, options.duration());
      onCleanup(() => clearTimeout(timer));
    }
  });

  return {
    visible,
    isClosing,
  };
}
