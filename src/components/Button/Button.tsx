import { type JSX, Show, type ValidComponent, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Spinner } from './Spinner';
import type {
  ButtonOwnProps,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from './types';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  tertiary: 'btn-tertiary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

// Size classes with !important to override .btn-* CSS padding
const sizeClasses: Record<ButtonSize, string> = {
  sm: '!px-2.5 !py-1.5 !text-xs gap-1.5',
  md: '!px-5 !py-2.5 !text-sm gap-2',
  lg: '!px-6 !py-3 !text-base gap-2.5',
};

/**
 * A glassmorphism button. Renders a native `<button>` by default; pass `as` to
 * render any other element or component while keeping the button styling.
 *
 * @example
 * ```tsx
 * <Button variant="primary">Save</Button>
 * <Button as="a" href="/list">Back to list</Button>
 * <Button as={A} href="/users">Users</Button> // @solidjs/router link
 * ```
 */
export function Button<T extends ValidComponent = 'button'>(
  props: ButtonProps<T>,
): JSX.Element {
  const [local, rest] = splitProps(props as ButtonProps & ButtonOwnProps, [
    'as',
    'variant',
    'size',
    'fullWidth',
    'loading',
    'leftIcon',
    'rightIcon',
    'class',
    'children',
    'disabled',
    'type',
  ]);

  const tag = () => local.as ?? 'button';
  const isButton = () => tag() === 'button';
  const variant = () => local.variant ?? 'primary';
  const size = () => local.size ?? 'md';
  const isDisabled = () => local.disabled || local.loading;

  return (
    <Dynamic
      component={tag()}
      {...rest}
      type={isButton() ? (local.type ?? 'button') : undefined}
      class={`${variantClasses[variant()]} ${sizeClasses[size()]} inline-flex items-center justify-center focus:outline-none focus-ring ${local.fullWidth ? 'w-full' : ''} ${!isButton() && isDisabled() ? 'pointer-events-none' : ''} ${local.class ?? ''}`}
      disabled={isButton() ? isDisabled() : undefined}
      aria-disabled={!isButton() && isDisabled() ? 'true' : undefined}
      aria-busy={local.loading || undefined}
    >
      <Show when={local.loading}>
        <Spinner size={size()} />
      </Show>
      <Show when={!local.loading && local.leftIcon}>{local.leftIcon}</Show>
      {local.children}
      <Show when={local.rightIcon}>{local.rightIcon}</Show>
    </Dynamic>
  );
}
