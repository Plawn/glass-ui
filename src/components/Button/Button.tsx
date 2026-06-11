import type { Component } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import { Spinner } from './Spinner';
import type { ButtonProps, ButtonSize, ButtonVariant } from './types';

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

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'variant',
    'size',
    'type',
    'fullWidth',
    'loading',
    'leftIcon',
    'rightIcon',
    'class',
    'children',
    'disabled',
    'onClick',
  ]);
  const variant = () => local.variant ?? 'primary';
  const size = () => local.size ?? 'md';

  return (
    <button
      {...rest}
      type={local.type ?? 'button'}
      class={`${variantClasses[variant()]} ${sizeClasses[size()]} inline-flex items-center justify-center focus:outline-none focus-ring ${local.fullWidth ? 'w-full' : ''} ${local.class ?? ''}`}
      onClick={local.onClick}
      disabled={local.disabled || local.loading}
      aria-busy={local.loading || undefined}
    >
      <Show when={local.loading}>
        <Spinner size={size()} />
      </Show>
      <Show when={!local.loading && local.leftIcon}>{local.leftIcon}</Show>
      {local.children}
      <Show when={local.rightIcon}>{local.rightIcon}</Show>
    </button>
  );
};
