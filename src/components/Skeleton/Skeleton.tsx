import type { Component } from 'solid-js';
import { splitProps } from 'solid-js';
import type { SkeletonProps, SkeletonVariant } from './types';

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-lg',
};

const defaultSizes: Record<SkeletonVariant, { width: string; height: string }> =
  {
    text: { width: '100%', height: '1em' },
    circular: { width: '2.5rem', height: '2.5rem' },
    rectangular: { width: '100%', height: '8rem' },
  };

export const Skeleton: Component<SkeletonProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'class',
    'style',
    'variant',
    'width',
    'height',
    'rounded',
  ]);

  const variant = () => local.variant ?? 'text';
  const defaults = () => defaultSizes[variant()];

  const width = () => local.width ?? defaults().width;
  const height = () => local.height ?? defaults().height;

  const borderRadius = () => {
    if (local.rounded === false) {
      return '';
    }
    return variantStyles[variant()];
  };

  return (
    <div
      {...rest}
      class={`animate-pulse bg-surface-200 dark:bg-surface-600/60 ${borderRadius()} ${local.class ?? ''}`}
      style={{
        width: width(),
        height: height(),
      }}
      aria-hidden="true"
    />
  );
};
